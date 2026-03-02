import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export const runtime = "nodejs"; // ⭐ REQUIRED FOR GROQ

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();

    const prompt = `
Client name: ${lead.Name}
Interest: ${lead.Interest}
Business type: ${lead["Business Type"]}

Write a professional sales email reply from Nexxovate.
`;

    const reply = await generateAI(prompt);

    return NextResponse.json({
      reply: reply || "AI failed to generate reply."
    });

  } catch (err) {
    console.error("AI ROUTE ERROR:", err);
    return NextResponse.json(
      { reply: "Server error generating AI reply." },
      { status: 500 }
    );
  }
}