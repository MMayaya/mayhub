from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


HERE = Path(__file__).resolve().parent
OUTPUT = HERE / "sources" / "patterns-of-colonisation.jpg"
WIDTH, HEIGHT = 1800, 1120


def font(size, bold=False):
    candidates = [
        Path("C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def centered(draw, box, text, text_font, fill="#111111"):
    left, top, right, bottom = box
    bounds = draw.multiline_textbbox((0, 0), text, font=text_font, spacing=4, align="center")
    text_width = bounds[2] - bounds[0]
    text_height = bounds[3] - bounds[1]
    draw.multiline_text(
        ((left + right - text_width) / 2, (top + bottom - text_height) / 2 - bounds[1]),
        text,
        font=text_font,
        fill=fill,
        spacing=4,
        align="center",
    )


def label(draw, x, y, width, height, territory, power, shade="#ffffff"):
    draw.rounded_rectangle((x, y, x + width, y + height), radius=12, fill=shade, outline="#111111", width=3)
    draw.line((x + 8, y + 34, x + width - 8, y + 34), fill="#555555", width=2)
    centered(draw, (x + 5, y + 4, x + width - 5, y + 35), territory, font(17, True))
    centered(draw, (x + 5, y + 37, x + width - 5, y + height - 3), power, font(14, False), "#333333")


def ledger_box(draw, y, title, entries, shade="#ffffff", height=116):
    left, right = 1180, 1735
    draw.rounded_rectangle((left, y, right, y + height), radius=14, fill=shade, outline="#202020", width=3)
    draw.rounded_rectangle((left + 14, y + 13, left + 180, y + height - 13), radius=9, fill="#202020")
    title_size = 22
    title_font = font(title_size, True)
    while draw.textlength(title, font=title_font) > 148 and title_size > 12:
        title_size -= 1
        title_font = font(title_size, True)
    centered(draw, (left + 18, y + 14, left + 176, y + height - 14), title, title_font, "#ffffff")
    entry_font = font(19)
    available_width = right - (left + 202) - 18
    lines = []
    current = []
    for entry in entries:
        candidate = "  •  ".join(current + [entry])
        if current and draw.textlength(candidate, font=entry_font) > available_width:
            lines.append("  •  ".join(current))
            current = [entry]
        else:
            current.append(entry)
    if current:
        lines.append("  •  ".join(current))
    wrapped = "\n".join(lines)
    text_bounds = draw.multiline_textbbox((0, 0), wrapped, font=entry_font, spacing=6)
    text_height = text_bounds[3] - text_bounds[1]
    draw.multiline_text((left + 202, y + (height - text_height) / 2 - text_bounds[1]), wrapped, font=entry_font, fill="#181818", spacing=6)


image = Image.new("RGB", (WIDTH, HEIGHT), "#fbfaf5")
draw = ImageDraw.Draw(image)

draw.rectangle((24, 24, WIDTH - 24, HEIGHT - 24), outline="#111111", width=5)
draw.rectangle((36, 36, WIDTH - 36, HEIGHT - 36), outline="#777777", width=2)
centered(draw, (65, 48, WIDTH - 65, 125), "THE COLONIAL MAPMAKER'S LEDGER", font(46, True))
centered(draw, (65, 118, WIDTH - 65, 160), "A simplified record of patterns during the Scramble for Africa", font(23))
draw.line((70, 170, WIDTH - 70, 170), fill="#111111", width=3)

# A deliberately simplified Africa silhouette: the labels and ledger carry the exact evidence.
africa = [
    (360, 210), (555, 190), (720, 215), (825, 265), (930, 300),
    (1045, 320), (978, 370), (905, 395), (925, 455), (870, 505),
    (830, 585), (785, 640), (735, 720), (680, 810), (600, 935),
    (540, 1000), (485, 945), (442, 850), (410, 765), (350, 700),
    (315, 625), (260, 575), (205, 530), (135, 490), (92, 420),
    (120, 345), (185, 275), (270, 225)
]
draw.polygon(africa, fill="#e8e6df", outline="#111111")

# Archival hatching and rough internal divisions, intentionally not modern political borders.
hatch_mask = Image.new("L", (WIDTH, HEIGHT), 0)
ImageDraw.Draw(hatch_mask).polygon(africa, fill=255)
hatch_layer = image.copy()
hatch_draw = ImageDraw.Draw(hatch_layer)
for offset in range(-400, 1250, 34):
    hatch_draw.line((offset, 220, offset + 650, 1000), fill="#c7c4bb", width=2)
image.paste(hatch_layer, (0, 0), hatch_mask)
draw = ImageDraw.Draw(image)
draw.line(africa + [africa[0]], fill="#111111", width=7, joint="curve")
for line_points in [
    [(190, 340), (845, 350)], [(140, 475), (900, 485)], [(250, 590), (830, 610)],
    [(360, 710), (745, 730)], [(420, 850), (650, 875)],
    [(350, 215), (390, 700)], [(560, 195), (545, 990)], [(720, 220), (650, 880)]
]:
    draw.line(line_points, fill="#8c8982", width=3)

# Madagascar and a decorative compass.
draw.ellipse((950, 715, 1010, 895), fill="#e8e6df", outline="#111111", width=5)
draw.ellipse((105, 830, 235, 960), outline="#111111", width=3)
draw.line((170, 842, 170, 948), fill="#111111", width=3)
draw.line((117, 895, 223, 895), fill="#111111", width=3)
draw.polygon([(170, 842), (158, 882), (182, 882)], fill="#111111")
draw.text((157, 806), "N", font=font(22, True), fill="#111111")

# Territory labels provide precise, readable evidence without copying the paper's numbered source.
label(draw, 330, 240, 160, 72, "ALGERIA", "FRANCE", "#f7f7f7")
label(draw, 555, 250, 142, 72, "LIBYA", "ITALY", "#ffffff")
label(draw, 735, 285, 150, 72, "EGYPT", "BRITAIN", "#d5d5d5")
label(draw, 170, 390, 148, 72, "LIBERIA", "INDEPENDENT", "#ffffff")
label(draw, 335, 430, 155, 72, "NIGERIA", "BRITAIN", "#d5d5d5")
label(draw, 530, 485, 150, 72, "CONGO", "BELGIUM", "#b7b7b7")
label(draw, 760, 420, 168, 72, "ETHIOPIA", "INDEPENDENT", "#ffffff")
label(draw, 690, 530, 148, 72, "UGANDA", "BRITAIN", "#d5d5d5")
label(draw, 370, 635, 155, 72, "ANGOLA", "PORTUGAL", "#c8c8c8")
label(draw, 565, 665, 176, 72, "RHODESIA", "BRITAIN", "#d5d5d5")
label(draw, 705, 755, 180, 72, "MOZAMBIQUE", "PORTUGAL", "#c8c8c8")
label(draw, 460, 795, 174, 72, "BOTSWANA", "BRITAIN", "#d5d5d5")
label(draw, 475, 900, 210, 72, "SOUTH AFRICA", "BRITAIN", "#d5d5d5")
label(draw, 915, 775, 170, 72, "MADAGASCAR", "FRANCE", "#f7f7f7")

draw.rounded_rectangle((75, 188, 1090, 1035), radius=18, outline="#333333", width=3)
draw.rounded_rectangle((1135, 188, 1765, 1035), radius=18, fill="#f1f0ea", outline="#333333", width=3)
centered(draw, (1160, 208, 1740, 270), "CLAIMS RECORDED ON THIS SOURCE", font(27, True))
draw.line((1170, 274, 1730, 274), fill="#777777", width=2)

ledger_box(draw, 300, "BRITAIN  7", ["Egypt", "Nigeria", "Uganda", "British East Africa", "Rhodesia", "Botswana", "South Africa"], "#d8d8d8", 150)
ledger_box(draw, 468, "FRANCE  4", ["Algeria", "Senegal", "Mali", "Madagascar"], "#fafafa", 112)
ledger_box(draw, 596, "ITALY  3", ["Libya", "Eritrea", "Somalia"], "#ffffff", 102)
ledger_box(draw, 714, "PORTUGAL  2", ["Angola", "Mozambique"], "#d0d0d0", 100)
ledger_box(draw, 830, "BELGIUM  1", ["Congo"], "#b7b7b7", 86)
ledger_box(draw, 930, "INDEPENDENT  2", ["Ethiopia", "Liberia"], "#ffffff", 84)

centered(draw, (80, 1038, WIDTH - 80, 1085), "READ THE PATTERN: compare the claims, locate British territories, and identify the independent states.", font(20, True))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, "JPEG", quality=94, optimize=True, subsampling=0)
print(f"Created {OUTPUT} ({WIDTH}x{HEIGHT})")
