#!/usr/bin/env python3
"""
Generates four capability plates.

The capabilities section was a numbered text list — the thinnest
block on the page, and the one carrying the most important claims.
Text alone cannot read as premium; it reads as a specification.

So each capability gets a PLATE: a fine-line technical drawing on
charcoal, in the language of an engraved instrument face or a
patent diagram. That register is right for two reasons — it is
what precision goods actually use, and it is honest. These are
diagrams of how the thing works, not stock photography of people
pointing at screens.

House rules for all four:
  · hairline strokes only, one weight, platinum
  · champagne reserved for the single active element in each
  · generous empty margin — the drawing never fills the plate
  · no text, so they never need re-rendering for translation

Output: public/images/cap-1.jpg … cap-4.jpg (900x560)
"""

import math
import pathlib

from PIL import Image, ImageDraw, ImageFilter

W, H = 900, 560
OUT = pathlib.Path("public/images")

INK = (13, 14, 17)
LINE = (92, 100, 110)
FAINT = (44, 49, 56)
PLAT = (185, 194, 204)
CHAMP = (217, 174, 99)
GILT = (240, 224, 186)


def plate():
    img = Image.new("RGB", (W, H), INK)
    return img, ImageDraw.Draw(img)


def finish(img, name):
    # Bloom pass so the hairlines have a little light in them,
    # the way an engraved surface catches a lamp.
    glow = img.filter(ImageFilter.GaussianBlur(7))
    out = Image.blend(img, glow, 0.34)
    out = Image.blend(out, img, 0.55)

    # Corner falloff.
    vig = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(vig)
    d.ellipse([-W * 0.35, -H * 0.5, W * 1.35, H * 1.5], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(120))
    dark = Image.new("RGB", (W, H), INK)
    out = Image.composite(out, dark, vig)

    out.save(OUT / name, quality=86, optimize=True)
    print(" ", name, f"{(OUT / name).stat().st_size / 1024:.0f} KB")


def arrow(d, x1, y1, x2, y2, col, w=1):
    d.line([x1, y1, x2, y2], fill=col, width=w)
    a = math.atan2(y2 - y1, x2 - x1)
    for s in (-0.42, 0.42):
        d.line([x2, y2, x2 - 11 * math.cos(a + s), y2 - 11 * math.sin(a + s)],
               fill=col, width=w)


def box(d, cx, cy, w, h, col, r=6, fill=None):
    d.rounded_rectangle([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2],
                        radius=r, outline=col, width=1, fill=fill)


# ── 01 · AI Automation — a pipeline that branches and rejoins ───
def cap_automation():
    img, d = plate()
    y = H / 2
    xs = [175, 340, 505, 670]

    for i, x in enumerate(xs):
        box(d, x, y, 96, 62, PLAT if i in (0, 3) else LINE)
        if i:
            arrow(d, xs[i - 1] + 52, y, x - 52, y, LINE)

    # A branch that leaves the main line and returns — the point of
    # automation is the path a person no longer has to walk.
    by = y - 105
    d.line([xs[0] + 52, y, xs[0] + 95, y], fill=FAINT)
    d.line([xs[0] + 95, y, xs[0] + 95, by], fill=FAINT)
    box(d, 420, by, 120, 50, CHAMP)
    d.line([xs[0] + 95, by, 360, by], fill=CHAMP)
    arrow(d, 480, by, 640, by, CHAMP)
    d.line([640, by, 640, y - 34], fill=CHAMP)

    # Travelling markers.
    for x in (258, 423, 588):
        d.ellipse([x - 3, y - 3, x + 3, y + 3], fill=GILT)

    for i, x in enumerate(xs):
        for k in range(3):
            d.line([x - 30, y - 14 + k * 14, x + 30, y - 14 + k * 14], fill=FAINT)

    finish(img, "cap-1.jpg")


