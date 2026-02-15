import { NextResponse } from "next/server";
import { findUser } from "@/lib/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Prevent browser 405 panic */
export async function GET() {
  return NextResponse.json({
    status: "Admin login API ready",
    method: "Use POST",
  });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = await findUser(email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid login" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return NextResponse.json(
        { error: "Invalid login" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing in environment");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 }
    );
  }
}
