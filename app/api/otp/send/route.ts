import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateOTP } from "@/lib/otpStore";

export async function POST(req: Request) {
  const { email } = await req.json();

  const otp = generateOTP(email);

  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  await transporter.sendMail({
    from: `"Nexxovate Security" <nexxovatesecurity@nexxovate.com>`,

    to: email,
    subject: "Your Nexxovate Verification Code",
    html: `
      <h2>Verification Code</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 5 minutes.</p>
    `,
  });

  return NextResponse.json({ success: true });
}
