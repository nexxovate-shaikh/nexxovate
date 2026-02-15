import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2026-01-28.clover",

});

export async function POST(req: Request) {
  const { email, amount } = await req.json();

  const invoice = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    receipt_email: email,
  });

  return NextResponse.json({ clientSecret: invoice.client_secret });
}
