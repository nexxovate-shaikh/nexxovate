import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, JetBrains_Mono } from "next/font/google";
import LayoutClient from "./LayoutClient";
import { SITE_URL, SITE_NAME } from "@/lib/site-url";

/* ══════════════════════════════════════════════════════════════
   Root layout.

   Changes from the previous version:
   - The dead `ensureAdminExists` import is gone. It was only used
     by a commented-out call, but it kept the Mongo driver in the
     root layout's module graph.
   - AIScrollAnalyzer is gone. It was one of three competing
     scroll-progress bars; there is now exactly one, driven by the
     shared scroll loop.
   - Fonts are loaded through next/font, which self-hosts them, so
     there is no render-blocking request to Google.
   ══════════════════════════════════════════════════════════════ */

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const DESCRIPTION =
  "Nexxovate builds enterprise AI platforms, cloud infrastructure and secure digital systems, and is home of the Nexyra AI product suite.";

export const metadata: Metadata = {
  /* Was https://nexxovate.in. Every relative URL Next resolves for
     canonical links and share cards is resolved against this, so the
     wrong host here quietly pointed all of them at another domain. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nexxovate — Enterprise AI, Cloud and Cybersecurity",
    template: "%s | Nexxovate",
  },
  description: DESCRIPTION,
  /* A canonical on every page. Without one, www.nexxovate.com and
     nexxovate.com are two copies of the same site as far as a search
     engine is concerned, and they split the ranking between them. */
  alternates: { canonical: "./" },
  /* The audit's "Favicon present" check. public/favicon.png existed
     but nothing declared it — and at 312KB it was a full-size logo
     being asked to render at 16px. These are cut to size. */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  /* The audit's "Social share image (og:image) set" check. Without
     it, a link pasted into LinkedIn, WhatsApp or Slack shows a grey
     box — which is where most people first see a B2B site. */
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Nexxovate — Enterprise AI, Cloud and Cybersecurity",
    description:
      "Enterprise AI platforms, cloud infrastructure and secure digital systems. Home of the Nexyra AI ecosystem.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nexxovate — AI systems that run the work, not just describe it.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

/* ── Structured data ───────────────────────────────────────────
   Three failing checks in the audit came from this being absent:
   "Structured data present", "Structured data on at least half of
   pages" and "Organization / WebSite entity defined". Because it is
   emitted from the root layout, it is on every page — which clears
   the half-of-pages check outright.

   It is also what AI search products read. An Organization entity
   with a name, URL, logo and a clear description is how an answer
   engine learns what Nexxovate IS rather than guessing from page
   copy, and that is most of the audit's 64 for AI Search Readiness.

   sameAs lists only profiles you control and that resolve. Add to it
   as they are confirmed — an unresolvable sameAs is worse than none.
   ─────────────────────────────────────────────────────────────── */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description: DESCRIPTION,
      email: "nexxovate@gmail.com",
      sameAs: ["https://github.com/nexxovate-shaikh"],
      knowsAbout: [
        "Enterprise artificial intelligence",
        "AI agents",
        "IT service management automation",
        "Network monitoring",
        "Cloud infrastructure",
        "Cybersecurity",
        "Website performance and security auditing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-text antialiased">
        <script
          type="application/ld+json"
          /* JSON.stringify, then escape "<" — so a "</script>" inside
             any string can never close this tag early. */
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
