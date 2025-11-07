"use client";
import { useState } from "react";
import Editor from "../components/Editor";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [corrected, setCorrected] = useState("");

  const handleCheck = async (text) => {
    setLoading(true);
    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setCorrected(data.correctedText);
    setSuggestions(data.suggestions);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">WriteWise AI</h1>
      <p className="text-gray-600">Your smart grammar correction assistant</p>

      <Editor onSubmit={handleCheck} />
      {loading && <Loader />}
      {corrected && (
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">Corrected Text:</h2>
          <p className="text-gray-700 mt-2">{corrected}</p>
        </div>
      )}
    </div>
  );
}
