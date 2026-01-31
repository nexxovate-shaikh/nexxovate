import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ---------------- CONFIG ---------------- */

// 🔹 Your email (use Gmail / Zoho / Outlook)
const ADMIN_EMAIL = "yourbusiness@email.com";

// 🔹 Google Sheet Webhook (we’ll create this next)
const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

/* ---------------- API HANDLER ---------------- */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    /* ===============================
       1️⃣ SEND TO GOOGLE SHEET
    =============================== */
    await fetch(GOOGLE_SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    /* ===============================
       2️⃣ SEND EMAIL NOTIFICATION
    =============================== */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nexxovate Concierge" <${process.env.MAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: "📩 New Lead from Nexxovate Website",
      html: `
        <h2>New Business Lead</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Interest:</b> ${data.interest}</p>
        <p><b>Business Type:</b> ${data.businessType}</p>
        <p><b>Page:</b> ${data.page}</p>
        <p><b>Source:</b> ${data.source}</p>
        <p><b>Time:</b> ${data.timestamp}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API Error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
