"""Generate the ayeo and Compass brand assets from the design system's SVG masters.

Masters: the ayeo Design System's Marks group, copied into masters/ as
<brand>-<kind>.svg. Outputs go to ayeo/ and compass/ beside this script.
Wordmarks outline IBM Plex Sans 600 so they render where web fonts do not (GitHub).
"""
import io
import shutil
import subprocess
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

HERE = Path(__file__).parent
MASTERS = HERE / "masters"
FONTS = HERE.parent / "src" / "assets" / "fonts"
OUT = HERE

KINDS = ("mark", "mark-dark", "mark-16", "tile", "tile-light")
BRANDS = ("ayeo", "compass")
NAMES = {"ayeo": "ayeo", "compass": "Compass"}
TAGLINES = {"ayeo": "Open-source tools for AI-assisted software development",
            "compass": "Adaptive spec-driven development for Claude Code"}
NAVY, NAVY_300, NAVY_200, WHITE = "#0E3A5F", "#6A95B6", "#9BBAD0", "#FFFFFF"


def font(weight):
    data = io.BytesIO()
    f = TTFont(FONTS / f"plex-sans-{weight}.woff2")
    f.flavor = None
    f.save(data)
    return f, data.getvalue()


def text_path(text, weight, size, x, baseline, tracking_em=0.0):
    """Outline `text` as one SVG path, shaped with HarfBuzz (kerning included)."""
    tt, raw = font(weight)
    face = hb.Face(raw)
    hbfont = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    upem = tt["head"].unitsPerEm
    scale = size / upem
    glyphs = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    pen = SVGPathPen(glyphs)
    cx = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        t = TransformPen(pen, (scale, 0, 0, -scale, x + (cx + pos.x_offset) * scale, baseline))
        glyphs[name].draw(t)
        cx += pos.x_advance + tracking_em * upem
    width = (cx - tracking_em * upem) * scale
    return pen.getCommands(), width


def ink_box(text, weight):
    """Top and bottom of the shaped run's ink, in em, above the baseline."""
    from fontTools.pens.boundsPen import BoundsPen
    tt, _ = font(weight)
    glyphs = tt.getGlyphSet()
    cmap = tt.getBestCmap()
    lo, hi = 0.0, 0.0
    for ch in text:
        pen = BoundsPen(glyphs)
        glyphs[cmap[ord(ch)]].draw(pen)
        if pen.bounds:
            lo, hi = min(lo, pen.bounds[1]), max(hi, pen.bounds[3])
    upem = tt["head"].unitsPerEm
    return hi / upem, lo / upem


def readme_header(brand, ink):
    # The tile on the left and the name beside it, the name's ink as tall as
    # the tile, for a README header where markdown cannot size text to an image.
    tile_h, gap = 64, 18
    top, bottom = ink_box(NAMES[brand], 600)
    size = tile_h / (top - bottom)
    baseline = top * size
    d, w = text_path(NAMES[brand], 600, size, tile_h + gap, baseline, -0.02)
    width = round(tile_h + gap + w + 1)
    tile = master(brand, "tile")
    inner = tile[tile.index(">") + 1: tile.rindex("</svg>")]
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {tile_h}" '
            f'width="{width}" height="{tile_h}" role="img" aria-label="{NAMES[brand]}">'
            f'{inner}<path d="{d}" fill="{ink}"/></svg>\n')


def master(brand, kind):
    return (MASTERS / f"{brand}-{kind}.svg").read_text()


def mark_group(brand, kind, x, y, size):
    """The master's drawing, placed at (x, y) at `size` px, inside its own <g>."""
    svg = master(brand, kind)
    inner = svg[svg.index(">") + 1: svg.rindex("</svg>")]
    return f'<g transform="translate({x} {y}) scale({size / 32})" fill="none">{inner}</g>'


