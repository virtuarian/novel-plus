// apps/web/lib/labels.ts
import { RefreshCcwDot, CheckCheck, ArrowDownWideNarrow, WrapText, StepForward, BookOpen, Briefcase, Code2, Coffee, Scale, Tags, Check, FileText, Globe, Heading, Languages, List, Quote, Sparkles, Target } from "lucide-react";

interface SubMenuItem {
    value: string;
    label: string;
    icon: any;
    description?: string;  // サブメニューの説明を追加
}

interface MenuGroup {
    heading: string;
    icon: any;            // グループ全体のアイコン
    color: string;        // グループのテーマカラー
    items: SubMenuItem[];
}

interface NodeItem {
    name: string;
    multiple: string; // 'Multiple'の翻訳用
}
interface NodeSelectorLabels {
    text: NodeItem;
    heading1: NodeItem;
    heading2: NodeItem;
    heading3: NodeItem;
    todoList: NodeItem;
    bulletList: NodeItem;
    numberedList: NodeItem;
    quote: NodeItem;
    code: NodeItem;
    multiple: string;
}
interface CommandLabels {
    slashCommand: SlashCommandLabels;
    nodeSelector: NodeSelectorLabels;
    editHeading: string;
    moreHeading: string;
    // menuGroups: MenuGroup[];
    options: {
        value: string;
        label: string;
        icon: any;
    }[];
    analysisHeading: string; // 追加
    styleHeading: string;    // 追加
    analysisOptions: {       // 追加
        value: string;
        label: string;
        icon: any;
    }[];
    styleOptions: {         // 追加
        value: string;
        label: string;
        icon: any;
    }[];
    continueLabel: string;
    completion: {
        replaceSelection: string;
        insertBelow: string;
        discard: string;
    };
    creativeHeading: string;
    practicalHeading: string;
    languageHeading: string;
    creativeOptions: {
        value: string;
        label: string;
        icon: any;
    }[];
    practicalOptions: {
        value: string;
        label: string;
        icon: any;
    }[];
    languageOptions: {
        value: string;
        label: string;
        icon: any;
    }[];
}
interface SlashCommandItem {
    title: string;
    description: string;
    searchTerms?: string[];
    alertMessages?: {
        prompt?: string;
        error?: string;
    };
}
interface SlashCommandLabels {
    ai: SlashCommandItem;
    feedback: SlashCommandItem;
    text: SlashCommandItem;
    todo: SlashCommandItem;
    heading1: SlashCommandItem;
    heading2: SlashCommandItem;
    heading3: SlashCommandItem;
    bulletList: SlashCommandItem;
    numberedList: SlashCommandItem;
    quote: SlashCommandItem;
    code: SlashCommandItem;
    image: SlashCommandItem;
    youtube: SlashCommandItem;
    twitter: SlashCommandItem;
}

