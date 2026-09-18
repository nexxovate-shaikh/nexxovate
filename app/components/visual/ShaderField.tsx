"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   The hero's gradient mesh.

   Raw WebGL, no library. The plan called for OGL (~11 KB); this
   turned out not to need it — a fullscreen triangle and one
   fragment shader is the entire scene, and OGL's value is in the
   scene-graph machinery we would not have used. Zero dependency,
   ~2 KB of source.

   Three things keep it cheap:
   - Renders at min(devicePixelRatio, 1.5). Above that you are
     paying for pixels nobody can see in a blurred gradient.
   - Pauses when scrolled out of view via IntersectionObserver, so
     it is not burning GPU while someone reads the footer.
   - Bails to a CSS gradient on reduced motion, coarse pointers,
     low core count, or any WebGL failure.
   ══════════════════════════════════════════════════════════════ */

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_a;
uniform vec3  u_b;
uniform float u_intensity;

// Classic 2D value noise + fbm. Cheap, and at this blur radius
// nobody can tell it from simplex.
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

/* Three octaves, not five.

   fbm is called seven times per pixel here (two for q, two for r,
   one for f, and the warps compound), so each octave removed takes
   roughly a seventh of the shader's total cost with it. At this
   blur radius octaves four and five contribute detail finer than
   the gradient can show — they were being computed and then
   averaged away. Measured on the target machine (4 cores,
   integrated graphics) this is the difference between the hero
   holding 60fps and not. */
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.045;

  // Domain warping — the flow that stops it reading as a static
  // blur. Two levels is enough; three costs more than it shows.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.25 * t),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.20 * t)
  );

  float f = fbm(p + 2.4 * r);

  vec3 col = mix(u_a, u_b, clamp(f * 1.5, 0.0, 1.0));

  // Lift toward gold where the field folds most sharply. This is
  // the only place gold appears in the hero, which is what keeps
  // it feeling like a highlight rather than a third flat colour.
  col = mix(col, vec3(0.93, 0.85, 0.66), clamp(length(r) * 0.36, 0.0, 0.46));

  // Radial falloff so the field sits in the frame instead of
  // filling it edge to edge — the type needs somewhere quiet.
  float vig = smoothstep(1.25, 0.15, length(uv - vec2(0.42, 0.55)));

  col *= vig * u_intensity;

  // Toward black at the bottom so the section below joins cleanly.
  col *= smoothstep(-0.35, 0.75, uv.y);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderField({
  intensity = 1,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMotionPrefs();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduced) return;

    // Don't run the shader on phones or low-core machines — the
    // static gradient is genuinely the better experience there.
    if (window.matchMedia("(pointer: coarse)").matches) {
      setFailed(true);
      return;
    }
    if (typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) < 4) {
      setFailed(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null) ?? null;

    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();

    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }

    gl.useProgram(program);

    // One triangle that covers the viewport. Cheaper than a quad:
    // no diagonal seam, two fewer vertices.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const loc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uA = gl.getUniformLocation(program, "u_a");
    const uB = gl.getUniformLocation(program, "u_b");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    // Platinum: steel #7E93AC → champagne #D9AE63
    gl.uniform3f(uA, 0.494, 0.576, 0.675);
    gl.uniform3f(uB, 0.851, 0.682, 0.388);
    gl.uniform1f(uIntensity, intensity);

    /* 1.0, not 1.5. On a retina panel 1.5 means 2.25x the pixels
       for a blurred gradient with no edge in it — there is nothing
       in this image that a higher sample rate can resolve. */
    const dpr = 1;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let frame = 0;
    const start = performance.now();

    /* 30fps, not 60. The field's slowest feature takes about nine
       seconds to cross the frame; at that speed half the frames are
       redundant, and every one of them is a full-screen fragment
       pass competing with scrolling for the same GPU. Halving the
       rate halves the cost and is genuinely invisible here. */
    let lastDraw = 0;
    const MIN_FRAME_MS = 1000 / 30;

    const render = (now: number) => {
      if (visible && now - lastDraw >= MIN_FRAME_MS) {
        lastDraw = now;
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [reduced, intensity]);

  /* The fallback is not a blank box — it is a composed static
     gradient in the same palette, so a reduced-motion visitor gets
     a designed hero rather than a stripped one. */
  if (reduced || failed) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(900px 620px at 22% 32%, rgba(126,147,172,0.38), transparent 62%),
            radial-gradient(760px 520px at 72% 20%, rgba(201,209,218,0.20), transparent 60%),
            radial-gradient(520px 420px at 78% 74%, rgba(217,174,99,0.22), transparent 62%),
            radial-gradient(700px 700px at 55% 88%, rgba(48,58,72,0.50), transparent 66%),
            #0A0B0D
          `,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
