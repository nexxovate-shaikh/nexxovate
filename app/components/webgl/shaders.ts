/* ============================================================
   NEXXOVATE — shader library
   Hand-written GLSL. No post-processing dependency: the glow is
   built from a fresnel shell plus additive haze billboards, which
   is both cheaper and more controllable than a bloom pass.
   ============================================================ */

/* ------------------------------------------------------------
   ENERGY SHELL
   Sits just inside the machined core. Fresnel rim + travelling
   latitude bands read as contained energy rather than a glowing
   ball — the surface has structure.
------------------------------------------------------------ */

export const shellVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;

  void main() {
    vPos = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const shellFragment = /* glsl */ `
  uniform float uTime;
  uniform float uCharge;
  uniform vec3  uColor;
  uniform vec3  uRim;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;

  void main() {
    float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0);
    fres = pow(fres, 2.35);

    // travelling latitude bands — the core "thinking"
    float bands = sin(vPos.y * 11.0 - uTime * 1.25);
    bands = smoothstep(0.55, 1.0, bands) * 0.55;

    // slow vertical sweep, like a scan resolving
    float sweep = smoothstep(0.9, 1.0, sin(vPos.y * 2.4 - uTime * 0.55));

    vec3 col = mix(uColor, uRim, fres);
    float alpha = (fres * 0.85 + bands * 0.5 + sweep * 0.4) * uCharge;

    gl_FragColor = vec4(col * (0.55 + fres * 1.35), clamp(alpha, 0.0, 1.0));
  }
`;

/* ------------------------------------------------------------
   ORBITAL NODE FIELD
   Instanced points on a Fibonacci shell. Each node carries its own
   phase so the lattice pulses in waves instead of in unison.
------------------------------------------------------------ */

export const nodesVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uSpread;
  uniform float uPixelRatio;

  attribute float aPhase;
  attribute float aScale;

  varying float vPulse;

  void main() {
    vec3 p = position * uSpread;

    // gentle breathing along the radial axis
    float breathe = sin(uTime * 0.65 + aPhase * 6.283) * 0.045;
    p += normalize(position) * breathe;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    vPulse = 0.4 + 0.6 * pow(0.5 + 0.5 * sin(uTime * 1.35 + aPhase * 12.566), 3.0);

    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z) * 90.0;
    gl_Position = projectionMatrix * mv;
  }
`;

export const nodesFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;

  varying float vPulse;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(0.5, 0.14, d);

    vec3 col = mix(uColor, uAccent, vPulse);
    float alpha = (core * 0.35 + halo * 0.85) * vPulse;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------
   ATMOSPHERIC DUST
   A deep shell of drifting motes. Depth-faded so the far ones read
   as atmosphere, not confetti.
------------------------------------------------------------ */

export const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aSeed;
  attribute float aScale;

  varying float vFade;
  varying float vSeed;

  void main() {
    vec3 p = position;

    p.x += sin(uTime * 0.08 + aSeed * 9.0) * 0.85;
    p.y += cos(uTime * 0.06 + aSeed * 5.0) * 0.65;
    p.z += sin(uTime * 0.05 + aSeed * 3.0) * 0.85;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    float dist = -mv.z;
    vFade = smoothstep(46.0, 8.0, dist);
    vSeed = aSeed;

    gl_PointSize = aScale * uPixelRatio * (1.0 / dist) * 120.0;
    gl_Position = projectionMatrix * mv;
  }
`;

export const dustFragment = /* glsl */ `
  uniform vec3 uColor;

  varying float vFade;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float soft = smoothstep(0.5, 0.05, d);
    float twinkle = 0.55 + 0.45 * sin(vSeed * 40.0);

    gl_FragColor = vec4(uColor, soft * vFade * 0.42 * twinkle);
  }
`;

/* ------------------------------------------------------------
   VOLUMETRIC HAZE
   Additive billboard standing in for a bloom pass. Anisotropic so
   it reads as light through atmosphere rather than a round blob.
------------------------------------------------------------ */

export const hazeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const hazeFragment = /* glsl */ `
  uniform vec3  uColor;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uStretch;

  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * vec2(1.0, uStretch);
    float d = length(p);

    float core = exp(-d * 9.0);
    float bloom = exp(-d * 3.1) * 0.55;
    float flicker = 0.92 + 0.08 * sin(uTime * 1.7);

    float a = (core + bloom) * uIntensity * flicker;
    gl_FragColor = vec4(uColor * a, a);
  }
`;

/* ------------------------------------------------------------
   PORTAL SURFACE
   Curved glass carrying a cinematic frame. Adds an edge fresnel, a
   subtle scanline structure and a soft feathered mask so the video
   sits inside the environment instead of on top of it.
------------------------------------------------------------ */

export const portalVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const portalFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uActive;
  uniform vec3  uTint;
  uniform vec3  uEdge;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    // the cylinder's outer wall runs the opposite way to the camera,
    // so the frame is mirrored unless u is flipped
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);

    vec4 frame = texture2D(uMap, uv);

    // desaturate slightly when inactive so the focused portal leads
    float lum = dot(frame.rgb, vec3(0.299, 0.587, 0.114));
    vec3 graded = mix(vec3(lum) * 0.72, frame.rgb, 0.45 + uActive * 0.55);
    // a cool grade, not a colour wash — the footage keeps its own value
    graded = mix(graded, graded * uTint, 0.12);
    graded *= 0.85 + uActive * 0.45;

    // feathered edges — no hard rectangle anywhere in the scene
    float mx = smoothstep(0.0, 0.075, uv.x) * smoothstep(1.0, 0.925, uv.x);
    float my = smoothstep(0.0, 0.055, uv.y) * smoothstep(1.0, 0.945, uv.y);
    float mask = mx * my;

    // glass edge
    float fres = pow(1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0), 2.6);

    // faint horizontal structure, one pixel of "display"
    float scan = 0.965 + 0.035 * sin(uv.y * 620.0 + uTime * 1.6);

    vec3 col = graded * scan + uEdge * fres * (0.28 + uActive * 0.55);
    float a = (mask * (0.5 + uActive * 0.5) + fres * 0.35) * uOpacity;

    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`;

/* ------------------------------------------------------------
   HORIZON
   The far ground plane. A graded gradient with a light band on the
   horizon line; gives the hero real depth without a skybox asset.
------------------------------------------------------------ */

export const horizonVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const horizonFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3  uNear;
  uniform vec3  uFar;
  uniform vec3  uBand;

  varying vec2 vUv;

  void main() {
    float y = vUv.y;

    vec3 col = mix(uNear, uFar, smoothstep(0.0, 1.0, y));

    // horizon light band, drifting slowly
    float band = exp(-pow((y - 0.5) * 14.0, 2.0));
    float drift = 0.85 + 0.15 * sin(uTime * 0.22 + vUv.x * 3.0);
    col += uBand * band * 0.5 * drift;

    // radial falloff so the plane fades into black at the edges
    float r = length(vUv - 0.5) * 1.9;
    float a = smoothstep(1.0, 0.15, r);

    gl_FragColor = vec4(col, a);
  }
`;
