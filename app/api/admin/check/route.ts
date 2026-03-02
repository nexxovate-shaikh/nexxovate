import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET(req: Request) {

  const cookie = req.headers.get("cookie") || "";

  if (!cookie.includes("admin_token")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}