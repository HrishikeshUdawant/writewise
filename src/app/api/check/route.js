import { grammarCheck } from "../../../utils/openai";

export async function POST(req) {
  const { text } = await req.json();
  if (!text) return Response.json({ error: "Text required" }, { status: 400 });

  try {
    const result = await grammarCheck(text);
    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Grammar check failed" }, { status: 500 });
  }
}
