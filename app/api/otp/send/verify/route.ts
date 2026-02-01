import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const valid = verifyOTP(email, code);

  return NextResponse.json({ valid });
}
