"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ══════════════════════════════════════════════════════════════
   The motion layer's plumbing.

   Two things live here, and both exist to solve problems the old
   site had:

   1. ONE reduced-motion source of truth. Previously
      useReducedMotion() was called in exactly one place (the hero
      scroll cue) and every other animation ignored the setting.
      Now every animated component reads this context, so there is
      one place to be correct rather than sixty.

   2. ONE scroll listener. Previously AIScrollAnalyzer, Navbar and
      page.tsx each attached their own scroll handler and wrote
      layout properties on every event. This publishes position
      from a single rAF-throttled loop and everything subscribes.
   ══════════════════════════════════════════════════════════════ */

/* ── Reduced motion ─────────────────────────────────────────── */

const MotionPrefsContext = createContext<boolean>(false);

/** true when the user has asked for reduced motion. */
export function useMotionPrefs() {
  return useContext(MotionPrefsContext);
}

/* ── Scroll ─────────────────────────────────────────────────── */

export type ScrollState = {
  /** Pixels from top. */
  y: number;
  /** 0–1 through the whole document. */
  progress: number;
  /** 1 = scrolling down, -1 = up, 0 = at rest. */
  direction: number;
};

type Subscriber = (s: ScrollState) => void;

const ScrollContext = createContext<{
  subscribe: (fn: Subscriber) => () => void;
  get: () => ScrollState;
} | null>(null);

/**
 * Subscribe to scroll without adding a listener.
 *
 * Pass a callback that does its own DOM writes — this deliberately
 * does not setState on every frame, because that would re-render
 * the tree 60 times a second. Components that genuinely need
 * React state (the nav's hide-on-scroll) throttle themselves to
 * state *changes* only.
 */
export function useScrollSubscription(fn: Subscriber, deps: unknown[] = []) {
  const ctx = useContext(ScrollContext);
  const saved = useRef(fn);
  saved.current = fn;

  useEffect(() => {
    if (!ctx) return;
    const unsubscribe = ctx.subscribe((s) => saved.current(s));
    // Fire once on mount so subscribers start in the right state.
    saved.current(ctx.get());
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, ...deps]);
}

/* ── Provider ───────────────────────────────────────────────── */

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const subscribers = useRef(new Set<Subscriber>());
  const state = useRef<ScrollState>({ y: 0, progress: 0, direction: 0 });

  /* Watch the media query, and keep watching — people change this
     setting mid-session, usually because a site made them ill. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* The single scroll loop. */
  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    /* Publish only when the position actually changed, plus one
       final frame at rest so subscribers can settle (that is what
       `settled` is for — without it, direction would stay 1 or -1
       forever after the last move, and anything keyed off direction
       would never reset).

       Before this the loop ran subscribers.forEach on every frame
       for the life of the page, scrolling or not. On a four-core
       machine that is main-thread work competing with the very
       thing it is measuring. */
    let settled = false;

    const tick = () => {
      const y = window.scrollY;

      if (y !== lastY || !settled) {
        const max = document.documentElement.scrollHeight - window.innerHeight;

        state.current = {
          y,
          progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
          direction: y === lastY ? 0 : y > lastY ? 1 : -1,
        };

        settled = y === lastY;
        lastY = y;
        subscribers.current.forEach((fn) => fn(state.current));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Lenis.
     Imported dynamically and inside try/catch on purpose: if the
     package is not installed the site still works on native scroll
     rather than failing to build. Never runs on touch (it fights
     the browser's own momentum) or under reduced motion. */
  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    (async () => {
      try {
        const mod = await import("lenis");
        if (cancelled) return;

        const Lenis = mod.default;
        lenis = new Lenis({
          /* 0.14, up from 0.09.

             lerp is the fraction of the remaining distance covered
             each frame, so 0.09 needs about 25 frames — over a third
             of a second — to arrive. That reads as the page dragging
             behind the wheel: you scroll, and the content keeps
             sliding after you have stopped. It is the single thing
             people mean when they say a page feels sticky.

             0.14 still smooths the step between wheel notches but
             settles in about half the time, so the page feels
             attached to the input. */
          lerp: 0.14,
          smoothWheel: true,
          syncTouch: false,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      } catch {
        // Not installed — native scroll is a perfectly good fallback.
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [reduced]);

  const api = useRef({
    subscribe: (fn: Subscriber) => {
      subscribers.current.add(fn);
      return () => {
        subscribers.current.delete(fn);
      };
    },
    get: () => state.current,
  });

  return (
    <MotionPrefsContext.Provider value={reduced}>
      <ScrollContext.Provider value={api.current}>
        {children}
      </ScrollContext.Provider>
    </MotionPrefsContext.Provider>
  );
}