def wordmark(brand, ink):
    # wordmark-hero: 112px mark, 64px Plex Sans 600 at -0.02em; gap is the
    # mark's clear space (a quarter of its width).
    mark, size, gap, pad = ("mark" if ink == NAVY else "mark-dark"), 112, 28, 8
    text_x = pad + size + gap
    # Centre the x-height band on the mark's centre.
    baseline = pad + size / 2 + 0.516 * 64 / 2
    d, w = text_path(NAMES[brand], 600, 64, text_x, baseline, -0.02)
    width = round(text_x + w + pad)
    height = size + 2 * pad
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
            f'width="{width}" height="{height}" role="img" aria-label="{NAMES[brand]}">'
            f'{mark_group(brand, mark, pad, pad, size)}<path d="{d}" fill="{ink}"/></svg>\n')


def social(brand):
    # GitHub social preview: 1280x640, navy ground, white mark and name.
    W, H, size, gap = 1280, 640, 176, 44
    d_name, w_name = text_path(NAMES[brand], 600, 100, 0, 0, -0.02)
    total = size + gap + w_name
    x0 = (W - total) / 2
    y0 = 176
    baseline = y0 + size / 2 + 0.516 * 100 / 2
    d_name, _ = text_path(NAMES[brand], 600, 100, x0 + size + gap, baseline, -0.02)
    d_tag, w_tag = text_path(TAGLINES[brand], 400, 36, 0, 0)
    d_tag, _ = text_path(TAGLINES[brand], 400, 36, (W - w_tag) / 2, y0 + size + 110)
    tile = master(brand, "tile")
    inner = tile[tile.index("</rect>") + len("</rect>"): tile.rindex("</g>")]
    inner = inner[inner.index(">") + 1:]  # drop the tile's own transform group
    g = f'<g transform="translate({x0} {y0}) scale({size / 32})" fill="none">{inner}</g>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f'<rect width="{W}" height="{H}" fill="{NAVY}"/>{g}'
            f'<path d="{d_name}" fill="{WHITE}"/><path d="{d_tag}" fill="{NAVY_200}"/></svg>\n')


def png(svg_path, out, w, h=None):
    cmd = ["rsvg-convert", "-w", str(w), "-h", str(h or w), "-o", str(out), str(svg_path)]
    subprocess.run(cmd, check=True)


def main():
    for brand in BRANDS:
        d = OUT / brand
        if d.exists():
            shutil.rmtree(d)
        d.mkdir(parents=True)
        for kind in KINDS:
            (d / f"{brand}-{kind}.svg").write_text(master(brand, kind))
        for s in (64, 128, 256, 512, 1024):
            png(d / f"{brand}-tile.svg", d / f"{brand}-tile-{s}.png", s)
            png(d / f"{brand}-tile-light.svg", d / f"{brand}-tile-light-{s}.png", s)
        for s in (16, 32, 48):
            png(d / f"{brand}-mark-16.svg", d / f"_ico-{s}.png", s)
        imgs = [Image.open(d / f"_ico-{s}.png") for s in (16, 32, 48)]
        imgs[0].save(d / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=imgs[1:])
        for s in (16, 32, 48):
            (d / f"_ico-{s}.png").unlink()
        (d / f"{brand}-wordmark-light.svg").write_text(wordmark(brand, NAVY))
        (d / f"{brand}-wordmark-dark.svg").write_text(wordmark(brand, NAVY_300))
        (d / f"{brand}-header-light.svg").write_text(readme_header(brand, NAVY))
        (d / f"{brand}-header-dark.svg").write_text(readme_header(brand, NAVY_300))
        (d / f"{brand}-social-preview.svg").write_text(social(brand))
        png(d / f"{brand}-social-preview.svg", d / f"{brand}-social-preview.png", 1280, 640)
        for v in ("light", "dark"):
            src = d / f"{brand}-wordmark-{v}.svg"
            subprocess.run(["rsvg-convert", "-z", "4", "-o", str(d / f"{brand}-wordmark-{v}@4x.png"), str(src)],
                           check=True)
    print("\n".join(sorted(str(p.relative_to(OUT)) for b in BRANDS for p in (OUT / b).rglob("*") if p.is_file())))


if __name__ == "__main__":
    sys.exit(main())
