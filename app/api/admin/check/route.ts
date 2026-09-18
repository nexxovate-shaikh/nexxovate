import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Session check used by the admin dashboard on mount.
 *
 * This previously did:
 *
 *   if (!cookie.includes("admin_token")) return 401
 *
 * — a substring test on the raw Cookie header. Sending
 * `Cookie: admin_token=anything` passed it, so combined with the
 * presence-only middleware there was no real authentication on /admin at all.
 *
 * It now performs the full check: signature, expiry, revocation via
 * tokenVersion, and role.
 */
export async function GET() {
  const token = (await cookies()).get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;

  try {
    payload = await verifyToken(token);
  } catch (err) {
    // Thrown when JWT_SECRET is unset. Fail closed and say so in the log.
    console.error("[admin/check]", err);
    return NextResponse.json(
      { error: "Auth unavailable" },
      { status: 503 }
    );
  }

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    email: payload.email,
    role: payload.role,
  });
}
