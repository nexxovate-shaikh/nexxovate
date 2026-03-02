import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lead, history } = await req.json();

    const prompt = `
You are Nexxovate's elite AI sales strategist.

Lead:
${JSON.stringify(lead)}

Conversation history:
${JSON.stringify(history)}

Write the best next message to close the deal.
`;

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      reply: data.response,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Brain failed" }, { status: 500 });
  }
}