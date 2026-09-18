import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";
import { isJwtSecretConfigured } from "@/lib/jwt-secret";

/**
 * Admin route guard.
 *
 * This previously read the admin_token cookie and tested it for truthiness
 * only — no signature check — so any value at all got past it. It now verifies
 * the token cryptographically using jose, which works on the Edge runtime.
 *
 * Revocation (tokenVersion) is checked in the Node route handlers, not here;
 * see lib/auth-edge.ts for why.
 */

const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/dashboard/forgot",
  "/admin/dashboard/reset",
];

function redirectToLogin(req: NextRequest) {
  const url = new URL("/admin/login", req.url);

  // Preserve where they were headed so login can send them back.
  url.searchParams.set("next", req.nextUrl.pathname);

  const res = NextResponse.redirect(url);

  // Clear the bad cookie so a malformed token does not cause a redirect loop.
  res.cookies.delete("admin_token");

  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!isJwtSecretConfigured()) {
    console.error(
      "[middleware] JWT_SECRET is not configured — refusing all admin access."
    );
    return redirectToLogin(req);
  }

  const token = req.cookies.get("admin_token")?.value;

  if (!token) return redirectToLogin(req);

  const payload = await verifyTokenEdge(token);

  if (!payload) return redirectToLogin(req);

  if (payload.role !== "admin") return redirectToLogin(req);

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
