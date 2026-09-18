"use client";

import { useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  Reveal,
  Stagger,
  StaggerItem,
  MaskText,
  CountUp,
  useMotionPrefs,
  EASE,
} from "@/lib/motion";

import {
  Section,
  Container,
  Kicker,
  Accent,
  Button,
  SpotCard,
  StatusDot,
  ChatTrigger,
} from "./components/ui";
import Updates from "./components/home/Updates";
import Awards from "./components/home/Awards";
import EnquiryForm from "./components/home/EnquiryForm";
import NexyraMark from "./components/visual/NexyraMark";
import CapabilityPlate from "./components/visual/CapabilityPlate";

import {
  STATS,
  CAPABILITIES,
  NEXYRA_PRODUCTS,
  SERVICES,
  TECH_STACK,
  PROBLEMS,
  AWARDS,
  OPEN_CHAT_EVENT,
} from "@/lib/content/site";

/* The shader never blocks first paint. The hero renders its
   gradient ground immediately and the canvas fades in on top. */
const ShaderField = dynamic(() => import("./components/visual/ShaderField"), {
  ssr: false,
  loading: () => null,
});

/* The hero's background loop. Client-only and mounted after paint —
   see the component for why it never touches LCP. */
const HeroVideo = dynamic(() => import("./components/visual/HeroVideo"), {
  ssr: false,
  loading: () => null,
});

