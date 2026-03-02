import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { leads } = await req.json();

  const insights = await generateAI(
    `Analyze CRM leads and give executive insights:
${JSON.stringify(leads)}`
  );

  return NextResponse.json({ insights });
}