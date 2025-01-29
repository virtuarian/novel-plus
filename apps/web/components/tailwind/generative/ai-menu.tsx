// components/tailwind/generative/ai-menu.tsx
import { Command, CommandInput } from "@/components/tailwind/ui/command";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCustomCompletion } from "@/lib/UseCustomComplition";
import { ArrowUp } from "lucide-react";
import type { EditorInstance } from "novel";
import { type RefObject, useRef, useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "../ui/button";
import CrazySpinner from "../ui/icons/crazy-spinner";
import Magic from "../ui/icons/magic";
import { ScrollArea } from "../ui/scroll-area";
import AICompletionCommands from "./ai-completion-command";
import AISelectorCommands from "./ai-selector-commands";

interface AIMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editor: EditorInstance;
    triggerRef?: RefObject<HTMLElement>; // トリガー要素（ボタンなど）のref
    position?: "button" | "selection"; // メニューの表示位置
}

export function AIMenu({ open, onOpenChange, editor, triggerRef, position = "button" }: AIMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");

    // メニュー外のクリックを検知
    useClickOutside(
        menuRef,
        () => {
            onOpenChange(false);
        },
        triggerRef ? [triggerRef] : [],
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
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const text: any =
            position === "selection"
                ? editor.state.selection.content()
                : editor.state.doc.textBetween(0, editor.state.doc.content.size);

        if (completion) {
            complete(completion, {
                body: { option: "zap", command: inputValue },
            }).then(() => {
                setInputValue("");
                // onOpenChange(false);
            });
            return;
        }

        complete(text, {
            body: { option: "zap", command: inputValue },
        }).then(() => {
            setInputValue("");
            // onOpenChange(false);
        });
    };

    // エンターキーのハンドラー
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleCommand();
        }
    };

    // 位置に応じたスタイルを設定
    // const positionStyles = position === "button" ? "absolute right-5 top-16" : "relative"; // 選択時は EditorBubble 内で相対配置
    const positionStyles = position === "button"
        ? "fixed bottom-20 right-6" // 固定ボタンの場合、画面右下に表示
        : "relative"; // 選択時は EditorBubble 内で相対配置

    return (
        <div className={`${positionStyles} z-50`}>
            <Command ref={menuRef} className="w-[350px] bg-background shadow-lg rounded-lg border">
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
                                onKeyDown={handleKeyDown} // エンターキーハンドラーを追加
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
                                editor={editor}  // editorを渡す
                                onCommandExecuted={() => onOpenChange(false)}
                            />
                        ) : (
                            <AISelectorCommands
                                editor={editor}
                                onSelect={(value, option) => {
                                    complete(value, { body: { option } })
                                    // .then(() => onOpenChange(false)); // コマンド実行後にメニューを閉じる
                                }}
                            // position={position}
                            />
                        )}
                    </>
                )}
            </Command>
        </div>
    );
}
