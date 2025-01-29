// slash-command-ai-selector.tsx
import { Command } from "@/components/tailwind/ui/command";
import { AISelector } from "./ai-selector";

interface SlashCommandAISelectorProps {
    editor: any;
    onClose: () => void;
}

export function SlashCommandAISelector({ editor, onClose }: SlashCommandAISelectorProps) {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
            <div className="bg-background rounded-lg shadow-lg border border-muted">
                {/* <AISelector
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) {
                            editor.chain().unsetHighlight().run();
                            onClose();
                        }
                    }}

                /> */}
            </div>
        </div>
    );
}