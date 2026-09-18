#!/usr/bin/env python3
"""
Generates the Nexxovate hero background loop.

Design constraints, in priority order:

1. It is a BACKGROUND. The headline sits over the left half in
   white, so the left 45% is held very dark and all the motion is
   weighted right. Anything that competes with the type has failed
   at its job regardless of how good it looks alone.

2. It must loop seamlessly. Every motion is driven by a sine or a
   fractional part with an INTEGER number of cycles across the loop
   duration, so frame N and frame 0 are continuous. A visible seam
   in a hero loop is the thing people notice first.

3. It is abstract infrastructure, not fake footage. Nodes, links
   and data pulses — no invented dashboards, no fabricated metrics,
   no stock people. Nothing here claims a result Nexxovate has not
   produced.

4. Small. 1600x900 at a low bitrate, because this is a decorative
   layer that must not cost the page its LCP.

Output: hero-loop.mp4, hero-loop.webm, hero-poster.jpg
"""

import math
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

# ── Config ──────────────────────────────────────────────────────
W, H = 1600, 900
FPS = 24
SECONDS = 16
TOTAL = FPS * SECONDS

OUT = Path("tools/_frames")
DIST = Path("public/video")

# Aurum palette
GROUND = np.array([10, 11, 13], dtype=np.float32)
VIOLET = np.array([143, 163, 186], dtype=np.float32)    # steel
MAGENTA = np.array([201, 209, 218], dtype=np.float32)   # platinum
GOLD = np.array([217, 174, 99], dtype=np.float32)       # champagne

# Field is computed small and upscaled — the upscale IS the blur,
# and it costs a fraction of a full-resolution gaussian.
FW, FH = 200, 113


# ── The node graph ──────────────────────────────────────────────
def build_graph(seed=7):
    """
    Nodes weighted to the right of frame, plus a sparse scatter on
    the left so the composition does not look cut in half.
    """
    rng = np.random.default_rng(seed)

    pts = []
    # Dense cluster, right side
    for _ in range(22):
        pts.append((rng.uniform(0.52, 1.02), rng.uniform(-0.02, 1.02)))
    # Sparse, left — kept dim by the darkening ramp later
    for _ in range(7):
        pts.append((rng.uniform(0.02, 0.48), rng.uniform(0.05, 0.95)))

    pts = np.array(pts, dtype=np.float32)

    # Link near neighbours only. A fully connected graph reads as
    # noise; a sparse one reads as a network.
    edges = []
    for i in range(len(pts)):
        d = np.hypot(pts[:, 0] - pts[i, 0], (pts[:, 1] - pts[i, 1]) * 0.6)
        order = np.argsort(d)
        for j in order[1:4]:
            a, b = min(i, int(j)), max(i, int(j))
            if a != b and d[j] < 0.30 and (a, b) not in edges:
                edges.append((a, b))

    return pts, edges


PTS, EDGES = build_graph()

# Per-node bob: integer cycle counts keep the loop seamless.
NODE_CYCLES = np.array([1 + (i % 3) for i in range(len(PTS))], dtype=np.float32)
NODE_PHASE = np.array([(i * 0.7) % (2 * math.pi) for i in range(len(PTS))], dtype=np.float32)

# Per-edge pulse: integer trips across the loop.
EDGE_TRIPS = [1 + (i % 3) for i in range(len(EDGES))]
EDGE_OFFSET = [(i * 0.37) % 1.0 for i in range(len(EDGES))]
# Only some edges carry traffic at any time — a network where every
# link is lit reads as a screensaver, not a system.
EDGE_ACTIVE = [(i % 3) != 2 for i in range(len(EDGES))]


# ── Field ───────────────────────────────────────────────────────
YY, XX = np.mgrid[0:FH, 0:FW].astype(np.float32)
NX = XX / FW
NY = YY / FH


