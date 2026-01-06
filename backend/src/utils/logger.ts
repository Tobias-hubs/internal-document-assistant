export class MockLogger {
  logSearch(userId: string, query: string, sources: any[], latencyMs: number): void {
    console.log(`[MOCK LOG] User: ${userId} | Query: "${query}" | Sources: ${sources.length} | Latency: ${latencyMs}ms`);
  }
}
