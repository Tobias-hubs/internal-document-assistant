export type SourceRef = { documentName: string; page: number; offset: number };
export type Chunk = { id: string; docId: string; text: string; embedding: number[]; sourceRef: SourceRef };
export type Answer = { text: string; sources: SourceRef[] };
export type AnswerDTO = { answer: string; sources: SourceRef[] };
