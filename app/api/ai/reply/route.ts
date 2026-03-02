import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { lead } = await req.json();

    const prompt = `
You are Nexxovate's elite sales closer.

Name: ${lead.Name}
Interest: ${lead.Interest}
Business: ${lead["Business Type"]}

Write a premium reply email.
`;

    const reply = await generateAI(prompt);

    return NextResponse.json({ reply });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}