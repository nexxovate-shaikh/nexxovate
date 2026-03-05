export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ensureAdminExists } from "@/lib/users";

export async function GET() {
  try {
    await ensureAdminExists();

    return NextResponse.json({
      message: "Admin initialized",
    });
  } catch (error) {
    console.error("Admin init error:", error);

    return NextResponse.json(
      { message: "Error initializing admin" },
      { status: 500 }
    );
  }
}