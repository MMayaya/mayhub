from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1700, 1060
OUTPUT = Path(__file__).resolve().parent / "sources" / "rural-urban-journey.jpg"


def font(size, bold=False):
    choices = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf"),
    ]
    for choice in choices:
        if choice.exists():
            return ImageFont.truetype(str(choice), size)
    return ImageFont.load_default()


def centred(draw, x, y, text, text_font, fill="black"):
    box = draw.textbbox((0, 0), text, font=text_font)
    draw.text((x - (box[2] - box[0]) / 2, y), text, font=text_font, fill=fill)


def person(draw, x, y, scale=1, bag=False):
    line = max(3, int(4 * scale))
    head = int(16 * scale)
    draw.ellipse((x - head, y - head * 2, x + head, y), outline="black", width=line)
    body_end = y + int(80 * scale)
    draw.line((x, y, x, body_end), fill="black", width=line)
    draw.line((x, y + int(25 * scale), x - int(30 * scale), y + int(45 * scale)), fill="black", width=line)
    draw.line((x, y + int(25 * scale), x + int(30 * scale), y + int(42 * scale)), fill="black", width=line)
    draw.line((x, body_end, x - int(28 * scale), body_end + int(45 * scale)), fill="black", width=line)
    draw.line((x, body_end, x + int(28 * scale), body_end + int(45 * scale)), fill="black", width=line)
    if bag:
        draw.rounded_rectangle((x + int(17 * scale), y + int(28 * scale), x + int(45 * scale), y + int(66 * scale)), radius=6, outline="black", width=line)
        draw.line((x + int(19 * scale), y + int(30 * scale), x + int(3 * scale), y + int(11 * scale)), fill="black", width=line)


def cow(draw, x, y, scale=1):
    line = max(2, int(3 * scale))
    draw.rounded_rectangle((x, y, x + int(92 * scale), y + int(44 * scale)), radius=10, outline="black", width=line, fill="white")
    draw.ellipse((x + int(76 * scale), y - int(14 * scale), x + int(117 * scale), y + int(30 * scale)), outline="black", width=line, fill="white")
    for offset in [14, 70]:
        draw.line((x + int(offset * scale), y + int(44 * scale), x + int(offset * scale), y + int(73 * scale)), fill="black", width=line)
    draw.line((x, y + int(9 * scale), x - int(22 * scale), y - int(8 * scale)), fill="black", width=line)
    draw.line((x + int(103 * scale), y - int(9 * scale), x + int(116 * scale), y - int(22 * scale)), fill="black", width=line)
    draw.line((x + int(111 * scale), y - int(9 * scale), x + int(124 * scale), y - int(21 * scale)), fill="black", width=line)


image = Image.new("RGB", (WIDTH, HEIGHT), "white")
draw = ImageDraw.Draw(image)
title_font = font(56, True)
subtitle_font = font(26)
label_font = font(27, True)
note_font = font(22)
speech_font = font(23, True)

centred(draw, WIDTH / 2, 45, "THE RURAL-URBAN JOURNEY", title_font)
centred(draw, WIDTH / 2, 115, "A fictional source cartoon", subtitle_font, "#333333")

# Split landscape.
ground_y = 825
draw.line((35, ground_y, WIDTH - 35, ground_y), fill="black", width=4)
draw.line((850, 190, 850, 885), fill="#707070", width=3)

# Rural area: a small homestead, crop rows, farming tools and livestock.
draw.rounded_rectangle((95, 340, 420, 402), radius=20, outline="black", width=3, fill="white")
draw.polygon([(226, 401), (248, 428), (270, 401)], fill="white", outline="black")
centred(draw, 257, 355, "RURAL AREA", label_font)

draw.rectangle((110, 612, 262, 774), outline="black", width=4)
draw.polygon([(85, 614), (186, 530), (287, 614)], outline="black", fill="white")
draw.rectangle((168, 685, 207, 774), outline="black", width=3)
draw.rectangle((128, 648, 155, 679), outline="black", width=3)
draw.rectangle((218, 648, 245, 679), outline="black", width=3)

