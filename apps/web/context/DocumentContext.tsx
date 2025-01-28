// apps/web/context/DocumentContext.tsx
'use client';
import { defaultEditorContent } from '@/lib/content';
import type { JSONContent } from 'novel';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
interface NotionDocument {
    id: string;          // ユニークID
    title: string;       // ドキュメントタイトル
    content: JSONContent; // エディタの内容
    updatedAt: number;   // 最終更新日時
}

// DocumentContextType
interface DocumentContextType {
    documents: NotionDocument[];
    currentDoc: NotionDocument | null;
    setDocuments: (docs: NotionDocument[]) => void;
    setCurrentDoc: (doc: NotionDocument | null) => void;
    saveDocument: (doc: NotionDocument) => void;
}

// DocumentContextを作成
const DocumentContext = createContext<DocumentContextType | null>(null);

// DocumentProviderを作成
export function DocumentProvider({ children }: { children: ReactNode }) {
    const [documents, setDocuments] = useState<NotionDocument[]>([]);
    const [currentDoc, setCurrentDoc] = useState<NotionDocument | null>(null);

    // const [currentDoc, setCurrentDoc] = useState<NotionDocument | null>(() => {
    //     // 初期状態で新規ドキュメントを作成
    //     return {
    //         id: crypto.randomUUID(),
    //         title: '',
    //         content: defaultEditorContent,
    //         updatedAt: Date.now()
    //     };
    // });

    // 初期ロード時にローカルストレージから読み込む
    useEffect(() => {
        const storedDocs = localStorage.getItem('novel-documents');
        if (storedDocs) {
            setDocuments(JSON.parse(storedDocs));
        }
    }, []);

    // ドキュメントの保存
    const saveDocument = async (doc: NotionDocument) => {
        try {
            setDocuments(prevDocs => {
                const existingDocIndex = prevDocs.findIndex(d => d.id === doc.id);
                const newDocs = existingDocIndex >= 0
                    ? prevDocs.map(d => d.id === doc.id ? { ...doc, updatedAt: Date.now() } : d)
                    : [...prevDocs, { ...doc, updatedAt: Date.now() }];

                localStorage.setItem('novel-documents', JSON.stringify(newDocs));
                return newDocs;
            });
        } catch (error) {
            console.error('Failed to save document:', error);
        }
    };

    return (
        <DocumentContext.Provider value={{
            documents,
            currentDoc,
            setDocuments,
            setCurrentDoc,
            saveDocument,
        }}>
            {children}
        </DocumentContext.Provider>
    );
}

export const useDocuments = () => {
    const context = useContext(DocumentContext);
    if (!context) {
        throw new Error('useDocuments must be used within a DocumentProvider');
    }
    return context;
};