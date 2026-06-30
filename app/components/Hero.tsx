"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NeuralBackground from "./NeuralBackground";
import AIOrb from "./AIOrb";
import FloatingCards from "./FloatingCards";
import GlassButton from "./GlassButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#04040A] text-white">
      <NeuralBackground />
      <FloatingCards />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/30 to-[#050508]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-28 pb-16 lg:grid-cols-2 lg:px-10">

        <motion.div
          initial={{opacity:0,y:40}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8}}
        >
          <div className="mb-6 inline-flex rounded-full border border-violet-500/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-violet-200 backdrop-blur-xl">
            Enterprise AI • Cloud • Automation
          </div>

          <h1 className="max-w-3xl text-6xl font-black leading-[0.92] tracking-[-0.05em] lg:text-8xl">
            Building the
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Future of AI
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-300">
            Nexxovate engineers enterprise AI platforms, intelligent automation,
            cybersecurity and cloud ecosystems that transform organizations.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <GlassButton href="/contact">Start Your AI Journey</GlassButton>

            <Link
              href="/services"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:border-violet-400"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6">
            {[
              ["150+","Projects"],
              ["24/7","AI Agents"],
              ["99.99%","Availability"]
            ].map(([v,l])=>(
              <div key={l}>
                <div className="text-3xl font-bold">{v}</div>
                <div className="mt-1 text-sm text-zinc-400">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{opacity:0,scale:.9}}
          animate={{opacity:1,scale:1}}
          transition={{duration:1}}
          className="relative flex justify-center"
        >
          <AIOrb />
        </motion.div>
      </div>
    </section>
  );
}
