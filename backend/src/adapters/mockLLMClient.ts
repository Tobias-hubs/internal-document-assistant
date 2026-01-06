import { LLMClient } from "./llmClient";

export class MockLLMClient implements LLMClient {
  async embed(text: string): Promise<number[]> {
    const embedding = Array.from({ length: 384 }, () => Math.random() * 2 - 1);
    console.log(`Mock: Skapade embedding för text: "${text.substring(0, 50)}..."`);
    return embedding;
  }

  async generate(prompt: string): Promise<string> {
    const lines = prompt.split('\n');
    const questionLine = lines.find(line => line.startsWith('Question:'));
    const question = questionLine ? questionLine.replace('Question: ', '') : 'okänd fråga';

    const contextLines = lines.filter(line => line.startsWith('- ['));
    const sources = contextLines.length > 0 ? 'baserat på dokumentation' : 'utan specifik kontext';

    const answer = `Detta är ett mock-svar på frågan: "${question}". I ett riktigt system skulle det ges ett detaljerat svar ${sources}. För tillfället returnerars bara denna placeholder-text för att demonstrera flödet.`;

    console.log(`Mock: Genererade svar för prompt med ${lines.length} rader`);
    return answer;
  }
}
