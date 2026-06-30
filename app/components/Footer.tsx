"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CircuitLines from "./CircuitLines";

const links = [
  {
    title: "Company",
    items: ["About", "Services", "Careers", "Contact"],
  },
  {
    title: "Solutions",
    items: ["Enterprise AI", "Cloud", "Cybersecurity", "Automation"],
  },
  {
    title: "Resources",
    items: ["Insights", "Case Studies", "Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030307] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,.15),transparent_60%)]" />
      <CircuitLines opacity={0.04} pulses={1} />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Nexxovate"
                width={64}
                height={64}
              />
              <div>
                <h2 className="text-3xl font-black">Nexxovate</h2>
                <p className="mt-1 text-zinc-400">
                  Building the Future of Enterprise AI
                </p>
              </div>
            </div>

            <p className="mt-8 max-w-md leading-8 text-zinc-400">
              Intelligent enterprise platforms, AI automation, cloud engineering
              and cybersecurity for modern global organizations.
            </p>

            <div className="mt-10 flex gap-4">
              {["X","in","GH"].map((i)=>(
                <motion.div
                  whileHover={{y:-5}}
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                  {i}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {links.map((group)=>(
              <div key={group.title}>
                <h3 className="mb-5 text-lg font-bold">{group.title}</h3>

                <div className="space-y-4">
                  {group.items.map(item=>(
                    <Link
                      key={item}
                      href="#"
                      className="block text-zinc-400 transition hover:text-white">
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 Nexxovate. All Rights Reserved.</p>
          <p>Designed for the Future of AI.</p>
        </div>
      </div>
    </footer>
  );
}
