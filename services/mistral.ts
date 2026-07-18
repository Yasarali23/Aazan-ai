import { Mistral } from '@mistralai/mistralai';

if (!process.env.MISTRAL_API_KEY) {
  throw new Error('Missing environment variable: MISTRAL_API_KEY');
}

export const mistralClient = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

interface MistralStreamOptions {
  model: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  maxTokens?: number;
  onChunk: (text: string) => void;
}

export async function generateMistralStream(options: MistralStreamOptions): Promise<void> {
  try {
    const responseStream = await mistralClient.chat.completeStream({
      model: options.model,
      messages: options.messages as any, // Alignment override matching internal SDK configurations safely
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 2048,
    });

    for await (const chunk of responseStream) {
      const chunkText = chunk.data.choices?.[0]?.delta?.content;
      if (typeof chunkText === 'string') {
        options.onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error('[MISTRAL_SERVICE_ERROR]:', error);
    throw new Error('Failed to compute completion stream via Mistral.');
  }
}
