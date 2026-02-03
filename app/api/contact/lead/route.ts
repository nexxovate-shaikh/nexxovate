import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbygM38Rztf-R_CyivX9XtARIWoOLHoZQl1QAhzreAu52tzwyuXzqMUMpWBqnSTAUsA/exec";

/* ---------------- POST → Save Lead ---------------- */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1️⃣ Send to Google Sheet
    await fetch(GOOGLE_SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // 2️⃣ Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nexxovate Concierge" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "📩 New Lead – Nexxovate Website",
      html: `
        <h3>New Lead Captured</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Interest:</b> ${data.interest}</p>
        <p><b>Business Type:</b> ${data.businessType}</p>
        <p><b>Page:</b> ${data.page}</p>
        <p><b>Time:</b> ${data.timestamp}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead API Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/* ---------------- GET → Read Leads ---------------- */
export async function GET() {
  try {
    const res = await fetch(process.env.CRM_READ_URL!, {
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
