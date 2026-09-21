import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/* ══════════════════════════════════════════════════════════════
   Sitemap.

   The previous version built every URL from BRAND.domain, which was
   https://nexxovate.in — while the site is served from .com. It also
   listed /ams, /nexyra/os and /nexyra/service-desk (pages from the
   other rebuild that nothing on this site links to) and /staffing,
   which is a permanent redirect to /talent. A sitemap should list
   the canonical URL of every page you want indexed, and nothing
   else: a redirect in a sitemap asks a crawler to index an address
   you are telling it to leave.

   ── A NOTE FOR LOCAL DEVELOPMENT ──────────────────────────────
   This filename is compiled by Next's metadata-route loader, which
   writes the project's absolute path into a single-quoted JS string.
   The apostrophe in "C:\Users\Shaikh's PC" ends that string early,
   so requesting /sitemap.xml under `npm run dev` on that machine
   throws "Module parse failed". It does NOT affect production:
   Vercel builds on Linux under a path with no apostrophe. If you
   want it working locally too, move the project to a path such as
   C:\dev\nexxovate.
   ══════════════════════════════════════════════════════════════ */

const ROUTES: {
  path: string;
  priority: number;
  freq: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/nexyra", priority: 0.9, freq: "weekly" },
  { path: "/services", priority: 0.8, freq: "monthly" },
  { path: "/talent", priority: 0.7, freq: "monthly" },
  { path: "/training", priority: 0.7, freq: "monthly" },
  { path: "/insights", priority: 0.7, freq: "weekly" },
  { path: "/case-studies", priority: 0.6, freq: "monthly" },
  { path: "/ai-consultation", priority: 0.6, freq: "monthly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.6, freq: "monthly" },
  { path: "/accessibility", priority: 0.3, freq: "yearly" },
  { path: "/security", priority: 0.3, freq: "yearly" },
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  { path: "/ai-policy", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
