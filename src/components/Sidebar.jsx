"use client";

export default function Sidebar({ mode, setMode }) {
  const modes = [
    { id: "grammar", label: "Grammar (Default)" },
    { id: "formal", label: "Make Formal" },
    { id: "casual", label: "Make Casual" },
    { id: "professional", label: "Professional" },
    { id: "creative", label: "Creative" },
    { id: "shorten", label: "Shorten" },
    { id: "expand", label: "Expand" },
    { id: "academic", label: "Academic" },
    { id: "seo", label: "SEO Optimize" }
  ];

  return (
    <aside className="w-64 bg-white border-r p-4 h-screen sticky top-0">
      <h3 className="font-semibold text-lg mb-3">Rewrite Modes</h3>
      <div className="space-y-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition ${
              mode === m.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-600">
        <p className="font-medium">Tip</p>
        <p>Choose a mode and then click <span className="font-semibold">Check Grammar</span>.</p>
      </div>
    </aside>
  );
}