export const englishLabels: CommandLabels = {
    editHeading: "Edit or review selection",
    moreHeading: "Use AI to do more",
    options: [
        {
            value: "improve",
            label: "Improve writing",
            icon: RefreshCcwDot,
        },
        {
            value: "fix",
            label: "Fix grammar",
            icon: CheckCheck,
        },
        {
            value: "shorter",
            label: "Make shorter",
            icon: ArrowDownWideNarrow,
        },
        {
            value: "longer",
            label: "Make longer",
            icon: WrapText,
        },
    ],
    analysisHeading: "Analyze Text",
    styleHeading: "Change Style",
    analysisOptions: [
        {
            value: "sentiment",
            label: "Analyze sentiment",
            icon: Scale,
        },
        {
            value: "readability",
            label: "Check readability",
            icon: BookOpen,
        },
        {
            value: "keywords",
            label: "Extract keywords",
            icon: Tags,
        }
    ],
    styleOptions: [
        {
            value: "formal",
            label: "Make formal",
            icon: Briefcase,
        },
        {
            value: "casual",
            label: "Make casual",
            icon: Coffee,
        },
        {
            value: "technical",
            label: "Make technical",
            icon: Code2,
        }
    ],
    creativeHeading: "Creative Writing",
    practicalHeading: "Practical Tools",
    languageHeading: "Language Tools",
    creativeOptions: [
        {
            value: "alternatives",
            label: "Suggest alternatives",
            icon: Sparkles,
        },
        {
            value: "conclusion",
            label: "Generate conclusion",
            icon: Target,
        },
        {
            value: "headline",
            label: "Generate headline",
            icon: Heading,
        }
    ],
    practicalOptions: [
        {
            value: "summarize",
            label: "Summarize text",
            icon: FileText,
        },
        {
            value: "bullets",
            label: "Convert to bullets",
            icon: List,
        },
        {
            value: "quote",
            label: "Format quote",
            icon: Quote,
        }
    ],
    languageOptions: [
        {
            value: "translate",
            label: "Translate text",
            icon: Languages,
        },
        {
            value: "culturalize",
            label: "Culturalize expression",
            icon: Globe,
        },
        {
            value: "international",
            label: "Check international",
            icon: Check,
        }
    ],
    continueLabel: "Continue writing",
    completion: {
        replaceSelection: "Replace selection",
        insertBelow: "Insert below",
        discard: "Discard"
    },
    slashCommand: {
        ai: {
            title: "Ask AI",
            description: "Ask AI to edit or generate content...",
        },
        feedback: {
            title: "Send Feedback",
            description: "Let us know how we can improve.",
        },
        text: {
            title: "Text",
            description: "Just start typing with plain text.",
            searchTerms: ["p", "paragraph"],
        },
        todo: {
            title: "To-do List",
            description: "Track tasks with a to-do list.",
            searchTerms: ["todo", "task", "list", "check", "checkbox"],
        },
        heading1: {
            title: "Heading 1",
            description: "Big section heading.",
            searchTerms: ["title", "big", "large"],
        },
        heading2: {
            title: "Heading 2",
            description: "Medium section heading.",
            searchTerms: ["subtitle", "medium"],
        },
        heading3: {
            title: "Heading 3",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small"],
        },
        bulletList: {
            title: "Bullet List",
            description: "Create a simple bullet list.",
            searchTerms: ["unordered", "point"],
        },
        numberedList: {
            title: "Numbered List",
            description: "Create a list with numbering.",
            searchTerms: ["ordered"],
        },
        quote: {
            title: "Quote",
            description: "Capture a quote.",
            searchTerms: ["blockquote"],
        },
        code: {
            title: "Code",
            description: "Capture a code snippet.",
            searchTerms: ["codeblock"],
        },
        image: {
            title: "Image",
            description: "Upload an image from your computer.",
            searchTerms: ["photo", "picture", "media"],
        },
        youtube: {
            title: "Youtube",
            description: "Embed a Youtube video.",
            searchTerms: ["video", "youtube", "embed"],
            alertMessages: {
                prompt: "Please enter Youtube Video Link",
                error: "Please enter a correct Youtube Video Link",
            },
        },
        twitter: {
            title: "X",
            description: "Embed a Tweet.",
            searchTerms: ["X", "embed"],
            alertMessages: {
                prompt: "Please enter X Link",
                error: "Please enter a correct X Link",
            },
        },
    },
    nodeSelector: {
        text: { name: "Text", multiple: "Multiple" },
        heading1: { name: "Heading 1", multiple: "Multiple" },
        heading2: { name: "Heading 2", multiple: "Multiple" },
        heading3: { name: "Heading 3", multiple: "Multiple" },
        todoList: { name: "To-do List", multiple: "Multiple" },
        bulletList: { name: "Bullet List", multiple: "Multiple" },
        numberedList: { name: "Numbered List", multiple: "Multiple" },
        quote: { name: "Quote", multiple: "Multiple" },
        code: { name: "Code", multiple: "Multiple" },
        multiple: "Multiple"
    }
};

