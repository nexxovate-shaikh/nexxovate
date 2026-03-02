import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const password = body.password;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD not set" },
        { status: 500 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

   const token = signToken({
  email: "admin@nexxovate.com",
  role: "admin",
  tokenVersion: 0,
});

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {

    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }
}