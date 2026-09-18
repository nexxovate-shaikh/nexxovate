"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   SIGNAL FIELD — the ground behind "If any of this sounds familiar".

   ── WHY THE FIRST VERSION WAS INVISIBLE ────────────────────────
   Two faults, and the second was the real one.

   1. It was too quiet. Loose dots at 0.07–0.20 alpha lifted the
      mean luminance of the band from 0.00861 to 0.00915 — a six
      per cent lift, which is not a background, it is a rounding
      error. I had tuned it against the contrast floor and tuned it
      out of existence.

   2. It could not be seen even where it existed. The six cards in
      front of it were opaque, and they cover roughly 1,500px of an
      1,844px band. The field was only ever visible in the header
      strip and the hairline gaps.

   Both are fixed here: this is a drifting node mesh at a strength
   you can actually see, and the cards in Problems() are now
   translucent over a blur so it reads through them.

   ── WHY AN ANIMATION AND NOT A VIDEO ───────────────────────────
   The first card reads "Four hundred alerts fired overnight. Three
   of them mattered", answered by "Nexyra correlates telemetry
   across the estate". So the mesh is that: a field of nodes and
   the lines between them, with exactly three lit gold at any
   moment, each pulling its own neighbours up with it. Noise, then
   correlation, then signal.

   A video would cost 1–2 MB plus a poster frame to say it less
   precisely, and would arrive with its own colour cast. This is
   ~4 KB of source, no network request, drawn in the band's own two
   colours.

   THREE. Not "a few" — three, matching the copy. If that line is
   ever rewritten, change SIGNALS to match; a background that
   quietly contradicts the sentence in front of it is worse than a
   plain one.

   ── THE CONTRAST SPLIT, MEASURED ───────────────────────────────
   The band is L 0.00861 and the mesh peaks at L 0.104 on a node
   core. Text behaves completely differently in the two zones:

   THROUGH THE CARDS — a 70% ink scrim over a blur. The blur
   flattens the peaks, so the 99.9th-percentile ground behind card
   text is L 0.0105, barely above the bare band. Body copy lands at
   7.4:1 and the small labels at 6.3:1. The mesh can be as bright
   as it likes back there.

   DIRECT, IN THE HEADER — nothing softens it, and the kicker is
   10.5px. At full strength it measures 2.46:1, which is a fail by
   a wide margin. Hence HEADER_MASK: the field is held to 26% for
   the first 210px and reaches full strength by 400px, which puts
   the kicker at 5.2:1 while still showing something behind it.

   The fade at the bottom is a different job — it joins the band
   below so the mesh does not stop at a hard horizontal line.
   ══════════════════════════════════════════════════════════════ */

const STEEL = "126,147,172";
const CHAMPAGNE = "217,174,99";

/** Matches "three of them mattered". Keep the two in step. */
const SIGNALS = 3;

/* Held down over the header, full strength below it, faded out at
   the foot. See the contrast note above for where 26% comes from. */
const HEADER_MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.26) 0, rgba(0,0,0,0.26) 210px, #000 400px, #000 calc(100% - 150px), rgba(0,0,0,0) 100%)";

type Node = { x: number; y: number; vx: number; vy: number };

type Signal = {
  target: number;
  /** Seconds into this cycle. Starts negative to stagger the three. */
  t: number;
  life: number;
};

export default function SignalField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMotionPrefs();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let radius = 200;

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const narrow = w < 640;
      radius = narrow ? 150 : 200;

      /* Density, not a fixed count: this band is 1,844px tall on
         desktop and 4,000+ on a phone, and a fixed count would be a
         thicket at one size and a scatter at the other.

         Capped at 190 because the edge pass is O(n²) — 190 nodes is
         about 18,000 distance checks a frame, which is nothing; 400
         would be 80,000, which is not. */
      const count = Math.max(
        40,
        Math.min(190, Math.round((w * h) / (narrow ? 22000 : 13000)))
      );

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        /* 3–9 px/s. Slow enough that you never catch a node moving,
           fast enough that the mesh is visibly different if you
           look back thirty seconds later. */
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
      }));
    };

    const signals: Signal[] = Array.from({ length: SIGNALS }, (_, i) => ({
      target: -1,
      t: -i * 1.7,
      life: 0,
    }));

    const retarget = (s: Signal) => {
      if (nodes.length === 0) return;
      s.target = Math.floor(Math.random() * nodes.length);
      s.t = 0;
      /* Uneven lifetimes so the three never fall into lockstep. */
      s.life = 3.6 + Math.random() * 2.8;
    };

    /* Quick to arrive, slow to leave. An alert that fades the way it
       appeared reads as a pulse; one that lingers reads as something
       being read. */
    const envelope = (t: number, life: number) => {
      if (t < 0 || t > life) return 0;
      const p = t / life;
      if (p < 0.16) return p / 0.16;
      if (p > 0.5) return 1 - (p - 0.5) / 0.5;
      return 1;
    };

    const draw = (dt: number) => {
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        /* Wrap rather than bounce. Bouncing puts every node on a
           predictable path and, worse, packs them against the edges
           over time; wrapping keeps the distribution even forever. */
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      /* Which nodes are lit, and how brightly. Resolved before the
         edge pass so an edge can be drawn gold in one go rather than
         drawn steel and then painted over. */
      const lit = new Float32Array(nodes.length);
      for (const s of signals) {
        s.t += dt;
        if (s.target === -1 || s.t > s.life) {
          retarget(s);
          continue;
        }
        const e = envelope(s.t, s.life);
        if (e > 0 && s.target < lit.length) {
          lit[s.target] = Math.max(lit[s.target], e);
        }
      }

      // ── Edges ──
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > radius * radius) continue;

          const falloff = 1 - Math.sqrt(d2) / radius;
          /* An edge takes the brighter of its two ends, so a lit
             node pulls its whole neighbourhood up — which is the
             point: correlation, not a single blinking dot. */
          const e = Math.max(lit[i], lit[j]);

          if (e > 0.01) {
            ctx.strokeStyle = `rgba(${CHAMPAGNE},${(
              falloff * (0.18 + e * 0.34)
            ).toFixed(3)})`;
          } else {
            ctx.strokeStyle = `rgba(${STEEL},${(falloff * 0.22).toFixed(3)})`;
          }
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // ── Nodes ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const e = lit[i];

        if (e > 0.01) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 30);
          glow.addColorStop(0, `rgba(${CHAMPAGNE},${(e * 0.26).toFixed(3)})`);
          glow.addColorStop(1, `rgba(${CHAMPAGNE},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 30, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle =
          e > 0.01
            ? `rgba(${CHAMPAGNE},${(0.55 + e * 0.4).toFixed(3)})`
            : `rgba(${STEEL},0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 + e * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    build();

    const ro = new ResizeObserver(() => {
      /* Watches the element, not the window: this band's height
         changes with its content, and a window listener misses a
         reflow that does not change the viewport. */
      build();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    /* Reduced motion still gets the field, drawn once and left
       alone. A blank rectangle is not an accessible version of a
       designed background, it is a missing one. */
    if (reduced) {
      for (const s of signals) retarget(s);
      draw(0);
      return () => ro.disconnect();
    }

    let visible = true;
    let last = performance.now();
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) last = performance.now();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let frame = 0;
    const loop = () => {
      const now = performance.now();
      /* Clamped: a backgrounded tab hands back a delta of several
         seconds, which would teleport every node across the band in
         a single frame. */
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) draw(dt);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ maskImage: HEADER_MASK, WebkitMaskImage: HEADER_MASK }}
    />
  );
}
