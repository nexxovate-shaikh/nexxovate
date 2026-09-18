#!/usr/bin/env python3
"""
Generates four ORIGINAL capability films.

Not slices of the hero footage. Four separate pieces, each a
different mechanism, each rendered from scratch.

What makes these read as cinematic rather than as diagrams is
photographic behaviour, not detail:

  DEPTH OF FIELD  every scene is built in three planes and each
                  plane is blurred by its distance. The eye reads
                  differential focus as "camera" before it reads
                  anything else.
  PARALLAX        planes drift at different rates under a slow
                  camera move, so depth is confirmed by motion.
  BLOOM           bright values bleed. Real lenses do this and
                  clean compositing does not.
  GRAIN           a light sensor floor. Perfectly clean frames
                  look rendered; a whisper of noise looks shot.
  MOTION TRAILS   particles carry a tail, so movement smears the
                  way a real shutter smears it.

All four loop seamlessly: every motion runs an integer number of
cycles across the clip, so the last frame meets the first.

Palette is charcoal / steel / platinum / champagne throughout, and
champagne is reserved for the one element in each scene that
carries the idea.

Output: public/video/cap/cap-1..4.mp4 + matching .jpg posters
"""

import math
import pathlib
import shutil
import subprocess

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 800, 500
FPS = 24
SECONDS = 4
TOTAL = FPS * SECONDS

TMP = pathlib.Path("tools/_capframes")
OUT = pathlib.Path("public/video/cap")

GROUND = np.array([10, 11, 13], dtype=np.float32)
STEEL = np.array([126, 147, 172], dtype=np.float32)
PLATINUM = np.array([201, 209, 218], dtype=np.float32)
CHAMPAGNE = np.array([217, 174, 99], dtype=np.float32)
GILT = np.array([240, 226, 190], dtype=np.float32)


# ── Plane helper ────────────────────────────────────────────────
class Plane:
    """One depth plane: draw into it, then it is blurred by distance."""

    def __init__(self, blur, gain=1.0):
        self.img = Image.new("RGB", (W, H), (0, 0, 0))
        self.d = ImageDraw.Draw(self.img)
        self.blur = blur
        self.gain = gain

    def out(self):
        im = self.img
        if self.blur > 0.05:
            im = im.filter(ImageFilter.GaussianBlur(self.blur))
        return np.asarray(im, dtype=np.float32) * self.gain


def rgb(col, amt=1.0):
    return tuple(int(max(0, min(255, c * amt))) for c in col)


def dot(p, x, y, r, col, amt=1.0):
    p.d.ellipse([x - r, y - r, x + r, y + r], fill=rgb(col, amt))


def trail(p, pts, col, amt, w=2):
    """A fading tail — motion blur, drawn rather than simulated."""
    n = len(pts)
    for i in range(n - 1):
        f = (i + 1) / n
        p.d.line([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]],
                 fill=rgb(col, amt * f * f), width=w)


def compose(planes, grain_seed, vignette=0.30):
    acc = np.zeros((H, W, 3), dtype=np.float32)
    for p in planes:
        acc += p.out()

    # Bloom: bright values bleed into their neighbours.
    bright = np.clip(acc - 34, 0, None)
    bl = Image.fromarray(np.clip(bright, 0, 255).astype(np.uint8))
    acc += np.asarray(bl.filter(ImageFilter.GaussianBlur(18)), dtype=np.float32) * 1.15
    acc += np.asarray(bl.filter(ImageFilter.GaussianBlur(46)), dtype=np.float32) * 0.60

    acc += GROUND

    # Vignette.
    vx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
    vy = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
    acc *= np.clip(1.06 - vignette * (vx ** 2 + vy ** 2), 0.22, 1.0)[..., None]

    # Sensor grain.
    rng = np.random.default_rng(grain_seed)
    acc += rng.normal(0.0, 2.1, size=(H, W, 1)).astype(np.float32)

    return Image.fromarray(np.clip(acc, 0, 255).astype(np.uint8))


