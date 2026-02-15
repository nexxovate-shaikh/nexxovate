import { NextResponse } from "next/server";
import Stripe from "stripe";

// prevent build-time execution
export const dynamic = "force-dynamic";

const stripeSecret = process.env.STRIPE_SECRET;

// safe init
const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: "2023-10-16" as any, // ← force compatible version
    })
  : null;

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const { email, amount } = await req.json();

    if (!email || !amount) {
      return NextResponse.json(
        { error: "Missing email or amount" },
        { status: 400 }
      );
    }

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: email,
    });

    return NextResponse.json({
      clientSecret: payment.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err);

    return NextResponse.json(
      { error: "Stripe failed" },
      { status: 500 }
    );
  }
}
