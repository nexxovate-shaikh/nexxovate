const OLLAMA_URL =
  process.env.AI_SERVER_URL ||
  "http://127.0.0.1:11434/api/generate";

export async function generateAI(prompt: string) {

  try {

    const res = await fetch(
      OLLAMA_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt: prompt,
          stream: false,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Ollama request failed");
    }

    const data = await res.json();

    return data.response || "No reply generated.";

  } catch (err) {

    console.error(err);

    return "AI server not connected.";

  }

}