def field(t):
    """Slow drifting violet→magenta wash. t is 0..1 across the loop."""
    a = 2 * math.pi * t

    # Two counter-rotating low-frequency waves. Integer multipliers
    # on `a` are what make it close the loop.
    w1 = np.sin((NX * 3.1 + NY * 1.7) * 2.0 + a)
    w2 = np.cos((NX * 1.9 - NY * 2.6) * 2.0 + 2 * a)
    w3 = np.sin((NX * 5.2 + NY * 4.1) * 1.4 - a)

    mix = (w1 * 0.45 + w2 * 0.35 + w3 * 0.20) * 0.5 + 0.5

    # Soft radial pools, drifting on the loop
    cx1 = 0.72 + 0.10 * math.cos(a)
    cy1 = 0.38 + 0.08 * math.sin(a)
    pool1 = np.exp(-(((NX - cx1) ** 2) / 0.10 + ((NY - cy1) ** 2) / 0.16))

    cx2 = 0.55 + 0.12 * math.cos(a + 2.1)
    cy2 = 0.78 + 0.09 * math.sin(a + 2.1)
    pool2 = np.exp(-(((NX - cx2) ** 2) / 0.07 + ((NY - cy2) ** 2) / 0.10))

    rgb = np.zeros((FH, FW, 3), dtype=np.float32)
    m = mix[..., None]
    rgb += VIOLET * (pool1[..., None] * 0.55) * m
    rgb += MAGENTA * (pool2[..., None] * 0.42) * (1.0 - m * 0.5)

    # Gold appears once per loop, low and right — the same
    # restraint as the site: gold is earned, not sprinkled.
    gold_amt = max(0.0, math.sin(a - 1.2)) ** 2
    pool3 = np.exp(-(((NX - 0.86) ** 2) / 0.05 + ((NY - 0.66) ** 2) / 0.07))
    rgb += GOLD * (pool3[..., None] * 0.44 * gold_amt)

    return rgb


# Horizontal ramp: hold the left dark so the headline always wins.
RAMP_F = np.clip((NX - 0.28) / 0.42, 0.0, 1.0)[..., None] ** 1.6
RAMP_F = 0.10 + 0.90 * RAMP_F

# Vertical falloff so the section below joins cleanly.
VFALL = np.clip(1.0 - ((NY - 0.5) * 1.4) ** 2, 0.15, 1.0)[..., None]


def ramp_full():
    x = np.linspace(0, 1, W, dtype=np.float32)
    r = np.clip((x - 0.28) / 0.42, 0.0, 1.0) ** 1.6
    return (0.10 + 0.90 * r)[None, :, None]


RAMP_FULL = ramp_full()


