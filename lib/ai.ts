const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function generateAI(prompt: string) {
  try {
    if (!GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return null;
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
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
              content:
                "You are a professional enterprise sales representative from Nexxovate.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await res.json();

    console.log("GROQ RESPONSE:", data);

    return data?.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error("GROQ ERROR:", err);
    return null;
  }
}