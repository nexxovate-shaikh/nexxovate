import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "../components/site/PageHero";
import ContactForm from "./ContactForm";
import { Kicker, Reveal, Section, Shell } from "../components/site/primitives";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Nexxovate about autonomous operations, AMS, the Nexyra platform, cloud, cybersecurity, transformation and talent.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  {
    label: "Autonomous operations",
    body: "AMS, closed-loop remediation, operating model design.",
    href: "/ams",
  },
  {
    label: "The Nexyra platform",
    body: "Nexyra OS, the AI Service Desk, agent deployment.",
    href: "/nexyra",
  },
  {
    label: "Cloud, security & transformation",
    body: "Infrastructure, risk, and the sequence between them.",
    href: "/services",
  },
  {
    label: "Talent & capability",
    body: "Workforce models and the training behind them.",
    href: "/staffing",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Nexxovate"
        title="Let's build"
        accent="the future together."
        state="ecosystem"
        lede="Whether you are scaling technology, modernising operations or introducing autonomy for the first time — tell us what you are actually trying to change, and we will tell you honestly whether we are the right partner for it."
      />

      <Section tone="ink" className="border-t border-white/[0.06]">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />

        <Shell width="full">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---- form ---- */}
            <div className="lg:col-span-7">
              <Kicker>Start the conversation</Kicker>
              <h2 className="display-lg mt-6 max-w-[16ch] text-paper">
                Tell us what is costing you the most attention.
              </h2>

              <Reveal delay={0.08}>
                <div className="panel mt-10 rounded-3xl p-7 md:p-10">
                  <div className="relative z-10">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ---- direct ---- */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Kicker tone="gold">Direct</Kicker>

                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-6 block font-display text-2xl font-medium tracking-[-0.02em] text-paper transition-colors duration-400 hover:text-electric-soft"
                >
                  {BRAND.email}
                </a>

                <p className="body-copy mt-5 max-w-[38ch]">
                  Enterprise enquiries are reviewed by our leadership team. You
                  will get a reply from a person who can actually scope the work.
                </p>

                <div className="rule mt-10" />

                <p className="kicker mt-10">Where to start</p>

                <div className="mt-6 space-y-px">
                  {ROUTES.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="group block border-b border-white/[0.08] py-5 transition-colors duration-500 hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[0.92rem] font-medium text-paper">
                          {route.label}
                        </span>
                        <span
                          className="text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-electric-soft"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-[38ch] text-[0.82rem] leading-relaxed text-faint">
                        {route.body}
                      </p>
                    </Link>
                  ))}
                </div>

                <a
                  href="/nexxovate-company-profile.pdf"
                  className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/14 px-6 py-3.5 text-[0.8rem] font-medium text-paper/85 transition-colors duration-400 hover:border-white/30"
                >
                  Company profile (PDF)
                  <span aria-hidden>↓</span>
                </a>
              </div>
            </div>
          </div>
        </Shell>
      </Section>
    </>
  );
}
