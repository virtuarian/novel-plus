// apps/web/lib/llm.ts

interface LLMRequestParams {
  model: string;
  message: any;
  apiKey: string | undefined;
  endpoint: string | undefined;
  temperature?: number | undefined;
}

// 統一されたストリーミングレスポンス用のヘルパー関数
export const createStreamResponse = (stream: ReadableStream) => {
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
};

// OpenAIのストリーミング処理
export const callOpenAIStream = async ({ apiKey, model, message, temperature }: LLMRequestParams) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      temperature,
      stream: true,
    }),
  });

  if (!response.ok) throw new Error('OpenAI request failed');

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim());

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.choices?.[0]?.delta?.content) {
                  const text = data.choices[0].delta.content;
                  const sseMessage = `data: ${JSON.stringify({ text })}\n\n`;
                  controller.enqueue(new TextEncoder().encode(sseMessage));
                }
              } catch (e) {
                console.error('Error parsing OpenAI SSE:', e);
              }
            }
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
        reader?.releaseLock();
      }
    }
  });
};

// Geminiのストリーミング処理
export const callGeminiStream = async ({ apiKey, model, message }: LLMRequestParams) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }],
      generationConfig: {
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) throw new Error('Gemini request failed');

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const data = JSON.parse(chunk);

          if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            const text = data.candidates[0].content.parts[0].text;
            const sseMessage = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(new TextEncoder().encode(sseMessage));
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
        reader?.releaseLock();
      }
    }
  });
};

// llm.ts内のDeepSeek実装の修正版

export const callDeepSeek = async ({ apiKey, model, message, endpoint }: LLMRequestParams) => {
  const response = await fetch(`${endpoint}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: message,
      stream: true,
    }),
  });

  if (!response.ok) throw new Error('DeepSeek request failed');

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      try {
        let accumulatedChunks = '';

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          // チャンクをデコード
          const chunk = decoder.decode(value, { stream: true });
          accumulatedChunks += chunk;

          // データ行を抽出して処理
          const lines = accumulatedChunks.split('\n');
          accumulatedChunks = lines.pop() || ''; // 最後の不完全な行を保持

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;

            if (trimmedLine.startsWith('data: ')) {
              try {
                const jsonStr = trimmedLine.slice(6);
                const json = JSON.parse(jsonStr);

                // 終了条件の確認
                if (json.choices?.[0]?.finish_reason === 'stop') {
                  continue;
                }

                // コンテンツの抽出と送信
                const content = json.choices?.[0]?.delta?.content || '';
                if (content) {
                  const message = { text: content };
                  const encoded = new TextEncoder().encode(`data: ${JSON.stringify(message)}\n\n`);
                  controller.enqueue(encoded);
                }
              } catch (e) {
                console.error('Error processing chunk:', e);
                continue;
              }
            }
          }
        }
      } catch (error) {
        console.error('Stream reading error:', error);
        controller.error(error);
      } finally {
        controller.close();
        reader?.releaseLock();
      }
    }
  });
};
