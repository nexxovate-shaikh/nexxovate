import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import CurvedMedia from "../components/site/CurvedMedia";
import { Kicker, Reveal, Section, Shell, Stagger, StaggerItem } from "../components/site/primitives";
import { INSIGHTS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives from Nexxovate on autonomous operations, enterprise AI architecture, cybersecurity and building the teams that govern intelligent systems.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const featured = INSIGHTS.find((i) => i.featured) ?? INSIGHTS[0];
  const others = INSIGHTS.filter((i) => i.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="What we are learning,"
        accent="written down."
        state="activation"
        lede="Notes from delivery — on where autonomy is safe to introduce, what governance actually has to cover, and the parts of enterprise technology that are harder than the industry admits."
      />

      {/* ---- featured ---- */}
      <Section tone="ink" className="border-t border-white/[0.06]">
        <Shell width="full">
          <Kicker tone="gold">Featured</Kicker>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Link href={`/insights/${featured.slug}`} className="block">
                <CurvedMedia
                  poster={featured.poster}
                  accent={featured.accent}
                  label={featured.category}
                  caption={featured.readingTime + " read"}
                />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-mono-ui text-[0.62rem] uppercase tracking-[0.18em] text-electric-soft">
                  {featured.category}
                </p>
                <h2 className="display-lg mt-5 max-w-[16ch] text-paper">
                  {featured.title}
                </h2>
                <p className="body-copy mt-6 max-w-[48ch]">{featured.excerpt}</p>

                <Link
                  href={`/insights/${featured.slug}`}
                  className="group mt-8 inline-flex items-center gap-2.5 text-[0.84rem] font-medium text-electric-soft"
                >
                  <span className="relative">
                    Read the full piece
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ---- index ---- */}
      <Section tone="void" className="border-t border-white/[0.06]">
        <Shell width="full">
          <Kicker>All insights</Kicker>

          <Stagger className="mt-12 border-t border-white/[0.09]">
            {others.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group grid gap-4 border-b border-white/[0.09] py-9 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  <p className="font-mono-ui text-[0.62rem] uppercase tracking-[0.18em] text-electric-soft md:col-span-3">
                    {post.category}
                  </p>

                  <div className="md:col-span-7">
                    <h3 className="display-md max-w-[26ch] text-paper">{post.title}</h3>
                    <p className="mt-3 max-w-[58ch] text-[0.88rem] leading-relaxed text-faint">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                    <span className="font-mono-ui text-[0.62rem] tracking-[0.14em] text-white/30">
                      {post.readingTime}
                    </span>
                    <span
                      className="text-white/25 transition-all duration-500 group-hover:translate-x-1 group-hover:text-electric-soft"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Shell>
      </Section>

      <CTASection
        eyebrow="Strategic guidance"
        title="Apply this to your own estate."
        body="If any of it lands close to a problem you are living with, the fastest next step is a conversation with the people who wrote it."
        primary={{ href: "/contact", label: "Speak to an expert" }}
        secondary={{ href: "/ai-consultation", label: "Book a consultation" }}
      />
    </>
  );
}
