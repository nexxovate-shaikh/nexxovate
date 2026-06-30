"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";

import AIParticles from "./components/AIParticles";
import AIGlowBackground from "./components/AIGlowBackground";
import AIStats from "./components/AIStats";
import AICoreBackground from "./components/AICoreBackground";

/* ----------------------------------------------------------------
   Type system
   - Sora: bold display face for headlines (geometric, confident)
   - Inter: body copy (neutral, highly legible)
   - JetBrains Mono: kickers / labels / data (technical counterpoint)
---------------------------------------------------------------- */
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/* ----------------------------------------------------------------
   Motion tokens
---------------------------------------------------------------- */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ----------------------------------------------------------------
   Small composable motion primitives
---------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerParent}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

function GradientWord({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-[length:200%_auto] bg-gradient-to-r from-[#7C3AED] via-[#C026D3] to-[#FF5FA8] ${className}`}
      animate={
        reduce ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
      }
      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 14, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 14, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tilt — subtle 3D perspective tilt that follows the cursor within a
 * card. Adds tactile, premium depth to hover states without being a
 * gimmick: rotation is capped low (±5deg) and springs back smoothly.
 */
function Tilt({
  children,
  className = "",
  max = 5,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 36, damping: 18, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 36, damping: 18, mass: 0.8 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  if (reduce) return null;

  return (
    <div
      className="absolute inset-0 z-[1] hidden md:block"
      onMouseMove={handleMove}
    >
      <motion.div
        style={{ left: sx, top: sy }}
        className="pointer-events-none absolute h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_#FF5FA8_0%,_transparent_70%)] opacity-25 blur-3xl"
      />
    </div>
  );
}

/**
 * SiteCursor — a small dual-ring custom cursor (dot + lagging outer
 * ring) that tracks the viewport. Desktop only, respects reduced
 * motion, and never blocks clicks. Premium sites almost always
 * replace the default cursor with something this understated.
 */
function SiteCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  React.useEffect(() => {
    if (reduce) return;
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.div
        style={{ left: x, top: y }}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E0289C]"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C3AED]/40"
      />
    </div>
  );
}

/**
 * Grain — a faint animated film-grain texture laid over the whole
 * page at very low opacity. This single layer is what separates a
 * "clean website" from something that feels tactile and premium;
 * pure CSS, no image asset.
 */
function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.025] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function AmbientField({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -top-32 left-[-12%] h-[520px] w-[520px] rounded-full bg-[#7C3AED]/[0.10] blur-[120px]"
        animate={
          reduce
            ? {}
            : { x: [0, 60, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 0.94, 1] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] right-[-6%] h-[480px] w-[480px] rounded-full bg-[#E0289C]/[0.09] blur-[120px]"
        animate={
          reduce
            ? {}
            : { x: [0, -50, 40, 0], y: [0, 30, -25, 0], scale: [1, 0.92, 1.1, 1] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#FF5FA8]/[0.07] blur-[110px]"
        animate={
          reduce
            ? {}
            : { x: [0, 30, -20, 0], y: [0, 20, -15, 0], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#7C3AED] via-[#C026D3] to-[#FF5FA8]"
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.3em] text-white/80 [font-family:var(--font-mono)]">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#C084FC] to-[#FF8AC4]" />
      {children}
    </span>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-gradient-to-r from-[#7C3AED] to-[#E0289C]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6D28D9] [font-family:var(--font-mono)]">
        {children}
      </span>
    </div>
  );
}

function ArrowLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`group/link inline-flex items-center gap-2 ${className}`}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/link:w-full" />
      </span>
      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
        →
      </span>
    </span>
  );
}

/* ----------------------------------------------------------------
   Content
---------------------------------------------------------------- */
const CAPABILITIES = [
  {
    title: "AI Automation",
    desc: "Automate repetitive workflows and streamline operations with intelligent AI systems that improve efficiency and reduce manual work.",
  },
  {
    title: "AI Assistants",
    desc: "Deploy conversational AI assistants that support customers and internal teams 24/7 with accurate information and task automation.",
  },
  {
    title: "Cloud Platforms",
    desc: "Design and implement secure, scalable cloud platforms optimized for enterprise reliability and high-performance workloads.",
  },
  {
    title: "Custom AI Products",
    desc: "Build intelligent SaaS platforms and AI-driven products tailored to unique business challenges and innovation initiatives.",
  },
];

const CASE_STUDIES = [
  {
    title: "AI Customer Support Assistant",
    img: "/images/ai-assistant.jpg",
    desc: "Conversational AI assistant automating customer support requests and reducing response times across digital channels.",
  },
  {
    title: "Business Workflow Automation",
    img: "/images/automation.jpg",
    desc: "Enterprise automation platform processing documents, extracting data and orchestrating operational workflows.",
  },
  {
    title: "AI Analytics Dashboard",
    img: "/images/dashboard.jpg",
    desc: "AI-powered analytics platform transforming operational data into predictive insights and intelligent decisions.",
  },
];

const PLATFORMS = [
  {
    title: "Nexxovate AI Agent",
    desc: "Enterprise knowledge assistant capable of understanding company documents, systems and operational workflows to provide instant intelligence.",
  },
  {
    title: "Automation Engine",
    desc: "Advanced workflow automation platform connecting enterprise systems and orchestrating complex processes without manual intervention.",
  },
  {
    title: "Intelligence Dashboard",
    desc: "AI-powered analytics platform transforming operational data into predictive insights and strategic decision intelligence.",
  },
];

const REASONS = [
  {
    title: "Enterprise-First Architecture",
    desc: "Every solution is engineered for scalability, reliability and security to meet the demands of modern enterprise environments.",
  },
  {
    title: "AI-Driven Innovation",
    desc: "We design intelligent automation platforms and AI-powered systems that transform operational workflows and decision-making.",
  },
  {
    title: "Strategic Technology Partnership",
    desc: "Beyond implementation, Nexxovate partners with organizations long-term to continuously scale capabilities and innovation.",
  },
];

const SERVICES = [
  {
    title: "IT & Managed Infrastructure",
    img: "/images/cloud.jpg",
    desc: "Modern cloud infrastructure, platform reliability and scalable technology operations.",
  },
  {
    title: "AI & Intelligent Automation",
    img: "/images/ai.jpg",
    desc: "AI assistants, workflow automation and intelligent systems that eliminate manual work.",
  },
  {
    title: "Cybersecurity & Risk Protection",
    img: "/images/cyber.jpg",
    desc: "Advanced threat protection, governance frameworks and resilient security architecture.",
  },
  {
    title: "Digital Transformation",
    img: "/images/office.jpg",
    desc: "Modernizing business platforms and operations using cloud-native technologies.",
  },
  {
    title: "Technology Talent Solutions",
    img: "/images/team.jpg",
    desc: "High-impact engineering talent and specialized technical teams for critical initiatives.",
  },
  {
    title: "Training & Capability Development",
    img: "/images/training.jpg",
    desc: "Upskilling teams with modern technology, AI and cloud engineering practices.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Discover",
    desc: "Understand business goals, systems, workflows and operational challenges.",
  },
  {
    title: "Design",
    desc: "Architect AI systems, cloud platforms and automation strategies.",
  },
  {
    title: "Build",
    desc: "Develop, integrate and deploy intelligent solutions using modern engineering.",
  },
  {
    title: "Scale",
    desc: "Optimize systems and expand capabilities for long-term growth.",
  },
];

const TECH_STACK = [
  { name: "AWS", desc: "Scalable cloud infrastructure and secure deployments" },
  { name: "Azure", desc: "Enterprise cloud architecture and Microsoft ecosystem integration" },
  { name: "Google Cloud", desc: "Data platforms and AI-powered cloud solutions" },
  { name: "React", desc: "High-performance web applications and modern interfaces" },
  { name: "Node.js", desc: "Scalable backend systems and API development" },
  { name: "Python", desc: "AI, automation and intelligent data processing" },
  { name: "Kubernetes", desc: "Container orchestration and resilient infrastructure" },
  { name: "Docker", desc: "Containerized deployments and microservice environments" },
];

/* ----------------------------------------------------------------
   Page
---------------------------------------------------------------- */
export default function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      className={`${sora.variable} ${inter.variable} ${mono.variable} relative overflow-x-hidden bg-white text-[#140B22] [font-family:var(--font-body)] selection:bg-[#7C3AED]/20 selection:text-[#2B0B4E]`}
    >
      <ScrollProgress />
      <SiteCursor />
      <Grain />

      {/* HERO */}
      <section className="relative min-h-[94svh] flex items-center text-white overflow-hidden">
        <AIGlowBackground />
        <AICoreBackground />

        <div className="absolute inset-0 z-0">
          <AIParticles />
        </div>

        <Image
          src="/images/hero-tech.jpg"
          alt="Enterprise Technology"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#2B0B4E]/92 via-[#7C2D9A]/78 to-[#E0289C]/55" />
        {/* fine vignette for cinematic depth at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35)_100%)]" />

        <CursorGlow />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
            <motion.div initial="hidden" animate="show" variants={staggerParent}>
              <motion.div variants={fadeUp}>
                <Eyebrow>AI · Cloud · Cybersecurity · Enterprise Platforms</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-10 max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.97] tracking-tight [font-family:var(--font-display)]"
              >
                AI Solutions That Automate Work
                <GradientWord className="block mt-2">
                  and scale modern enterprises
                </GradientWord>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-xl text-lg leading-relaxed text-white/75"
              >
                Nexxovate helps organizations implement AI automation, modern
                cloud infrastructure and secure digital platforms that improve
                operational efficiency and accelerate business growth.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
              >
                <Magnetic>
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-[#7C3AED] to-[#E0289C] px-8 py-4 font-medium text-white shadow-[0_8px_30px_-8px_rgba(224,40,156,0.6)] transition-shadow hover:shadow-[0_12px_45px_-6px_rgba(224,40,156,0.85)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <span className="relative">Book AI Consultation</span>
                  </Link>
                </Magnetic>

                <Link
                  href="/services"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  <ArrowLink>Explore Solutions</ArrowLink>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 md:flex"
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: EASE }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] [font-family:var(--font-mono)]">
            Scroll
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      <Reveal>
        <AIStats />
      </Reveal>

      {/* WHAT NEXXOVATE DELIVERS — editorial numbered rows */}
      <section className="relative py-32 md:py-40 bg-white overflow-hidden">
        <AmbientField />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-10 md:grid-cols-2 md:items-end mb-16 md:mb-24">
            <Reveal>
              <Kicker>Enterprise AI Capabilities</Kicker>
              <h2 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] [font-family:var(--font-display)]">
                What Nexxovate
                <GradientWord className="block">Delivers</GradientWord>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-gray-600 leading-relaxed md:max-w-md md:ml-auto md:text-right">
                Enterprise-grade AI platforms, intelligent automation systems
                and secure cloud architecture designed to improve efficiency,
                scalability and operational performance.
              </p>
            </Reveal>
          </div>

          <StaggerGrid className="border-t border-gray-200">
            {CAPABILITIES.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="group grid grid-cols-[56px_1fr] md:grid-cols-[120px_1fr_56px] items-center gap-6 md:gap-10 border-b border-gray-200 py-9 md:py-12"
                >
                  <span className="text-3xl md:text-5xl font-bold text-gray-200 transition-colors duration-300 group-hover:text-[#7C3AED]/30 tabular-nums [font-family:var(--font-display)]">
                    0{i + 1}
                  </span>

                  <div>
                    <h3 className="text-xl md:text-3xl font-semibold tracking-tight [font-family:var(--font-display)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <span className="hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#E0289C] group-hover:text-white group-hover:shadow-[0_8px_24px_-6px_rgba(124,58,237,0.55)]">
                    →
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CASE STUDIES — bento-style image-led tiles, captions on image */}
      <section className="relative py-32 md:py-40 bg-[#FBF7FE] overflow-hidden">
        <AmbientField />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="max-w-2xl mb-16 md:mb-20">
            <Kicker>Selected Work</Kicker>
            <h2 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] [font-family:var(--font-display)]">
              Solutions
              <GradientWord className="block">We&apos;ve Built</GradientWord>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Examples of intelligent platforms and automation systems
              designed to improve operational efficiency, accelerate insights
              and transform enterprise workflows.
            </p>
          </Reveal>

          <StaggerGrid className="grid gap-6 md:grid-cols-3 md:[grid-template-rows:repeat(2,320px)]">
            {CASE_STUDIES.map((item, i) => (
              <StaggerItem
                key={i}
                className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <Tilt max={3} className="h-full">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="group relative h-full min-h-[320px] overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(20,11,34,0.06)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-20px_rgba(124,58,237,0.45)]"
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#140B22]/90 via-[#140B22]/25 to-transparent" />
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#7C3AED]/25 to-[#E0289C]/25" />
                    {/* inner border glow on hover for premium polish */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-white/15" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-white/70 [font-family:var(--font-mono)]">
                        Case study
                      </span>
                      <h3 className="mt-3 max-w-sm text-2xl md:text-3xl font-semibold text-white [font-family:var(--font-display)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 opacity-0 transition duration-500 group-hover:opacity-100">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </Tilt>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* AI PLATFORMS — hairline triptych */}
      <section className="relative py-32 md:py-40 bg-white overflow-hidden">
        <AmbientField />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="max-w-2xl mb-16 md:mb-24">
            <Kicker>AI Product Platform</Kicker>
            <h2 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] [font-family:var(--font-display)]">
              Nexxovate
              <GradientWord className="block">AI Platforms</GradientWord>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              A suite of intelligent platforms designed to automate
              enterprise operations, accelerate decision-making and unlock
              powerful insights from organizational data.
            </p>
          </Reveal>

          <StaggerGrid className="grid md:grid-cols-3 divide-y divide-gray-200 md:divide-y-0 md:divide-x">
            {PLATFORMS.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="py-10 first:pt-0 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  <span className="text-sm font-semibold text-[#6D28D9] [font-family:var(--font-mono)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight [font-family:var(--font-display)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* WHY NEXXOVATE — sticky heading + hairline list */}
      <section className="relative py-32 md:py-40 bg-[#FBF7FE] overflow-hidden">
        <AmbientField />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="md:sticky md:top-32">
                <Kicker>Trusted Technology Partner</Kicker>
                <h2 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] [font-family:var(--font-display)]">
                  Why organizations
                  <GradientWord className="block">choose Nexxovate</GradientWord>
                </h2>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Nexxovate combines enterprise technology expertise,
                  intelligent automation and modern engineering practices to
                  deliver scalable, secure and high-impact digital solutions.
                </p>
              </div>
            </Reveal>

            <StaggerGrid className="flex flex-col">
              {REASONS.map((item, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group border-t border-gray-200 py-9 first:border-t-0 md:py-11"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-semibold text-[#6D28D9] [font-family:var(--font-mono)]">
                        0{i + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight transition-colors [font-family:var(--font-display)] group-hover:text-[#7C3AED]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </section>

      {/* SERVICES — cinematic bento image tiles */}
      <section className="relative py-32 md:py-40 bg-white overflow-hidden">
        <AmbientField />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="max-w-2xl mb-16 md:mb-24">
            <Kicker>Enterprise Technology Services</Kicker>
            <h2 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] [font-family:var(--font-display)]">
              Technology capabilities that power
              <GradientWord className="block">modern organizations</GradientWord>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Nexxovate combines AI innovation, cloud architecture,
              cybersecurity expertise and digital transformation capabilities
              to help organizations operate faster, smarter and more
              securely.
            </p>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((item, i) => (
              <StaggerItem
                key={i}
                className={i === 0 ? "sm:col-span-2 md:col-span-2" : ""}
              >
                <Tilt max={3}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`group relative overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(20,11,34,0.06)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-20px_rgba(124,58,237,0.45)] ${
                      i === 0 ? "min-h-[340px] md:min-h-[420px]" : "min-h-[280px]"
                    }`}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B0B4E]/85 via-[#2B0B4E]/30 to-transparent" />
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#7C3AED]/25 via-transparent to-[#E0289C]/25" />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-white/15" />

                    <div className="absolute bottom-0 p-7 text-white">
                      <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#C084FC] to-[#FF8AC4]" />
                      <h3 className="mt-5 text-xl md:text-2xl font-semibold [font-family:var(--font-display)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-200">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </Tilt>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* HOW NEXXOVATE WORKS — sequential process, draw-in connector */}
      <section className="relative py-28 md:py-36 bg-[#FBF7FE] overflow-hidden">
        <AmbientField />
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Kicker>The Process</Kicker>
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight [font-family:var(--font-display)]">
              How Nexxovate Works
            </h2>
            <p className="mt-4 text-gray-600">
              Our structured approach ensures every transformation initiative
              delivers measurable business impact.
            </p>
          </Reveal>

          <div className="relative mt-20">
            <div className="absolute top-8 left-0 right-0 h-px bg-gray-200 hidden md:block" />

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute top-8 left-0 right-0 h-px origin-left bg-gradient-to-r from-[#7C3AED] via-[#C026D3] to-[#FF5FA8] hidden md:block"
            />

            <StaggerGrid className="grid md:grid-cols-4 gap-12 relative">
              {PROCESS_STEPS.map((step, i) => (
                <StaggerItem key={i} className="group text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 bg-white text-lg font-bold transition-colors duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#E0289C] group-hover:text-white group-hover:shadow-[0_10px_30px_-6px_rgba(124,58,237,0.6)] [font-family:var(--font-display)]"
                  >
                    {i + 1}
                  </motion.div>

                  <h3 className="mt-5 font-semibold text-lg transition-colors [font-family:var(--font-display)] group-hover:text-[#7C3AED]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </section>

      {/* EXPERTISE — continuous marquee strip */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <AmbientField />
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20 relative z-10">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Kicker>Technology Stack</Kicker>
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold [font-family:var(--font-display)]">
              Our Technology Expertise
            </h2>
            <p className="mt-4 text-gray-600 md:text-lg">
              Platforms and technologies powering enterprise-grade delivery.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-40 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-40 bg-gradient-to-l from-white to-transparent" />

          <div
            className={`flex w-max gap-16 md:gap-24 ${
              reduceMotion
                ? ""
                : "[animation:marquee_32s_linear_infinite] hover:[animation-play-state:paused]"
            }`}
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div key={i} className="flex shrink-0 flex-col items-start">
                <span className="text-2xl md:text-4xl font-bold tracking-tight text-[#140B22]/85 [font-family:var(--font-display)]">
                  {tech.name}
                </span>
                <span className="mt-1 max-w-[220px] text-xs md:text-sm text-gray-500">
                  {tech.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-[#2B0B4E] via-[#7C2D9A] to-[#E0289C] text-white py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <motion.div
            className="absolute -left-20 top-0 w-72 h-72 bg-[#FF5FA8]/30 blur-[100px] rounded-full"
            animate={
              reduceMotion
                ? {}
                : { x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }
            }
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-72 h-72 bg-[#7C3AED]/30 blur-[100px] rounded-full"
            animate={
              reduceMotion
                ? {}
                : { x: [0, -40, 30, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }
            }
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        {/* vignette for cinematic depth, matching the hero */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />

        <Reveal className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.02] [font-family:var(--font-display)]">
            Ready to implement AI in your organization?
          </h2>

          <p className="mt-6 text-lg text-white/80">
            Let&apos;s design a roadmap for AI automation and enterprise
            platforms.
          </p>

          <div className="mt-10 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-10 py-4 font-medium text-[#2B0B4E] shadow-[0_15px_45px_-10px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_20px_60px_-8px_rgba(0,0,0,0.6)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#7C3AED]/10 to-[#E0289C]/10 transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative">Schedule a Consultation</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