# ── Frame ───────────────────────────────────────────────────────
def render(i):
    t = i / TOTAL
    a = 2 * math.pi * t

    # 1. Field, computed small and upscaled.
    small = field(t) * RAMP_F * VFALL
    base = Image.fromarray(np.clip(small, 0, 255).astype(np.uint8)).resize(
        (W, H), Image.BICUBIC
    )
    base = base.filter(ImageFilter.GaussianBlur(18))

    canvas = np.asarray(base, dtype=np.float32) + GROUND
    canvas = np.clip(canvas, 0, 255)

    # 2. Graph, drawn at half res onto a glow layer.
    gw, gh = W // 2, H // 2
    glow = Image.new("RGB", (gw, gh), (0, 0, 0))
    d = ImageDraw.Draw(glow)

    # Node positions with their slow bob
    px = PTS[:, 0] * gw + np.sin(a * NODE_CYCLES + NODE_PHASE) * 5.0
    py = PTS[:, 1] * gh + np.cos(a * NODE_CYCLES + NODE_PHASE * 1.3) * 7.0

    # Edges
    for (ia, ib) in EDGES:
        d.line(
            [(px[ia], py[ia]), (px[ib], py[ib])],
            fill=(28, 20, 46),
            width=1,
        )

    # Travelling pulses
    for e_i, (ia, ib) in enumerate(EDGES):
        if not EDGE_ACTIVE[e_i]:
            continue

        u = (t * EDGE_TRIPS[e_i] + EDGE_OFFSET[e_i]) % 1.0

        # Ease so a pulse accelerates away and settles on arrival,
        # instead of sliding at a constant, mechanical rate.
        ue = u * u * (3 - 2 * u)

        cx = px[ia] + (px[ib] - px[ia]) * ue
        cy = py[ia] + (py[ib] - py[ia]) * ue

        # Fade in and out at the ends so pulses do not pop.
        vis = math.sin(math.pi * u)
        col = VIOLET if e_i % 3 == 0 else MAGENTA
        c = tuple(int(v * vis * 0.85) for v in col)

        d.ellipse([cx - 2.2, cy - 2.2, cx + 2.2, cy + 2.2], fill=c)

    # Nodes. One node per loop takes a gold highlight as the sweep
    # passes it — the "something resolved" beat.
    sweep_x = ((t * 1.0) % 1.0) * 1.35 - 0.15

    for n in range(len(PTS)):
        nx = PTS[n, 0]
        prox = max(0.0, 1.0 - abs(nx - sweep_x) / 0.11)
        breath = 0.55 + 0.45 * math.sin(a * NODE_CYCLES[n] + NODE_PHASE[n])

        r = 2.0 + 1.6 * breath + 3.2 * prox
        col = MAGENTA * (0.45 + 0.3 * breath) + GOLD * prox * 1.0
        c = tuple(int(min(255, v)) for v in col)

        d.ellipse([px[n] - r, py[n] - r, px[n] + r, py[n] + r], fill=c)

    glow = glow.filter(ImageFilter.GaussianBlur(2.2))
    glow_up = glow.resize((W, H), Image.BILINEAR)
    glow_soft = glow_up.filter(ImageFilter.GaussianBlur(14))

    g1 = np.asarray(glow_up, dtype=np.float32)
    g2 = np.asarray(glow_soft, dtype=np.float32)

    # Additive: crisp core plus a wide bloom.
    canvas = canvas + (g1 * 0.85 + g2 * 0.75) * RAMP_FULL
    canvas = np.clip(canvas, 0, 255)

    # 3. Vignette — keeps the field inside the frame.
    vy = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
    vx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
    vig = np.clip(1.15 - 0.55 * (vx ** 2 + vy ** 2), 0.25, 1.0)[..., None]
    canvas *= vig

    # 4. Bottom fade to the site ground, so the hero joins the
    #    section beneath it without a seam.
    fade = np.clip((1.0 - np.linspace(0, 1, H, dtype=np.float32)) * 3.4, 0, 1)
    fade = fade[:, None, None]
    canvas = canvas * (0.25 + 0.75 * fade) + GROUND * (1 - fade) * 0.9

    return Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    DIST.mkdir(parents=True, exist_ok=True)

    for f in OUT.glob("*.png"):
        f.unlink()

    for i in range(TOTAL):
        render(i).save(OUT / f"f{i:04d}.png")
        if i % 48 == 0:
            print(f"  frame {i}/{TOTAL}", flush=True)

    print("encoding…", flush=True)

    common = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-framerate", str(FPS),
        "-i", str(OUT / "f%04d.png"),
    ]

    # H.264 — universal. crf 30 is generous for content this soft.
    subprocess.run(
        common + [
            "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
            "-crf", "30", "-preset", "slow",
            "-movflags", "+faststart", "-an",
            str(DIST / "hero-loop.mp4"),
        ],
        check=True,
    )

    # VP9 — meaningfully smaller where it is supported.
    subprocess.run(
        common + [
            "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p",
            "-crf", "40", "-b:v", "0", "-row-mt", "1",
            "-deadline", "good", "-cpu-used", "2", "-an",
            str(DIST / "hero-loop.webm"),
        ],
        check=True,
    )

    # Poster: frame 0, so the still and the first video frame match
    # exactly and there is no jump when playback starts.
    render(0).save(DIST / "hero-poster.jpg", quality=72, optimize=True)

    for f in OUT.glob("*.png"):
        f.unlink()
    OUT.rmdir()

    print("\ndone:")
    for f in sorted(DIST.iterdir()):
        print(f"  {f.name:20} {f.stat().st_size/1024:8.1f} KB")


if __name__ == "__main__":
    sys.exit(main())
