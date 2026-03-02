import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { leads } = await req.json();

  const prompt = `
Forecast revenue from leads:
${JSON.stringify(leads)}
`;

  const forecast = await generateAI(prompt);

  return NextResponse.json({ forecast });
}