import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing environment variable: GEMINI_API_KEY');
}

// Initializing the unified Google Gen AI SDK client
export const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

interface GeminiStreamOptions {
  model: string; // e.g., 'gemini-2.5-flash' or 'gemini-2.5-pro'
  messages: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }>;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
  onChunk: (text: string) => void;
}

export async function generateGeminiStream(options: GeminiStreamOptions): Promise<void> {
  try {
    const responseStream = await geminiClient.models.generateContentStream({
      model: options.model,
      contents: options.messages,
      config: {
        systemInstruction: options.systemInstruction,
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 2048,
      },
    });

    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        options.onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error('[GEMINI_SERVICE_ERROR]:', error);
    throw new Error('Failed to compute completion stream via Gemini.');
  }
}
