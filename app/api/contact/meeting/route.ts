import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Meeting slots requested from the concierge.
 *
 * The chatbot has always posted here after OTP verification; the route
 * was missing, so those requests were being dropped. It mirrors the
 * lead route's behaviour: notify the team, never block the visitor.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data?.email || !data?.meetingSlot) {
      return NextResponse.json(
        { success: false, error: "Missing email or slot" },
        { status: 400 }
      );
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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
        replyTo: data.email,
        subject: `Consultation requested — ${data.meetingSlot}`,
        html: `
          <h3>Consultation request</h3>
          <p><b>Slot:</b> ${data.meetingSlot}</p>
          <p><b>Name:</b> ${data.name ?? "—"}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Interest:</b> ${data.interest ?? "—"}</p>
          <p><b>Organization stage:</b> ${data.businessType ?? "—"}</p>
          <p><b>Challenge:</b> ${data.challenge ?? "—"}</p>
          <p><b>Page:</b> ${data.page ?? "—"}</p>
        `,
      });
    } else {
      console.warn("MEETING REQUEST (email not configured):", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Meeting API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
