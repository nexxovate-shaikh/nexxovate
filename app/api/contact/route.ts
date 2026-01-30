export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }
console.log("ENV CHECK:", process.env.EMAIL_USER, process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
  from: `"Nexxovate Website" <nexxovate@gmail.com>`,
  to: "nexxovate@gmail.com",
  replyTo: email, // so you can reply to the user directly
  subject: "New Lead from Nexxovate Website",
  html: `
    <h2>New Contact Lead</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || "N/A"}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}
