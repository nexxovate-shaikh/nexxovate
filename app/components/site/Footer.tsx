"use client";

import Image from "next/image";
import Link from "next/link";

import { BRAND, NAV } from "@/lib/brand";
import { Shell, Reveal } from "./primitives";

const LEGAL = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-void">
      {/* the horizon returns one last time */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[52vmax] w-[110vmax] -translate-x-1/2 rounded-[50%] opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(77,124,255,0.22) 0%, rgba(122,92,255,0.08) 42%, transparent 70%)",
        }}
      />
      <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />

      <Shell width="full" className="pt-24 pb-12 md:pt-32">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-12">
            {/* ---- identity ---- */}
            <div className="lg:col-span-4">
              <Image
                src="/logo.png"
                alt="Nexxovate"
                width={260}
                height={78}
                className="h-[44px] w-auto object-contain"
              />
              <p className="mt-7 max-w-[34ch] font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper">
                Beyond automation.
                <br />
                <span className="text-spine">Into autonomy.</span>
              </p>
              <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-faint">
                Nexxovate engineers the autonomous enterprise — intelligence,
                infrastructure and operations built to run themselves, under
                governance you can prove.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-paper px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-wide text-void transition-transform duration-500 hover:-translate-y-0.5"
                >
                  {BRAND.cta}
                </Link>
                <a
                  href="/nexxovate-company-profile.pdf"
                  className="rounded-full border border-white/14 px-6 py-3 text-[0.78rem] font-medium text-paper/85 transition-colors duration-400 hover:border-white/30"
                >
                  Company profile
                </a>
              </div>
            </div>

            {/* ---- sitemap ---- */}
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
              {NAV.map((group) => (
                <div key={group.label}>
                  <p className="kicker">{group.label}</p>
                  <ul className="mt-5 space-y-3">
                    {(group.children ?? [{ label: "Overview", href: group.href, blurb: "" }]).map(
                      (child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-[0.83rem] text-faint transition-colors duration-300 hover:text-paper"
                          >
                            {child.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>

            {/* ---- contact ---- */}
            <div className="lg:col-span-3">
              <p className="kicker-gold">Contact</p>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-5 block text-[0.83rem] text-paper transition-colors duration-300 hover:text-electric-soft"
              >
                {BRAND.email}
              </a>
              <p className="mt-3 text-[0.83rem] leading-relaxed text-faint">
                Enterprise enquiries are reviewed by our leadership team.
              </p>

              <Link
                href="/ai-consultation"
                className="mt-6 inline-flex items-center gap-2 text-[0.8rem] text-electric-soft"
              >
                Book a consultation <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="rule mt-16" />

        <div className="mt-8 flex flex-col gap-4 text-[0.74rem] text-white/32 md:flex-row md:items-center md:justify-between">
          <p className="font-mono-ui tracking-[0.1em]">
            © {LEGAL} NEXXOVATE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono-ui tracking-[0.1em]">
            ENGINEERING THE AUTONOMOUS ENTERPRISE
          </p>
        </div>
      </Shell>
    </footer>
  );
}
