const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function generateAI(prompt: string): Promise<string> {
  try {
    if (!GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY");
      return "Missing GROQ API key.";
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
                "You are Nexxovate's elite enterprise sales closer. Write short professional email replies.",
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

    console.log("GROQ RAW:", JSON.stringify(data));

    return (
      data?.choices?.[0]?.message?.content ??
      "Groq returned empty content."
    );

  } catch (error) {
    console.error("GROQ ERROR:", error);
    return "Groq connection failed.";
  }
}