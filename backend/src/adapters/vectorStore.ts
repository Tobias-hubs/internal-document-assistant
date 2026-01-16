import { Chunk } from "../models/types";

export interface VectorStoreAdapter {
  upsert(docId: string, chunks: Chunk[]): Promise<void>;
  similaritySearch(embedding: number[], topK: number): Promise<Chunk[]>;


}
