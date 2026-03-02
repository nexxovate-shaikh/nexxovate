const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function generateAI(prompt: string) {
  try {
    if (!GROQ_API_KEY) {
      return "GROQ_API_KEY not set.";
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are Nexxovate's elite enterprise sales closer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    return data.choices?.[0]?.message?.content || "No response.";

  } catch (err) {
    console.error(err);
    return "AI server not connected.";
  }
}