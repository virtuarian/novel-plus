// ai-selector.tsx
"use client";

import { Command, CommandInput } from "@/components/tailwind/ui/command";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCustomCompletion } from "@/lib/UseCustomComplition";
import { ArrowUp } from "lucide-react";
import type { EditorInstance } from "novel";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "../ui/button";
import CrazySpinner from "../ui/icons/crazy-spinner";
import Magic from "../ui/icons/magic";
import { ScrollArea } from "../ui/scroll-area";
import AICompletionCommands from "./ai-completion-command";
import AISelectorCommands from "./ai-selector-commands";

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: EditorInstance;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export function AISelector({ open, onOpenChange, editor, buttonRef }: AISelectorProps) {
  const [inputValue, setInputValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  // const buttonRef = useRef<HTMLButtonElement>(null);  // AIボタンのref

  // メニュー外のクリックを検知
  useClickOutside(
    menuRef,
    () => {
      onOpenChange(false);
    },
    [buttonRef]  // AIボタンはクリック検知から除外
  );
  const { completion, complete, isLoading } = useCustomCompletion({
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onError: (e) => {
      console.error(e);
      toast.error(e.message);
    },
  });

  const hasCompletion = completion && completion.length > 0;

  const handleCommand = () => {
    if (completion) {
      complete(completion, {
        body: { option: "zap", command: inputValue },
      }).then(() => setInputValue(""));
      return;
    }

    const slice = editor.state.selection.content();
    const text = editor.storage.markdown.serializer.serialize(slice.content);

    complete(text, {
      body: { option: "zap", command: inputValue },
    }).then(() => setInputValue(""));
  };

  return (
    <Command ref={menuRef} className="w-[350px] bg-background" data-ai-selector>
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose p-2 px-4 prose-sm">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-purple-500">
          <Magic className="mr-2 h-4 w-4 shrink-0" />
          AI is thinking
          <div className="ml-2 mt-1">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={hasCompletion ? "Tell AI what to do next" : "Ask AI to edit or generate..."}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-900"
              onClick={handleCommand}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor.commands.unsetHighlight();
                editor.commands.focus();
                onOpenChange(false);
              }}
              completion={completion}
              editor={editor}
            />
          ) : (
            <AISelectorCommands editor={editor} onSelect={(value, option) => complete(value, { body: { option } })} />
          )}
        </>
      )}
    </Command>
  );
}
