import { SITE_URL } from "@/lib/site-url";

/* robots.txt, served from a plain route handler rather than the
   metadata convention (see the note in app/sitemap.ts on why that
   convention breaks under a path containing an apostrophe).

   The Sitemap line used to read https://nexxovate.in/sitemap.xml —
   the wrong domain — which is why the audit found no sitemap URLs
   belonging to nexxovate.com. It now comes from SITE_URL.

   /admin, /api, /client and /platform are application surfaces, not
   pages anyone should land on from a search result. */
export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /api/",
    "Disallow: /client",
    "Disallow: /platform",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
