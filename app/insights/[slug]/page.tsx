import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section, Container } from "@/app/components/ui";
import { PageCTA } from "@/app/components/PageShell";
import ServiceCard from "@/app/components/visual/ServiceCard";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { INSIGHTS, getInsight } from "@/lib/insights";

/* ══════════════════════════════════════════════════════════════
   INSIGHTS — article.

   Same slugs, same metadata and static params as the rebuild's
   version, so every existing article URL still resolves. What
   changed is the setting: this site's type, bands and palette, and
   a measure held to about 68 characters — past roughly 75 a reader
   starts losing the line on the way back, which on long-form writing
   is the difference between finishing an article and skimming it.
   ══════════════════════════════════════════════════════════════ */

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
  /* Search engines show about 155 characters of a description; past
     that it is cut mid-word. Trim at a word boundary instead. */
  const description =
    post.excerpt.length <= 158
      ? post.excerpt
      : post.excerpt.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  return {
    title: post.title,
    description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: [{ url: post.poster }],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [post.poster] },
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
      {/* ── Header ── */}
      <Section band="dark" zone="ai" className="ground-aurora !pt-[120px] md:!pt-[140px]">
        <Container>
          <Link
            href="/insights"
            className="font-mono-label inline-flex items-center gap-3 text-faint transition-colors hover:text-text"
          >
            <span aria-hidden="true">←</span> All insights
          </Link>

          <Reveal>
            <p className="font-mono-label mt-10 text-[color:var(--color-champagne)]">
              {post.category} · {post.readingTime} read
            </p>
            <h1 className="font-display mt-6 max-w-[20ch] text-[length:var(--text-display)] font-semibold leading-[1.02]">
              {post.title}
            </h1>
            <p className="mt-7 max-w-[60ch] text-[length:var(--text-lead)] leading-relaxed text-mute">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[20px] md:mt-14 md:rounded-[24px]"
              style={{
                border: "1px solid var(--color-line)",
                boxShadow: "0 28px 64px rgba(4,8,18,0.5)",
              }}
            >
              <Image
                src={post.poster}
                alt=""
                fill
                priority
                sizes="(max-width: 1360px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Body ── */}
      <Section band="light" zone="ai" className="ground-grid">
        <Container>
          <article className="mx-auto max-w-[68ch]">
            {post.body.map((block, i) => (
              <div key={i} className={i === 0 ? "" : "mt-12"}>
                {block.heading && (
                  <h2 className="font-display text-[length:var(--text-h3)] font-semibold leading-tight">
                    {block.heading}
                  </h2>
                )}
                {block.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className={`text-[17.5px] leading-[1.75] text-mute ${
                      block.heading || j > 0 ? "mt-5" : ""
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </article>
        </Container>
      </Section>

      {/* ── More ── */}
      {more.length > 0 && (
        <Section band="deep" zone="ai" className="ground-dust">
          <Container>
            <h2 className="font-display mb-10 text-[length:var(--text-h3)] font-semibold">
              Keep reading
            </h2>
            <Stagger className="grid gap-8 md:gap-10 lg:grid-cols-2">
              {more.map((m, i) => (
                <StaggerItem key={m.slug}>
                  <ServiceCard
                    index={i}
                    title={m.title}
                    result={`${m.category} · ${m.readingTime} read`}
                    desc={m.excerpt}
                    panel={m.poster}
                    panelAlt=""
                    href={`/insights/${m.slug}`}
                    cta="Read the article"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <PageCTA
        title="Talk to the people"
        accent="who wrote this"
        intro="If this describes something your team is living with, we would like to hear about it."
        label="Start the conversation"
      />
    </>
  );
}
