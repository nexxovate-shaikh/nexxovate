import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page without token
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  /* ---------------- ROLE BASED ACCESS ---------------- */

  // Superadmin-only routes
  if (pathname.startsWith("/admin/super")) {
    if (user.role !== "superadmin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Admin area access (admin + superadmin allowed)
  if (pathname.startsWith("/admin")) {
    if (user.role !== "admin" && user.role !== "superadmin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};