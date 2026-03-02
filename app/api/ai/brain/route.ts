import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { lead, history } = await req.json();

  const prompt = `
You are Nexxovate's AI strategist.

Lead:
${JSON.stringify(lead)}

History:
${JSON.stringify(history)}

Write next closing message.
`;

  const reply = await generateAI(prompt);

  return NextResponse.json({ reply });
}