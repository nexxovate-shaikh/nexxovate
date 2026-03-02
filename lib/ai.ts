const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function generateAI(prompt: string) {
  try {
    if (!GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return null;
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are Nexxovate's enterprise AI sales assistant. Write professional replies.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      }
    );

    const data = await response.json();

    console.log("GROQ RESPONSE:", JSON.stringify(data));

    return data?.choices?.[0]?.message?.content || null;

  } catch (error) {
    console.error("AI ERROR:", error);
    return null;
  }
}