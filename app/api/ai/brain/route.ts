import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { lead, history } = await req.json();

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are Nexxovate's elite AI sales strategist. Close deals intelligently.",
      },
      {
        role: "user",
        content: `
Lead:
${JSON.stringify(lead)}

Conversation history:
${JSON.stringify(history)}

Write the best next message to move toward closing.
        `,
      },
    ],
  });

  return NextResponse.json({
    reply: res.choices[0].message.content,
  });
}
