import { NextResponse } from "next/server";
import { saveOTP } from "@/lib/otpStore";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const code = generateOTP();

  saveOTP(email, code);

  console.log("OTP for", email, "is:", code);

  // TODO: send email here (next step)
  return NextResponse.json({ success: true });
}
