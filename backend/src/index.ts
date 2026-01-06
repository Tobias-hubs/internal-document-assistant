import express from "express";
import { SearchController } from "./controllers/searchControllers";
import { RagService } from "./services/ragService";
import { MockVectorStore } from "./adapters/mockVectorStore";
import { MockLLMClient } from "./adapters/mockLLMClient";
import { MockLogger } from "./utils/logger";

const app = express();
app.use(express.json());

const vectorStore = new MockVectorStore();
const llmClient = new MockLLMClient();
const logger = new MockLogger();

const ragService = new RagService(vectorStore, llmClient, logger);

const searchController = new SearchController(ragService);

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Internal Document Assistant API is running");
});

app.post("/search", async (req: express.Request, res: express.Response) => {
    try {
        const { query, userId } = req.body;

        if (!query || !userId) {
            return res.status(400).json({ error: "query och userId krävs" });
        }

        const result = await searchController.search(query, userId);
        res.json(result);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internt serverfel" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});
