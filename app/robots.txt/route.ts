/* ══════════════════════════════════════════════════════════════
   robots.txt, served from a plain route handler.

   This replaces app/robots.tsx (now deleted), which used Next's
   metadata convention. That convention routes the file through
   next-metadata-route-loader, which writes the project's absolute
   path into a single-quoted JS string. This project lives under

     C:\Users\Shaikh's PC\nexxovate

   and the apostrophe in that path closes the string early, so the
   generated module fails to parse:

     Module parse failed: Unexpected token (11:69)

   In dev that is not a quiet failure — the broken module is in the
   compile graph, so every route on the site returned 500, not just
   this one.

   A route handler never touches that loader, so it is immune. The
   rules below are byte-for-byte what app/robots.tsx returned.
   ══════════════════════════════════════════════════════════════ */

const BASE = "https://nexxovate.in";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${BASE}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
