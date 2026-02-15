import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
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

    const token = signToken({
      email: "admin@nexxovate.com",
      role: "admin",
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