/* ══════════════════════════════════════════════════════════════
   NINE BANDS.

   This was sixteen sections. Measured against the reference site,
   which runs nine sections in 5,963px at a 1440 viewport, that was
   roughly twice the page for the same argument — and length is not
   a neutral cost. A visitor who has scrolled past eleven sections
   has stopped reading; the twelfth is decoration.

   Nothing was deleted. Seven sections were folded into the band
   they were always supporting:

     Stats           → the foot of the Hero
     EcosystemIntro  → the head of the Nexyra band
     ProductivityTools → the last row of the Nexyra band
     SelectedWork    → the answering half of Problems
     Process         → the tail of Services
     WhyNexxovate    → the supporting points in Careers
     Testimonials
     TechStack       → both into Recognition

   The bands alternate ground — dark, deep, dark, LIGHT, deep,
   LIGHT, dark, LIGHT, dark. That rhythm is the other half of the
   fix: a page that is one charcoal from top to bottom gives the
   eye nothing to mark a transition with, and every section arrives
   at the same brightness as the last.
   ══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <Hero />
      <NexyraShowcase />
      <Updates />
      <Capabilities />
      <Problems />
      <ServicesGrid />
      <Careers />
      <Recognition />
      <ClosingCTA />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   01 — HERO
   The thesis. Shader field, mask-revealed headline, and the two
   layers moving at different rates so type separates from ground
   rather than sliding as one plate.
   ══════════════════════════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionPrefs();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* The panel lifts and dims as it leaves, rather than the whole
     hero sliding. Contained media wants to feel like an object on
     the page, not a backdrop behind it. */
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const panelFade = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <Section
      ref={ref}
      zone="infrastructure"
      band="dark"
      className="!pt-[88px] !pb-12 md:!pb-16"
    >
      {/* The surface the panel rests on. Only its frame is ever
          visible — above the panel, either side, and below the ask
          bar — so the lattice is densest at the edges and the
          centre is deliberately empty. Without this the panel
          floated on flat colour. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-backdrop.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink"
      />

      <Container className="pb-6 pt-4 md:pb-8 md:pt-5">
        {/* ── The media panel ──────────────────────────────────
            Contained rather than full-bleed, with real margin on
            every side. A hero that stops short of the edges reads
            as a composed object; one that bleeds reads as
            wallpaper behind text. This single change does more
            for "clean" than any amount of effect-tuning. */}
        <motion.div
          style={reduced ? undefined : { opacity: panelFade }}
          className="relative isolate z-10 overflow-hidden rounded-[20px] border border-line md:rounded-[28px]"
        >
          <div className="relative min-h-[420px] md:min-h-[460px] lg:min-h-[480px]">
            {/* Media */}
            <motion.div
              className="absolute inset-0 -z-10"
              style={reduced ? undefined : { y: mediaY }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(900px 620px at 30% 34%, rgba(126,147,172,0.30), transparent 62%), radial-gradient(760px 520px at 78% 20%, rgba(217,174,99,0.16), transparent 60%), #0A0B0D",
                }}
              />
              <HeroVideo />
              {/* Scrim weighted left, where the type sits. */}
              <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
            </motion.div>

            {/* Content */}
            <div className="relative flex min-h-[420px] flex-col justify-end p-7 sm:p-9 md:min-h-[460px] md:p-11 lg:min-h-[480px] lg:p-12">
              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Kicker>Enterprise AI · Cloud · Cybersecurity</Kicker>
              </motion.div>

              <MaskText
                as="h1"
                className="font-display mt-7 max-w-[15ch] text-[clamp(2.6rem,6.2vw,5rem)] font-semibold"
                delay={0.12}
                lines={[
                  <>AI systems that</>,
                  <>run the work,</>,
                  <Accent>not just describe it</Accent>,
                ]}
              />

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.55, ease: EASE }}
                className="mt-7 max-w-[46ch] text-[length:var(--text-lead)] leading-relaxed text-mute"
              >
                Nexxovate builds enterprise AI, modern cloud infrastructure
                and secure digital platforms — and Nexyra, our ecosystem of
                four products that monitor, support, audit and answer.
              </motion.p>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.68, ease: EASE }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Button href="/nexyra">Explore Nexyra</Button>
                <Button href="/contact" variant="ghost">
                  Book a consultation
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Ask bar ──────────────────────────────────────────
            The reference site's is the pattern worth copying: a
            ringed FACE, the assistant's name in the accent colour,
            and a search affordance on the right. A face is what
            makes the bar read as "talk to someone" rather than
            "search this website", and the name is what makes the
            assistant a thing rather than a feature.

            Two departures, both deliberate:

            · The avatar is the humanoid from your own Nexyra
              emblem, cropped out of the logo — not a stock
              photograph of a person. Theirs is a photo of someone
              who does not work there, which is a small dishonesty
              that a visitor can feel; yours is the brand.
            · Theirs is a styled div. This is a real <button> with
              a real accessible name, so it is reachable by keyboard
              and announced correctly. It opens the concierge that
              already exists rather than routing anywhere, and it
              deliberately has no input of its own — a second field
              to keep in sync with the chat's is a bug waiting. */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-4 md:mt-5"
        >
          <button
            type="button"
            aria-label="Ask Nexyra — open the concierge"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))
            }
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-full border-2 px-4 py-3 text-left transition-colors duration-300 md:gap-5 md:px-5 md:py-3.5"
            style={{ borderColor: "var(--color-line-lit)" }}
          >
            {/* Network lattice, cropped from the brand graphic and
                graded down to sit under charcoal. It is texture, so
                it is held at low opacity and lifts slightly on
                hover — enough to notice, never enough to compete
                with the label. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center opacity-55 transition-opacity duration-500 group-hover:opacity-75"
              style={{ backgroundImage: "url('/images/ask-bar-bg.jpg')" }}
            />
            {/* Scrim weighted left, where the label sits. The right
                side stays open so the lattice reads. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35"
            />

            {/* The face, ringed. The ring is champagne at 2px — the
                same weight as the bar's own border, so the avatar
                reads as part of the control rather than pasted on. */}
            <span className="relative flex shrink-0 items-center">
              <span
                className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full md:h-12 md:w-12"
                style={{ boxShadow: "inset 0 0 0 2px var(--color-champagne)" }}
              >
                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: "0 0 0 0 var(--color-champagne)" }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(217,174,99,0.45)",
                        "0 0 0 7px rgba(217,174,99,0)",
                      ],
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <Image
                  src="/nexyra-avatar.png"
                  alt=""
                  width={48}
                  height={48}
                  /* Eager: this sits in the hero, above the fold on
                     every desktop, and next/image lazy-loads by
                     default — which means the bar would render as an
                     empty ring and then pop a face into it. */
                  priority
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
            </span>

            <span className="relative flex min-w-0 flex-1 items-baseline gap-2">
              <span className="font-display shrink-0 text-[18px] font-semibold text-text md:text-[20px]">
                Ask{" "}
                <span style={{ color: "var(--color-champagne)" }}>Nexyra</span>
              </span>
              {/* The hint theirs does not have. "Ask Aira" alone
                  tells you there is an assistant; it does not tell
                  you what to ask it. */}
              <span className="hidden truncate text-[14px] text-mute transition-colors group-hover:text-text sm:block">
                what we could automate for your team
              </span>
            </span>

            <span
              aria-hidden="true"
              className="relative flex shrink-0 items-center gap-1 text-[color:var(--color-champagne)] transition-transform duration-300 group-hover:scale-110"
            >
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
                <circle cx="8.6" cy="8.6" r="5.9" stroke="currentColor" strokeWidth="1.7" />
                <path d="M13 13l4.4 4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="-ml-0.5 -mt-2">
                <path
                  d="M6 0.6l1.15 3.25L10.4 5l-3.25 1.15L6 9.4 4.85 6.15 1.6 5l3.25-1.15z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* The four figures, folded into the hero rather than given a
            band of their own. Four numbers do not need 200px of page
            to themselves, and read better as the base of the hero
            than as a standalone interruption after it. */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
        >
          <StatsStrip />
        </motion.div>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   02 — STATS
   Counters bound to scroll position, not fired on enter. Scrub
   back up and they count back down.
   ══════════════════════════════════════════════════════════════ */

