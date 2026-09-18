"use client";

/* ============================================================
   THE NEXUS — Nexxovate's signature intelligence object.

   Not an orb. A machined, architectural assembly:
     · a faceted dark-chrome core that catches real reflections
     · a contained energy shell visible through its facets
     · three aperture bands on independent axes (the gyroscope)
     · radial vanes that give it a readable silhouette
     · data arcs tracking around the assembly
     · an orbital node lattice held in the surrounding volume

   It evolves by state — activation, orchestration, collaboration,
   architecture, ecosystem — and every transition is damped, so
   moving through the site feels like one continuous camera take.
   ============================================================ */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import * as THREE from "three";

import {
  shellVertex,
  shellFragment,
  nodesVertex,
  nodesFragment,
  hazeVertex,
  hazeFragment,
} from "./shaders";
import { NEXUS_STATES, type NexusState } from "@/lib/brand";

/* ------------------------------------------------------------
   Aperture band — an open machined ring, not a torus primitive.
   A thin open cylinder gives the band a real inner and outer wall;
   two slim tori cap the edges so it reads as milled metal.
------------------------------------------------------------ */

function ApertureBand({
  radius,
  height,
  tilt,
  speed,
  color,
}: {
  radius: number;
  height: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={group}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius, height, 160, 1, true]} />
          <meshPhysicalMaterial
            color="#0b0f1a"
            metalness={1}
            roughness={0.19}
            clearcoat={1}
            clearcoatRoughness={0.14}
            side={THREE.DoubleSide}
            envMapIntensity={2.1}
          />
        </mesh>

        {[height / 2, -height / 2].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.012, 8, 160]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.9}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* index markers — machined detail, reads at close camera range */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}
              rotation={[0, -a, 0]}
            >
              <boxGeometry args={[0.012, height * 0.62, 0.03]} />
              <meshStandardMaterial
                color="#8fa8d8"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------
   Radial vanes — the silhouette. Twelve tapered blades around the
   equator, alternating length so the profile isn't mechanical.
------------------------------------------------------------ */

function Vanes({ count = 12 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y -= delta * 0.06;
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        const long = i % 2 === 0;
        const len = long ? 0.62 : 0.38;
        const r = 1.06 + len / 2;

        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, 0, Math.sin(a) * r]}
            rotation={[0, -a, 0]}
          >
            <boxGeometry args={[len, long ? 0.075 : 0.05, 0.026]} />
            <meshPhysicalMaterial
              color="#0e1320"
              metalness={1}
              roughness={0.22}
              clearcoat={1}
              envMapIntensity={2.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------
   Data arcs — partial rings on skewed axes, travelling at
   different rates. These carry the "something is happening" read.
------------------------------------------------------------ */

function DataArcs({ color, rim }: { color: string; rim: string }) {
  const arcs = useMemo(
    () => [
      { r: 1.68, tilt: [0.9, 0.2, 0.35] as const, span: 1.35, speed: 0.55, c: color, o: 0.72 },
      { r: 1.96, tilt: [-0.6, 0.9, -0.2] as const, span: 0.95, speed: -0.4, c: rim, o: 0.55 },
      { r: 2.24, tilt: [0.35, -0.7, 1.1] as const, span: 0.62, speed: 0.3, c: color, o: 0.42 },
    ],
    [color, rim]
  );

  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    refs.current.forEach((g, i) => {
      if (g) g.rotation.z += delta * arcs[i].speed;
    });
  });

  return (
    <>
      {arcs.map((arc, i) => (
        <group key={i} rotation={[arc.tilt[0], arc.tilt[1], arc.tilt[2]]}>
          <group ref={(el) => { refs.current[i] = el; }}>
            <mesh>
              <torusGeometry args={[arc.r, 0.0075, 8, 220, arc.span]} />
              <meshStandardMaterial
                color={arc.c}
                emissive={arc.c}
                emissiveIntensity={2.2}
                toneMapped={false}
                transparent
                opacity={arc.o}
              />
            </mesh>
          </group>
        </group>
      ))}
    </>
  );
}

/* ------------------------------------------------------------
   Orbital node lattice — Fibonacci sphere, GPU-pulsed.
------------------------------------------------------------ */

