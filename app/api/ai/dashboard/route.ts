import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { leads } = await req.json();

    const prompt = `
Analyze this CRM dashboard data and summarize key business insights:
${JSON.stringify(leads)}
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
      insights: data.response,
    });

  } catch {
    return NextResponse.json({ error: "Dashboard failed" }, { status: 500 });
  }
}