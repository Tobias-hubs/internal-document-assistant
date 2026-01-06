export interface LLMClient {
  embed(text: string): Promise<number[]>;
  generate(prompt: string): Promise<string>;
}
