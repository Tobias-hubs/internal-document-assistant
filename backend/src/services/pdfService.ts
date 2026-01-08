import type { Buffer } from "buffer";

const pdfParse = require("pdf-parse");


export class PdfService {
  async extractText(buffer: Buffer): Promise<string> {
    const result = await pdfParse(buffer);
    return result.text;
  }
} 

