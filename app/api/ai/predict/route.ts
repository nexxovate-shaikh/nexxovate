import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { lead } = await req.json();

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Score this lead 1-100 based on purchase intent:
        ${JSON.stringify(lead)}`,
      },
    ],
  });

  return NextResponse.json({
    score: res.choices[0].message.content,
  });
}
