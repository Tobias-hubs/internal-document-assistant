import { Router } from "express";
import { upload } from "../middleware/upload";
import { IngestController } from "../controllers/ingestController";
import { DocumentIngestService } from "../services/documentIngestService";
import { PdfService } from "../services/pdfService";
import { MockVectorStore } from "../adapters/mockVectorStore";

const router = Router(); 

const ingestService = new DocumentIngestService( 
    new PdfService(), 
    new MockVectorStore()
);

const controller = new IngestController(ingestService); 

router.post(
    "/ingest",
    upload.single("file"),
    controller.ingest
);

export default router; 