from pathlib import Path
import json
import re

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "source-packs.js"
OUTPUT_DIR = ROOT / "sources"
WIDTH, HEIGHT = 1600, 1000


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path(r"C:\Windows\Fonts\seguisb.ttf") if bold else Path(r"C:\Windows\Fonts\segoeui.ttf"),
        Path(r"C:\Windows\Fonts\arialbd.ttf") if bold else Path(r"C:\Windows\Fonts\arial.ttf"),
    ]
    for candidate in candidates:
        if candidate.is_file():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def load_packs() -> dict:
    source = DATA_FILE.read_text(encoding="utf-8")
    match = re.search(r"window\.GeoQuestStage1Packs\s*=\s*(\{[\s\S]*\})\s*;\s*$", source)
    if not match:
        raise ValueError("Could not read GeoQuest source-pack data")
    return json.loads(match.group(1))


def rounded(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], radius: int, fill: str, outline: str | None = None, width: int = 1) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text(draw: ImageDraw.ImageDraw, position: tuple[int, int], value: str, size: int, fill: str, bold: bool = False, anchor: str = "la") -> None:
    draw.text(position, value, font=font(size, bold), fill=fill, anchor=anchor)


def partner_rows(draw: ImageDraw.ImageDraw, x: int, y: int, width: int, title: str, partners: list, total: float, accent: str) -> None:
    rounded(draw, (x, y, x + width, y + 390), 24, "#FFFFFF", "#D8E3EF", 3)
    draw.rectangle((x, y, x + width, y + 68), fill=accent)
    text(draw, (x + 28, y + 35), title, 28, "#FFFFFF", True, "lm")
    text(draw, (x + width - 145, y + 35), "Share", 22, "#EAF5FF", True, "mm")
    text(draw, (x + width - 55, y + 35), "Rbn", 22, "#EAF5FF", True, "mm")
    row_y = y + 82
    for index, (country, share) in enumerate(partners, start=1):
        if index % 2 == 0:
            draw.rectangle((x + 12, row_y - 2, x + width - 12, row_y + 54), fill="#F4F8FC")
        value = total * float(share) / 100
        text(draw, (x + 28, row_y + 25), f"{index}. {country}", 25, "#19324D", index <= 3, "lm")
        text(draw, (x + width - 145, row_y + 25), f"{share:.1f}%", 24, "#19324D", True, "mm")
        text(draw, (x + width - 55, row_y + 25), f"{value:.2f}", 24, "#19324D", False, "mm")
        row_y += 59


def render_pack(pack_id: str, pack: dict) -> Path:
    palette = {
        "A": ("#083E73", "#18A6A6", "#DDF7F4"),
        "B": ("#124E3A", "#C98A16", "#F9F0D8"),
    }
    navy, accent, soft = palette[pack_id]
    image = Image.new("RGB", (WIDTH, HEIGHT), "#EFF4F9")
    draw = ImageDraw.Draw(image)

    draw.rectangle((0, 0, WIDTH, 174), fill=navy)
    text(draw, (70, 58), "GEOQUEST // TRADE INTELLIGENCE BRIEF", 42, "#FFFFFF", True, "lm")
    text(draw, (70, 116), "South African trade snapshot", 28, "#D7E9FA", False, "lm")
    rounded(draw, (1328, 42, 1530, 132), 24, accent)
    text(draw, (1429, 72), f"SOURCE PACK {pack_id}", 22, "#FFFFFF", True, "mm")
    text(draw, (1429, 106), pack["label"], 18, "#FFFFFF", False, "mm")

    rounded(draw, (70, 210, 505, 394), 24, "#FFFFFF", "#D3DEEA", 3)
    rounded(draw, (582, 210, 1017, 394), 24, "#FFFFFF", "#D3DEEA", 3)
    rounded(draw, (1094, 210, 1530, 394), 24, soft, accent, 4)
    text(draw, (105, 252), "TOTAL EXPORTS", 23, "#52708D", True, "la")
    text(draw, (105, 326), f"R{pack['exports']:.2f} bn", 47, navy, True, "la")
    text(draw, (617, 252), "TOTAL IMPORTS", 23, "#52708D", True, "la")
    text(draw, (617, 326), f"R{pack['imports']:.2f} bn", 47, navy, True, "la")
    balance_word = "SURPLUS" if pack["balance"] > 0 else "DEFICIT"
    sign = "+" if pack["balance"] > 0 else "-"
    text(draw, (1129, 252), "BALANCE OF TRADE", 23, "#52708D", True, "la")
    text(draw, (1129, 313), f"{sign}R{abs(pack['balance']):.2f} bn", 41, navy, True, "la")
    text(draw, (1129, 362), balance_word, 22, accent, True, "la")

    partner_rows(draw, 70, 438, 715, "Leading export destinations", pack["exportPartners"], pack["exports"], navy)
    partner_rows(draw, 815, 438, 715, "Leading import origins", pack["importPartners"], pack["imports"], accent)

    text(draw, (70, 888), "How to read this briefing", 22, navy, True, "la")
    text(draw, (70, 926), "Share = percentage of total trade. Rbn = estimated rand value, rounded to two decimals.", 23, "#3D5872", False, "la")
    text(draw, (70, 968), "GeoQuest learning simulation - figures created for this source pack.", 19, "#6A7F94", False, "la")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    destination = OUTPUT_DIR / f"trade-brief-{pack_id.lower()}.jpg"
    image.save(destination, format="JPEG", quality=94, optimize=True, progressive=True)
    return destination


def main() -> None:
    for pack_id, pack in load_packs().items():
        destination = render_pack(pack_id, pack)
        print(f"Generated {destination.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
