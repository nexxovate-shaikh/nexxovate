import { NextResponse } from "next/server";
import { createUser, findUser } from "@/lib/users";

/* Prevent browser 405 panic */
export async function GET() {
  return NextResponse.json({
    status: "Admin register API ready",
    method: "Use POST",
  });
}

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
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
      message: "User created",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json(
      { error: "Server error during register" },
      { status: 500 }
    );
  }
}
