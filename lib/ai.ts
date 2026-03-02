const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function generateAI(prompt: string) {
  try {
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
            content:
              "You are Nexxovate's elite enterprise sales closer. Write premium professional replies.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await res.json();

    console.log("GROQ RESPONSE:", data);

    if (!data || !data.choices || data.choices.length === 0) {
      return "AI returned empty response.";
    }

    return data.choices[0].message.content;

  } catch (err) {
    console.error("AI ERROR:", err);
    return "AI server error.";
  }
}