# ── 01 · Automation — streams through gates, one path automated ─
def film_automation(i):
    t = i / TOTAL
    a = 2 * math.pi * t
    cam = math.sin(a) * 9          # slow lateral dolly

    far = Plane(6.5, 0.85)
    mid = Plane(1.4, 1.45)
    near = Plane(5.0, 1.05)

    # Far: the substrate the work runs on.
    for k in range(9):
        y = 40 + k * 78
        far.d.line([0, y + cam * 0.3, W, y - 14 + cam * 0.3],
                   fill=rgb(STEEL, 0.10), width=1)

    # Mid: three gates the stream passes through.
    for g, gx in enumerate((200, 400, 600)):
        gx += cam
        r = 74 + 5 * math.sin(a * 2 + g)
        mid.d.ellipse([gx - r, 278 - r, gx + r, 278 + r],
                      outline=rgb(STEEL, 0.5), width=1)
        mid.d.ellipse([gx - r * 0.6, 278 - r * 0.6, gx + r * 0.6, 278 + r * 0.6],
                      outline=rgb(STEEL, 0.28), width=1)

    def base_path(u, lane):
        x = -60 + u * (W + 120)
        y = 292 + math.sin(u * math.pi * 2 + lane * 1.7) * (56 + lane * 22)
        return x + cam, y

    # Manual lanes — steel, plural, unhurried.
    for lane in range(4):
        for s in range(4):
            u = (t * 2 + s * 0.25 + lane * 0.09) % 1.0
            pts = [base_path(max(0.0, u - k * 0.016), lane) for k in range(9)]
            trail(mid, pts[::-1], STEEL, 0.85)
            dot(mid, *pts[0], 3.4, PLATINUM, 1.0)

    # The automated path — champagne, single, decisive, above the rest.
    def auto_path(u):
        x = -60 + u * (W + 120)
        y = 292 - 178 * math.sin(min(1.0, max(0.0, (u - 0.12) / 0.76)) * math.pi)
        return x + cam, y

    for s in range(3):
        u = (t * 2 + s * 0.333) % 1.0
        pts = [auto_path(max(0.0, u - k * 0.014)) for k in range(12)]
        trail(near, pts[::-1], CHAMPAGNE, 1.0, w=3)
        dot(near, *pts[0], 5.0, GILT, 1.0)

    return compose([far, mid, near], i)


# ── 02 · Assistants — a core answering, out of the dark ─────────
def film_assistants(i):
    t = i / TOTAL
    a = 2 * math.pi * t
    breath = 1.0 + 0.03 * math.sin(a)      # camera breathing in and out

    far = Plane(7.5, 0.80)
    mid = Plane(1.2, 1.45)
    near = Plane(6.5, 1.00)

    cx, cy = W * 0.36, H * 0.5

    # Far: sparse field, so the core has somewhere to sit.
    rng = np.random.default_rng(5)
    for _ in range(40):
        x, y = rng.random() * W, rng.random() * H
        dot(far, x, y, 1.0 + rng.random() * 1.6, PLATINUM, 0.35 + rng.random() * 0.4)

    # Mid: response rings, expanding and fading. Three, offset.
    for k in range(3):
        u = (t + k / 3) % 1.0
        r = (34 + u * 330) * breath
        fade = math.sin(math.pi * u) ** 1.4
        mid.d.ellipse([cx - r, cy - r, cx + r, cy + r],
                      outline=rgb(CHAMPAGNE if k == 0 else STEEL, 0.75 * fade),
                      width=2 if k == 0 else 1)

    # The core.
    core = 21 * breath + 1.5 * math.sin(a * 3)
    dot(mid, cx, cy, core + 9, CHAMPAGNE, 0.22)
    dot(mid, cx, cy, core, GILT, 1.0)
    mid.d.ellipse([cx - core - 16, cy - core - 16, cx + core + 16, cy + core + 16],
                  outline=rgb(PLATINUM, 0.55), width=1)

    # Near: message glyphs orbiting, out of focus — the traffic
    # arriving from all sides, deliberately unreadable.
    for k in range(7):
        ang = a * (0.5 + 0.12 * k) + k * 0.9
        rr = 190 + 60 * math.sin(k * 1.4)
        x = cx + rr * math.cos(ang) * 1.25
        y = cy + rr * math.sin(ang) * 0.62
        w, h = 42, 17
        near.d.rounded_rectangle([x - w / 2, y - h / 2, x + w / 2, y + h / 2],
                                 radius=4, outline=rgb(STEEL, 0.75), width=2)

    return compose([far, mid, near], i + 900)


