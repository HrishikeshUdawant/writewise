export async function grammarFixGroq(text, mode = "grammar") {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    console.error("❌ GROQ KEY MISSING");
    return { correctedText: text, suggestions: [] };
  }

  // Map modes -> instructions
  const modePrompts = {
    grammar: "Fix grammar, spelling, punctuation, and clarity. Return ONLY the corrected text.",
    formal: "Rewrite the text in a formal, professional tone. Fix grammar and punctuation. Return ONLY corrected text.",
    casual: "Rewrite the text in a casual, friendly tone. Fix grammar and punctuation. Return ONLY corrected text.",
    professional: "Rewrite the text in a concise, business-professional tone. Fix grammar. Return ONLY corrected text.",
    creative: "Rewrite the text creatively, preserving meaning but improving flow and style. Return ONLY corrected text.",
    shorten: "Shorten the text while keeping the meaning. Produce a concise version. Return ONLY corrected text.",
    expand: "Expand the text with more detail while keeping the original meaning. Return ONLY corrected text.",
    academic: "Rewrite in academic style: formal, clear, and precise. Fix grammar. Return ONLY corrected text.",
    seo: "Rewrite the text to be SEO-friendly: clearer, include keywords and concise phrasing. Return ONLY corrected text."
  };

  const instruction = modePrompts[mode] || modePrompts["grammar"];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: instruction },
          { role: "user", content: text }
        ],
        max_tokens: 500
      })
    });

    const raw = await response.text();
    console.log("🔵 GROQ RAW RESPONSE:", raw);

    // If error from API, parse and return fallback
    if (!raw || raw.length === 0) {
      return { correctedText: text, suggestions: [] };
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      // Not JSON — assume plain text response (model returned raw text)
      return { correctedText: raw.trim(), suggestions: [] };
    }

    // If valid OpenAI-like response object
    const content = parsed?.choices?.[0]?.message?.content;
    if (content) {
      return { correctedText: content.trim(), suggestions: [] };
    }

    // fallback
    return { correctedText: text, suggestions: [] };

  } catch (err) {
    console.error("❌ GROQ ERROR:", err);
    return { correctedText: text, suggestions: [] };
  }
}
