import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pass } = await req.json();

    const correct = process.env.ADMIN_PASSWORD;

    console.log("ENV password:", correct);
    console.log("User entered:", pass);

    if (pass === correct) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
