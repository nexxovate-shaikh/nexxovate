import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { validatePassword } from "@/lib/users";

export const runtime = "nodejs";

/**
 * Admin login.
 *
 * Unchanged logic; hardened cookie. The session cookie previously set only
 * httpOnly, path and maxAge — no sameSite (so it rode along on cross-site
 * requests) and no secure (so it could travel over plain HTTP).
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = await validatePassword(email, password);

    // Same response for unknown user and wrong password, so the endpoint
    // cannot be used to enumerate valid admin addresses.
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion || 0,
    });

    const res = NextResponse.json({ success: true, role: user.role });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("[admin/login]", err);

    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
