import { Request, Response } from "express";
import { DocumentIngestService } from "../services/documentIngestService";

export class IngestController { 
    constructor(private ingestService: DocumentIngestService) {}

    ingest = async (req: Request, res: Response) => { 
        try { 
            const file = req.file; 

            if (!file) { 
                return res.status(400).json({ error: "No PDF uploaded" }); 
            }

            const docId = req.body.docId || "uploaded-document"; 

            await this.ingestService.ingestBuffer(file.buffer, docId); 

            res.json({ 
                status: "ok",
                docId, 
                chunksIngested: true
            });
        } catch (err) { 
            console.error(err); 
            res.status(500).json({ error: "PDF ingest failed"}); 
        }
    };
}