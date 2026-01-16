// import fs from "fs"; 
// import path from "path";
import { PdfService } from "./pdfService";
import { VectorStoreAdapter } from "../adapters/vectorStore";
import { Chunk } from "../models/types";

export class DocumentIngestService { 
    constructor(
        private pdfService: PdfService, 
        private vectorStore: VectorStoreAdapter
    ){} 

    async ingestBuffer(buffer: Buffer, docId: string): Promise<void> { 
        // const absolutePath = path.resolve(filePath); 
        // const buffer = fs.readFileSync(absolutePath);
        // const text = await this.pdfService.extractText(buffer); 
        const text = await this.pdfService.extractText(buffer);
        
        const paragraphs = text 
        .split("\n\n")
        .map(p => p.trim())
        .filter(Boolean); 

         const chunks: Chunk[] = paragraphs.map((p, index) => ({ 
            id: `${docId}-${index}`, 
            docId: docId,  
            text: p,
            embedding: [],   // empty for mock
            sourceRef: { 
                documentName: docId, 
                page: index + 1,
                offset: 0
            }
    
    }));
    await this.vectorStore.upsert(docId, chunks);
    }
}
   

