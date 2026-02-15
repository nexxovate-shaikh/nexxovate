import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lead } = await req.json();

  let score = 0;

  if (lead.interest === "AI & Automation") score += 40;
  if (lead.businessType === "Enterprise") score += 40;
  if (lead.challenge?.length > 50) score += 20;

  return NextResponse.json({ score });
}
