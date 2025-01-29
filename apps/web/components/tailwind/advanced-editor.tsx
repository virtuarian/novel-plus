//apps/web/components/tailwind/advanced-editor.tsx
"use client";
import { useDocuments } from "@/context/DocumentContext";
import { defaultEditorContent } from "@/lib/content";
import {
  Command,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  ImageResizer,
  type JSONContent,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
  renderItems,
} from "novel";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { v4 as uuidv4 } from 'uuid';
import { defaultExtensions } from "./extensions";
import { AIMenu } from "./generative/ai-menu";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { uploadFn } from "./image-upload";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-buttons";
import { createSuggestionItemsWithLanguage } from "./slash-command";
import Magic from "./ui/icons/magic";
import { Separator } from "./ui/separator";
const hljs = require("highlight.js");

export const TailwindAdvancedEditor = () => {
  const [title, setTitle] = useState("");
  const [initialContent] = useState<JSONContent>(defaultEditorContent);
  const { currentDoc, saveDocument } = useDocuments();
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef<EditorInstance | null>(null);
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  // 言語設定を取得
  const currentLanguage = process.env.NEXT_PUBLIC_AI_LANGUAGE || "en";

  const suggestionItems = useMemo(() => {
    return createSuggestionItemsWithLanguage(currentLanguage);
  }, [currentLanguage]);

  // スラッシュコマンドをコンポーネント内で初期化
  const slashCommand = useMemo(() => {
    return Command.configure({
      suggestion: {
        items: () => suggestionItems,
        render: renderItems,
      },
    });
  }, [suggestionItems]);

  // extensionsをuseMemoで最適化
  const extensions = useMemo(() => {
    return [...defaultExtensions, slashCommand];
  }, [slashCommand]);

  // この部分を確認
  // console.log('setOpenAI function:', setOpenAI); // デバッグ用

  // currentDocの変更を監視
  useEffect(() => {
    if (!currentDoc) {
      setTitle("");
      // エディタが準備できていれば空の内容にリセット
      if (editorRef.current) {
        editorRef.current.commands.clearContent();
        editorRef.current.commands.setContent(defaultEditorContent);
      }
      return;
    }

    // タイトルの更新
    setTitle(currentDoc.title);

    // エディタの内容を更新
    if (editorRef.current && currentDoc.content) {
      // console.log("Updating editor content", currentDoc.content);
      editorRef.current.commands.clearContent();
      editorRef.current.commands.setContent(currentDoc.content);
    }
  }, [currentDoc]);

  // デバッグ用のeffect
  // useEffect(() => {
  //   console.log('openAI state:', openAI);
  // }, [openAI]);

  // const highlightCodeblocks = (content: string) => {
  //   const doc = new DOMParser().parseFromString(content, "text/html");
  //   doc.querySelectorAll("pre code").forEach((el) => {
  //     hljs.highlightElement(el);
  //   });
  //   return new XMLSerializer().serializeToString(doc);
  // };

  // 自動保存の拡張
  const debouncedUpdates = useDebouncedCallback((editor: EditorInstance) => {
    const json = editor.getJSON();
    const updatedDoc = {
      id: currentDoc?.id || uuidv4(),
      title,
      content: json,
      updatedAt: Date.now(),
    };

    saveDocument(updatedDoc);
    setCharsCount(editor.storage.characterCount.words());
    setSaveStatus("Saved");
  }, 500);



  if (!initialContent) return null;

  return (
    <div className="relative w-full flex-1">
      {/* タイトル入力フィールド */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSaveStatus("Unsaved");
            // エディタインスタンスが存在する場合のみ保存を実行
            if (editorRef.current) {
              debouncedUpdates(editorRef.current);
            }
          }}
          className="w-full text-xl font-bold p-2 border-none bg-background focus:outline-none focus:ring-2 focus:ring-accent rounded-md"
          placeholder="ドキュメントタイトル"
        />
      </div>

      {/* 既存のステータス表示 */}
      <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
        {/* <div className={charsCount ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground" : "hidden"}>
          {charsCount} Words
        </div> */}

      </div>

      {/* AIボタン - 右下に固定 */}

      <div className="fixed bottom-6 right-6 z-50">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          ref={aiButtonRef}
          onClick={() => editorRef.current && setOpenAI(!openAI)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Magic className="h-5 w-5" />
          <span>AI</span>
        </button>

      </div>


      {/* AIメニュー */}
      {/* {openAI && editorRef.current && (
        <div className="absolute bottom-full right-0 mb-2">
          <AIMenu
            open={openAI}
            onOpenChange={setOpenAI}
            editor={editorRef.current}
            triggerRef={aiButtonRef}
            position="button"
          />
        </div>
      )} */}
      {openAI && editorRef.current && (
        <div className="absolute bottom-[calc(100%+0.5rem)] right-0">
          <div className="bg-background rounded-lg shadow-lg border border-muted">
            <AIMenu
              open={openAI}
              onOpenChange={setOpenAI}
              editor={editorRef.current}
              triggerRef={aiButtonRef}
              position="button"
            />
          </div>
        </div>
      )}

      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="flex-1 w-full border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              // proseクラスのmax-width制限を解除するためにmax-w-noneを追加
              class:
                "prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none w-full h-full p-4 max-w-none",
            },
            // immediatelyRenderを削除
          }}
          onCreate={({ editor }) => {
            editorRef.current = editor;
            setIsEditorReady(true);
          }}
          onUpdate={({ editor }) => {
            editorRef.current = editor;
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch
          // open={openAI}
          // onOpenChange={(value) => {
          //   // console.log('GenerativeMenuSwitch onOpenChange called with:', value);
          //   setOpenAI(value);
          // }}
          >
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};
