export interface LLMClient {
  embed(text: string): Promise<number[]>; // Text in → embedding vector (number[]) out (async)
  generate(prompt: string): Promise<string>;
}
