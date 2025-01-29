// apps/web/components/tailwind/selectors/node-selector.tsx
import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  type LucideIcon,
  TextIcon,
  TextQuote,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import { useEffect, useState, useMemo } from "react";
import { getLabels, type CommandLabels } from "@/lib/labels";

import { Button } from "@/components/tailwind/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/tailwind/ui/popover";
import { Popover } from "@radix-ui/react-popover";

export type SelectorItem = {
  nameKey: keyof CommandLabels["nodeSelector"];
  name: string;
  icon: LucideIcon;
  command: (editor: ReturnType<typeof useEditor>["editor"]) => void;
  isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean;
};

const createItems = (labels: CommandLabels["nodeSelector"]): (SelectorItem & { name: string })[] => [
  {
    nameKey: "text",
    name: labels.text.name,
    icon: TextIcon,
    command: (editor) => editor.chain().focus().clearNodes().run(),
    isActive: (editor) =>
      editor.isActive("paragraph") && !editor.isActive("bulletList") && !editor.isActive("orderedList"),
  },
  {
    nameKey: "heading1",
    name: labels.heading1.name,
    icon: Heading1,
    command: (editor) => editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    nameKey: "heading2",
    name: labels.heading2.name,
    icon: Heading2,
    command: (editor) => editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    nameKey: "heading3",
    name: labels.heading3.name,
    icon: Heading3,
    command: (editor) => editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    nameKey: "todoList",
    name: labels.todoList.name,
    icon: CheckSquare,
    command: (editor) => editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskItem"),
  },
  {
    nameKey: "bulletList",
    name: labels.bulletList.name,
    icon: ListOrdered,
    command: (editor) => editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    nameKey: "numberedList",
    name: labels.numberedList.name,
    icon: ListOrdered,
    command: (editor) => editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    nameKey: "quote",
    name: labels.quote.name,
    icon: TextQuote,
    command: (editor) => editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    nameKey: "code",
    name: labels.code.name,
    icon: Code,
    command: (editor) => editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
  const { editor } = useEditor();
  const [labels, setLabels] = useState(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));

  useEffect(() => {
    setLabels(getLabels(process.env.NEXT_PUBLIC_AI_LANGUAGE));
  }, [process.env.NEXT_PUBLIC_AI_LANGUAGE]);

  const items = useMemo(() => createItems(labels.nodeSelector), [labels]);

  if (!editor) return null;

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: labels.nodeSelector.multiple,
  };

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className="gap-2 rounded-none border-none hover:bg-accent focus:ring-0">
        <Button size="sm" variant="ghost" className="gap-2">
          <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} align="start" className="w-48 p-1">
        {items.map((item) => (
          <EditorBubbleItem
            key={item.nameKey}
            onSelect={(editor) => {
              item.command(editor);
              onOpenChange(false);
            }}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-sm border p-1">
                <item.icon className="h-3 w-3" />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && <Check className="h-4 w-4" />}
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  );
};