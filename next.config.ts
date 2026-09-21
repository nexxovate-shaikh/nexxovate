import type { NextConfig } from "next";

/* ══════════════════════════════════════════════════════════════
   next.config.ts

   Rewritten against the Nexyra Auditor report of 21 Sep 2026, which
   flagged three things this file owns:

     · Clickjacking protection (X-Frame-Options / frame-ancestors)
     · Content-Security-Policy set
     · Static assets cached ≥ 1 day — 34 of 62 failing

   ── WHY THE CACHING WAS BROKEN ────────────────────────────────
   The previous config set long cache headers on /fonts/* and
   /videos/*. This project has neither folder. Its assets live in
   /images, /video (singular), /logos and /_next/static — so the
   rules matched nothing, and every image on the site was served
   `public, max-age=0, must-revalidate`: re-validated with the
   server on every single page view. The audit's 34-of-62 figure is
   those files.

   ── WHY THIS CSP IS NOT STRICTER ─────────────────────────────
   The App Router emits inline <script> tags to hydrate each page,
   and framer-motion writes inline styles. A policy without
   'unsafe-inline' breaks the site outright unless every request is
   given a nonce through middleware — a bigger change than this pass
   should make on a production site. So this policy locks down
   everything that can be locked down without that:

     · frame-ancestors 'none'    nothing may frame the site (the
                                 clickjacking fix, and the modern
                                 replacement for X-Frame-Options)
     · object-src 'none'         no plugins
     · base-uri 'self'           an injected <base> cannot re-point
                                 every relative URL on the page
     · form-action 'self'        forms can only post back to this
                                 site — an injected form cannot
                                 exfiltrate what someone types
     · connect-src               only this site, plus Vercel's own
                                 analytics endpoints

   Moving to nonces is the next step if you want the stricter
   grade, and the audit will say so.
   ══════════════════════════════════════════════════════════════ */

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob:",
  /* three.js on the pages still running the older WebGL scenes can
     spin up workers from blob: URLs. Without this they fail silently
     and the scene never draws. */
  "worker-src 'self' blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  /* Older browsers ignore frame-ancestors; this covers them. */
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    /* The site uses none of these. The concierge's voice input asks
       for the microphone itself, from this origin only. */
    value: "camera=(), geolocation=(), microphone=(self), payment=(), usb=()",
  },
];

/* A year, immutable. Safe for these folders because a changed file
   ships under a changed name or you re-deploy — nothing here is
   edited in place and expected to update under the same URL. */
const LONG_CACHE = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    /* Next caches optimised images for this long. The default is 60
       seconds, which on Vercel means re-encoding the same AVIF all
       day. */
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      { source: "/images/:path*", headers: LONG_CACHE },
      { source: "/video/:path*", headers: LONG_CACHE },
      { source: "/logos/:path*", headers: LONG_CACHE },
      /* Root-level files, listed one by one. Plain literal paths,
         not a regex: a malformed `source` fails the whole Vercel
         build, and a literal path cannot be malformed. */
      ...[
        "/og.jpg",
        "/favicon.ico",
        "/icon-32.png",
        "/icon-512.png",
        "/apple-touch-icon.png",
        "/logo-lockup.png",
        "/logo-mark.png",
        "/nexyra-avatar.png",
        "/nexyra-lockup.png",
        "/nexyra-mark.png",
      ].map((source) => ({ source, headers: LONG_CACHE })),
    ];
  },
};

export default nextConfig;
