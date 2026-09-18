import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    // verifyOTP is async — without the await this resolved to a Promise,
    // which serialised to {} and read as truthy on the client, so every
    // code was accepted.
    const valid = await verifyOTP(email, String(code).trim());

    return NextResponse.json({ valid });
  } catch (error) {
    console.error("OTP VERIFY ERROR:", error);
    return NextResponse.json({ valid: false, error: "verification_unavailable" });
  }
}
