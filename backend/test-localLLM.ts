import {localLLMClient } from  "./src/adapters/localLLMClient";

async function main() { 
    const llm = new localLLMClient(); 

    console.log("Testing embedding...");
    const embedding = await llm.embed("hello world"); 
    console.log("Embedding length:", embedding.length); 

    console.log("Testing generate..."); 
    const answer = await llm.generate("Vad är Sveriges huvudstad?");
    console.log("Svar:", answer); 
} 

main(); 