function NodeLattice({
  count = 420,
  radius = 2.75,
  color,
  accent,
  spread,
  pixelRatio,
}: {
  count?: number;
  radius?: number;
  color: string;
  accent: string;
  spread: number;
  pixelRatio: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const scales = new Float32Array(count);

    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;

      // slight radial jitter so it reads as a volume, not a shell
      const jitter = 0.86 + Math.random() * 0.3;

      positions[i * 3] = Math.cos(theta) * r * radius * jitter;
      positions[i * 3 + 1] = y * radius * jitter;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius * jitter;

      phases[i] = Math.random();
      scales[i] = 0.35 + Math.random() * 0.9;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return g;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 0.055 },
      uSpread: { value: spread },
      uPixelRatio: { value: pixelRatio },
      uColor: { value: new THREE.Color(color) },
      uAccent: { value: new THREE.Color(accent) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (material.current) {
      const u = material.current.uniforms;
      u.uTime.value = state.clock.elapsedTime;
      u.uSpread.value = THREE.MathUtils.damp(u.uSpread.value, spread, 2.2, delta);
      (u.uColor.value as THREE.Color).lerp(new THREE.Color(color), delta * 1.6);
      (u.uAccent.value as THREE.Color).lerp(new THREE.Color(accent), delta * 1.6);
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.035;
      group.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={nodesVertex}
          fragmentShader={nodesFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------
   Volumetric haze — stands in for a bloom pass.
------------------------------------------------------------ */

function Haze({
  color,
  intensity,
  scale,
  stretch = 1,
}: {
  color: string;
  intensity: number;
  scale: number;
  stretch?: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
      uStretch: { value: stretch },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uIntensity.value = THREE.MathUtils.damp(
      u.uIntensity.value,
      intensity,
      2,
      delta
    );
    (u.uColor.value as THREE.Color).lerp(new THREE.Color(color), delta * 1.5);
  });

  return (
    <Billboard>
      <mesh scale={scale}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={hazeVertex}
          fragmentShader={hazeFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Billboard>
  );
}

/* ------------------------------------------------------------
   THE NEXUS
------------------------------------------------------------ */

export default function NexusCore({
  state = "activation",
  scale = 1,
  pixelRatio = 1,
  detail = "full",
}: {
  state?: NexusState;
  scale?: number;
  pixelRatio?: number;
  detail?: "full" | "reduced";
}) {
  const preset = NEXUS_STATES[state];

  const root = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const shellMat = useRef<THREE.ShaderMaterial>(null);

  const shellUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCharge: { value: preset.charge },
      uColor: { value: new THREE.Color(preset.color) },
      uRim: { value: new THREE.Color(preset.rim) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const bandsRef = useRef<THREE.Group>(null);
  const spread = useRef(preset.spread);

  useFrame((s, delta) => {
    const t = s.clock.elapsedTime;

    spread.current = THREE.MathUtils.damp(
      spread.current,
      preset.spread,
      1.8,
      delta
    );

    if (bandsRef.current) bandsRef.current.scale.setScalar(spread.current);

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.14 * preset.velocity;
      coreRef.current.rotation.x = Math.sin(t * 0.18) * 0.075;
    }

    if (root.current) {
      // a slow breath so the assembly never sits perfectly still
      root.current.position.y = Math.sin(t * 0.42) * 0.055;
    }

    if (shellMat.current) {
      const u = shellMat.current.uniforms;
      u.uTime.value = t;
      u.uCharge.value = THREE.MathUtils.damp(
        u.uCharge.value,
        preset.charge,
        2,
        delta
      );
      (u.uColor.value as THREE.Color).lerp(new THREE.Color(preset.color), delta * 1.6);
      (u.uRim.value as THREE.Color).lerp(new THREE.Color(preset.rim), delta * 1.6);
    }
  });

  const reduced = detail === "reduced";

  return (
    <group ref={root} scale={scale}>
      {/* ---- machined core ---- */}
      <group ref={coreRef}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.02, 2]} />
          <meshPhysicalMaterial
            color="#0a0d16"
            metalness={1}
            roughness={0.17}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2.6}
            flatShading
          />
        </mesh>

        {/* contained energy, seen through the facet seams */}
        <mesh scale={0.985}>
          <icosahedronGeometry args={[1.02, 4]} />
          <shaderMaterial
            ref={shellMat}
            uniforms={shellUniforms}
            vertexShader={shellVertex}
            fragmentShader={shellFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* a hard inner light source — reads through the seams */}
        <mesh scale={0.62}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={preset.color} toneMapped={false} />
        </mesh>

        <Vanes count={reduced ? 8 : 12} />
      </group>

      {/* ---- aperture bands ---- */}
      <group ref={bandsRef}>
        <ApertureBand
          radius={1.62}
          height={0.15}
          tilt={[0.24, 0, 0.1]}
          speed={0.22 * preset.velocity}
          color={preset.color}
        />
        <ApertureBand
          radius={2.02}
          height={0.1}
          tilt={[-0.55, 0.3, 0.62]}
          speed={-0.16 * preset.velocity}
          color={preset.rim}
        />
        {!reduced && (
          <ApertureBand
            radius={2.46}
            height={0.07}
            tilt={[1.15, -0.2, -0.35]}
            speed={0.11 * preset.velocity}
            color={preset.color}
          />
        )}
      </group>

      {!reduced && <DataArcs color={preset.color} rim={preset.rim} />}

      <NodeLattice
        count={reduced ? 180 : 460}
        radius={2.9}
        color={preset.color}
        accent={preset.rim}
        spread={preset.spread * 0.92}
        pixelRatio={pixelRatio}
      />

      {/* ---- volumetric light ---- */}
      <Haze color={preset.color} intensity={0.62 * preset.charge} scale={6.2} />
      <Haze
        color={preset.rim}
        intensity={0.26 * preset.charge}
        scale={9.5}
        stretch={0.55}
      />

      {/* real lights so surrounding geometry is lit by the core */}
      <pointLight
        color={preset.color}
        intensity={9 * preset.charge}
        distance={22}
        decay={2}
      />
      <pointLight
        color={preset.rim}
        intensity={4 * preset.charge}
        distance={16}
        decay={2}
        position={[0, 1.6, 0]}
      />
    </group>
  );
}
