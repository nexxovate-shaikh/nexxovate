import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 important

export async function POST(req: Request) {
  const { password } = await req.json();

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password not configured" },
      { status: 500 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Wrong password" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
