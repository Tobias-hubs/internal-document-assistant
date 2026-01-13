"use client";

import { useState } from "react"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
const [query, setQuery] = useState(""); 
const [answer, setAnswer] = useState(""); 
const [sources, setSources] = useState<any[]>([]); // Temporary any 
const [docId, setDocId] = useState<string | null>("tobias-larsson"); // Hardcoded for dev
 const [username, setUsername] = useState("");

const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

useEffect(() => {
  setUsername(localStorage.getItem("username") || "");
}, []);

const askBackend = async () => { 
  if (!query || !docId) { 
    setAnswer("Välj dokument och skriv en fråga.");
    return;
  }
  try { 
    const response = await fetch("http://localhost:3001/api/search", { 
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        query: query, 
        docId: docId,
      }),
    });

    const data = await response.json(); 
    setAnswer(data.answer);
    setSources(data.sources);
  } catch (error) { 
    console.error("Error fetching from backend:", error); 
    setAnswer("Something went wrong with backend response.");
  }
  }; 


  return (
  /*<div className="flex flex-col items-center gap-6">
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
</div> */
<div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center p-6">
  <div className="w-full max-w-xl rounded-lg bg-zinc-800 p-6 shadow-lg">
    <h1 className="mb-4 text-xl font-semibold">Internal Document Assistant</h1>
<p className="text-sm text-zinc-400 mb-2">
  Inloggad som: {username}
</p>
<form
  onSubmit={(e) => {
    e.preventDefault();
    askBackend();
  }}
>
    <input
      className="mb-4 w-full rounded bg-zinc-700 border border-zinc-600 p-2 text-zinc-100 placeholder-zinc-400"
      type="text"
      placeholder="Skriv din fråga här"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    <button
    type="submit"
      className="mb-6 rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
      onClick={askBackend}
    >
      Skicka
    </button>
</form>
    {answer && (
      <div className="mb-4">
        <h2 className="font-semibold">Svar:</h2>
        <p className="whitespace-pre-wrap text-zinc-200">{answer}</p>
      </div>
    )}

    {sources.length > 0 && (
      <div>
        <h3 className="font-semibold">Källor:</h3>
        <ul className="list-disc pl-5 text-sm text-zinc-400">
          {sources.map((source, index) => (
            <li key={index}>
              {source.documentName} – sida {source.page}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>
  );
}
