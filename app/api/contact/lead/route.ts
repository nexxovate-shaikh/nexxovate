import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbygM38Rztf-R_CyivX9XtARIWoOLHoZQl1QAhzreAu52tzwyuXzqMUMpWBqnSTAUsA/exec";

/* ══════════════════════════════════════════════════════════════
   Two changes to this route, both because the new closing-band
   enquiry form now posts here and it takes free text from the
   open internet.

   1. HTML ESCAPING. Every field was interpolated raw into the
      notification email's HTML. A lead who types
      `<img src=x onerror=...>` into their name — or, more likely,
      an automated form-spammer — had their markup rendered inside
      your inbox. escapeHtml() below closes that.

   2. A LENGTH AND SHAPE CHECK. The route accepted any JSON at all
      and forwarded it. It now requires a name, a plausible email
      and a message, and caps each field, so a single request
      cannot post a megabyte into your sheet.

   Neither change alters the response shape, so nothing that
   already calls this keeps working differently.

   ⚠️ NOT FIXED HERE, AND YOU SHOULD LOOK AT IT: the GET handler
   below returns your entire CRM to anyone who requests it. There
   is no authentication on it. I have left it exactly as it was
   rather than adding a check, because your admin dashboard
   presumably calls it and I could not verify how it authenticates
   without breaking it blind. Ask me and I will fix it properly.
   ══════════════════════════════════════════════════════════════ */

const MAX = { name: 120, email: 200, interest: 2000, businessType: 160, page: 200 };

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clip(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

/* ---------------- POST → Save Lead ---------------- */
export async function POST(req: Request) {
  try {
    const raw = await req.json();

    const data = {
      name: clip(raw?.name, MAX.name),
      email: clip(raw?.email, MAX.email),
      interest: clip(raw?.interest, MAX.interest),
      businessType: clip(raw?.businessType, MAX.businessType),
      page: clip(raw?.page, MAX.page),
      timestamp: clip(raw?.timestamp, 40) || new Date().toISOString(),
    };

    if (
      !data.name ||
      !data.interest ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)
    ) {
      return NextResponse.json(
        { success: false, error: "Name, a valid email and a message are required." },
        { status: 400 }
      );
    }

    // 1️⃣ Save to Google Sheet
    await fetch(GOOGLE_SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // 2️⃣ Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nexxovate Concierge" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      // So you can reply straight from the notification.
      replyTo: data.email,
      subject: "📩 New Lead – Nexxovate Website",
      html: `
        <h3>New Lead Captured</h3>
        <p><b>Name:</b> ${escapeHtml(data.name)}</p>
        <p><b>Email:</b> ${escapeHtml(data.email)}</p>
        <p><b>Interest:</b> ${escapeHtml(data.interest)}</p>
        <p><b>Business Type:</b> ${escapeHtml(data.businessType)}</p>
        <p><b>Page:</b> ${escapeHtml(data.page)}</p>
        <p><b>Time:</b> ${escapeHtml(data.timestamp)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead API Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/* ---------------- GET → Read Leads ----------------
   ⚠️ Unauthenticated. See the note at the top of this file. */
export async function GET() {
  try {
    const res = await fetch(process.env.CRM_READ_URL!, {
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
