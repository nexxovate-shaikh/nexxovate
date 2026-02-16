import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { password } = await req.json();

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  console.log("Typed:", JSON.stringify(password));
  console.log("Env  :", JSON.stringify(ADMIN_PASSWORD));

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password not configured" },
      { status: 500 }
    );
  }

  if (password.trim() !== ADMIN_PASSWORD.trim()) {
    return NextResponse.json(
      { error: "Wrong password" },
      { status: 401 }
    );
  }

  const token = signToken({
    email: "admin@nexxovate.com",
    role: "admin",
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
