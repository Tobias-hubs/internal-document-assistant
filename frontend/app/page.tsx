"use client";

import { useState } from "react"; 

// import Image from "next/image";

export default function Home() {
const [query, setQuery] = useState(""); 
const [answer, setAnswer] = useState(""); 

const askBackend = async () => { 
  try { 
    const response = await fetch("http://localhost:3001/search", { 
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        query: query, 
        userId: "test-user" 
      }),
    });

    const data = await response.json(); 
    setAnswer(data.answer);
  } catch (error) { 
    console.error("Error fetching from backend:", error); 
    setAnswer("Something went wrong with backend response.");
  }
  }; 


  return (
   <div className="flex flex-col items-center gap-6">
  <input
    type="text"
    placeholder="Skriv din fråga här"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button onClick={askBackend}>Skicka</button>
  <div>
    <h2>Svar:</h2>
    <p>{answer}</p>
  </div>
</div>

  );
}
