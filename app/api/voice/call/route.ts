import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_TOKEN!
);

export async function POST(req: Request) {
  const { phone } = await req.json();

  await client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: phone,
    from: process.env.TWILIO_PHONE!,
  });

  return NextResponse.json({ ok: true });
}
