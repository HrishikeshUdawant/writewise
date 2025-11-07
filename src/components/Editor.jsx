"use client";
import { useState } from "react";

export default function Editor({ onSubmit }) {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col space-y-3">
      <textarea
        className="w-full h-40 p-3 border rounded-lg outline-none"
        placeholder="Type or paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => onSubmit(text)}
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
      >
        Check Grammar
      </button>
    </div>
  );
}
