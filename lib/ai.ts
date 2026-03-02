const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";

export async function generateAI(prompt: string) {
  try {
    const res = await fetch(GROQ_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ CORRECT GROQ MODEL
        messages: [
          {
            role: "system",
            content: "You are Nexxovate's elite AI sales closer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await res.json();

    console.log("GROQ RESPONSE:", data);

    return (
      data?.choices?.[0]?.message?.content ||
      "Groq returned empty content."
    );
  } catch (err) {
    console.error("GROQ ERROR:", err);
    return "AI server error.";
  }
}