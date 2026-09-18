"use client";

/* ============================================================
   Stage — the single entry point for every WebGL surface.

   Owns the whole downgrade path so no scene has to think about it:
     · no WebGL, reduced motion or low-power device → static frame
     · offscreen → the render loop stops entirely
     · everywhere → clamped DPR, colour-managed, cleaned up on unmount
   ============================================================ */

import { Suspense, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";

import { useCapability, useNearViewport } from "./useCapability";

export type StageProps = {
  children: ReactNode;
  /** shown instead of the canvas on constrained devices */
  fallback?: ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  className?: string;
  /** keep rendering even when scrolled past — almost never wanted */
  alwaysOn?: boolean;
  dprMax?: number;
};

export default function Stage({
  children,
  fallback = null,
  camera = { position: [0, 0, 9], fov: 42 },
  className = "absolute inset-0",
  alwaysOn = false,
  dprMax = 1.75,
}: StageProps) {
  const host = useRef<HTMLDivElement>(null);
  const near = useNearViewport(host, "220px");
  const cap = useCapability();

  const canRender = cap.ready && cap.cinematic;

  return (
    <div ref={host} className={className}>
      {!canRender && fallback}

      {canRender && (
        <Canvas
          dpr={[1, cap.compact ? Math.min(dprMax, 1.5) : dprMax]}
          camera={{ position: camera.position, fov: camera.fov ?? 42, near: 0.1, far: 220 }}
          frameloop={alwaysOn || near ? "always" : "never"}
          gl={{
            antialias: !cap.compact,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            scene.fog = new THREE.FogExp2("#05060a", 0.024);
          }}
          style={{ pointerEvents: "none" }}
        >
          <Suspense fallback={null}>
            {children}
            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated={false} />
        </Canvas>
      )}
    </div>
  );
}

/** Shared helper so scenes can size points consistently. */
export function getPixelRatio() {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, 2);
}
