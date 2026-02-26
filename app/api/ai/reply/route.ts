import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();

    const prompt = `
You are a sales expert for Nexxovate.
Write a professional reply email.

Name: ${lead.Name}
Interest: ${lead.Interest}
Business: ${lead["Business Type"]}

Friendly, premium, confident.
Offer consultation and next steps.
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      reply: data.response,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}