"use client";

/* ============================================================
   Portal media pipeline.

   Poster first, always. The cinematic clip is fetched only when a
   portal becomes active on a device that can carry it, swaps in on
   `canplay`, pauses the moment the portal loses focus or leaves the
   viewport, and disposes cleanly on unmount. A missing clip is not
   an error state — the poster simply remains.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FALLBACK = (() => {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 4;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0b0f1a";
    ctx.fillRect(0, 0, 4, 4);
  }
  return canvas;
})();

export function usePortalMedia({
  poster,
  video,
  active,
  enabled,
}: {
  poster: string;
  video?: string;
  active: boolean;
  /** false on reduced-motion / low-power — poster only, no network */
  enabled: boolean;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTexRef = useRef<THREE.VideoTexture | null>(null);
  const posterTexRef = useRef<THREE.Texture | null>(null);
  /* Clips that have already failed once.
     Without this, a clip that cannot load is retried every single
     time its portal becomes active: the effect's only early-out is
     `videoTexRef.current`, which is never set on failure, so the
     guard never fires. Six dead URLs in brand.ts turned into dozens
     of repeated 404s in the dev log.
     One failure per URL per mount is all the information there is —
     asking again cannot produce a different answer, and it costs a
     request each time a user swipes back to that portal. */
  const failedRef = useRef<Set<string>>(new Set());

  /* ---- poster ---- */
  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    loader.load(
      poster,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        posterTexRef.current = tex;
        setTexture((current) => (current && videoTexRef.current ? current : tex));
      },
      undefined,
      () => {
        if (cancelled || !FALLBACK) return;
        const tex = new THREE.CanvasTexture(FALLBACK);
        posterTexRef.current = tex;
        setTexture((current) => current ?? tex);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [poster]);

  /* ---- cinematic clip ---- */
  useEffect(() => {
    if (!enabled || !video || !active) return;
    if (videoTexRef.current) return;
    if (failedRef.current.has(video)) return;

    let cancelled = false;

    const el = document.createElement("video");
    el.src = video;
    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.preload = "auto";
    el.crossOrigin = "anonymous";
    el.setAttribute("playsinline", "");

    const onReady = () => {
      if (cancelled) return;
      const tex = new THREE.VideoTexture(el);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      videoTexRef.current = tex;
      videoRef.current = el;
      setTexture(tex);
      void el.play().catch(() => {
        /* autoplay refused — the poster stays, nothing breaks */
      });
    };

    const onFail = () => {
      /* No clip authored yet, or the file is unreachable: keep the
         poster, and remember not to ask for this one again. */
      failedRef.current.add(video);
      el.removeAttribute("src");
      el.load();
    };

    el.addEventListener("canplay", onReady, { once: true });
    el.addEventListener("error", onFail, { once: true });
    el.load();

    return () => {
      cancelled = true;
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("error", onFail);
    };
  }, [video, active, enabled]);

  /* ---- play / pause follows focus ---- */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active && enabled) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, enabled]);

  /* ---- teardown ---- */
  useEffect(() => {
    return () => {
      const el = videoRef.current;
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      videoTexRef.current?.dispose();
      posterTexRef.current?.dispose();
      videoTexRef.current = null;
      posterTexRef.current = null;
      videoRef.current = null;
    };
  }, []);

  return texture;
}
