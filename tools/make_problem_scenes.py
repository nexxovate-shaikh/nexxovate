#!/usr/bin/env python3
"""
Generates six problem scenes.

A capabilities list tells someone what you sell. A problems list
tells them you have seen their week. These six are the ones almost
every enterprise IT function actually has — stated as the symptom,
not the solution, because the symptom is what a visitor recognises
about themselves.

Each scene is drawn as the SHAPE of the problem, so it is legible
before the caption is read:

  1 alerts      a field of noise with three signals inside it
  2 backlog     a queue taller than the team clearing it
  3 decay       a line that drifted under its threshold unnoticed
  4 knowledge   the answer, buried in a stack, found by a beam
  5 manual      two ledgers reconciled by hand, one path automated
  6 vacancy     a team with a hole in it

Charcoal and steel throughout. Champagne marks only the part
Nexxovate changes — so across all six, the eye learns that gold
means "this is the bit we fix".

Output: public/images/prob-1..6.jpg (800x500)
"""

import math
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 800, 500
OUT = pathlib.Path("public/images")

GROUND = np.array([10, 11, 13], dtype=np.float32)
STEEL = (108, 126, 148)
DIM = (52, 60, 71)
PLATINUM = (201, 209, 218)
CHAMPAGNE = (217, 174, 99)
GILT = (243, 228, 192)


def scene():
    img = Image.new("RGB", (W, H), (0, 0, 0))
    return img, ImageDraw.Draw(img)


def finish(img, name, seed):
    acc = np.asarray(img, dtype=np.float32)

    bright = np.clip(acc - 40, 0, None)
    bl = Image.fromarray(np.clip(bright, 0, 255).astype(np.uint8))
    acc += np.asarray(bl.filter(ImageFilter.GaussianBlur(16)), dtype=np.float32) * 0.95
    acc += np.asarray(bl.filter(ImageFilter.GaussianBlur(44)), dtype=np.float32) * 0.50
    acc += GROUND

    vx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
    vy = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
    acc *= np.clip(1.05 - 0.34 * (vx ** 2 + vy ** 2), 0.24, 1.0)[..., None]

    rng = np.random.default_rng(seed)
    acc += rng.normal(0.0, 1.9, size=(H, W, 1)).astype(np.float32)

    out = Image.fromarray(np.clip(acc, 0, 255).astype(np.uint8))
    out.save(OUT / name, quality=84, optimize=True)
    print(f"  {name}  {(OUT / name).stat().st_size / 1024:.0f} KB")


# ── 1 · Alert fatigue ───────────────────────────────────────────
def prob_alerts():
    img, d = scene()
    rng = np.random.default_rng(3)

    for _ in range(260):
        x, y = rng.random() * W, rng.random() * H
        r = 1.2 + rng.random() * 2.4
        d.ellipse([x - r, y - r, x + r, y + r], fill=DIM)

    # The three that mattered — larger, ringed, gold.
    for x, y in ((250, 170), (470, 300), (600, 140)):
        for rr, col in ((22, CHAMPAGNE), (13, CHAMPAGNE)):
            d.ellipse([x - rr, y - rr, x + rr, y + rr], outline=col, width=1)
        d.ellipse([x - 5, y - 5, x + 5, y + 5], fill=GILT)

    # The sweep that found them.
    for k in range(3):
        d.line([120 + k, 0, 340 + k, H], fill=(30, 34, 40))
    finish(img, "prob-1.jpg", 11)


# ── 2 · Ticket backlog ──────────────────────────────────────────
def prob_backlog():
    img, d = scene()
    rng = np.random.default_rng(9)

    # A queue that runs off the top of frame.
    for i in range(22):
        y = H - 30 - i * 26
        w = 300 + rng.random() * 150
        x = 120
        if y < -30:
            break
        d.rounded_rectangle([x, y - 9, x + w, y + 9], radius=4,
                            outline=DIM if i > 4 else STEEL, width=1)
        d.line([x + 14, y, x + 14 + 30, y], fill=DIM)

    # The routine ones, clearing themselves.
    for i, y in enumerate((H - 56, H - 108, H - 160)):
        w = 300 + i * 40
        d.rounded_rectangle([120, y - 9, 120 + w, y + 9], radius=4,
                            outline=CHAMPAGNE, width=1)
        d.line([120 + w + 16, y, 120 + w + 74, y], fill=CHAMPAGNE)
        d.ellipse([120 + w + 80, y - 5, 120 + w + 90, y + 5], fill=GILT)

    finish(img, "prob-2.jpg", 12)


