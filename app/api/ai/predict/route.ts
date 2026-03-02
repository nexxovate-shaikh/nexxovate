import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();

    const prompt = `
Score this lead from 1 to 100 based on purchase intent.

Lead:
${JSON.stringify(lead)}

Return only the number and short reason.
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
      score: data.response,
    });

  } catch {
    return NextResponse.json({ error: "Predict failed" }, { status: 500 });
  }
}