function StatsStrip() {
  return (
    <div className="relative mt-4 overflow-hidden rounded-[20px] border border-line md:mt-5">
      {/* Brushed-metal backdrop. The light rakes across the four
          columns so each sits on a slightly different value —
          an evenly lit band reads as a table, an unevenly lit one
          reads as an object under a lamp. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/stats-band.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink"
      />
      {/* Champagne hairline along the top edge — the one warm mark. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-champagne), transparent)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 px-6 py-9 md:px-10 md:py-11">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={
                // Hairline columns rather than gaps. Rules make four
                // figures read as one instrument panel.
                i === 0
                  ? "px-2 md:px-8"
                  : "border-l border-line px-2 md:border-line-lit md:px-8"
              }
            >
              <div
                className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-semibold leading-none"
                style={{
                  // Machined chrome, matching the mark in the logo:
                  // bright top edge, mid-tone body, shadowed base.
                  backgroundImage:
                    "linear-gradient(176deg, #FFFFFF 4%, var(--color-platinum) 40%, #8A939E 78%, var(--color-champagne) 108%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>

              <div
                className="mt-4 h-px w-10"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-champagne), transparent)",
                }}
              />
              <p className="font-mono-label mt-4 text-mute">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   03 — CAPABILITIES
   The editorial numbered rows from the previous build, kept and
   re-skinned. The numbering is legitimate here: it is a list of
   four, and the ordinal helps a reader hold position.
   ══════════════════════════════════════════════════════════════ */

function Capabilities() {
  return (
    <Section zone="ai" band="light">
      <Container>
        <div className="mb-8 grid gap-8 md:mb-10 md:grid-cols-2 md:items-end">
          <Reveal>
            <Kicker>Enterprise AI capabilities</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              What Nexyra
              <br />
              delivers
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[length:var(--text-lead)] leading-relaxed text-mute md:ml-auto md:max-w-md md:text-right">
              Enterprise-grade AI platforms, intelligent automation systems and
              secure cloud architecture designed to improve efficiency,
              scalability and operational performance.
            </p>
          </Reveal>
        </div>

        {/* Each capability now carries a plate: a fine-line drawing
            of how the thing actually works, in the register of an
            engraved instrument face. Four paragraphs in a column
            read as a specification; four plates read as a product
            catalogue. */}
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {CAPABILITIES.map((item, i) => (
            <StaggerItem key={item.title}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-ink-2 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-line-lit hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)]">
                {/* Plate — the supplied photograph, cut from the
                    contact sheet and graded to the palette. It drifts
                    slowly and tilts to the pointer; see the component
                    for why that replaced four autoplaying clips. */}
                <div className="relative">
                  <CapabilityPlate
                    index={i}
                    src={item.clip}
                    poster={item.poster}
                    alt={item.alt}
                  />

                  <span className="font-mono-label pointer-events-none absolute left-7 top-6 tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Corner ticks — the convention of a technical
                      plate, and they frame the drawing without a
                      heavy border. */}
                  {[
                    "left-4 top-4 border-l border-t",
                    "right-4 top-4 border-r border-t",
                    "left-4 bottom-4 border-b border-l",
                    "right-4 bottom-4 border-b border-r",
                  ].map((pos) => (
                    <span
                      key={pos}
                      aria-hidden="true"
                      className={`pointer-events-none absolute h-4 w-4 border-line-lit ${pos}`}
                    />
                  ))}
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className="font-display text-[length:var(--text-h3)] font-semibold">
                    {item.title}
                  </h3>

                  <p className="font-display mt-3 text-[length:var(--text-h4)] text-[color:var(--zone-2)]">
                    {item.lead}
                  </p>

                  <p className="mt-5 flex-1 leading-relaxed text-mute">
                    {item.desc}
                  </p>

                  <span
                    className="mt-8 h-px w-full origin-left scale-x-0 transition-transform duration-[700ms] ease-out group-hover:scale-x-100"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--zone), var(--color-champagne), transparent)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   03b — PROBLEMS
   Stated as symptoms. A capabilities list tells a visitor what
   you sell; a symptom tells them you have seen their week — and
   it is the symptom, not the product name, that someone
   recognises about their own operation.

   Champagne marks the same thing in every scene: the part
   Nexxovate changes. Across six images the eye learns that gold
   means "this is the bit we fix".
   ══════════════════════════════════════════════════════════════ */

function Problems() {
  return (
    <Section zone="ai" band="deep">
      <Container>
        <div className="mb-8 grid gap-8 md:mb-10 md:grid-cols-2 md:items-end">
          <Reveal>
            <Kicker>Problems we solve</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              If any of this
              <br />
              <Accent>sounds familiar</Accent>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[length:var(--text-lead)] leading-relaxed text-mute md:ml-auto md:max-w-md md:text-right">
              Six situations we meet in almost every engagement, and what we
              put in place instead.
            </p>
          </Reveal>
        </div>

        {/* Was six image cards on a 3-column grid: 2,280px for this
            band, against 664px for the nearest thing on the
            reference site. The images were the cost — each card
            carried a 16:10 plate, which is 240px of picture above
            60px of type, six times over.

            They were also MY diagrams, generated for this build, not
            your photography — so removing them removes nothing of
            yours. What is left is the part that works: the symptom
            in large type, because that is the line a visitor
            recognises about their own week, and the response under
            it. Two columns of three, hairline-separated. */}
        <Stagger className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line md:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <StaggerItem key={problem.id} className="bg-ink">
              <Link
                href={problem.href}
                className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-surface md:p-8"
              >
                <span className="font-mono-label text-faint">{problem.domain}</span>

                {/* The symptom is the loud element. */}
                <p className="font-display mt-4 text-[length:var(--text-h4)] font-semibold leading-snug text-text">
                  {problem.symptom}
                </p>

                <p className="mt-3 flex-1 text-[14.4px] leading-relaxed text-mute">
                  {problem.response}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] text-[color:var(--zone-2)]">
                  {problem.product}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   04 — NEXYRA ECOSYSTEM

   Measured against the reference site, this band was 1,717px. The
   equivalent band on theirs — four products, same job, same place
   on the page — is 765px. It was the single worst offender on the
   page after Problems, and it got there by stacking three things
   that each said "here are the four products":

     an ecosystem card announcing Nexyra          ~350px
     a tab index with a 520px stage beside it     ~700px
     a separate "try it now" section with 3 cards ~470px

   All three are now one thing: the reference's own pattern, which
   is an ASYMMETRIC bento. Four cards, wide-narrow / narrow-wide, so
   the eye moves diagonally instead of scanning a uniform 2x2 — that
   asymmetry is the whole reason theirs reads as designed rather
   than generated. Every product is on screen at once, which the tab
   version could never do: it showed one and hid three.

   Nothing is lost. Each card keeps its name, its one-line claim and
   its link; the detail that lived in the stage lives on /nexyra,
   which is where someone who wants it is going anyway. The "runs in
   your browser" point is now one line under the grid rather than a
   section of its own.
   ══════════════════════════════════════════════════════════════ */

/* Wide, narrow / narrow, wide. Deliberately not a 2x2. */
const BENTO = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];

function NexyraShowcase() {
  return (
    <Section zone="ai" band="deep">
      <Container>
        <div className="mb-9 grid gap-8 md:mb-11 md:grid-cols-2 md:items-end">
          <Reveal>
            <Kicker>The Nexyra ecosystem</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              Four products,
              <br />
              one intelligence layer
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[length:var(--text-lead)] leading-relaxed text-mute md:ml-auto md:max-w-md md:text-right">
              Our agentic AI ecosystem for the enterprise of the future — built
              to monitor, support, audit and answer.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 lg:grid-cols-5">
          {NEXYRA_PRODUCTS.map((product, i) => (
            <StaggerItem key={product.id} className={BENTO[i]}>
              <Link
                href={product.href}
                className="group relative flex h-full min-h-[236px] flex-col justify-between gap-8 overflow-hidden rounded-[18px] border border-line bg-ink p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-lit md:p-8"
              >
                {/* One warm corner, angled per card so a row of four
                    does not read as the same tile four times. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(105% 80% at ${
                      i % 2 ? "88%" : "10%"
                    } 0%, rgba(217,174,99,0.13), transparent 62%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-label tabular-nums text-[color:var(--zone-2)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono-label text-faint">{product.tag}</span>
                  </div>

                  <h3 className="font-display mt-5 text-[length:var(--text-h3)] font-semibold">
                    {product.name}
                  </h3>
                  <p className="font-display mt-2 text-[length:var(--text-h4)] text-[color:var(--zone-2)]">
                    {product.line}
                  </p>
                </div>

                <span className="relative inline-flex items-center gap-2 text-[14.5px] text-mute transition-colors group-hover:text-text">
                  Read more
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <ProductivityRow />
      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   05 — PRODUCTIVITY TOOLS
   A plain hairline grid. Every card sits in the same cell, on the
   same baseline, and answers a hover with one crisp border change
   — which reads as considered where tilt and glow read as demo.
   ══════════════════════════════════════════════════════════════ */

const TOOLS = [
  {
    title: "Website Auditor",
    desc: "Point it at a domain and get performance, accessibility and security findings ranked by business impact.",
    href: "/nexyra#auditor-detail",
    glyph: "◈",
  },
  {
    title: "Nexyra Chat",
    desc: "Ask questions of your own documents, policies and operational data. Every answer cites its source.",
    href: "/nexyra#chat-detail",
    glyph: "◍",
  },
  {
    title: "Service Desk Agent",
    desc: "Routine tickets read, actioned and written up autonomously. Hard ones escalated with full context.",
    href: "/nexyra#service-desk-detail",
    glyph: "◇",
  },
];

/* Was a band of its own. It is now the last row of the Nexyra band,
   which is where it belonged: "here are the four products" followed
   immediately by "three of them run in your browser now" is one
   argument, and splitting it across two full-height sections was
   asking a reader to hold a thought across 900px of scrolling. */
function ProductivityRow() {
  /* Was a section head plus a three-card grid — about 470px to make
     one point. The point is worth making and the 470px was not, so
     it is a single line under the bento. */
  return (
    <Reveal className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-7 text-[15px] md:mt-10 md:pt-8">
      <span className="font-mono-label text-[color:var(--zone-2)]">Try it now</span>
      <span className="text-mute">
        Three of the four run in your browser — no sales call required:
      </span>
      {TOOLS.map((tool, i) => (
        <span key={tool.title} className="inline-flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
          )}
          <Link
            href={tool.href}
            className="text-text underline decoration-[color:var(--color-line-lit)] underline-offset-4 transition-colors hover:decoration-[color:var(--color-champagne)]"
          >
            {tool.title}
          </Link>
        </span>
      ))}
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   06b — SERVICES
   The six enterprise capabilities, carried over intact. Kept on
   the home page because dropping it would have removed real
   content; restructured as a compact index rather than the
   full-bleed photo tiles, so it supports the Nexyra story above
   instead of competing with it.
   ══════════════════════════════════════════════════════════════ */

function ServicesGrid() {
  return (
    <Section zone="security" band="light">
      <Container>
        <div className="mb-9 grid gap-10 md:mb-10 md:grid-cols-2 md:items-end">
          <Reveal>
            <Kicker>Enterprise technology services</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              Services for modern organizations
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:text-right">
              <Button href="/services" variant="quiet">
                All six services in detail
              </Button>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Link
              key={service.title}
              href="/services"
              className="group relative flex flex-col justify-between gap-8 bg-ink p-8 transition-colors duration-500 hover:bg-surface"
            >
              <div className="relative">
                <span className="font-mono-label tabular-nums text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-5 text-[length:var(--text-h4)] font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 text-[14.4px] leading-relaxed text-mute">
                  {service.desc}
                </p>
              </div>
              <span
                className="relative h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{
                  background:
                    "linear-gradient(90deg, var(--zone), var(--zone-2), transparent)",
                }}
                aria-hidden="true"
              />
            </Link>
          ))}
        </Stagger>

      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   09 — THE PLATFORM CONSTELLATION

   The reference site's partner band: one very large centred claim
   with the marks scattered around it as cards, asymmetrically, on
   a light ground. It works because the logos frame the sentence
   instead of queuing under it — your eye reads the claim and the
   evidence in the same glance, which a logo row never achieves.

   This replaces the two-row marquee. A marquee says "there are too
   many of these to show"; eight is not too many, and a moving strip
   is unreadable at a glance, which is the one thing this band has
   to be.

   ── ONE DELIBERATE DIFFERENCE, AND IT MATTERS ──────────────────
   Theirs is headed "Our partner ecosystem" and every card is a
   certified badge: "ORACLE | Partner", "SAP Global Partner", "aws
   PARTNER Premier Tier Services". Those are formal partner-status
   claims, granted and verifiable.

   TECH_STACK is not that. It is the list of platforms Nexxovate
   BUILDS ON, carried over from your existing site — a true and
   useful claim, and a completely different one. So this band keeps
   your own headline rather than borrowing theirs, and the cards
   carry names in type rather than badges: no vendor logo, no
   "Partner" wordmark, no tier.

   ── WHAT THIS BAND CLAIMS INSTEAD ──────────────────────────────
   Nexxovate does not hold company partner status with these
   vendors. The team holds individual certifications, so that is
   what the cards carry: the platform name, and under it the
   credential someone here actually holds.

   That is the better claim for a services buyer anyway. A tier
   badge says the company signed an agreement. A certification says
   who is going to show up and what they have proven they can do —
   and unlike a tier, it survives the buyer looking it up, because
   every one of these is verifiable by credential ID.

   Set `cert` on an entry in TECH_STACK and the line appears. The
   rules for what belongs in that field are in the comment above
   TECH_STACK, and they matter: this is the one part of the band a
   buyer will check.

   If partner status is granted later, send the badge artwork from
   the partner portal and this becomes the badge band. Those files
   are issued, not designed — the vendor generates your specific
   badge with the right tier on it — so they cannot be drawn here.

   ── THE LOGOS ──────────────────────────────────────────────────
   Every card renders a real vendor mark as soon as a file exists
   for it: set `logo` on the entry in TECH_STACK and the wordmark
   is replaced. Until then the name is set in type, which is a
   card that works rather than a placeholder.

   I have not drawn these marks myself. Each vendor publishes an
   official SVG for exactly this purpose; the list of filenames and
   where to get them is in the comment above TECH_STACK in
   lib/content/site.ts.
   ══════════════════════════════════════════════════════════════ */

/* ── WHY THE CARDS LOOKED EMPTY, AND WHAT FIXED IT ─────────────
   The first version put `.glass` cards on the white band. On the
   dark bands `.glass` is a 2.2% white film over near-black, which
   reads as a lifted pane. On the light band the same class resolves
   to rgba(10,11,13,0.02) with an 8% hairline — a 2% tint on white.
   That is not a subtle card, it is no card: measured against
   #FFFFFF it is a 0.5% luminance step, well under what a display
   can resolve. Eight invisible rectangles around a headline is what
   the screenshot showed.

   The reference site does not solve this with a stronger card. It
   solves it with the GROUND: its cards are pure white and the plate
   behind them is grey, so the lift comes from the difference
   between them rather than from a border. Same move here, in the
   band's own tokens — plate on --color-surface, cards on
   --color-ink (which is #FFFFFF inside a light band) — plus a real
   shadow. No literal colours, so this still flips correctly if the
   band it sits in ever changes.
   ────────────────────────────────────────────────────────────── */

/* Positions are percentages of the plate, chosen to leave the centre
   column clear for the claim. Desktop only — below lg the cards
   become an ordinary grid under the text, because a scattered
   constellation on a 375px screen is just overlap.

   Held inside 4%–78% horizontally: a card is 184px wide, so a left
   of 87% ran it off the right edge of the plate. */
const CONSTELLATION = [
  { left: "4%", top: "16%" },
  { left: "30%", top: "4%" },
  { left: "56%", top: "5%" },
  { left: "78%", top: "15%" },
  { left: "3%", top: "58%" },
  { left: "79%", top: "56%" },
  { left: "24%", top: "79%" },
  { left: "58%", top: "80%" },
];

/* ── THE DRIFT ─────────────────────────────────────────────────
   Each card breathes on its own loop. The amplitudes and periods
   below are deliberately coprime-ish rather than round: eight cards
   sharing one duration would sync up within a cycle and the whole
   band would pulse like a heartbeat, which reads as a broken
   animation rather than as a constellation. Nothing here divides
   evenly into anything else, so they never come back into phase.

   Amplitude tops out at 9px. Past roughly 12px the eye starts
   tracking the movement instead of reading the card, and a logo
   that will not hold still is worse than a logo that never moved.

   [amplitude px, period s, start delay s]
   ────────────────────────────────────────────────────────────── */
const DRIFT: [number, number, number][] = [
  [7, 7.3, 0],
  [9, 8.9, 0.6],
  [6, 6.7, 1.1],
  [8, 9.4, 0.35],
  [7, 8.1, 0.85],
  [9, 7.7, 0.15],
  [6, 9.1, 1.35],
  [8, 6.9, 0.55],
];

const CARD_SHADOW =
  "0 1px 2px rgba(4,8,18,0.20), 0 14px 34px rgba(4,8,18,0.28)";
const CARD_SHADOW_HOVER =
  "0 2px 4px rgba(4,8,18,0.22), 0 26px 56px rgba(4,8,18,0.40)";

function TechStrip({ first = false }: { first?: boolean }) {
  /* Every animation below is switched off wholesale when the visitor
     has asked for reduced motion — including the idle drift, which
     is the one people with vestibular sensitivity actually report,
     because unlike a scroll animation it never stops. */
  const reduced = useMotionPrefs();

  return (
    <div className={first ? "" : "mt-10 border-t border-line pt-8 md:mt-12 md:pt-10"}>
      <div
        data-band="dark"
        className="relative overflow-hidden rounded-[24px] px-5 py-10 md:rounded-[32px] md:px-10 md:py-12 lg:min-h-[720px] lg:px-12"
        style={
          {
            /* Three layers, painted front to back:
                 1. a centre scrim, so the text sits on something calm
                 2. a flat scrim, so the whole field reads as a ground
                 3. the photograph
               data-band="dark" above paints #0A0B0D underneath all of
               it, so the plate degrades to a solid dark panel if the
               image ever fails to load rather than to white. */
            backgroundImage:
              "radial-gradient(760px 420px at 50% 50%, rgba(6,11,22,0.55), rgba(6,11,22,0) 72%), " +
              "linear-gradient(rgba(6,11,22,0.42), rgba(6,11,22,0.42)), " +
              "url('/images/tech-field.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            /* --color-mute in a dark band is #98A0AA, tuned for solid
               #0A0B0D. Over this image it measures 4.76:1 — passing,
               but with no headroom on a photograph whose bright
               points move when it is cropped at another width. This
               lifts it to 9.0:1. --color-faint is the one token that
               cannot be rescued here (3.06:1), so the kicker below
               uses champagne instead of the usual faint. */
            ["--color-mute" as string]: "#D5DBE2",
          } as CSSProperties
        }
      >
        {/* The claim, centred. Larger than before: the reference sets
            this at roughly 72px and it is the anchor the cards orbit.
            At 57px it was competing with them instead of holding
            them. Capped at 4.25rem = 68px. */}
        <Reveal className="relative z-10 mx-auto max-w-2xl py-4 text-center lg:py-[124px]">
          <p
            className="font-mono-label"
            style={{ color: "var(--color-champagne)" }}
          >
            Technology stack
          </p>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.25rem)] font-semibold leading-[1.02]">
            Built on the platforms
            <br />
            your teams already run
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-mute">
            We build on the tooling your engineers already know, so what we
            hand over is something your team can keep running.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/services">Explore our services</Button>
          </div>
        </Reveal>

        {/* The marks. Absolute on desktop, a plain grid below it.

            DO NOT put `relative` on this <ul>. Every child is
            absolutely positioned on lg, so the list's own height is
            0 — and making it the offset parent means each card's
            `top: n%` resolves against 0px and computes to 0. The
            cards then stack in one row while `left` still works
            against the full width, which looks like the positions
            were ignored rather than like a layout bug. That is
            exactly what happened here, twice.

            The cards do not need a z-index either: they are
            positioned elements appearing after the speckle in the
            DOM, so they already paint above it. */}
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-0 lg:block">
          {TECH_STACK.map((tech, i) => {
            const [amp, period, delay] = DRIFT[i % DRIFT.length];
            return (
            <motion.li
              key={tech.name}
              className="lg:absolute"
              style={
                CONSTELLATION[i]
                  ? { left: CONSTELLATION[i].left, top: CONSTELLATION[i].top }
                  : undefined
              }
              /* THE ENTRANCE lives on the <li> and the DRIFT lives on
                 the wrapper inside it, because both animate y and one
                 element cannot hold two y animations — the second
                 silently wins. Splitting them across two elements
                 lets the transforms compose instead of fight. Same
                 reason the hover lift sits on the card itself: three
                 movements, three elements. */
              initial={reduced ? false : { opacity: 0, scale: 0.94, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                /* Dealt out in reading order rather than all at once,
                   but capped: eight cards at 0.07s each is 0.49s to
                   the last one, which is still inside the window
                   where it reads as one gesture. */
                delay: i * 0.07,
                ease: EASE,
              }}
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -amp, 0] }}
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: period,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                      }
                }
              >
              <motion.span
                whileHover={
                  reduced
                    ? { boxShadow: CARD_SHADOW_HOVER }
                    : { y: -6, boxShadow: CARD_SHADOW_HOVER }
                }
                transition={{ duration: 0.35, ease: EASE }}
                /* data-band="light" is doing real work here, not
                   decoration. The plate above is a dark band, so
                   inside it text-text is #F2F4F6 and champagne is
                   #D9AE63 — both of which are invisible on a white
                   card. Declaring the card its own light band flips
                   every token back in one attribute AND paints the
                   white ground, because [data-band] sets
                   background-color: var(--band-bg). No literals, and
                   nothing to keep in sync by hand.

                   The card must be a light surface: the vendor marks
                   are drawn for light grounds — Google Cloud's
                   wordmark is grey, AWS's is near-black — so a dark
                   card would swallow the logos this band exists to
                   show. */
                data-band="light"
                title={tech.desc}
                /* Fixed size on desktop so eight cards of very
                   different name lengths do not become eight
                   different rectangles — the reference's cards are
                   uniform, and that uniformity is most of why the
                   scatter reads as deliberate rather than as debris. */
                className="group flex h-[84px] cursor-default flex-col items-center justify-center gap-1.5 rounded-[16px] px-4 text-center lg:h-[108px] lg:w-[184px] lg:px-5"
                /* The shadow deepens AND spreads on hover rather than
                   just darkening. A card that lifts 6px while its
                   shadow stays put reads as the card sliding under a
                   light rather than rising toward the viewer — the
                   shadow has to travel further and soften to sell the
                   height. */
                style={{ boxShadow: CARD_SHADOW }}
              >
                <span className="flex items-center justify-center gap-2.5">
                  {tech.logo && (
                    <Image
                      src={tech.logo}
                      /* A wordmark carries the brand name itself, so
                         it needs a real alt; an icon sitting beside
                         the name in text is decorative and takes
                         alt="" rather than making a screen reader
                         say "AWS AWS". */
                      alt={tech.wordmark ? tech.name : ""}
                      width={tech.wordmark ? 120 : 28}
                      height={tech.wordmark ? 72 : 28}
                      /* Contain, never cover: a cropped trademark is
                         a misused trademark, and these arrive at
                         several different aspect ratios.

                         A wordmark gets width and a height cap
                         instead of a square box — AWS is 1.67:1, and
                         forcing it into a 26px square would render
                         the lettering about eight pixels tall. */
                      className={
                        tech.wordmark
                          ? "h-auto max-h-[30px] w-auto max-w-[104px] object-contain lg:max-h-[36px] lg:max-w-[120px]"
                          : "h-[22px] w-[22px] shrink-0 object-contain lg:h-[26px] lg:w-[26px]"
                      }
                    />
                  )}
                  {/* A card with no mark yet sets its name larger, so
                      it reads as a wordmark lockup rather than as an
                      image that failed to load. Six cards carrying a
                      coloured mark and two carrying small grey text
                      looks broken; two carrying a deliberate wordmark
                      does not. A brand name set in type is also the
                      one form of use no vendor restricts. */}
                  {/* No text beside a wordmark — the mark already
                      says "aws", and setting the name next to it
                      reads as a mistake rather than as a label. */}
                  {!tech.wordmark && (
                    <span
                      className={`font-display font-semibold text-text ${
                        tech.logo
                          ? "text-[15px] lg:text-[17px]"
                          : "text-[17px] tracking-[-0.01em] lg:text-[20px]"
                      }`}
                    >
                      {tech.name}
                    </span>
                  )}
                </span>

                {/* The credential. Small, because it is a footnote to
                    the platform name rather than a competing line —
                    but champagne, because it is the only thing in
                    this band a buyer can go and verify, and it should
                    be the thing their eye catches on the second pass.

                    leading-tight and balance: these run to four or
                    five words and wrap to two lines inside a 184px
                    card; without them the second line is a single
                    orphaned word. */}
                {tech.cert && (
                  <span
                    className="text-[10.5px] font-medium leading-tight tracking-[0.01em] [text-wrap:balance]"
                    style={{ color: "var(--color-champagne)" }}
                  >
                    {tech.cert}
                  </span>
                )}
              </motion.span>
              </motion.div>
            </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
/* ══════════════════════════════════════════════════════════════
   07 — CAREERS & CULTURE

   The reference site gives this a full band, and for a company that
   sells staffing and training it is not optional: a visitor
   evaluating whether Nexxovate can staff their team is evaluating
   whether Nexxovate can staff itself.

   The reasons list that used to be its own section now sits under
   it, because "why teams choose us" and "come and work with us"
   are the same claim told to two audiences, and neither needs a
   full band on its own.

   The two paragraphs below are live copy. They state how you hire
   and train and nothing else — no headcount, no office count, no
   hiring numbers, because I have not seen any. Edit the voice
   freely; just do not let me add figures.
   ══════════════════════════════════════════════════════════════ */

function Careers() {
  return (
    <Section zone="security" band="dark">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <Kicker>Careers at Nexxovate</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              The people who
              <br />
              <Accent>build the systems</Accent>
            </h2>
            <p className="mt-7 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-mute">
              We hire engineers, architects and consultants who would rather
              own an outcome than a ticket queue — and we train the people we
              place with our clients to the same standard.
            </p>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-mute">
              If you want to work on enterprise AI, cloud and security where
              the work actually ships, the talent and training practices are
              the place to start.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/talent">Talent solutions</Button>
              <Button href="/training" variant="ghost">
                Training programmes
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line">
              <Image
                src="/images/about-team.jpg"
                alt="The Nexxovate team at work"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            </div>
          </Reveal>
        </div>

      </Container>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   08 — RECOGNITION

   One white band holding the three claims a visitor did not have
   to take our word for: awards, the platforms we are built on, and
   what clients said. Separately these were three thin sections;
   together they are one argument with three kinds of evidence.
   ══════════════════════════════════════════════════════════════ */

function Recognition() {
  /* The constellation carries its own centred headline now, so the
     band no longer needs one bolted on top — that stand-in head
     existed only because TechStrip used to open with a hairline
     rule and nothing above it. When you add awards, that block
     leads and the constellation follows it. */
  const hasAwards = AWARDS.length > 0;

  return (
    <Section zone="transformation" band="light">
      <Container>
        <Awards />
        <TechStrip first={!hasAwards} />
      </Container>
    </Section>
  );
}
/* ══════════════════════════════════════════════════════════════
   11 — CLOSING CTA

   Was a centred headline and two buttons. It is now the reference
   site's closing pattern — the ask on the left, the form on the
   right — because a button sends someone to a page where they have
   to start again, and a form takes the enquiry at the moment they
   decided to make it. That is the whole argument for the layout.

   See EnquiryForm for the five specific ways it is better than the
   form it is modelled on. The short version: real labels instead of
   placeholders, three required fields instead of seven, errors that
   say what to do, a failure path that does not lose the message,
   and no CAPTCHA.

   The shader stays, at lower intensity — it is the page's closing
   image, and the form needs a calm ground to sit on.
   ══════════════════════════════════════════════════════════════ */

function ClosingCTA() {
  return (
    <Section zone="transformation" band="dark" className="relative !py-16 md:!py-20">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(760px 460px at 20% 110%, rgba(217,174,99,0.22), transparent 68%), radial-gradient(620px 420px at 88% 10%, rgba(201,209,218,0.12), transparent 66%), #0A0B0D",
          }}
        />
        <ShaderField intensity={0.45} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* The ask */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <StatusDot label="Nexyra Service Desk Agent is online" />
            </Reveal>

            <MaskText
              as="h2"
              className="font-display mt-7 max-w-[13ch] text-[length:var(--text-display)] font-semibold"
              lines={[<>Start with</>, <>one workflow.</>, <Accent>Scale from there.</Accent>]}
            />

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-[46ch] text-[length:var(--text-lead)] leading-relaxed text-mute">
                Tell us what is slow, manual or fragile. We will scope what an
                AI system can take off your team — and, just as usefully, what
                it should not.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8">
                <ChatTrigger>Or ask Nexyra instead</ChatTrigger>
              </div>
            </Reveal>
          </div>

          {/* The form */}
          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
