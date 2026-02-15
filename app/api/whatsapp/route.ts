import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_TOKEN!
);

export async function POST(req: Request) {
  const { phone, name } = await req.json();

  await client.messages.create({
    body: `Hi ${name}, this is Nexxovate 👋
We reviewed your request.
Would you like to schedule a strategy call?`,
    from: "whatsapp:+14155238886",
    to: `whatsapp:${phone}`,
  });

  return NextResponse.json({ ok: true });
}