export const japaneseLabels: CommandLabels = {

    editHeading: "選択部分の編集・校正",
    moreHeading: "AIによる追加機能",
    options: [
        {
            value: "improve",
            label: "文章を改善",
            icon: RefreshCcwDot,
        },
        {
            value: "fix",
            label: "文法を修正",
            icon: CheckCheck,
        },
        {
            value: "shorter",
            label: "文章を短く",
            icon: ArrowDownWideNarrow,
        },
        {
            value: "longer",
            label: "文章を長く",
            icon: WrapText,
        },
    ],

    // menuGroups: [
    //     {
    //         heading: "選択部分の編集・校正",
    //         icon: Edit,
    //         color: "text-purple-500",
    //         items: [
    //     {
    //         value: "improve",
    //         label: "文章を改善",
    //         icon: RefreshCcwDot,
    //     },
    //     {
    //         value: "fix",
    //         label: "文法を修正",
    //         icon: CheckCheck,
    //     },
    //     {
    //         value: "shorter",
    //         label: "文章を短く",
    //         icon: ArrowDownWideNarrow,
    //     },
    //     {
    //         value: "longer",
    //         label: "文章を長く",
    //         icon: WrapText,
    //     },
    // ],

    analysisHeading: "文章分析",
    styleHeading: "スタイル変更",
    analysisOptions: [
        {
            value: "sentiment",
            label: "感情分析",
            icon: Scale,
        },
        {
            value: "readability",
            label: "読みやすさチェック",
            icon: BookOpen,
        },
        {
            value: "keywords",
            label: "キーワード抽出",
            icon: Tags,
        }
    ],
    styleOptions: [
        {
            value: "formal",
            label: "フォーマル文体に変換",
            icon: Briefcase,
        },
        {
            value: "casual",
            label: "カジュアル文体に変換",
            icon: Coffee,
        },
        {
            value: "technical",
            label: "専門的文体に変換",
            icon: Code2,
        }
    ],
    creativeHeading: "創作支援",
    practicalHeading: "実用ツール",
    languageHeading: "言語ツール",
    creativeOptions: [
        {
            value: "alternatives",
            label: "類似表現を提案",
            icon: Sparkles,
        },
        {
            value: "conclusion",
            label: "結論を生成",
            icon: Target,
        },
        {
            value: "headline",
            label: "見出しを生成",
            icon: Heading,
        }
    ],
    practicalOptions: [
        {
            value: "summarize",
            label: "要約を作成",
            icon: FileText,
        },
        {
            value: "bullets",
            label: "箇条書きに変換",
            icon: List,
        },
        {
            value: "quote",
            label: "引用を整形",
            icon: Quote,
        }
    ],
    languageOptions: [
        {
            value: "translate",
            label: "翻訳",
            icon: Languages,
        },
        {
            value: "culturalize",
            label: "文化的表現に変換",
            icon: Globe,
        },
        {
            value: "international",
            label: "国際表現をチェック",
            icon: Check,
        }
    ],
    continueLabel: "文章を続ける",
    completion: {
        replaceSelection: "選択部分を置換",
        insertBelow: "下に挿入",
        discard: "破棄"
    },
    slashCommand: {
        ai: {
            title: "AIに聞く",
            description: "AIに編集や生成を依頼...",
        },
        feedback: {
            title: "フィードバック送信",
            description: "改善のためのご意見をお聞かせください。",
        },
        text: {
            title: "テキスト",
            description: "プレーンテキストで入力を開始します。",
            searchTerms: ["テキスト", "段落"],
        },
        todo: {
            title: "ToDo リスト",
            description: "タスクをリストで管理します。",
            searchTerms: ["todo", "タスク", "リスト", "チェック"],
        },
        heading1: {
            title: "見出し 1",
            description: "大きな見出しを挿入します。",
            searchTerms: ["タイトル", "大見出し"],
        },
        heading2: {
            title: "見出し 2",
            description: "中くらいの見出しを挿入します。",
            searchTerms: ["サブタイトル", "中見出し"],
        },
        heading3: {
            title: "見出し 3",
            description: "小さな見出しを挿入します。",
            searchTerms: ["サブタイトル", "小見出し"],
        },
        bulletList: {
            title: "箇条書き",
            description: "シンプルな箇条書きリストを作成します。",
            searchTerms: ["リスト", "箇条"],
        },
        numberedList: {
            title: "番号付きリスト",
            description: "番号付きのリストを作成します。",
            searchTerms: ["番号", "順序"],
        },
        quote: {
            title: "引用",
            description: "引用文を挿入します。",
            searchTerms: ["引用", "ブロック"],
        },
        code: {
            title: "コード",
            description: "コードスニペットを挿入します。",
            searchTerms: ["コード", "プログラム"],
        },
        image: {
            title: "画像",
            description: "コンピュータから画像をアップロードします。",
            searchTerms: ["写真", "画像", "メディア"],
        },
        youtube: {
            title: "YouTube",
            description: "YouTubeビデオを埋め込みます。",
            searchTerms: ["動画", "youtube", "埋め込み"],
            alertMessages: {
                prompt: "YouTubeのビデオリンクを入力してください",
                error: "正しいYouTubeのビデオリンクを入力してください",
            },
        },
        twitter: {
            title: "X",
            description: "ツイートを埋め込みます。",
            searchTerms: ["X", "埋め込み"],
            alertMessages: {
                prompt: "Xのリンクを入力してください",
                error: "正しいXのリンクを入力してください",
            },
        },
    },
    nodeSelector: {
        text: { name: "テキスト", multiple: "複数選択" },
        heading1: { name: "見出し 1", multiple: "複数選択" },
        heading2: { name: "見出し 2", multiple: "複数選択" },
        heading3: { name: "見出し 3", multiple: "複数選択" },
        todoList: { name: "ToDoリスト", multiple: "複数選択" },
        bulletList: { name: "箇条書き", multiple: "複数選択" },
        numberedList: { name: "番号付きリスト", multiple: "複数選択" },
        quote: { name: "引用", multiple: "複数選択" },
        code: { name: "コード", multiple: "複数選択" },
        multiple: "複数選択"
    }
}

export const getLabels = (language: string = 'en'): CommandLabels => {
    return language.toLowerCase() === 'ja' ? japaneseLabels : englishLabels;
};
export type { CommandLabels, NodeSelectorLabels, NodeItem };

// AICompletionCommandsでの使用例:
/*
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
            // ... existing logic
          }}
        >
          <Check className="h-4 w-4 text-muted-foreground" />
          {completionLabels.replaceSelection}
        </CommandItem>
        // ... other commands
      </CommandGroup>
    </>
  );
};
*/