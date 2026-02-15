import { NextResponse } from "next/server";
import { createUser, findUser } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const exists = await findUser(email);

    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await createUser(email, password, role || "staff");

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
