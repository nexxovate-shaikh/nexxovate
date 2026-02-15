import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: Request) {
  const { email, name } = await req.json();

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Nexxovate Growth Plan",
    html: `<h2>Hi ${name}</h2>
    <p>We prepared ideas for your business.
    Let's talk strategy.</p>`,
  });

  return NextResponse.json({ ok: true });
}
