"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/lib/content/site";
import { useMotionPrefs, useScrollSubscription, EASE } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   Navigation.

   Rewritten rather than restyled. The previous version linked to
   /solutions and /careers — neither route exists, so both 404 —
   and omitted Staffing, Training and Insights, which do exist and
   were in the sitemap. Routes now come from lib/content/site.ts,
   so the nav and the sitemap cannot drift apart again.
   ══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const pathname = usePathname();
  const reduced = useMotionPrefs();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  /* Hide on scroll down, reveal on scroll up. Subscribes to the
     shared loop and only calls setState when the answer actually
     changes, so this does not re-render 60 times a second. */
  useScrollSubscription(({ y, direction }) => {
    setScrolled((prev) => (prev !== y > 24 ? y > 24 : prev));
    setHidden((prev) => {
      const next = direction === 1 && y > 240;
      return prev !== next ? next : prev;
    });
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close everything on navigation. */
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  /* Escape closes the open dropdown — keyboard users need a way
     out that is not clicking elsewhere. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[65]"
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
      onMouseLeave={() => setMenu(null)}
    >
      <div
        className={[
          "transition-all duration-500",
          scrolled || open
            /* Was bg-ink/80 + backdrop-blur-xl + backdrop-saturate-150.
               This bar is `fixed`, so a backdrop-filter on it means
               the browser re-samples and re-blurs the strip of page
               passing underneath on EVERY scroll frame — a cost that
               runs for the entire length of a 20,000px page rather
               than once. At 95% opacity there is almost nothing
               showing through to blur anyway, so the blur was paying
               full price for a few percent of translucency. */
            ? "border-b border-line bg-ink/95"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[88px] w-full max-w-[1360px] items-center justify-between gap-6 px-6 md:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Nexxovate home">
            <Image
              src="/logo-lockup.png"
              alt="Nexxovate — Amplifying AI Intelligence"
              width={368}
              height={92}
              priority
              className="h-[42px] w-auto object-contain sm:h-[50px]"
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item.href);
              const hasPanel = Boolean(item.groups?.length);

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMenu(hasPanel ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={hasPanel ? menu === item.label : undefined}
                    className={[
                      "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[14.5px] transition-colors",
                      active ? "text-text" : "text-mute hover:text-text",
                    ].join(" ")}
                  >
                    {item.label}
                    {hasPanel && (
                      <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${
                          menu === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M1 1.5 4.5 5 8 1.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                        transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                      />
                    )}
                  </Link>

                  {/* ── Mega panel ──────────────────────────────
                      Anchored to the header, not to this link, so
                      the panel is the width of the page rather than
                      the width of the word above it. Columns carry
                      their own heading; the promoted card on the
                      right gives the menu somewhere to send people
                      who opened it without knowing what they want. */}
                  <AnimatePresence>
                    {hasPanel && menu === item.label && (
                      <motion.div
                        initial={reduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                        className="fixed inset-x-0 top-[88px] z-[64] border-b border-line bg-ink/95 backdrop-blur-2xl"
                      >
                        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-6 py-10 md:px-8 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
                          <div className="grid gap-10 sm:grid-cols-2">
                            {item.groups!.map((group) => (
                              <div key={group.title}>
                                <h3 className="font-mono-label border-b border-line pb-4 text-faint">
                                  {group.title}
                                </h3>
                                <ul className="mt-4 flex flex-col">
                                  {group.items.map((child) => (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        className="group/i flex flex-col gap-0.5 rounded-[10px] px-3 py-3 transition-colors hover:bg-white/[0.05]"
                                      >
                                        <span className="text-[15px] font-medium text-text">
                                          {child.label}
                                        </span>
                                        <span className="text-[13px] text-faint transition-colors group-hover/i:text-mute">
                                          {child.note}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {item.feature && (
                            <Link
                              href={item.feature.href}
                              className="group/f glass flex flex-col justify-between gap-8 rounded-[16px] p-8 transition-colors hover:border-white/20"
                            >
                              <div>
                                <span className="font-mono-label text-[color:var(--color-champagne)]">
                                  {item.feature.label}
                                </span>
                                <p className="font-display mt-5 text-[length:var(--text-h4)] font-semibold leading-snug text-text">
                                  {item.feature.title}
                                </p>
                                <p className="mt-3 text-[13.5px] leading-relaxed text-mute">
                                  {item.feature.note}
                                </p>
                              </div>
                              <span
                                aria-hidden="true"
                                className="text-[color:var(--color-champagne)] transition-transform duration-300 group-hover/f:translate-x-1"
                              >
                                →
                              </span>
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center lg:flex">
            {/* The pinging "online" dot lived here. In a nav bar it
                is ambient noise — it says nothing a visitor acts on.
                It earns its place beside the concierge CTA at the
                foot of the page, where it answers a real question. */}
            <Link
              href="/contact"
              className="rounded-full px-6 py-2.5 text-[15px] font-semibold transition-[filter] duration-300 hover:brightness-110"
              style={{ background: "var(--color-champagne)", color: "#0A0B0D" }}
            >
              Contact
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 bg-text transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-text transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="h-[calc(100dvh-88px)] overflow-y-auto border-t border-line bg-ink/97 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col px-6 py-8" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.04 * i, ease: EASE }}
                  className="border-b border-line-soft py-4"
                >
                  <Link
                    href={item.href}
                    className="font-display block text-[1.6rem] text-text"
                  >
                    {item.label}
                  </Link>
                  {item.groups && (
                    <div className="mt-4 flex flex-col gap-5 pl-1">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <h3 className="font-mono-label text-faint">
                            {group.title}
                          </h3>
                          <div className="mt-2.5 flex flex-col gap-2.5">
                            {group.items.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="text-[15px] text-mute"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-8 rounded-full px-6 py-4 text-center font-semibold"
                style={{ background: "var(--color-champagne)", color: "#0A0B0D" }}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
