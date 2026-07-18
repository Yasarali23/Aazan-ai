import OpenAI from 'openai';

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('Missing environment variable: DEEPSEEK_API_KEY');
}

// DeepSeek maintains an OpenAI-compatible endpoint interface architecture
export const deepseekClient = new OpenAI({
  baseURL: 'https://deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

interface DeepSeekStreamOptions {
  model: string; // e.g., 'deepseek-chat' or 'deepseek-reasoner'
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  maxTokens?: number;
  onChunk: (text: string) => void;
}

export async function generateDeepSeekStream(options: DeepSeekStreamOptions): Promise<void> {
  try {
    const stream = await deepseekClient.chat.completions.create({
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
    console.error('[DEEPSEEK_SERVICE_ERROR]:', error);
    throw new Error('Failed to compute completion stream via DeepSeek.');
  }
}
