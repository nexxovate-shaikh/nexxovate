import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTASection from "../../components/site/CTASection";
import CurvedMedia from "../../components/site/CurvedMedia";
import { Section, Shell } from "../../components/site/primitives";
import { INSIGHTS, getInsight } from "@/lib/insights";

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);

  if (!post) return { title: "Insight not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);

  if (!post) notFound();

  const more = INSIGHTS.filter((i) => i.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* ---- article header ---- */}
      <section className="grain relative overflow-hidden bg-void pb-16 pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full opacity-40 blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${post.accent}2e 0%, transparent 66%)`,
          }}
        />

        <Shell width="wide">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 font-mono-ui text-[0.62rem] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-paper"
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-1" aria-hidden>
              ←
            </span>
            All insights
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span
              className="rounded-full border px-3.5 py-1.5 font-mono-ui text-[0.6rem] uppercase tracking-[0.16em]"
              style={{ borderColor: `${post.accent}55`, color: post.accent }}
            >
              {post.category}
            </span>
            <span className="font-mono-ui text-[0.62rem] tracking-[0.14em] text-white/30">
              {post.readingTime} read
            </span>
          </div>

          <h1 className="display-xl mt-7 max-w-[20ch] text-forge">{post.title}</h1>

          <p className="lede mt-8">{post.excerpt}</p>
        </Shell>
      </section>

      <Section tone="void" tight className="!pt-0">
        <Shell width="wide">
          <CurvedMedia
            poster={post.poster}
            accent={post.accent}
            label={post.category}
            height="clamp(240px, 32vw, 420px)"
          />
        </Shell>
      </Section>

      {/* ---- body ---- */}
      <Section tone="void" className="!pt-4">
        <Shell width="narrow">
          <article className="max-w-[68ch]">
            {post.body.map((block, i) => (
              <div key={i} className={i > 0 ? "mt-14" : ""}>
                {block.heading && (
                  <h2 className="display-md mb-6 text-paper">{block.heading}</h2>
                )}
                {block.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className={`text-[1.02rem] leading-[1.78] text-mute ${j > 0 ? "mt-6" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </article>

          <div className="rule mt-20" />

          <p className="mt-8 max-w-[60ch] text-[0.86rem] leading-relaxed text-faint">
            Written by the Nexxovate delivery team. If this sits close to a problem
            you are living with,{" "}
            <Link href="/contact" className="text-electric-soft underline underline-offset-4">
              talk to us
            </Link>
            .
          </p>
        </Shell>
      </Section>

      {/* ---- more ---- */}
      <Section tone="ink" tight className="border-t border-white/[0.06]">
        <Shell width="full">
          <p className="kicker">Keep reading</p>

          <div className="mt-10 grid gap-px border-t border-white/[0.09] md:grid-cols-2">
            {more.map((item, i) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className={`group p-8 transition-colors duration-500 hover:bg-white/[0.02] ${
                  i > 0 ? "md:border-l md:border-white/[0.09]" : ""
                }`}
              >
                <p className="font-mono-ui text-[0.6rem] uppercase tracking-[0.18em] text-electric-soft">
                  {item.category}
                </p>
                <h3 className="mt-5 max-w-[24ch] font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper">
                  {item.title}
                </h3>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.78rem] text-faint transition-colors duration-400 group-hover:text-paper">
                  Read
                  <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>

      <CTASection
        eyebrow="Strategic guidance"
        title="Apply this to your own estate."
        body="The fastest next step is a conversation with the people who wrote it."
        primary={{ href: "/contact", label: "Speak to an expert" }}
        secondary={{ href: "/insights", label: "More insights" }}
      />
    </>
  );
}
