import { NextResponse } from "next/server";
import { findUser } from "@/lib/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
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
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured: JWT missing" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
