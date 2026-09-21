/* ══════════════════════════════════════════════════════════════
   THE ONE PLACE THE SITE'S OWN ADDRESS IS WRITTEN.

   Until this file existed the domain was typed out in four places —
   layout metadataBase, the sitemap, robots.txt and the rebuild's
   brand file — and every one of them said nexxovate.in. The site
   is served from nexxovate.com.

   The cost of that was not cosmetic. robots.txt sent crawlers to
   nexxovate.in/sitemap.xml, and the sitemap's seventeen <loc>
   entries were all on .in, so to a crawler indexing .com the
   sitemap contained zero URLs belonging to it. Your own Nexyra
   Auditor report reported exactly that: "0 URLs in sitemap".
   Canonical URLs and share cards resolved against the wrong host
   for the same reason.

   Change it here and every consumer follows. No trailing slash.
   ══════════════════════════════════════════════════════════════ */

export const SITE_URL = "https://nexxovate.com";
export const SITE_NAME = "Nexxovate";

/* The live Nexyra Website Auditor. Every "Website Auditor" link on the
   site — nav, footer, the /nexyra product block, the homepage problem
   card — reads this, so moving the tool means changing one line. */
export const AUDITOR_URL = "https://audit.nexxovate.com/";
