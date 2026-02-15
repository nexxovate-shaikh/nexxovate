import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { score } = await req.json();

  let action = "wait";

  if (score > 70) action = "call immediately";
  else if (score > 40) action = "send proposal";
  else action = "email nurture";

  return NextResponse.json({ action });
}
