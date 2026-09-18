"use client";

import { useEffect, useState } from "react";

export type Capability = {
  /** resolved after mount — null while unknown */
  ready: boolean;
  /** user asked for calm */
  reducedMotion: boolean;
  /** small viewport or coarse pointer — simplify expensive effects */
  compact: boolean;
  /** device can't reasonably carry a WebGL scene */
  lowPower: boolean;
  /** WebGL is actually available in this browser */
  webgl: boolean;
  /** convenience: render the full 3D experience */
  cinematic: boolean;
};

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * One place that decides how much of the cinematic layer a given
 * device and person should receive. Every WebGL surface reads from
 * this so the downgrade path is consistent across the site.
 */
export function useCapability(): Capability {
  const [state, setState] = useState<Capability>({
    ready: false,
    reducedMotion: false,
    compact: false,
    lowPower: false,
    webgl: true,
    cinematic: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = window.matchMedia("(max-width: 900px)");

    const evaluate = () => {
      const reducedMotion = motionQuery.matches;
      const compact = compactQuery.matches;

      const cores =
        typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
          ? navigator.hardwareConcurrency || 4
          : 4;

      const memory =
        typeof navigator !== "undefined" &&
        "deviceMemory" in navigator &&
        typeof (navigator as Navigator & { deviceMemory?: number })
          .deviceMemory === "number"
          ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory!
          : 8;

      const webgl = detectWebGL();
      const lowPower = cores <= 4 && memory <= 4;

      setState({
        ready: true,
        reducedMotion,
        compact,
        lowPower,
        webgl,
        cinematic: webgl && !reducedMotion && !lowPower,
      });
    };

    evaluate();

    motionQuery.addEventListener("change", evaluate);
    compactQuery.addEventListener("change", evaluate);

    return () => {
      motionQuery.removeEventListener("change", evaluate);
      compactQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return state;
}

/** Tracks whether an element is close enough to the viewport to be worth rendering. */
export function useNearViewport<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  rootMargin = "300px"
) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return near;
}
