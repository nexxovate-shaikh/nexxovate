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
        content: `Forecast monthly revenue from these leads:
        ${JSON.stringify(leads)}`,
      },
    ],
  });

  return NextResponse.json({
    forecast: res.choices[0].message.content,
  });
}
