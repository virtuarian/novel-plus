//apps/web/components/tailwind/generative/ai-selector-commands.tsx
import { ArrowDownWideNarrow, CheckCheck, RefreshCcwDot, StepForward, WrapText } from "lucide-react";
import { getPrevText, useEditor } from "novel";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import { getLabels } from "@/lib/labels";
import { useEffect, useState } from "react";

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();
  const [labels, setLabels] = useState(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));

  // 環境変数が変更された場合にラベルを更新
  useEffect(() => {
    setLabels(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));
  }, [process.env.NEXT_PUBLIC_AI_LANGUAGE]);

  return (
    <>
      <CommandGroup heading={labels.editHeading}>
        {labels.options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(slice.content);
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading={labels.moreHeading}>
        <CommandItem
          onSelect={() => {
            const pos = editor.state.selection.from;
            const text = getPrevText(editor, pos);
            onSelect(text, "continue");
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          {labels.continueLabel}
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;