# ── 3 · Silent performance decay ────────────────────────────────
def prob_decay():
    img, d = scene()

    base, span = 190, 520
    x0 = 140

    # The threshold nobody was watching.
    d.line([x0 - 20, base, x0 + span + 20, base], fill=(64, 54, 34))
    for x in range(x0 - 20, x0 + span + 20, 14):
        d.line([x, base, x + 6, base], fill=CHAMPAGNE)

    pts = []
    for i in range(61):
        u = i / 60
        y = base - 96 + u * 190 + math.sin(u * 12) * 9
        pts.append((x0 + u * span, y))

    # Under the line, the trace goes gold — that is the moment.
    for i in range(len(pts) - 1):
        under = pts[i][1] > base
        d.line([*pts[i], *pts[i + 1]], fill=CHAMPAGNE if under else STEEL, width=2)

    for i in range(0, len(pts), 6):
        x, y = pts[i]
        r = 2.6
        d.ellipse([x - r, y - r, x + r, y + r],
                  fill=GILT if y > base else PLATINUM)

    finish(img, "prob-3.jpg", 13)


# ── 4 · Knowledge nobody can find ───────────────────────────────
def prob_knowledge():
    img, d = scene()

    # A stack seen in perspective, receding upward.
    for i in range(11):
        y = 400 - i * 30
        inset = i * 11
        d.rounded_rectangle([170 + inset, y - 12, 630 - inset, y + 12],
                            radius=3, outline=DIM if i != 4 else CHAMPAGNE,
                            width=1)
        if i != 4:
            for k in range(3):
                d.line([190 + inset, y - 5 + k * 5, 300 + inset - k * 22, y - 5 + k * 5],
                       fill=DIM)

    # The beam that reached it.
    y = 400 - 4 * 30
    d.polygon([(400, 40), (250, y - 14), (550, y - 14)], outline=(46, 40, 26))
    d.line([400, 40, 400, y - 14], fill=(74, 62, 38))
    d.ellipse([392, 34, 408, 50], fill=GILT)
    for k in range(4):
        d.line([210 + 55 * k, y, 230 + 55 * k, y], fill=GILT)

    finish(img, "prob-4.jpg", 14)


# ── 5 · Manual reconciliation ───────────────────────────────────
def prob_manual():
    img, d = scene()
    rng = np.random.default_rng(21)

    left, right = 180, 620
    rows = 9
    for i in range(rows):
        y = 110 + i * 32
        d.rounded_rectangle([left - 74, y - 10, left, y + 10], radius=3,
                            outline=STEEL, width=1)
        d.rounded_rectangle([right, y - 10, right + 74, y + 10], radius=3,
                            outline=STEEL, width=1)

    # Hand-matched: crossing, uneven, some missing.
    order = list(range(rows))
    rng.shuffle(order)
    for i, j in enumerate(order):
        if rng.random() < 0.22:
            continue
        y1 = 110 + i * 32
        y2 = 110 + j * 32
        d.line([left + 6, y1, right - 6, y2], fill=DIM)

    # The one path that runs itself.
    d.line([left + 6, 110 + 4 * 32, right - 6, 110 + 4 * 32], fill=CHAMPAGNE, width=2)
    for k in range(5):
        x = left + 40 + k * 84
        d.ellipse([x - 4, 110 + 4 * 32 - 4, x + 4, 110 + 4 * 32 + 4], fill=GILT)

    finish(img, "prob-5.jpg", 15)


# ── 6 · The role that stayed open ───────────────────────────────
def prob_vacancy():
    img, d = scene()

    cols, rows_n = 6, 3
    cw, ch = 96, 104
    ox = W / 2 - cols * cw / 2
    oy = H / 2 - rows_n * ch / 2

    gap = (1, 3)
    for r in range(rows_n):
        for c in range(cols):
            x = ox + c * cw + cw / 2
            y = oy + r * ch + ch / 2
            if (r, c) == gap:
                # The hole in the team.
                for k in range(0, 360, 18):
                    a1 = math.radians(k)
                    a2 = math.radians(k + 9)
                    d.line([x + 30 * math.cos(a1), y + 34 * math.sin(a1),
                            x + 30 * math.cos(a2), y + 34 * math.sin(a2)],
                           fill=CHAMPAGNE)
                d.line([x - 12, y, x + 12, y], fill=GILT, width=2)
                d.line([x, y - 12, x, y + 12], fill=GILT, width=2)
                continue
            d.ellipse([x - 15, y - 30, x + 15, y - 2], outline=STEEL, width=1)
            d.arc([x - 26, y - 4, x + 26, y + 52], start=180, end=360,
                  fill=STEEL, width=1)

    finish(img, "prob-6.jpg", 16)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    print("problem scenes:")
    prob_alerts()
    prob_backlog()
    prob_decay()
    prob_knowledge()
    prob_manual()
    prob_vacancy()
