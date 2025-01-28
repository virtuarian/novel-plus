// apps/web/app/api/generate/route.ts
import { match } from "ts-pattern";
import {
  callDeepSeek,
  callGeminiStream,
  callOpenAIStream,
  callAzureOpenAIStream,
} from "@/lib/llm";
import { getPrompts } from "@/lib/prompts";

export const runtime = "edge";

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
            model: process.env.OPENAI_MODEL || "gpt-4",
            endpoint: undefined,
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