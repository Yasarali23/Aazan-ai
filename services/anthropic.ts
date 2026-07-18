import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('Missing environment variable: ANTHROPIC_API_KEY');
}

export const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface AnthropicStreamOptions {
  model: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  onChunk: (text: string) => void;
}

export async function generateAnthropicStream(options: AnthropicStreamOptions): Promise<void> {
  try {
    const stream = await anthropicClient.messages.create({
      model: options.model,
      max_tokens: options.maxTokens ?? 2048,
      temperature: options.temperature ?? 0.7,
      system: options.systemPrompt,
      messages: options.messages,
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        options.onChunk(event.delta.text);
      }
    }
  } catch (error) {
    console.error('[ANTHROPIC_SERVICE_ERROR]:', error);
    throw new Error('Failed to compute completion stream via Anthropic.');
  }
}
