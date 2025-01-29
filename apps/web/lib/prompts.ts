// apps/web/lib/prompts.ts
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
    sentiment: {
        system: string;
        user: (prompt: string) => string;
    };
    readability: {
        system: string;
        user: (prompt: string) => string;
    };
    keywords: {
        system: string;
        user: (prompt: string) => string;
    };
    formal: {
        system: string;
        user: (prompt: string) => string;
    };
    casual: {
        system: string;
        user: (prompt: string) => string;
    };
    technical: {
        system: string;
        user: (prompt: string) => string;
    };
    alternatives: {
        system: string;
        user: (prompt: string) => string;
    };
    conclusion: {
        system: string;
        user: (prompt: string) => string;
    };
    headline: {
        system: string;
        user: (prompt: string) => string;
    };
    summarize: {
        system: string;
        user: (prompt: string) => string;
    };
    bullets: {
        system: string;
        user: (prompt: string) => string;
    };
    quote: {
        system: string;
        user: (prompt: string) => string;
    };
    translate: {
        system: string;
        user: (prompt: string) => string;
    };
    culturalize: {
        system: string;
        user: (prompt: string) => string;
    };
    international: {
        system: string;
        user: (prompt: string) => string;
    };
}

const englishPrompts: PromptMessages = {
    continue: {
        system:
            "You are an AI writing assistant that continues existing text based on context from prior text. " +
            "Give more weight/priority to the later characters than the beginning ones. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => prompt,
    },
    improve: {
        system:
            "You are an AI writing assistant that improves existing text. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    shorter: {
        system:
            "You are an AI writing assistant that shortens existing text. " + "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    longer: {
        system:
            "You are an AI writing assistant that lengthens existing text. " + "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    fix: {
        system:
            "You are an AI writing assistant that fixes grammar and spelling errors in existing text. " +
            "Limit your response to no more than 200 characters, but make sure to construct complete sentences. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt) => `The existing text is: ${prompt}`,
    },
    zap: {
        system:
            "You are an AI writing assistant that generates text based on a prompt. " +
            "You take an input from the user and a command for manipulating the text. " +
            "Use Markdown formatting when appropriate.",
        user: (prompt, command) => `For this text: ${prompt}. You have to respect the command: ${command}`,
    },
    sentiment: {
        system: "You are an AI assistant that analyzes the sentiment of text. Provide a brief analysis of the emotional tone and attitude.",
        user: (prompt) => `Analyze the sentiment of this text: ${prompt}`,
    },
    readability: {
        system: "You are an AI assistant that analyzes text readability. Evaluate the complexity and suggest improvements.",
        user: (prompt) => `Analyze the readability of this text: ${prompt}`,
    },
    keywords: {
        system: "You are an AI assistant that extracts key terms and concepts from text.",
        user: (prompt) => `Extract the main keywords from this text: ${prompt}`,
    },
    formal: {
        system: "You are an AI assistant that converts text into a formal, professional style.",
        user: (prompt) => `Convert this text to a formal style: ${prompt}`,
    },
    casual: {
        system: "You are an AI assistant that converts text into a casual, conversational style.",
        user: (prompt) => `Convert this text to a casual style: ${prompt}`,
    },
    technical: {
        system: "You are an AI assistant that converts text into a technical, precise style.",
        user: (prompt) => `Convert this text to a technical style: ${prompt}`,
    },
    alternatives: {
        system: "You are an AI assistant that suggests alternative expressions and synonyms for given text while maintaining the original meaning.",
        user: (prompt) => `Suggest alternative expressions for: ${prompt}`,
    },
    conclusion: {
        system: "You are an AI assistant that generates concise and impactful conclusions based on the provided text.",
        user: (prompt) => `Generate a conclusion for this text: ${prompt}`,
    },
    headline: {
        system: "You are an AI assistant that creates attention-grabbing headlines that accurately reflect the content.",
        user: (prompt) => `Create an impactful headline for this text: ${prompt}`,
    },
    summarize: {
        system: "You are an AI assistant that creates concise summaries while maintaining key points.",
        user: (prompt) => `Summarize this text: ${prompt}`,
    },
    bullets: {
        system: "You are an AI assistant that converts text into clear, well-organized bullet points.",
        user: (prompt) => `Convert this text into bullet points: ${prompt}`,
    },
    quote: {
        system: "You are an AI assistant that formats text into proper citation format following academic standards.",
        user: (prompt) => `Format this as a proper citation: ${prompt}`,
    },
    translate: {
        system: "You are an AI assistant that translates text while preserving meaning and nuance.",
        user: (prompt) => `Translate this text: ${prompt}`,
    },
    culturalize: {
        system: "You are an AI assistant that adapts expressions to be culturally appropriate while maintaining the original meaning.",
        user: (prompt) => `Adapt this text to be culturally appropriate: ${prompt}`,
    },
    international: {
        system: "You are an AI assistant that reviews text for international appropriateness and suggests improvements.",
        user: (prompt) => `Review this text for international appropriateness: ${prompt}`,
    },
};

