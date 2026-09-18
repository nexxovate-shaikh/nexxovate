import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, JetBrains_Mono } from "next/font/google";
import LayoutClient from "./LayoutClient";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://nexxovate.in"),
  title: {
    default: "Nexxovate — Enterprise AI, Cloud and Cybersecurity",
    template: "%s | Nexxovate",
  },
  description:
    "Nexxovate builds enterprise AI platforms, cloud infrastructure and secure digital systems. Home of Nexyra — network monitoring, autonomous service desk, website auditing and conversational AI.",
  openGraph: {
    type: "website",
    siteName: "Nexxovate",
    title: "Nexxovate — Enterprise AI, Cloud and Cybersecurity",
    description:
      "Enterprise AI platforms, cloud infrastructure and secure digital systems. Home of the Nexyra AI ecosystem.",
  },
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
