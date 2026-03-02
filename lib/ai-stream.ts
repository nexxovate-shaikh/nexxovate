const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "gemma3:4b";

export async function streamAI(prompt: string) {
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: true,
    }),
  });

  if (!res.body) {
    throw new Error("No stream returned");
  }

  return res.body;
}