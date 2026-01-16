"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<any[]>([]); // Temporary any
  const [docId, setDocId] = useState<string | null>("sample"); // Hardcoded for dev
  const [username, setUsername] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await fetch(`${API_URL}/api/search`, {
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
      setPdfUrl(`${API_URL}/documents/sample.pdf`); ///
    } catch (error) {
      console.error("Error fetching from backend:", error);
      setAnswer("Something went wrong with backend response.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6 grid grid-cols-2 gap-6">
      {/* Left column */}
      <div className="bg-zinc-800 p-6 rounded shadow">
        <h1 className="mb-4 text-xl font-semibold">
          Internal Document Assistant
        </h1>

        <p className="text-sm text-zinc-400 mb-4">Inloggad som: {username}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            askBackend();
          }}
        >
          <input
            className="mb-4 w-full rounded bg-zinc-700 border border-zinc-600 p-2"
            type="text"
            placeholder="Skriv din fråga här"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="mb-6 rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
          >
            Skicka
          </button>
        </form>

        {answer && (
          <div className="mb-4">
            <h2 className="font-semibold">Svar:</h2>
            <p className="whitespace-pre-wrap">{answer}</p>
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

      {/* Right column*/}
      <div className="bg-zinc-800 rounded shadow overflow-hidden">
        {pdfUrl ? (
          <iframe src={`${pdfUrl}#toolbar=0`} // Temporary solution 
           className="w-full h-full" />
        ) : (
          <div className="p-6 text-zinc-400">Ingen PDF vald</div>
        )}
      </div>
    </div>
  );
}
