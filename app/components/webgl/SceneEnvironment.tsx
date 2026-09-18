"use client";

/* ============================================================
   The world the Nexus lives in.

   Atmospheric dust, a graded horizon plane and a distant ring of
   monoliths — enough parallax layers that the hero reads as a
   place with depth rather than an object on a black field.
   ============================================================ */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

import {
  dustVertex,
  dustFragment,
  horizonVertex,
  horizonFragment,
} from "./shaders";

/* ------------------------------------------------------------
   Atmospheric dust
------------------------------------------------------------ */

export function Dust({
  count = 1400,
  radius = 26,
  color = "#8fa8d8",
  pixelRatio = 1,
}: {
  count?: number;
  radius?: number;
  color?: string;
  pixelRatio?: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // a hollow shell — nothing spawns inside the core's volume
      const r = radius * (0.28 + Math.pow(Math.random(), 0.6) * 0.72);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.62;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      seeds[i] = Math.random();
      scales[i] = 0.4 + Math.random() * 1.5;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return g;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uColor: { value: new THREE.Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (group.current) group.current.rotation.y += delta * 0.008;
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={dustVertex}
          fragmentShader={dustFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------
   Horizon plane
------------------------------------------------------------ */

export function Horizon({
  near = "#0a1020",
  far = "#05060a",
  band = "#2a4a8f",
  y = -5.2,
}: {
  near?: string;
  far?: string;
  band?: string;
  y?: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNear: { value: new THREE.Color(near) },
      uFar: { value: new THREE.Color(far) },
      uBand: { value: new THREE.Color(band) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -6]}>
      <planeGeometry args={[150, 150, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={horizonVertex}
        fragmentShader={horizonFragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------
   Distant monoliths
   A far ring of tall thin slabs. Almost subliminal, but they give
   the camera something to parallax against, which is what makes
   the environment read as architecture instead of a backdrop.
------------------------------------------------------------ */

export function Monoliths({ count = 34 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  const slabs = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.08;
        const r = 26 + Math.random() * 16;
        const h = 6 + Math.random() * 26;
        return {
          position: [Math.cos(a) * r, -5.2 + h / 2, Math.sin(a) * r] as [
            number,
            number,
            number,
          ],
          rotation: [0, -a + Math.PI / 2, 0] as [number, number, number],
          args: [0.5 + Math.random() * 1.6, h, 0.5 + Math.random() * 1.1] as [
            number,
            number,
            number,
          ],
        };
      }),
    [count]
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.004;
  });

  return (
    <group ref={group}>
      {slabs.map((slab, i) => (
        <mesh key={i} position={slab.position} rotation={slab.rotation}>
          <boxGeometry args={slab.args} />
          <meshStandardMaterial
            color="#0a0d15"
            metalness={0.85}
            roughness={0.55}
            envMapIntensity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------
   Studio light rig
   Lightformers give the chrome something real to reflect. This is
   what separates a machined surface from a flat grey ball — and it
   costs one render, not a downloaded HDRI.
------------------------------------------------------------ */

export function LightRig({
  key1 = "#6f92ff",
  key2 = "#b071ff",
  warm = "#e2c188",
}: {
  key1?: string;
  key2?: string;
  warm?: string;
}) {
  return (
    <Environment resolution={256} frames={1}>
      {/* broad top key — the primary specular band across the core */}
      <Lightformer
        form="rect"
        intensity={5}
        color={key1}
        position={[0, 6, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[14, 8, 1]}
      />
      {/* long side strip — gives the bands a travelling highlight */}
      <Lightformer
        form="rect"
        intensity={3.4}
        color={key2}
        position={[-7, 1.5, 3]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[12, 5, 1]}
      />
      {/* warm rim, restrained — the gold accent only ever shows as an edge */}
      <Lightformer
        form="rect"
        intensity={1.9}
        color={warm}
        position={[7, 0.5, -4]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[9, 4, 1]}
      />
      {/* underlight to keep the lower half from going solid black */}
      <Lightformer
        form="circle"
        intensity={1.2}
        color="#25406f"
        position={[0, -6, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
      />
    </Environment>
  );
}

/* ------------------------------------------------------------
   Camera rig
   Damped pointer parallax plus a scroll-linked dolly. The damping
   is deliberately slow — inertia is what makes camera movement
   feel like a crane shot rather than a mouse follower.
------------------------------------------------------------ */

export function CameraRig({
  strength = 1,
  origin = [0, 0, 9] as [number, number, number],
  target = [0, 0, 0] as [number, number, number],
  dolly = 0,
}: {
  strength?: number;
  origin?: [number, number, number];
  target?: [number, number, number];
  /** 0 → 1, pushes the camera in and slightly down */
  dolly?: number;
}) {
  const { camera, pointer } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(...target), [target]);

  useFrame((_, delta) => {
    const k = Math.min(delta * 1.6, 0.12);

    const targetX = origin[0] + pointer.x * 1.15 * strength;
    const targetY = origin[1] + pointer.y * 0.7 * strength - dolly * 0.9;
    const targetZ = origin[2] - dolly * 2.4;

    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;

    camera.lookAt(lookAt);
  });

  return null;
}
