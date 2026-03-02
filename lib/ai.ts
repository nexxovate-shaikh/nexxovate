const OLLAMA_URL =
  process.env.AI_SERVER_URL ||
  "http://localhost:11434/api/generate";

export async function generateAI(prompt: string) {
  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();

    return data.response;
  } catch {
    return "AI server not connected.";
  }
}