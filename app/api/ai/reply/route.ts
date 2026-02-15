import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { lead } = await req.json();

  const prompt = `
You are a sales expert.
Write a professional reply email to this lead:

Name: ${lead.Name}
Interest: ${lead.Interest}
Business: ${lead["Business Type"]}

Make it friendly, premium, confident.
Offer consultation and next steps.
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    reply: res.choices[0].message.content,
  });
}
