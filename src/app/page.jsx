"use client";

import { useState } from "react";
import Editor from "../components/Editor";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [corrected, setCorrected] = useState("");
  const [mode, setMode] = useState("grammar");

  const handleCheck = async (text) => {
    setLoading(true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });

      // safer parse
      const textResponse = await res.text();
      console.log("🔵 FRONTEND RAW RESPONSE:", textResponse);

      const data = textResponse ? JSON.parse(textResponse) : { correctedText: text, suggestions: [] };
      setCorrected(data.correctedText || "");
      setSuggestions(data.suggestions || []);
    } catch (e) {
      console.error("❌ FRONTEND JSON PARSE ERROR:", e);
      setCorrected("Error: Could not parse response.");
      setSuggestions([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar mode={mode} setMode={setMode} />
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">WriteWise AI</h1>
        <p className="text-gray-600 mb-6">Your smart grammar & rewrite assistant — mode: <span className="font-semibold">{mode}</span></p>

        <Editor onSubmit={handleCheck} />

        {loading && <Loader />}

        {corrected && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <h2 className="font-semibold">Corrected Text:</h2>
            <p className="text-gray-800 mt-2 whitespace-pre-wrap">{corrected}</p>

            {suggestions.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium">Suggestions</h3>
                <ul className="list-disc pl-5 mt-2">
                  {suggestions.map((s, i) => (
                    <li key={i}><strong>{s.original}</strong> → {s.replacement} — {s.explanation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
