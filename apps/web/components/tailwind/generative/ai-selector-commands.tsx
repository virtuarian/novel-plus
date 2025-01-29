//apps/web/components/tailwind/generative/ai-selector-commands.tsx

import { getLabels } from "@/lib/labels";
import { StepForward } from "lucide-react";
import { type EditorInstance, getPrevText } from "novel";
import { useEffect, useState } from "react";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
  editor: EditorInstance;
}

const AISelectorCommands = ({ onSelect, editor }: AISelectorCommandsProps) => {
  const [labels, setLabels] = useState(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));
  const hasSelection = !editor.state.selection.empty;

  useEffect(() => {
    setLabels(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));
  }, [process.env.NEXT_PUBLIC_AI_LANGUAGE]);

  // 選択状態に応じてフィルタリングされたオプションを取得
  const filteredOptions = labels.options.filter(option => {
    // 文章が選択されていない場合は、編集系のコマンドを非表示
    if (!hasSelection) {
      return !['improve', 'fix', 'shorter', 'longer'].includes(option.value);
    }
    return true;
  });

  return (
    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
      {/* 選択テキストの編集コマンド - 文章が選択されている場合のみ表示 */}
      {hasSelection && (
        <>
          <CommandGroup heading={labels.editHeading}>
            {filteredOptions.map((option) => (
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

          {/* 文章分析オプション */}
          <CommandGroup heading={labels.analysisHeading}>
            {labels.analysisOptions.map((option) => (
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
                <option.icon className="h-4 w-4 text-blue-500" />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* スタイル変更オプション */}
          <CommandGroup heading={labels.styleHeading}>
            {labels.styleOptions.map((option) => (
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
                <option.icon className="h-4 w-4 text-green-500" />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

          {/* 創作支援オプション */}
          <CommandGroup heading={labels.creativeHeading}>
            {labels.creativeOptions.map((option) => (
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
                <option.icon className="h-4 w-4 text-yellow-500" />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* 実用ツールオプション */}
          <CommandGroup heading={labels.practicalHeading}>
            {labels.practicalOptions.map((option) => (
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
                <option.icon className="h-4 w-4 text-orange-500" />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* 言語ツールオプション */}
          <CommandGroup heading={labels.languageHeading}>
            {labels.languageOptions.map((option) => (
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
                <option.icon className="h-4 w-4 text-indigo-500" />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>

        </>
      )}

      <CommandSeparator />

      {/* 続きの文章 */}
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
    </div>
  );
};

export default AISelectorCommands;
