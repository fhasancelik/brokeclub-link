"""Make the web-sized images and fonts the SEO pages use.

Run from anywhere (needs Pillow and fontTools with brotli):
    ~/.venvs/hyperframes/bin/python seo/assets.py

Sources live next to this repo in the Broke Club project folder:
    ../brand/penny-3d/penny-3d-cutout.png       3D Penny (the only mascot we use)
    ../docs/aso/store-v3/raw/{en,tr}/*.png      real simulator screenshots
        (TR home uses 1-home-indirim-haftasi.png: the same shot with the event card's current
         TR name and blurb, made by ../docs/aso/store-v3/rename-event-tr.py)
    ../brokeclub/node_modules/@expo-google-fonts/poppins/   Poppins TTFs

Writes into assets/ (checked in). The OG images are rendered by build.mjs --og.
"""
from pathlib import Path

from PIL import Image
from fontTools import subset

REPO = Path(__file__).resolve().parent.parent
PROJECT = REPO.parent
OUT = REPO / "assets"
SHOTS_IN = PROJECT / "docs/aso/store-v3/raw"
PENNY_IN = PROJECT / "brand/penny-3d/penny-3d-cutout.png"
FONTS_IN = PROJECT / "brokeclub/node_modules/@expo-google-fonts/poppins"

LIME = (200, 255, 77, 255)

# Full phone screenshots: (language, source file, output name)
PHONES = [
    ("en", "1-home.png", "home"),
    ("en", "2-challenge.png", "challenge"),
    ("en", "3-budget.png", "budget"),
    ("en", "5-sos.png", "sos"),
    ("en", "6-stats.png", "stats"),
    ("en", "8-penny.png", "penny-chat"),
    ("tr", "1-home-indirim-haftasi.png", "home"),
    ("tr", "2-challenge.png", "challenge"),
    ("tr", "3-budget.png", "budget"),
    ("tr", "4-coach.png", "coach"),
    ("tr", "5-sos.png", "sos"),
    ("tr", "6-stats.png", "stats"),
    ("tr", "8-penny.png", "penny-chat"),
]

# Crops of one card from a real screenshot: (language, source, name, box in 1320x2868 px)
CROPS = [
    ("en", "2-challenge.png", "calendar", (40, 1180, 1280, 1950)),
    ("en", "2-challenge.png", "club", (40, 1960, 1280, 2735)),
    ("en", "1-home.png", "event", (40, 1165, 1280, 1520)),
    ("tr", "2-challenge.png", "calendar", (40, 1180, 1280, 1950)),
    ("tr", "2-challenge.png", "club", (40, 1960, 1280, 2735)),
    ("tr", "1-home-indirim-haftasi.png", "event", (40, 1210, 1280, 1629)),
]


def resize_rgba(im: Image.Image, width: int) -> Image.Image:
    """Resize with premultiplied alpha so transparent pixels don't bleed colour into edges."""
    height = round(im.height * width / im.width)
    return im.convert("RGBa").resize((width, height), Image.LANCZOS).convert("RGBA")


def shots():
    d = OUT / "shots"
    d.mkdir(parents=True, exist_ok=True)
    for lang, src, name in PHONES:
        im = Image.open(SHOTS_IN / lang / src).convert("RGB")
        im = im.resize((540, round(im.height * 540 / im.width)), Image.LANCZOS)
        im.save(d / f"{lang}-{name}.webp", "WEBP", quality=76, method=6)
    for lang, src, name, box in CROPS:
        im = Image.open(SHOTS_IN / lang / src).convert("RGB").crop(box)
        im = im.resize((720, round(im.height * 720 / im.width)), Image.LANCZOS)
        im.save(d / f"{lang}-{name}.webp", "WEBP", quality=78, method=6)


def penny():
    src = Image.open(PENNY_IN).convert("RGBA")
    # On-page mascot (shown at up to ~180 css px wide).
    resize_rgba(src, 400).save(OUT / "penny.webp", "WEBP", quality=82, method=6)
    # Icons: Penny on a flat lime square.
    for size, name in [(180, "apple-touch-icon.png"), (48, "favicon-48.png")]:
        canvas = Image.new("RGBA", (size, size), LIME)
        p = resize_rgba(src, round(size * 0.86))
        canvas.alpha_composite(p, ((size - p.width) // 2, size - p.height - round(size * 0.04)))
        canvas.convert("RGB").save(OUT / name, "PNG", optimize=True)


def fonts():
    d = OUT / "fonts"
    d.mkdir(parents=True, exist_ok=True)
    # Latin + Turkish letters + the punctuation and symbols the copy uses (₺, →, curly quotes).
    unicodes = "U+0020-007E,U+00A0-00FF,U+011E-011F,U+0130-0131,U+015E-015F,U+2013-2014,U+2018-201E,U+2022,U+2026,U+20BA,U+2192"
    for weight, folder in [(400, "400Regular"), (800, "800ExtraBold"), (900, "900Black")]:
        ttf = FONTS_IN / folder / f"Poppins_{folder}.ttf"
        out = d / f"poppins-{weight}.woff2"
        subset.main([str(ttf), f"--unicodes={unicodes}", "--flavor=woff2", "--layout-features=kern,liga", f"--output-file={out}"])


if __name__ == "__main__":
    shots()
    penny()
    fonts()
    for f in sorted(OUT.rglob("*")):
        if f.is_file():
            print(f"{f.relative_to(REPO)}  {f.stat().st_size // 1024} KB")
