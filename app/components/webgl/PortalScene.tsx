"use client";

/* ============================================================
   CURVED VIDEO PORTALS

   Large concave holographic displays orbiting the Nexus. Each is a
   real cylindrical arc in 3D — not a rectangle with a perspective
   transform — so it curves around the core, catches an edge fresnel
   and passes behind, above and below the object as the ring turns.

   The focused portal advances toward the camera; the rest recede
   into deep perspective. Moving through the set should feel like
   flying through a technology universe, not paging a carousel.
   ============================================================ */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { portalVertex, portalFragment } from "./shaders";
import { usePortalMedia } from "./usePortalMedia";
import NexusCore from "./NexusCore";
import { Dust, LightRig, CameraRig } from "./SceneEnvironment";
import { getPixelRatio } from "./Stage";
import { useCapability } from "./useCapability";
import type { World } from "@/lib/brand";

/* curvature radius of every screen — constant, so the whole set
   reads as one manufactured system */
const CURVE_R = 7.2;
const ARC = 0.62;
const SCREEN_H = 3.35;

/* the focused portal is parked off-axis rather than dead centre, so the
   core and the screen are both legible in the same frame */
const FOCUS_ANGLE = 0.72;

function Portal({
  world,
  angle,
  active,
  offsetY,
  enabled,
}: {
  world: World;
  angle: number;
  active: boolean;
  offsetY: number;
  enabled: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const texture = usePortalMedia({
    poster: world.portal.poster,
    video: world.portal.video,
    active,
    enabled,
  });

  const geometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(
      CURVE_R,
      CURVE_R,
      SCREEN_H,
      64,
      1,
      true,
      -ARC / 2,
      ARC
    );
    // re-centre the arc on the local origin so distance from the core
    // can be animated per-portal without changing its curvature
    g.translate(0, 0, -CURVE_R);
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uMap: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uActive: { value: 0 },
      uTint: { value: new THREE.Color(world.accent) },
      uEdge: { value: new THREE.Color(world.accent) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (material.current) {
      const u = material.current.uniforms;
      u.uTime.value = t;
      if (texture) u.uMap.value = texture;
      u.uActive.value = THREE.MathUtils.damp(
        u.uActive.value,
        active ? 1 : 0,
        3,
        delta
      );
      u.uOpacity.value = THREE.MathUtils.damp(
        u.uOpacity.value,
        texture ? (active ? 1 : 0.24) : 0,
        3,
        delta
      );
    }

    if (group.current) {
      // distance from the core: the focused screen advances toward the
      // camera, but stops well short of filling the frame
      const targetD = active ? 9.0 : 5.6;
      const targetY = active ? 0 : offsetY;
      const targetS = active ? 1.06 : 0.72;

      const p = group.current.position;
      const d = Math.hypot(p.x, p.z) || targetD;
      const nd = THREE.MathUtils.damp(d, targetD, 2.4, delta);

      p.x = Math.sin(angle) * nd;
      p.z = Math.cos(angle) * nd;
      p.y = THREE.MathUtils.damp(p.y, targetY + Math.sin(t * 0.5 + angle) * 0.11, 2, delta);

      const s = THREE.MathUtils.damp(group.current.scale.x, targetS, 2.4, delta);
      group.current.scale.setScalar(s);

      group.current.rotation.y = angle;
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        active ? 0 : (offsetY > 0 ? -0.045 : 0.045),
        2,
        delta
      );
    }
  });

  return (
    <group ref={group} position={[Math.sin(angle) * 5.6, offsetY, Math.cos(angle) * 5.6]}>
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={portalVertex}
          fragmentShader={portalFragment}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* machined frame edges — top and bottom rails follow the curve */}
      {[SCREEN_H / 2, -SCREEN_H / 2].map((y) => (
        <mesh key={y} position={[0, y, -CURVE_R]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[CURVE_R, 0.011, 6, 200, ARC]} />
          <meshStandardMaterial
            color={world.accent}
            emissive={world.accent}
            emissiveIntensity={active ? 1.9 : 0.35}
            toneMapped={false}
            transparent
            opacity={active ? 0.7 : 0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function PortalScene({
  worlds,
  activeIndex,
}: {
  worlds: World[];
  activeIndex: number;
}) {
  const ring = useRef<THREE.Group>(null);
  const cap = useCapability();
  const pr = getPixelRatio();

  const step = (Math.PI * 2) / worlds.length;
  const targetRotation = useRef(0);

  useFrame((_, delta) => {
    if (!ring.current) return;

    // shortest path to the focused portal, so the ring never unwinds
    const desired = -activeIndex * step + FOCUS_ANGLE;
    const current = targetRotation.current;
    let diff = desired - current;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    targetRotation.current = current + diff * Math.min(delta * 2.2, 0.15);
    ring.current.rotation.y = targetRotation.current;
  });

  const activeWorld = worlds[activeIndex] ?? worlds[0];

  return (
    <>
      <color attach="background" args={["#05060a"]} />

      <CameraRig origin={[0, 0.25, 15]} strength={0.5} />
      <LightRig />

      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 8]} intensity={0.7} color="#9db8ff" />

      {/* the core stays at the centre of the universe */}
      <NexusCore
        state={activeWorld.nexus}
        scale={cap.compact ? 0.6 : 0.72}
        pixelRatio={pr}
        detail={cap.compact ? "reduced" : "full"}
      />

      <group ref={ring}>
        {worlds.map((world, i) => (
          <Portal
            key={world.id}
            world={world}
            angle={i * step}
            active={i === activeIndex}
            offsetY={i % 2 === 0 ? 2.35 : -2.35}
            enabled={cap.cinematic && !cap.compact}
          />
        ))}
      </group>

      <Dust count={cap.compact ? 400 : 900} radius={30} pixelRatio={pr} color="#93aada" />
    </>
  );
}
