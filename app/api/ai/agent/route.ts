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
        role: "system",
        content: "You are an elite AI sales closer for Nexxovate.",
      },
      {
        role: "user",
        content: `Write a persuasive follow-up message for this lead:
        ${JSON.stringify(lead)}`,
      },
    ],
  });

  return NextResponse.json({
    message: res.choices[0].message.content,
  });
}