field = (325, 600, 730, 805)
draw.rectangle(field, outline="black", width=4, fill="#fdfdfd")
for x in range(340, 725, 42):
    draw.line((x, 796, x + 80, 615), fill="#666666", width=2)
for y in range(632, 796, 35):
    draw.line((335, y, 720, y), fill="#c0c0c0", width=1)
draw.line((365, 580, 365, 788), fill="black", width=4)
draw.line((350, 595, 365, 580), fill="black", width=3)
draw.line((380, 595, 365, 580), fill="black", width=3)

cow(draw, 535, 727, 1.05)
cow(draw, 655, 695, .82)
person(draw, 292, 692, .63)

draw.rounded_rectangle((398, 474, 655, 545), radius=18, outline="black", width=3, fill="white")
draw.polygon([(478, 545), (500, 575), (516, 543)], fill="white", outline="black")
centred(draw, 526, 489, "Who will help", speech_font)
centred(draw, 526, 518, "with the harvest?", speech_font)

# A curving road takes the young worker to the city.
draw.polygon([(700, ground_y), (945, ground_y), (1135, 560), (1035, 560)], outline="black", fill="#f2f2f2")
for y in range(620, 815, 42):
    fraction = (ground_y - y) / 265
    cx = 820 + fraction * 265
    draw.line((cx - 16, y, cx + 16, y), fill="#666666", width=4)
person(draw, 930, 610, .95, bag=True)
draw.line((963, 707, 1045, 658), fill="black", width=3)
draw.polygon([(1045, 658), (1026, 660), (1038, 678)], fill="black")

# City: skyline, a factory and a jobs sign.
draw.rounded_rectangle((1260, 340, 1575, 402), radius=20, outline="black", width=3, fill="white")
draw.polygon([(1435, 402), (1452, 427), (1467, 401)], fill="white", outline="black")
centred(draw, 1417, 355, "URBAN AREA", label_font)
for x, top, width in [(1130, 570, 100), (1240, 500, 112), (1365, 425, 105), (1480, 545, 115), (1602, 480, 72)]:
    draw.rectangle((x, top, x + width, ground_y), outline="black", width=4, fill="#f5f5f5")
    for win_y in range(top + 25, ground_y - 20, 38):
        for win_x in range(x + 18, x + width - 12, 28):
            draw.rectangle((win_x, win_y, win_x + 11, win_y + 16), outline="#555555", width=1)
draw.rectangle((1165, 700, 1230, ground_y), outline="black", width=3, fill="white")
draw.polygon([(1150, 700), (1197, 640), (1244, 700)], outline="black", fill="white")
draw.line((1220, 638, 1220, 580), fill="black", width=4)
draw.line((1220, 580, 1250, 570), fill="black", width=3)
draw.rectangle((1280, 586, 1450, 658), outline="black", width=4, fill="white")
centred(draw, 1365, 601, "WORK", label_font)
centred(draw, 1365, 630, "VACANCIES", label_font)

draw.rounded_rectangle((1008, 455, 1200, 535), radius=18, outline="black", width=3, fill="white")
draw.polygon([(1082, 535), (1100, 560), (1118, 533)], fill="white", outline="black")
centred(draw, 1104, 471, "Job interviews", speech_font)
centred(draw, 1104, 500, "this way!", speech_font)

draw.text((40, HEIGHT - 42), "Regenerated learning source - May Learning Hub", font=note_font, fill="#4c4c4c")
note = "Fictional scene for educational use."
box = draw.textbbox((0, 0), note, font=note_font)
draw.text((WIDTH - (box[2] - box[0]) - 40, HEIGHT - 42), note, font=note_font, fill="#4c4c4c")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, "JPEG", quality=94, subsampling=0, optimize=True)
print(OUTPUT)
