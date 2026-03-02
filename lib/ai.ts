const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function generateAI(prompt: string) {
  try {
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
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("GROQ DATA:", JSON.stringify(data));

    return data?.choices?.[0]?.message?.content;

  } catch (e) {
    console.error("GROQ ERROR:", e);
    return null;
  }
}