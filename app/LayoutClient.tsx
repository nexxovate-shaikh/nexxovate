"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { ScrollRail } from "./components/visual/chrome";
import { MotionProvider, useMotionPrefs, EASE } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   Client shell.

   MotionProvider wraps everything: it owns the single scroll loop,
   the reduced-motion context and the Lenis instance. Nothing below
   it should attach its own scroll listener.

   Route transitions are mounted here. The previous providers.tsx
   had roughly the right shape but was never actually rendered by
   the layout, so page changes were hard cuts.
   ══════════════════════════════════════════════════════════════ */

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <Shell>{children}</Shell>
    </MotionProvider>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useMotionPrefs();

  // The admin panel is a different product with its own chrome.
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <div className="relative min-h-screen w-full">
      <ScrollRail />

      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={pathname}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
          className="relative z-10 w-full"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* The concierge sits outside the route transition, so it
          survives navigation with its conversation intact — closing
          it on every page change would throw away a half-finished
          lead. It positions itself; wrapping it in a fixed container
          gave its own fixed panel a competing containing block. */}
      <Chatbot />
    </div>
  );
}
