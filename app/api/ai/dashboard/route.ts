import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { leads } = await req.json();

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Analyze this CRM data and summarize business insights:
        ${JSON.stringify(leads)}`,
      },
    ],
  });

  return NextResponse.json({
    insights: res.choices[0].message.content,
  });
}
