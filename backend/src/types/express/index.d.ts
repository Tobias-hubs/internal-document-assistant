import type { Express } from "express";

declare global {
     namespace Express { 
        interface Request {
             file?: Express.Multer.File;
            files?: Express.Multer.File[] | {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}

export {};