import { useState, useCallback, useRef } from 'react';

interface UseCustomCompletionOptions {
    api: string;
    onResponse?: (response: Response) => void | Promise<void>;
    onFinish?: (completion: string) => void | Promise<void>;
    onError?: (error: Error) => void | Promise<void>;
}

interface CompletionRequest {
    prompt: string;
    option?: string;
    command?: string;
}


export function useCustomCompletion({
    api,
    onResponse,
    onFinish,
    onError
}: UseCustomCompletionOptions) {
    const [completion, setCompletion] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const completionRef = useRef<string>('');

    const complete = useCallback(
        async (prompt: string, options?: { body?: Partial<CompletionRequest> }) => {
            setIsLoading(true);
            setCompletion('');
            completionRef.current = '';

            try {
                const response = await fetch(api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt,
                        ...options?.body
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (onResponse) {
                    await onResponse(response);
                }

                const reader = response.body?.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader!.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n').filter(line => line.trim());

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const data = JSON.parse(line.slice(6));
                                if (data.text) {
                                    completionRef.current += data.text;
                                    setCompletion(completionRef.current);
                                }
                            } catch (e) {
                                console.error('Error parsing SSE message:', e);
                            }
                        }
                    }
                }

                if (onFinish) {
                    await onFinish(completionRef.current);
                }

            } catch (error) {
                if (onError) {
                    await onError(error as Error);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [api, onResponse, onFinish, onError]
    );

    return {
        completion,
        isLoading,
        complete
    };
}

// 使用例
/*
const MyComponent = () => {
  const {
    completion,
    isLoading,
    error,
    complete,
    stop
  } = useCustomCompletion({
    api: '/api/generate',
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error('Rate limit exceeded');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {completion && <div>{completion}</div>}
      <button onClick={() => complete('Hello', { 
        body: { 
          option: 'continue',
          command: 'make it longer' 
        } 
      })}>
        Generate
      </button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
*/