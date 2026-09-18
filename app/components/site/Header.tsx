"use client";

/* ============================================================
   Header — minimal, glass, intelligent on scroll.
   Full-bleed mega panel on desktop; a composed full-screen sheet
   on mobile rather than a shrunken copy of the desktop menu.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { NAV, BRAND } from "@/lib/brand";
import { EASE } from "./primitives";

export default function Header() {
  const pathname = usePathname();
  const calm = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);

  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* intelligent scroll: condense at 40px, retreat when moving down
     with intent, return immediately on any upward movement */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const delta = y - lastY.current;
      if (y > 320 && delta > 6) setHidden(true);
      else if (delta < -4) setHidden(false);

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  useEffect(() => {
    setSheet(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const hover = (label: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (label === null) {
      closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
    } else {
      setOpenGroup(label);
    }
  };

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openEntry = NAV.find((g) => g.label === openGroup);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: hidden && !openGroup ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[80]"
        onMouseLeave={() => hover(null)}
      >
        <div
          className="transition-[background-color,border-color,backdrop-filter] duration-500"
          style={{
            backgroundColor:
              scrolled || openGroup ? "rgba(5,6,10,0.78)" : "transparent",
            backdropFilter: scrolled || openGroup ? "blur(26px) saturate(150%)" : "none",
            WebkitBackdropFilter:
              scrolled || openGroup ? "blur(26px) saturate(150%)" : "none",
            borderBottom:
              scrolled || openGroup
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid transparent",
          }}
        >
          <div className="mx-auto flex h-[86px] max-w-[1600px] items-center justify-between px-6 md:px-10">
            {/* ---- wordmark ---- */}
            <Link href="/" className="group relative flex items-center" aria-label="Nexxovate — home">
              <Image
                src="/logo.png"
                alt="Nexxovate"
                width={260}
                height={78}
                priority
                className="h-[46px] w-auto object-contain md:h-[58px]"
              />
              <span className="ml-4 hidden h-6 w-px bg-white/12 xl:block" />
              <span className="ml-4 hidden font-mono-ui text-[0.6rem] leading-tight tracking-[0.2em] text-white/38 xl:block">
                BEYOND AUTOMATION
                <br />
                INTO AUTONOMY
              </span>
            </Link>

            {/* ---- primary nav ---- */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((group) => (
                <div key={group.label} onMouseEnter={() => hover(group.label)}>
                  <Link
                    href={group.href}
                    className="relative flex items-center gap-1.5 px-4 py-2.5 text-[0.82rem] font-medium tracking-[0.01em] transition-colors duration-300"
                  >
                    <span
                      className={
                        active(group.href) || openGroup === group.label
                          ? "text-paper"
                          : "text-mute hover:text-paper"
                      }
                    >
                      {group.label}
                    </span>
                    {group.children && (
                      <svg
                        className={`h-2.5 w-2.5 transition-transform duration-300 ${
                          openGroup === group.label ? "rotate-180 text-electric-soft" : "text-white/30"
                        }`}
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    )}
                    {active(group.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* ---- actions ---- */}
            <div className="flex items-center gap-3">
              <Link
                href="/#nexaf"
                className="hidden items-center gap-2.5 rounded-full border border-white/12 px-4 py-2.5 text-[0.75rem] font-medium text-mute transition-all duration-400 hover:border-electric/40 hover:text-paper md:inline-flex"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                Ask NEXAF
              </Link>

              <Link
                href="/contact"
                className="group relative hidden overflow-hidden rounded-full bg-paper px-6 py-3 text-[0.78rem] font-semibold tracking-[0.01em] text-void transition-transform duration-500 hover:-translate-y-0.5 sm:inline-flex"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.8),transparent)] transition-transform duration-[900ms] group-hover:translate-x-full"
                  aria-hidden
                />
                <span className="relative uppercase">{BRAND.cta}</span>
              </Link>

              <button
                onClick={() => setSheet(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/12 lg:hidden"
              >
                <span className="h-px w-4 bg-paper" />
                <span className="h-px w-4 bg-paper" />
              </button>
            </div>
          </div>
        </div>

        {/* ---- mega panel ---- */}
        <AnimatePresence>
          {openEntry?.children && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: EASE }}
              onMouseEnter={() => hover(openEntry.label)}
              className="hidden border-b border-white/[0.07] bg-[rgba(5,6,10,0.94)] backdrop-blur-2xl lg:block"
            >
              <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10 px-10 py-12">
                <div className="col-span-3">
                  <p className="kicker">{openEntry.label}</p>
                  <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-faint">
                    {openEntry.feature?.blurb ??
                      "Enterprise capability, engineered for autonomy."}
                  </p>
                  {openEntry.feature && (
                    <Link
                      href={openEntry.feature.href}
                      className="mt-6 inline-flex items-center gap-2 text-[0.8rem] text-electric-soft"
                    >
                      {openEntry.feature.title}
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>

                <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-2">
                  {openEntry.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group rounded-xl border border-transparent px-5 py-4 transition-colors duration-300 hover:border-white/[0.08] hover:bg-white/[0.025]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[0.92rem] font-medium text-paper">
                          {child.label}
                        </span>
                        {child.tag && (
                          <span className="rounded-full border border-gold/30 px-2 py-0.5 font-mono-ui text-[0.56rem] tracking-[0.14em] text-gold">
                            {child.tag.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-faint">
                        {child.blurb}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ---- mobile sheet ---- */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-void lg:hidden"
          >
            <div className="grain vignette absolute inset-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-1/4 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(77,124,255,0.35) 0%, transparent 62%)",
              }}
            />

            <div className="relative flex h-full flex-col">
              <div className="flex h-[86px] shrink-0 items-center justify-between px-6">
                <Image src="/logo.png" alt="Nexxovate" width={200} height={60} className="h-[36px] w-auto object-contain" />
                <button
                  onClick={() => setSheet(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-paper"
                >
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-10">
                {NAV.map((group, i) => (
                  <motion.div
                    key={group.label}
                    initial={calm ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="border-b border-white/[0.07] py-5"
                  >
                    <Link
                      href={group.href}
                      className="font-display text-2xl font-semibold tracking-[-0.02em] text-paper"
                    >
                      {group.label}
                    </Link>

                    {group.children && (
                      <div className="mt-3 grid gap-2">
                        {group.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-[0.86rem] text-faint"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <div className="mt-9 grid gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-paper px-6 py-4 text-center text-[0.82rem] font-semibold uppercase tracking-wide text-void"
                  >
                    {BRAND.cta}
                  </Link>
                  <Link
                    href="/#nexaf"
                    className="rounded-full border border-white/14 px-6 py-4 text-center text-[0.82rem] font-medium text-paper"
                  >
                    Ask NEXAF
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