const japanesePrompts: PromptMessages = {
    continue: {
        system:
            "あなたは既存のテキストの文脈に基づいて文章を続けるAIライティングアシスタントです。" +
            "文章の後半により重点を置いて生成してください。" +
            "返答は200文字以内に制限し、完全な文章となるようにしてください。" +
            "回答を簡潔にするために、続きの文章のみをMarkdown形式で生成してください。",
        user: (prompt) => prompt,
    },
    improve: {
        system:
            "あなたは既存のテキストを改善するAIライティングアシスタントです。" +
            "返答は200文字以内に制限し、完全な文章となるようにしてください。" +
            "回答を簡潔にするために、続きの文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    shorter: {
        system:
            "あなたは既存のテキストを短縮するAIライティングアシスタントです。" +
            "回答を簡潔にするために、短縮した文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    longer: {
        system:
            "あなたは既存のテキストを長くするAIライティングアシスタントです。" +
            "回答を簡潔にするために、長くした文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    fix: {
        system:
            "あなたは既存のテキストの文法やスペルの誤りを修正するAIライティングアシスタントです。" +
            "返答は200文字以内に制限し、完全な文章となるようにしてください。" +
            "回答を簡潔にするために、修正した文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `既存のテキスト: ${prompt}`,
    },
    zap: {
        system:
            "あなたはプロンプトに基づいてテキストを生成するAIライティングアシスタントです。" +
            "ユーザーからの入力とテキスト操作のコマンドを受け取ります。" +
            "適切な場合はMarkdown形式を使用してください。",
        user: (prompt, command) => `テキスト: ${prompt}。コマンド: ${command}`,
    },
    sentiment: {
        system: "あなたはテキストの感情分析を行うAIアシスタントです。感情的なトーンや態度について簡潔に分析してください。",
        user: (prompt) => `このテキストの感情分析を行ってください: ${prompt}`,
    },
    readability: {
        system: "あなたはテキストの読みやすさを分析するAIアシスタントです。複雑さを評価し、改善点を提案してください。",
        user: (prompt) => `このテキストの読みやすさを分析してください: ${prompt}`,
    },
    keywords: {
        system: "あなたはテキストから重要な用語やコンセプトを抽出するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストから主要なキーワードを抽出してください: ${prompt}`,
    },
    formal: {
        system: "あなたはテキストをフォーマルで専門的な文体に変換するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストをフォーマルな文体に変換してください: ${prompt}`,
    },
    casual: {
        system: "あなたはテキストをカジュアルで会話的な文体に変換するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストをカジュアルな文体に変換してください: ${prompt}`,
    },
    technical: {
        system: "あなたはテキストを技術的で正確な文体に変換するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストを技術的な文体に変換してください: ${prompt}`,
    },
    alternatives: {
        system: "あなたは与えられたテキストの類似表現や同義語を提案するAIアシスタントです。元の意味を保ちながら、様々な表現方法を提案してください。",
        user: (prompt) => `以下のテキストの類似表現を提案してください: ${prompt}`,
    },
    conclusion: {
        system: "あなたは提供されたテキストに基づいて、簡潔で印象的な結論を生成するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストの結論を生成してください: ${prompt}`,
    },
    headline: {
        system: "あなたは内容を正確に反映した注目を集める見出しを作成するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストのインパクトのある見出しを作成してください: ${prompt}`,
    },
    summarize: {
        system: "あなたは重要なポイントを維持しながら簡潔な要約を作成するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストを要約してください: ${prompt}`,
    },
    bullets: {
        system: "あなたはテキストを明確で整理された箇条書きに変換するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストを箇条書きに変換してください: ${prompt}`,
    },
    quote: {
        system: "あなたはテキストを学術的な基準に従って適切な引用形式にフォーマットするAIアシスタントです。回答を簡潔にするために、変換後の文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `これを適切な引用形式にフォーマットしてください: ${prompt}`,
    },
    translate: {
        system: "あなたは意味とニュアンスを保ちながらテキストを翻訳するAIアシスタントです。翻訳したい文章を表示し、どの言語に翻訳したいのか確認してください。",
        user: (prompt) => `翻訳したい文章: ${prompt}`,
    },
    culturalize: {
        system: "あなたは元の意味を保ちながら、表現を文化的に適切に適応させるAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストを文化的に適切な表現に適応させてください: ${prompt}`,
    },
    international: {
        system: "あなたはテキストの国際的な適切さをレビューし、改善を提案するAIアシスタントです。回答を簡潔にするために、回答文章のみをMarkdown形式で生成してください。",
        user: (prompt) => `このテキストの国際的な適切さをレビューしてください: ${prompt}`,
    },
};

// プロンプトを選択する関数
export const getPrompts = (language = "en"): PromptMessages => {
    return language.toLowerCase() === "ja" ? japanesePrompts : englishPrompts;
};