# ── 02 · AI Assistants — concentric response, one live channel ──
def cap_assistants():
    img, d = plate()
    cx, cy = W * 0.30, H / 2

    for i in range(9):
        r = 42 + i * 34
        col = CHAMP if i == 2 else (LINE if i % 2 == 0 else FAINT)
        d.arc([cx - r, cy - r, cx + r, cy + r], start=-62, end=62,
              fill=col, width=1)

    d.ellipse([cx - 15, cy - 15, cx + 15, cy + 15], outline=PLAT, width=1)
    d.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=CHAMP)

    # Three correspondents, one currently answered.
    for i, ang in enumerate((-34, 0, 34)):
        a = math.radians(ang)
        x = cx + 368 * math.cos(a)
        y = cy + 368 * math.sin(a)
        live = i == 1
        box(d, x, y, 108, 46, CHAMP if live else LINE)
        d.line([cx + 18 * math.cos(a), cy + 18 * math.sin(a),
                x - 56 * math.cos(a), y - 56 * math.sin(a)],
               fill=CHAMP if live else FAINT)
        for k in range(2):
            d.line([x - 36, y - 7 + k * 14, x + (18 if k else 36), y - 7 + k * 14],
                   fill=FAINT)

    finish(img, "cap-2.jpg")


# ── 03 · Cloud Platforms — layered stack in perspective ─────────
def cap_cloud():
    img, d = plate()
    cx, cy = W / 2, H / 2 + 40
    rx, ry = 210, 62

    for i in range(4):
        oy = cy - i * 74
        col = CHAMP if i == 2 else LINE
        d.ellipse([cx - rx, oy - ry, cx + rx, oy + ry], outline=col, width=1)
        # Sides, to read as a solid slab rather than a ring.
        if i < 3:
            for sx in (-rx, rx):
                d.line([cx + sx, oy, cx + sx, oy - 74], fill=FAINT)

        # Racks on the surface.
        for k in range(-3, 4):
            x = cx + k * 46
            h = 13 if i != 2 else 19
            d.line([x, oy - h, x, oy + h],
                   fill=(GILT if i == 2 and k == 0 else FAINT))

    # Uplink.
    arrow(d, cx, cy - 3 * 74 - ry - 12, cx, cy - 3 * 74 - ry - 74, PLAT)
    d.ellipse([cx - 6, cy - 3 * 74 - ry - 82, cx + 6, cy - 3 * 74 - ry - 70],
              fill=CHAMP)

    finish(img, "cap-3.jpg")


# ── 04 · Custom AI Products — a wafer of modules, one bespoke ───
def cap_products():
    img, d = plate()
    cols, rows = 7, 4
    cw, ch = 92, 82
    ox = W / 2 - (cols * cw) / 2
    oy = H / 2 - (rows * ch) / 2

    for r in range(rows):
        for c in range(cols):
            x = ox + c * cw + cw / 2
            y = oy + r * ch + ch / 2
            special = (r, c) in {(1, 2), (1, 3), (2, 2), (2, 3)}
            if special:
                continue
            box(d, x, y, cw - 16, ch - 16, FAINT, r=3)
            if (r + c) % 3 == 0:
                d.line([x - 16, y, x + 16, y], fill=FAINT)

    # The commissioned block: four cells fused into one.
    x0 = ox + 2 * cw + 8
    y0 = oy + 1 * ch + 8
    d.rounded_rectangle([x0, y0, x0 + 2 * cw - 16, y0 + 2 * ch - 16],
                        radius=8, outline=CHAMP, width=1)
    icx = x0 + cw - 8
    icy = y0 + ch - 8
    for i in range(4):
        a = math.radians(45 + i * 90)
        d.line([icx, icy, icx + 44 * math.cos(a), icy + 44 * math.sin(a)],
               fill=CHAMP)
        d.ellipse([icx + 44 * math.cos(a) - 4, icy + 44 * math.sin(a) - 4,
                   icx + 44 * math.cos(a) + 4, icy + 44 * math.sin(a) + 4],
                  fill=PLAT)
    d.ellipse([icx - 8, icy - 8, icx + 8, icy + 8], fill=GILT)

    # Bus lines leaving the wafer.
    for r in range(rows):
        y = oy + r * ch + ch / 2
        d.line([ox - 46, y, ox - 8, y], fill=FAINT)
        d.line([ox + cols * cw + 8, y, ox + cols * cw + 46, y], fill=FAINT)

    finish(img, "cap-4.jpg")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    print("plates:")
    cap_automation()
    cap_assistants()
    cap_cloud()
    cap_products()
