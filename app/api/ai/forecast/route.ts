import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { leads } = await req.json();

    const prompt = `
Forecast monthly revenue based on these leads:
${JSON.stringify(leads)}

Return estimated revenue and reasoning.
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
      forecast: data.response,
    });

  } catch (err) {
    return NextResponse.json({ error: "Forecast failed" }, { status: 500 });
  }
}