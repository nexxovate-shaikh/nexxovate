import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export const runtime = "nodejs";

export async function GET() {
  try {
    await createUser(
      "admin@nexxovate.com",
      "Admin123",
      "admin"
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}