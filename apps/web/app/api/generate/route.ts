// apps/web/app/api/generate/route.ts
import {
  callAzureOpenAIStream,
  callDeepSeek,
  callGeminiStream,
  callOpenAIStream,
} from "@/lib/llm";
import { getPrompts } from "@/lib/prompts";
// apps/web/app/api/generate/route.ts
import { match } from "ts-pattern";

// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt, option, command } = await req.json();
    const prompts = getPrompts(process.env.AI_LANGUAGE);

    const messages = match(option)
      .with("continue", () => [
        {
          role: "system",
          content: prompts.continue.system,
        },
        {
          role: "user",
          content: prompts.continue.user(prompt),
        },
      ])
      .with("improve", () => [
        {
          role: "system",
          content: prompts.improve.system,
        },
        {
          role: "user",
          content: prompts.improve.user(prompt),
        },
      ])
      .with("shorter", () => [
        {
          role: "system",
          content: prompts.shorter.system,
        },
        {
          role: "user",
          content: prompts.shorter.user(prompt),
        },
      ])
      .with("longer", () => [
        {
          role: "system",
          content: prompts.longer.system,
        },
        {
          role: "user",
          content: prompts.longer.user(prompt),
        },
      ])
      .with("fix", () => [
        {
          role: "system",
          content: prompts.fix.system,
        },
        {
          role: "user",
          content: prompts.fix.user(prompt),
        },
      ])
      .with("zap", () => [
        {
          role: "system",
          content: prompts.zap.system,
        },
        {
          role: "user",
          content: prompts.zap.user(prompt, command || ''),
        },
      ])
      // 文章分析オプション
      .with("sentiment", () => [
        {
          role: "system",
          content: prompts.sentiment.system,
        },
        {
          role: "user",
          content: prompts.sentiment.user(prompt),
        },
      ])
      .with("readability", () => [
        {
          role: "system",
          content: prompts.readability.system,
        },
        {
          role: "user",
          content: prompts.readability.user(prompt),
        },
      ])
      .with("keywords", () => [
        {
          role: "system",
          content: prompts.keywords.system,
        },
        {
          role: "user",
          content: prompts.keywords.user(prompt),
        },
      ])

      // スタイル変更オプション
      .with("formal", () => [
        {
          role: "system",
          content: prompts.formal.system,
        },
        {
          role: "user",
          content: prompts.formal.user(prompt),
        },
      ])
      .with("casual", () => [
        {
          role: "system",
          content: prompts.casual.system,
        },
        {
          role: "user",
          content: prompts.casual.user(prompt),
        },
      ])
      .with("technical", () => [
        {
          role: "system",
          content: prompts.technical.system,
        },
        {
          role: "user",
          content: prompts.technical.user(prompt),
        },
      ])
      // 創作支援オプション
      .with("alternatives", () => [
        {
          role: "system",
          content: prompts.alternatives.system,
        },
        {
          role: "user",
          content: prompts.alternatives.user(prompt),
        },
      ])
      .with("conclusion", () => [
        {
          role: "system",
          content: prompts.conclusion.system,
        },
        {
          role: "user",
          content: prompts.conclusion.user(prompt),
        },
      ])
      .with("headline", () => [
        {
          role: "system",
          content: prompts.headline.system,
        },
        {
          role: "user",
          content: prompts.headline.user(prompt),
        },
      ])

      // 実用ツールオプション
      .with("summarize", () => [
        {
          role: "system",
          content: prompts.summarize.system,
        },
        {
          role: "user",
          content: prompts.summarize.user(prompt),
        },
      ])
      .with("bullets", () => [
        {
          role: "system",
          content: prompts.bullets.system,
        },
        {
          role: "user",
          content: prompts.bullets.user(prompt),
        },
      ])
      .with("quote", () => [
        {
          role: "system",
          content: prompts.quote.system,
        },
        {
          role: "user",
          content: prompts.quote.user(prompt),
        },
      ])

      // 言語ツールオプション
      .with("translate", () => [
        {
          role: "system",
          content: prompts.translate.system,
        },
        {
          role: "user",
          content: prompts.translate.user(prompt),
        },
      ])
      .with("culturalize", () => [
        {
          role: "system",
          content: prompts.culturalize.system,
        },
        {
          role: "user",
          content: prompts.culturalize.user(prompt),
        },
      ])
      .with("international", () => [
        {
          role: "system",
          content: prompts.international.system,
        },
        {
          role: "user",
          content: prompts.international.user(prompt),
        },
      ])
      .run();

    // 共通のパラメータ設定
    const commonParams = {
      temperature: 0.7,
      maxTokens: 1000,
      message: messages[messages.length - 1].content,
    };

    // プロバイダー別の処理
    try {
      switch (process.env.API_PROVIDER?.toLowerCase()) {
        case "openai":
          return await callOpenAIStream({
            ...commonParams,
            apiKey: process.env.OPENAI_API_KEY,
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            endpoint: process.env.OPENAI_ENDPOINT,
          });

        case "azure":
          return await callAzureOpenAIStream({
            ...commonParams,
            apiKey: process.env.AZURE_OPENAI_API_KEY,
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            model: process.env.AZURE_OPENAI_DEPLOYMENT,
          });

        case "gemini":
          return await callGeminiStream({
            ...commonParams,
            apiKey: process.env.GEMINI_API_KEY,
            model: process.env.GEMINI_MODEL || "gemini-pro",
            endpoint: undefined,
          });

        case "deepseek":
          return await callDeepSeek({
            ...commonParams,
            apiKey: process.env.DEEPSEEK_API_KEY,
            model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
            message: messages, // DeepSeekは完全なメッセージ配列を必要とする
            endpoint: process.env.DEEPSEEK_ENDPOINT,
          });

        default:
          throw new Error(`Unsupported AI provider: ${process.env.API_PROVIDER}`);
      }
    } catch (error) {

      return new Response(
        JSON.stringify({
          error: error.message,
          provider: error.provider,
          status: error.status
        }), {
        status: error.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
      );
    }

  } catch (error) {
    console.error('Generate API error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
    );
  }
}