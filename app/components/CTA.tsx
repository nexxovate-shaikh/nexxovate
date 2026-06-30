"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassButton from "./GlassButton";
import SparkleField from "./SparkleField";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#04040A] py-36 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/60 via-fuchsia-900/40 to-amber-500/20" />
      <motion.div
        className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]"
        animate={{x:[0,80,0],y:[0,-40,0]}}
        transition={{duration:18,repeat:Infinity,ease:"easeInOut"}}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[120px]"
        animate={{x:[0,-60,0],y:[0,30,0]}}
        transition={{duration:20,repeat:Infinity,ease:"easeInOut"}}
      />
      <SparkleField count={16} />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-violet-300">
          Let&apos;s Build the Future
        </p>

        <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-black leading-tight lg:text-7xl">
          Ready to Transform Your Business
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            with Enterprise AI?
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
          Build intelligent platforms, autonomous workflows and secure cloud
          ecosystems with Nexxovate.
        </p>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-5">
          <GlassButton href="/contact">Schedule a Consultation</GlassButton>

          <Link
            href="/services"
            className="rounded-full border border-white/10 bg-white/5 px-10 py-5 text-lg font-semibold backdrop-blur-xl transition hover:border-violet-400"
          >
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
