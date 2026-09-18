"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { PROOF } from "@/lib/brand";
import { Reveal, Section, Shell, Kicker } from "./primitives";

/** Counts up only for values that are actually numeric. */
function Value({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const calm = useReducedMotion();

  const numeric = parseFloat(value);
  const isNumber = !Number.isNaN(numeric) && /^[\d.]+/.test(value);
  const suffix = value.replace(/^[\d.]+/, "");

  const [shown, setShown] = useState(isNumber && !calm ? 0 : numeric);

  useEffect(() => {
    if (!isNumber || calm || !inView) return;

    let frame: number;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(numeric * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, isNumber, numeric, calm]);

  return (
    <p ref={ref} className="font-display text-4xl font-semibold tracking-[-0.03em] text-paper md:text-5xl">
      {isNumber ? (
        <>
          {Number.isInteger(numeric) ? Math.round(shown) : shown.toFixed(1)}
          <span className="text-spine">{suffix}</span>
        </>
      ) : (
        <span className="text-spine">{value}</span>
      )}
    </p>
  );
}

export default function ProofBand() {
  return (
    <Section tone="ink" tight className="border-y border-white/[0.06]">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" />

      <Shell width="full">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <Kicker tone="gold">Delivery record</Kicker>
            <h2 className="display-md mt-5 max-w-[20ch] text-paper">
              Autonomy is only credible when it is measured.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-8 lg:grid-cols-4">
            {PROOF.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="border-l border-white/[0.09] pl-5">
                  <Value value={item.value} />
                  <p className="mt-3 max-w-[18ch] font-mono-ui text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-white/35">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </Section>
  );
}
