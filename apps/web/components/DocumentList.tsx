// components/DocumentList.tsx
'use client';
import { type NotionDocument, useDocuments } from '@/context/DocumentContext';
import { defaultEditorContent } from '@/lib/content';
import * as Dialog from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export const DocumentList = () => {
    const { documents, setCurrentDoc, setDocuments } = useDocuments();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

    // 削除ボタンクリック時の処理
    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDocumentToDelete(id);
        setDeleteDialogOpen(true);
    };

    // ドキュメントの新規作成
    const handleNewDocument = () => {
        const newDoc = {
            id: crypto.randomUUID(),
            title: '',
            content: defaultEditorContent, // defaultEditorContentをインポートする必要があります
            updatedAt: Date.now()
        };
        setCurrentDoc(newDoc);
    };

    // ドキュメントの選択
    const handleDocumentSelect = (doc: NotionDocument) => {
        setCurrentDoc(doc);
    };

    // ドキュメントの削除
    // const handleDelete = (id: string) => {
    //     const newDocs = documents.filter(doc => doc.id !== id);
    //     setDocuments(newDocs);
    //     // 削除時もローカルストレージを更新
    //     localStorage.setItem('novel-documents', JSON.stringify(newDocs));
    //     // 現在のドキュメントが削除された場合、選択を解除
    //     setCurrentDoc(null);
    // };
    // 削除実行時の処理
    const handleDelete = () => {
        if (!documentToDelete) return;

        const newDocs = documents.filter(doc => doc.id !== documentToDelete);
        setDocuments(newDocs);
        localStorage.setItem('novel-documents', JSON.stringify(newDocs));
        setCurrentDoc(null);
        setDeleteDialogOpen(false);
        setDocumentToDelete(null);
    };

    return (
        <div className="w-64 border-r border-muted p-4">
            <button
                onClick={handleNewDocument}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-md w-full"
            >
                <Plus className="h-4 w-4" />
                新規作成
            </button>
            <div className="space-y-2">
                {documents.map(doc => (
                    <div
                        key={doc.id}
                        className="flex justify-between items-center p-2 hover:bg-accent rounded cursor-pointer group"
                        onClick={() => handleDocumentSelect(doc)}
                    >
                        <span className="truncate">{doc.title || '無題のドキュメント'}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(doc.id, e);
                            }}
                            className="opacity-0 group-hover:opacity-100"
                        >
                            <Trash className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            {/* 削除確認ダイアログ */}
            <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[450px] rounded-md bg-background p-6 shadow-lg">
                        <Dialog.Title className="text-lg font-semibold">
                            ドキュメントを削除
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-muted-foreground">
                            このドキュメントを削除してもよろしいですか？
                            この操作は取り消せません。
                        </Dialog.Description>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setDeleteDialogOpen(false);
                                    setDocumentToDelete(null);
                                }}
                                className="px-4 py-2 rounded hover:bg-accent"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                削除
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};