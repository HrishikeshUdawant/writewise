import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function grammarCheck(text) {
  const systemPrompt = `You are a grammar correction assistant. Return JSON: {"correctedText": "...", "suggestions": [...]}`;
  const userPrompt = `Analyze and correct grammar for this text:\n"${text}"`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error("Parse error:", err);
    return { correctedText: text, suggestions: [] };
  }
}
