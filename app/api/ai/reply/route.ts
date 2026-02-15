import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Fake AI reply for now
  const reply = `AI processed: ${message}`;

  return NextResponse.json({ reply });
}
