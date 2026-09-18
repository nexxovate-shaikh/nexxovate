"use client";

/* ============================================================
   HERO SCENE
   Full-frame environment: horizon, distant architecture, dust,
   the Nexus, and a camera that answers to the pointer and to
   scroll. Three depth layers, one continuous take.
   ============================================================ */

import { useEffect, useRef, useState } from "react";

import Stage, { getPixelRatio } from "./Stage";
import NexusCore from "./NexusCore";
import { Dust, Horizon, Monoliths, LightRig, CameraRig } from "./SceneEnvironment";
import { useCapability } from "./useCapability";
import type { NexusState } from "@/lib/brand";

function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* the still frame: same composition, no GPU cost */}
      <div className="absolute left-1/2 top-1/2 h-[min(78vw,560px)] w-[min(78vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(77,124,255,0.42)_0%,rgba(122,92,255,0.16)_38%,transparent_68%)] blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 h-[min(46vw,320px)] w-[min(46vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[min(58vw,400px)] w-[min(58vw,400px)] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-full border border-electric/25" />
      <div className="absolute left-1/2 top-1/2 h-[min(70vw,486px)] w-[min(70vw,486px)] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(5,6,10,1),transparent)]" />
    </div>
  );
}

export default function HeroScene({
  state = "activation",
}: {
  state?: NexusState;
}) {
  const cap = useCapability();
  const [dolly, setDolly] = useState(0);
  const raf = useRef<number | null>(null);

  /* scroll-linked dolly — the camera pushes in as the hero leaves */
  useEffect(() => {
    if (!cap.cinematic) return;

    const update = () => {
      raf.current = null;
      const h = window.innerHeight || 1;
      setDolly(Math.min(1, Math.max(0, window.scrollY / h)));
    };

    const onScroll = () => {
      if (raf.current === null) raf.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [cap.cinematic]);

  const pr = getPixelRatio();

  return (
    <Stage
      fallback={<HeroFallback />}
      camera={{ position: [0, 0.35, 9.2], fov: 40 }}
      alwaysOn
    >
      <color attach="background" args={["#05060a"]} />

      <CameraRig origin={[0, 0.35, 9.2]} dolly={dolly} strength={1} />
      <LightRig />

      <ambientLight intensity={0.22} />
      <directionalLight position={[6, 9, 6]} intensity={0.85} color="#9db8ff" />
      <directionalLight position={[-8, -2, -6]} intensity={0.35} color="#b451d8" />

      {/* background layer */}
      <Horizon />
      <Monoliths count={cap.compact ? 18 : 34} />

      {/* midground — the object sits behind and slightly above the type,
          large enough to command the frame, small enough not to fight it */}
      <group position={cap.compact ? [0, 3.05, -2.6] : [0, 0.95, -1.6]}>
        <NexusCore
          state={state}
          scale={cap.compact ? 0.44 : 0.78}
          pixelRatio={pr}
          detail={cap.compact ? "reduced" : "full"}
        />
      </group>

      {/* foreground atmosphere */}
      <Dust
        count={cap.compact ? 600 : 1500}
        radius={28}
        pixelRatio={pr}
        color="#a8bde8"
      />
    </Stage>
  );
}
