// apps/web/components/tailwind/generative/generative-menu-switch.tsx
import { EditorBubble, removeAIHighlight, useEditor } from "novel";
import { Fragment, type ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Magic from "../ui/icons/magic";
import { AIMenu } from "./ai-menu";

const GenerativeMenuSwitch = ({ children }: { children: ReactNode }) => {
  const { editor } = useEditor();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open && editor) {
      removeAIHighlight(editor);
    }
  }, [open, editor]);

  // テキスト選択状態の監視
  useEffect(() => {
    if (editor) {
      const updateHandler = () => {
        const hasSelection = !editor.state.selection.empty;
        if (!hasSelection && open) {
          setOpen(false);
        }
      };

      editor.on("selectionUpdate", updateHandler);
      return () => {
        editor.off("selectionUpdate", updateHandler);
      };
    }
  }, [editor, open]);

  if (!editor) {
    return null;
  }

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          setOpen(false);
          editor.commands.unsetHighlight();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open ? (
        <AIMenu open={open} onOpenChange={setOpen} editor={editor} position="selection" />
      ) : (
        <Fragment>
          <Button
            data-ask-ai-button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => setOpen(true)}
            size="sm"
          >
            <Magic className="h-5 w-5" />
            AIに依頼
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
