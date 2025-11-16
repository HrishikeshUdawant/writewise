import { grammarFixGroq } from "../../../utils/groqGrammar";

export async function POST(req) {
  try {
    const { text, mode } = await req.json();
    console.log("BACKEND RECEIVED:", { text, mode });

    // ensure text exists
    if (!text || text.trim().length === 0) {
      return new Response(JSON.stringify({ correctedText: "", suggestions: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const result = await grammarFixGroq(text, mode);
    console.log("BACKEND RESULT:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return new Response(JSON.stringify({ error: "Server crashed", details: error.message }), { status: 500 });
  }
}
