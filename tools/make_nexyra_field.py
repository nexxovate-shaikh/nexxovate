#!/usr/bin/env python3
"""
Generates the Nexyra ecosystem-card artwork.

Not a nebula. A CONSTELLATION NETWORK — a deep field where the
brighter stars are joined by faint lines. That reads cosmic at a
glance, which is the feeling the reference has, but it says
something the reference does not: connected intelligence. It is
also the same lattice motif already running through the brand
graphic and the hero loop, so the card belongs to this site rather
than borrowing from another one.

Composition rules, in priority order:

1. The left 40% stays near-black. The product name, the standfirst
   and the "Read more" link all sit there in white.
2. Density and glow build toward the right edge, so the card has a
   direction and the eye lands on the text first.
3. Champagne and steel only — the site palette. No magenta, no
   teal, nothing that arrives from outside the system.

Output: public/images/nexyra-field.jpg  (2000x800, ~2.5:1)
        public/images/nexyra-field-tall.jpg (1200x900, for stacked
        layouts where the card goes portrait on mobile)
"""

import math
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2000, 800
OUT = pathlib.Path("public/images")

GROUND = np.array([10, 11, 13], dtype=np.float32)
STEEL = np.array([126, 147, 172], dtype=np.float32)
PLATINUM = np.array([201, 209, 218], dtype=np.float32)
CHAMPAGNE = np.array([217, 174, 99], dtype=np.float32)
GILT = np.array([237, 217, 169], dtype=np.float32)

rng = np.random.default_rng(11)


def horizon(w, h):
    """0 at the left edge, 1 at the right. Everything scales by this."""
    x = np.linspace(0, 1, w, dtype=np.float32)
    return np.clip((x - 0.30) / 0.62, 0.0, 1.0) ** 1.5


def nebula(w, h):
    """Soft champagne and steel pools, weighted right and low."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx, ny = xx / w, yy / h
    rgb = np.zeros((h, w, 3), dtype=np.float32)

    pools = [
        (0.86, 0.40, 0.055, 0.10, CHAMPAGNE, 0.40),
        (0.95, 0.66, 0.030, 0.07, GILT, 0.22),
        (0.68, 0.28, 0.075, 0.15, STEEL, 0.30),
        (0.78, 0.84, 0.045, 0.08, STEEL, 0.16),
    ]
    for cx, cy, sx, sy, col, amt in pools:
        d = ((nx - cx) ** 2) / sx + ((ny - cy) ** 2) / sy
        rgb += col * (np.exp(-d)[..., None] * amt)

    return rgb


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    ramp = horizon(W, H)[None, :, None]

    canvas = nebula(W, H) * ramp
    canvas = np.clip(canvas + GROUND, 0, 255)

    base = Image.fromarray(canvas.astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(34)
    )

    # ── Stars ───────────────────────────────────────────────────
    stars = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(stars)

    N = 620
    pts = []
    for _ in range(N):
        # Bias x toward the right so density has a direction.
        x = W * (rng.random() ** 0.55)
        y = rng.random() * H
        lean = np.clip((x / W - 0.30) / 0.62, 0.0, 1.0) ** 1.5
        if rng.random() > 0.16 + 0.84 * lean:
            continue

        mag = rng.random() ** 2.4          # most faint, a few bright
        r = 0.5 + mag * 2.2
        tint = CHAMPAGNE if rng.random() < 0.22 else PLATINUM
        col = tuple(int(min(255, v * (0.34 + 0.86 * mag))) for v in tint)
        d.ellipse([x - r, y - r, x + r, y + r], fill=col)

        if mag > 0.55:
            pts.append((x, y, mag))

        # A cross flare on the few brightest, which is what makes a
        # field read as photographed rather than as dots.
        if mag > 0.86:
            L = 6 + mag * 16
            faint = tuple(int(v * 0.5) for v in col)
            d.line([x - L, y, x + L, y], fill=faint, width=1)
            d.line([x, y - L, x, y + L], fill=faint, width=1)

    # ── Constellation links ─────────────────────────────────────
    # Only near neighbours, only on the right, only a few. A field
    # where every star is joined stops reading as sky.
    for i, (x1, y1, m1) in enumerate(pts):
        if x1 < W * 0.42:
            continue
        near = sorted(
            ((math.hypot(x1 - x2, (y1 - y2) * 1.4), x2, y2) for j, (x2, y2, _) in enumerate(pts) if j != i),
            key=lambda t: t[0],
        )[:2]
        for dist, x2, y2 in near:
            if dist > W * 0.075:
                continue
            lean = np.clip((min(x1, x2) / W - 0.35) / 0.6, 0.0, 1.0)
            a = int(26 + 34 * lean * m1)
            d.line([x1, y1, x2, y2], fill=(a, a + 4, a + 8), width=1)

    glow = stars.filter(ImageFilter.GaussianBlur(9))

    out = (
        np.asarray(base, dtype=np.float32)
        + np.asarray(stars, dtype=np.float32) * ramp * 1.0
        + np.asarray(glow, dtype=np.float32) * ramp * 0.55
    )

    # Vignette, and a final hard hold on the left so type always wins.
    vy = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
    vx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
    out *= np.clip(1.06 - 0.50 * (vx ** 2 + vy ** 2), 0.22, 1.0)[..., None]
    out *= (0.10 + 0.90 * horizon(W, H)[None, :, None] ** 0.9)
    out += GROUND * 1.0

    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    img.save(OUT / "nexyra-field.jpg", quality=82, optimize=True)
    print("wrote nexyra-field.jpg", img.size,
          f"{(OUT / 'nexyra-field.jpg').stat().st_size / 1024:.0f} KB")

    # Portrait crop for stacked/mobile cards — take the busy right
    # side rather than letterboxing the empty left.
    tall = img.crop((W - 1100, 0, W, H)).resize((1200, 900), Image.LANCZOS)
    tall.save(OUT / "nexyra-field-tall.jpg", quality=82, optimize=True)
    print("wrote nexyra-field-tall.jpg", tall.size)


if __name__ == "__main__":
    main()
