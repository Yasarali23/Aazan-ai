import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing environment variable: OPENAI_API_KEY');
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface StreamCompletionOptions {
  model: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  maxTokens?: number;
  onChunk: (text: string) => void;
}

export async function generateOpenAIStream(options: StreamCompletionOptions): Promise<void> {
  try {
    const stream = await openaiClient.chat.completions.create({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        options.onChunk(content);
      }
    }
  } catch (error) {
    console.error('[OPENAI_SERVICE_ERROR]:', error);
    throw new Error('Failed to compute completion stream via OpenAI.');
  }
}
