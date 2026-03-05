import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export const runtime = "nodejs"; // Required for Groq

export async function POST(req: Request) {
  try {

    const body = await req.json();

    if (!body || !body.lead) {
      return NextResponse.json(
        { reply: "Invalid request. Lead data missing." },
        { status: 400 }
      );
    }

    const lead = body.lead;

    const name = lead.Name || "there";
    const interest = lead.Interest || "our services";
    const business = lead["Business Type"] || "your company";

    const prompt = `
You are a professional sales representative from Nexxovate.

Write a friendly but professional email reply to a potential client.

Client name: ${name}
Interest: ${interest}
Business type: ${business}

Include:
- greeting
- appreciation for their interest
- brief explanation of Nexxovate services
- invitation for call/demo
- professional closing

Keep it concise and professional.
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