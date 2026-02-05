// The Engine 
// import OpenAI from "openai"; 
import { LLMClient } from "./llmClient";

type OllamaEmbedResponse = { 
    // return list of vectors
    embeddings: number[][];
};

type OllamaGenerateresponse = { 

    response: string; 

};
    

export class localLLMClient implements LLMClient { 
    private readonly baseUrl: string;
    private readonly embedModel: string; 
    private readonly chatModel: string; 

    constructor(
        options?: { 

        baseUrl: string; 
        embedModel?: string; 
        chatModel?: string;
    } 

    ) { 
        this.baseUrl = options?.baseUrl ?? process.env.OLLAMA_URL ?? "http://localhost:11434";
        this.embedModel = options?.embedModel ?? "nomic-embed-text"; 
        this.chatModel = options?.chatModel ?? "llama3";
}
    /*this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY!, 
    }); */

async embed(text: string): Promise<number[]> { 
    const res = await fetch("http://localhost:11434/api/embed", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
        model: this.embedModel, 
        input: text
    }),
});

if (!res.ok) { 
    const errTxt = await safeText(res); 
    throw new Error(`Ollama embed error ${res.status}: ${errTxt}`); 
}

const json = (await res.json()) as OllamaEmbedResponse; 
const vector = json.embeddings?.[0];
if (!Array.isArray(vector)) { 
    throw new Error("Ollama embed: error embedding answer");
}
return vector; 
}

/*    const embedding = result.data?.[0]?.embedding; 
    if (!embedding) { 
        throw new Error("Fail to generate embedding")
    }
    return embedding; 
} */

async generate(prompt: string): Promise<string> { 
    const res = await fetch(`${this.baseUrl}/api/generate`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        //   stream: false
      body: JSON.stringify({model: this.chatModel, prompt, stream: false }),
}); 


    if (!res.ok) { 
        const errTxt = await safeText(res); 
        throw new Error(`Ollama generate error ${res.status}: ${errTxt}`); 
    }
    
    const json = (await res.json()) as OllamaGenerateresponse;
    const text = json.response ?? ""; 
    return text;
    }

}

// Helper to read text when error occurs 
async function safeText(res: Response): Promise<string> { 
    try { 
        return await res.text();
    } catch { 
        return ""; 
    }
}


// TODO: Fallback to AzureOpenAI ?