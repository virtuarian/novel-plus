//apps/web/components/tailwind/generative/ai-completion-command.tsx
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import { useEditor } from "novel";
import { Check, TextQuote, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getLabels } from "../../../lib/labels";

interface AICompletionCommandsProps {
  completion: string;
  onDiscard: () => void;
}

const AICompletionCommands = ({
  completion,
  onDiscard,
}: AICompletionCommandsProps) => {
  const { editor } = useEditor();
  const [labels, setLabels] = useState(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));

  useEffect(() => {
    setLabels(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));
  }, [process.env.NEXT_PUBLIC_AI_LANGUAGE]);

  const { completion: completionLabels } = labels;

  return (
    <>
      <CommandGroup>
        <CommandItem
          className="gap-2 px-4"
          value="replace"
          onSelect={() => {
            const selection = editor.view.state.selection;
            editor
              .chain()
              .focus()
              .insertContentAt(
                {
                  from: selection.from,
                  to: selection.to,
                },
                completion,
              )
              .run();
          }}
        >
          <Check className="h-4 w-4 text-muted-foreground" />
          {completionLabels.replaceSelection}
        </CommandItem>
        <CommandItem
          className="gap-2 px-4"
          value="insert"
          onSelect={() => {
            const selection = editor.view.state.selection;
            editor
              .chain()
              .focus()
              .insertContentAt(selection.to + 1, completion)
              .run();
          }}
        >
          <TextQuote className="h-4 w-4 text-muted-foreground" />
          {completionLabels.insertBelow}
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem
          onSelect={onDiscard}
          value="thrash"
          className="gap-2 px-4"
        >
          <TrashIcon className="h-4 w-4 text-muted-foreground" />
          {completionLabels.discard}
        </CommandItem>
      </CommandGroup>
    </>
  );
};
export default AICompletionCommands;
