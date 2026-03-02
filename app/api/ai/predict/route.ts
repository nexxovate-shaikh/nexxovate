import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { lead } = await req.json();

  const score = await generateAI(
    `Score this lead 1–100 with reason:
${JSON.stringify(lead)}`
  );

  return NextResponse.json({ score });
}