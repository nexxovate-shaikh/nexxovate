import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { lead } = await req.json();

  const reply = await generateAI(`
You are Nexxovate's AI sales agent.

Lead:
${JSON.stringify(lead)}

Write best follow-up message.
`);

  return NextResponse.json({ reply });
}