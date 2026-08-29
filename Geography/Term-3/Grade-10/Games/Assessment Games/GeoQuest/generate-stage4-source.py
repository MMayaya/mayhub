from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1600, 980
OUTPUT = Path(__file__).resolve().parent / "sources" / "population-change-ledger.jpg"


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


image = Image.new("RGB", (WIDTH, HEIGHT), "white")
draw = ImageDraw.Draw(image)

title_font = font(56, True)
subtitle_font = font(26)
header_font = font(27, True)
cell_font = font(33, True)
note_font = font(22)
speech_font = font(23, True)

centred(draw, WIDTH / 2, 48, "POPULATION CHANGE LEDGER", title_font)
centred(draw, WIDTH / 2, 118, "Fictional countries - rates per 1 000 people", subtitle_font, "#333333")

left, top = 140, 230
columns = [420, 290, 290, 320]
row_height = 105
headers = ["COUNTRY", "CRUDE BIRTH\nRATE", "CRUDE DEATH\nRATE", "NATURAL\nINCREASE"]
rows = [
    ("Northmark", "8.1", "10.5", "-2.4"),
    ("Riverland", "22.8", "14.9", "?"),
    ("Sunvale", "35.6", "15.2", "20.4"),
]

total_width = sum(columns)
draw.rectangle((left, top, left + total_width, top + row_height * (len(rows) + 1)), outline="black", width=4)

x = left
for width, header in zip(columns, headers):
    draw.rectangle((x, top, x + width, top + row_height), fill="#171b1f", outline="black", width=3)
    parts = header.split("\n")
    if len(parts) == 1:
        centred(draw, x + width / 2, top + 33, parts[0], header_font, "white")
    else:
        centred(draw, x + width / 2, top + 18, parts[0], header_font, "white")
        centred(draw, x + width / 2, top + 52, parts[1], header_font, "white")
    x += width

for row_index, row in enumerate(rows, start=1):
    y = top + row_index * row_height
    x = left
    for column_index, (width, value) in enumerate(zip(columns, row)):
        draw.rectangle((x, y, x + width, y + row_height), fill="#f7f7f7" if row_index % 2 else "white", outline="black", width=2)
        value_font = cell_font
        if column_index == 3 and value == "?":
            draw.rounded_rectangle((x + width / 2 - 42, y + 23, x + width / 2 + 42, y + 80), radius=12, outline="black", width=3, fill="white")
            centred(draw, x + width / 2, y + 26, value, font(43, True))
        else:
            centred(draw, x + width / 2, y + 32, value, value_font)
        x += width

draw.rounded_rectangle((245, 730, 1355, 845), radius=18, outline="black", width=3, fill="#f4f4f4")
centred(draw, WIDTH / 2, 754, "Natural increase = crude birth rate - crude death rate", font(35, True))
centred(draw, WIDTH / 2, 802, "A minus sign means the population is decreasing naturally.", note_font, "#333333")

# One small ledger clerk keeps the source lively without changing the data.
draw.ellipse((76, 678, 112, 714), outline="black", width=3)
draw.line((94, 714, 94, 777), fill="black", width=4)
draw.line((94, 734, 62, 754), fill="black", width=4)
draw.line((94, 734, 126, 754), fill="black", width=4)
draw.line((94, 777, 72, 814), fill="black", width=4)
draw.line((94, 777, 116, 814), fill="black", width=4)
draw.rounded_rectangle((20, 576, 183, 660), radius=18, outline="black", width=3, fill="white")
centred(draw, 101, 592, "Check the", speech_font)
centred(draw, 101, 621, "minus sign!", speech_font)
draw.polygon([(92, 660), (107, 681), (121, 658)], fill="white", outline="black")

draw.text((40, HEIGHT - 42), "Regenerated learning source - May Learning Hub", font=note_font, fill="#4c4c4c")
footer_note = "Fictional countries; values rounded for educational use."
box = draw.textbbox((0, 0), footer_note, font=note_font)
draw.text((WIDTH - (box[2] - box[0]) - 40, HEIGHT - 42), footer_note, font=note_font, fill="#4c4c4c")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, "JPEG", quality=94, subsampling=0, optimize=True)
print(OUTPUT)
