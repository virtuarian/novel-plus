
interface PromptMessages {
    continue: {
        system: string;
        user: (prompt: string) => string;
    };
    improve: {
        system: string;
        user: (prompt: string) => string;
    };
    shorter: {
        system: string;
        user: (prompt: string) => string;
    };
    longer: {
        system: string;
        user: (prompt: string) => string;
    };
    fix: {
        system: string;
        user: (prompt: string) => string;
    };
    zap: {
        system: string;
        user: (prompt: string, command: string) => string;
    };
}

const englishPrompts: PromptMessages = {
    continue: {
        system: "You are an AI writing assistant that continues existing text based on context from prior text. " +
            "Give more weight/priority to the later characters than the beginning ones. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => prompt,
    },
    improve: {
        system: "You are an AI writing assistant that improves existing text. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    shorter: {
        system: "You are an AI writing assistant that shortens existing text. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    longer: {
        system: "You are an AI writing assistant that lengthens existing text. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    fix: {
        system: "You are an AI writing assistant that fixes grammar and spelling errors in existing text. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    zap: {
        system: "You are an AI writing assistant that generates text based on a prompt. " +
            "You take an input from the user and a command for manipulating the text. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt, command) => `For this text: ${prompt}. You have to respect the command: ${command}`,
    },
};

const japanesePrompts: PromptMessages = {
    continue: {
        system: "あなたは既存のテキストの文脈に基づいて文章を続けるAIライティングアシスタントです。" +
            "文章の後半により重点を置いて生成してください。" +
            "返答は200文字以内に制限し、完全な文章となるようにしてください。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt) => prompt,
    },
    improve: {
        system: "あなたは既存のテキストを改善するAIライティングアシスタントです。" +
            "返答は200文字以内に制限し、完全な文章となるようにしてください。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    shorter: {
        system: "あなたは既存のテキストを短縮するAIライティングアシスタントです。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    longer: {
        system: "あなたは既存のテキストを長くするAIライティングアシスタントです。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    fix: {
        system: "あなたは既存のテキストの文法やスペルの誤りを修正するAIライティングアシスタントです。" +
            "返答は200文字以内に制限し、完全な文章となるようにしてください。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    zap: {
        system: "あなたはプロンプトに基づいてテキストを生成するAIライティングアシスタントです。" +
            "ユーザーからの入力とテキスト操作のコマンドを受け取ります。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt, command) => `テキスト: ${prompt}。コマンド: ${command}`,
    },
};

// プロンプトを選択する関数
export const getPrompts = (language: string = 'en'): PromptMessages => {
    return language.toLowerCase() === 'ja' ? japanesePrompts : englishPrompts;
};
