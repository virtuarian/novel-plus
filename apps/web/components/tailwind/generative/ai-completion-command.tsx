import { Check, TextQuote, TrashIcon } from "lucide-react";

import type { EditorInstance } from "novel";
import { useEffect, useState } from "react";
import { getLabels } from "../../../lib/labels";
//apps/web/components/tailwind/generative/ai-completion-command.tsx
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";

interface AICompletionCommandsProps {
  completion: string;
  onDiscard: () => void;
  editor: EditorInstance; // editorを追加
  onCommandExecuted: () => void; // コマンド実行後にメニューを閉じる
}

const AICompletionCommands = ({ completion, onDiscard, editor, onCommandExecuted }: AICompletionCommandsProps) => {
  // const { editor } = useEditor();
  const [labels, setLabels] = useState(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));

  useEffect(() => {
    setLabels(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));
  }, [process.env.NEXT_PUBLIC_AI_LANGUAGE]);

  const { completion: completionLabels } = labels;

  // 選択状態に応じてフィルタリングされたオプションを取得
  // const hasSelection = !editor.state.selection.empty;
  // const filteredOptions = labels.options.filter(option => {
  //   // 文章が選択されていない場合は、編集系のコマンドを非表示
  //   if (!hasSelection) {
  //     return !['improve', 'fix', 'shorter', 'longer'].includes(option.value);
  //   }
  //   return true;
  // });

  const handleCommand = (command: () => void) => {
    command();
    onCommandExecuted();
  };

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
            onDiscard();
            onCommandExecuted();
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
            onDiscard();
            onCommandExecuted();
          }}
        >
          <TextQuote className="h-4 w-4 text-muted-foreground" />
          {completionLabels.insertBelow}
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />

      <CommandGroup>
        <CommandItem onSelect={onDiscard} value="thrash" className="gap-2 px-4">
          <TrashIcon className="h-4 w-4 text-muted-foreground" />
          {completionLabels.discard}
        </CommandItem>
      </CommandGroup>
    </>
  );
};
export default AICompletionCommands;