# ── 03 · Cloud — strata, seen from inside the stack ─────────────
def film_cloud(i):
    t = i / TOTAL
    a = 2 * math.pi * t

    far = Plane(8.0, 0.80)
    mid = Plane(1.0, 1.45)
    near = Plane(7.0, 1.00)

    cx = W / 2
    horizon = H * 0.5
    # The camera rises exactly one layer per loop, so the stack
    # appears endless and the loop is invisible.
    rise = (t % 1.0) * 96

    for k in range(-1, 6):
        y = horizon + 190 - k * 96 + rise
        if y < -80 or y > H + 80:
            continue
        depth = abs(y - horizon) / 260
        p = mid if depth < 0.55 else (far if y < horizon else near)
        lit = k == 2

        rx = 300 * (0.42 + 0.58 * min(1.6, depth + 0.35))
        ry = rx * 0.26
        col = CHAMPAGNE if lit else STEEL
        amt = (0.9 if lit else 0.45) * (1.0 - min(0.7, depth * 0.4))
        p.d.ellipse([cx - rx, y - ry, cx + rx, y + ry],
                    outline=rgb(col, amt), width=2 if lit else 1)

        # Racks around the rim.
        for s in range(16):
            ang = s / 16 * 2 * math.pi
            px = cx + rx * math.cos(ang)
            py = y + ry * math.sin(ang)
            hh = 9 if lit else 6
            p.d.line([px, py - hh, px, py + hh],
                     fill=rgb(GILT if lit and s % 8 == 0 else col, amt * 0.8), width=1)

    # Data rising between the strata.
    rng = np.random.default_rng(17)
    for k in range(26):
        ph = (t * 2 + rng.random()) % 1.0
        x = cx + (rng.random() - 0.5) * 620
        y = H + 40 - ph * (H + 90)
        pl = near if abs(x - cx) > 220 else mid
        pts = [(x, y + q * 9) for q in range(6)]
        trail(pl, pts[::-1], PLATINUM, 0.8)

    return compose([far, mid, near], i + 1800)


# ── 04 · Custom products — a lattice, one block commissioned ────
def film_products(i):
    t = i / TOTAL
    a = 2 * math.pi * t

    far = Plane(7.0, 0.80)
    mid = Plane(1.1, 1.45)
    near = Plane(6.0, 1.00)

    cx, cy = W / 2, H / 2
    yaw = math.sin(a) * 0.24            # the lattice turns and returns

    def project(gx, gy, gz):
        """Cheap axonometric with a yaw, so the grid has volume."""
        x = (gx * math.cos(yaw) - gz * math.sin(yaw)) * 78
        z = (gx * math.sin(yaw) + gz * math.cos(yaw))
        y = gy * 104 - z * 26
        scale = 1.0 / (1.0 + z * 0.10)
        return cx + x * scale, cy + y * scale, scale

    # A wave of illumination crossing the lattice, once per loop.
    wave = (t % 1.0) * 8 - 2

    for gz in (1, 0, -1):
        for gy in (-1, 0, 1):
            for gx in range(-3, 4):
                if gz == 0 and gy == 0 and gx in (0, 1):
                    continue        # the commissioned block's footprint
                x, y, s = project(gx, gy, gz)
                lit = abs(gx + 3 - wave) < 0.9
                p = mid if gz == 0 else (far if gz == 1 else near)
                r = 27 * s
                p.d.rounded_rectangle([x - r, y - r * 0.92, x + r, y + r * 0.92],
                                      radius=3,
                                      outline=rgb(PLATINUM if lit else STEEL,
                                                  (0.95 if lit else 0.34) * s),
                                      width=1)

    # The commissioned block: two cells fused, always lit.
    x0, y0, s0 = project(0, 0, 0)
    x1, y1, _ = project(1, 0, 0)
    bx, by = (x0 + x1) / 2, (y0 + y1) / 2
    bw = abs(x1 - x0) / 2 + 26 * s0
    mid.d.rounded_rectangle([bx - bw, by - 27 * s0, bx + bw, by + 27 * s0],
                            radius=5, outline=rgb(CHAMPAGNE, 1.0), width=2)

    pulse = 0.72 + 0.28 * math.sin(a * 2)
    for k in range(4):
        ang = math.radians(45 + k * 90) + a * 0.5
        ex = bx + 46 * math.cos(ang)
        ey = by + 29 * math.sin(ang)
        mid.d.line([bx, by, ex, ey], fill=rgb(CHAMPAGNE, 0.85 * pulse), width=1)
        dot(mid, ex, ey, 4.2, PLATINUM, pulse)
    dot(mid, bx, by, 11 * pulse, GILT, 1.0)

    return compose([far, mid, near], i + 2700)


FILMS = [
    ("cap-1", film_automation),
    ("cap-2", film_assistants),
    ("cap-3", film_cloud),
    ("cap-4", film_products),
]


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    for name, fn in FILMS:
        if TMP.exists():
            shutil.rmtree(TMP)
        TMP.mkdir(parents=True)

        for i in range(TOTAL):
            fn(i).save(TMP / f"f{i:04d}.png")

        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
             "-i", str(TMP / "f%04d.png"),
             "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
             "-crf", "30", "-preset", "slow", "-movflags", "+faststart", "-an",
             str(OUT / f"{name}.mp4")],
            check=True,
        )

        fn(0).save(OUT / f"{name}.jpg", quality=80, optimize=True)
        kb = (OUT / f"{name}.mp4").stat().st_size / 1024
        print(f"  {name}.mp4  {kb:6.0f} KB")

    shutil.rmtree(TMP)


if __name__ == "__main__":
    print("rendering four original capability films:")
    main()
