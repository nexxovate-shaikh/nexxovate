import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { validatePassword } from "@/lib/users";

export const runtime = "nodejs";

export async function POST(req: Request) {

  try {

    const { email, password } =
      await req.json();

    const user =
      await validatePassword(
        email,
        password
      );

    if (!user) {

      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    }

    const token =
      signToken({
        email: user.email,
        role: user.role,
        tokenVersion:
          user.tokenVersion || 0,
      });

    const res =
      NextResponse.json({
        success: true,
      });

    res.cookies.set(
      "admin_token",
      token,
      {
        httpOnly: true,
        path: "/",
        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return res;

  }
  catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );

  }

}