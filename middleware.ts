import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("admin_token")?.value;

  const url = req.nextUrl;

  // protect admin routes
  if (url.pathname.startsWith("/admin")) {

    if (!token && !url.pathname.startsWith("/admin/login")) {

      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );

    }

  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/admin/:path*"],
};