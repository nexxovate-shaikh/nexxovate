import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  const valid = verifyOTP(email, code);

  return NextResponse.json({ valid });
}
