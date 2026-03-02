// lib/ai.ts

const LOCAL_URL = "http://localhost:11434/api/generate";

// later you will replace this with your deployed server URL
const REMOTE_URL =
  process.env.AI_SERVER_URL || LOCAL_URL;

const MODEL = "gemma3:4b";

export async function generateAI(prompt: string): Promise<string> {
  try {
    const res = await fetch(REMOTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
      }),
    });

    if (!res.ok) {
      throw new Error("AI server error");
    }

    const data = await res.json();

    return data.response || "No response.";
  } catch (err) {
    console.error("AI error:", err);
    return "AI server offline.";
  }
}