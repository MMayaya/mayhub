from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "sources" / "aid-operations-brief.jpg"
WIDTH, HEIGHT = 1600, 1200

def font(name, size):
    return ImageFont.truetype(str(Path("C:/Windows/Fonts") / name), size)

REGULAR = font("segoeui.ttf", 27)
SMALL = font("segoeui.ttf", 25)
SEMIBOLD = font("seguisb.ttf", 28)
BOLD = font("segoeuib.ttf", 42)
TITLE = font("segoeuib.ttf", 58)
STAT = font("segoeuib.ttf", 54)

def wrapped_lines(draw, text, selected_font, max_width):
    lines, current = [], ""
    for word in text.split():
        candidate = word if not current else current + " " + word
        if draw.textbbox((0, 0), candidate, font=selected_font)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines

def draw_paragraph(draw, xy, text, selected_font, max_width, fill, line_gap=10):
    x, y = xy
    for line in wrapped_lines(draw, text, selected_font, max_width):
        draw.text((x, y), line, font=selected_font, fill=fill)
        y += selected_font.size + line_gap
    return y

def panel(draw, box, fill, outline="#c7d7e6", width=3, radius=26):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

canvas = Image.new("RGB", (WIDTH, HEIGHT), "#eef4f8")
draw = ImageDraw.Draw(canvas)
navy, deep, blue, cyan = "#062f5b", "#031f3d", "#0b67b2", "#16a6a4"
gold, ink, muted = "#d49a20", "#17324d", "#5b7186"

draw.rectangle((0, 0, WIDTH, 205), fill=navy)
draw.rectangle((0, 0, 18, HEIGHT), fill=cyan)
draw.text((74, 35), "HUMANITARIAN FIELD BRIEF", font=SEMIBOLD, fill="#7de3dc")
draw.text((74, 82), "DROUGHT WARNING: EARLY AID CAN STOP A CRISIS", font=TITLE, fill="white")
draw.text((74, 158), "KUMORA BASIN  |  ORIGINAL MAY LEARNING HUB SOURCE", font=SMALL, fill="#cfe5f7")

panel(draw, (60, 245, 1050, 840), "white")
draw.text((96, 282), "A preventable emergency is taking shape", font=BOLD, fill=deep)
paragraphs = [
    "Rain has failed for a second season across the fictional Kumora Basin. Crops are withering, livestock losses are rising and food prices have climbed beyond the reach of many families. Early-warning teams estimate that 680 000 people require urgent support, with children making up almost half of those at greatest risk.",
    "Relief planners warn that a slow response could turn severe shortages into famine. The World Food Programme and partner agencies are preparing food deliveries, clean-water points, emergency shelters and mobile medical teams. Longer-term financial and technical assistance will also be needed to restore livelihoods and strengthen local services."
]
y = 355
for paragraph in paragraphs:
    y = draw_paragraph(draw, (96, y), paragraph, REGULAR, 910, ink, 9) + 20

panel(draw, (1090, 245, 1535, 490), deep, outline=deep)
draw.text((1128, 278), "680 000", font=STAT, fill="white")
draw_paragraph(draw, (1128, 348), "people need urgent humanitarian support", SEMIBOLD, 360, "#d9efff", 7)
panel(draw, (1090, 520, 1535, 750), "#e5f8f6", outline=cyan)
draw.text((1128, 550), "46%", font=STAT, fill=navy)
draw_paragraph(draw, (1128, 620), "of those at greatest risk are children", SEMIBOLD, 360, "#315a66", 7)
panel(draw, (1090, 780, 1535, 1034), "#fff7dc", outline=gold)
draw.text((1128, 812), "AID ROUTES", font=SEMIBOLD, fill="#755b08")
draw_paragraph(draw, (1128, 862), "Direct: one country assists another.", SMALL, 360, ink, 7)
draw.line((1128, 940, 1492, 940), fill="#d7bd64", width=2)
draw_paragraph(draw, (1128, 960), "Pooled: countries work through an international organisation.", SMALL, 360, ink, 7)

panel(draw, (60, 860, 1050, 1135), "#f8fbfd")
draw.text((96, 894), "THE DECISION DESK", font=SEMIBOLD, fill=blue)
draw.text((96, 943), "WHY ACT NOW", font=SEMIBOLD, fill="#167a4c")
draw_paragraph(draw, (96, 985), "Save lives, prevent malnutrition and stabilise vulnerable communities.", SMALL, 420, ink, 7)
draw.line((566, 943, 566, 1094), fill="#c7d7e6", width=3)
draw.text((610, 943), "SAFEGUARDS", font=SEMIBOLD, fill="#a05a00")
draw_paragraph(draw, (610, 985), "Monitor delivery to limit corruption, dependency and the risk of aid worsening conflict.", SMALL, 390, ink, 7)
draw.text((60, 1162), "Created for source analysis in GeoQuest: The Development Expedition", font=SMALL, fill=muted)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
canvas.save(OUTPUT, format="JPEG", quality=94, optimize=True, progressive=True)
print(OUTPUT)
