from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


WIDTH, HEIGHT = 1600, 1100
OUTPUT = Path(__file__).resolve().parent / "sources" / "population-pyramid-country-k.jpg"


def font(size, bold=False):
    names = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf"),
    ]
    for name in names:
        if name.exists():
            return ImageFont.truetype(str(name), size)
    return ImageFont.load_default()


def centred(draw, position, text, text_font, fill="black"):
    box = draw.textbbox((0, 0), text, font=text_font)
    draw.text((position[0] - (box[2] - box[0]) / 2, position[1]), text, font=text_font, fill=fill)


def hatched_bar(draw, box, spacing=13):
    x0, y0, x1, y1 = box
    draw.rectangle(box, fill="white", outline="black", width=3)
    start = int(x0 - (y1 - y0))
    end = int(x1 + (y1 - y0))
    for offset in range(start, end, spacing):
        points = []
        for x in range(max(int(x0), offset), min(int(x1), offset + int(y1 - y0)) + 1):
            y = y1 - (x - offset)
            if y0 <= y <= y1:
                points.append((x, y))
        if len(points) > 1:
            draw.line(points, fill="#777777", width=2)


def stick_person(draw, x, y, scale=1.0, child=False):
    head = int(16 * scale)
    draw.ellipse((x - head, y - head * 2, x + head, y), outline="black", width=max(2, int(3 * scale)))
    body_top = y
    body_bottom = y + int((56 if child else 72) * scale)
    draw.line((x, body_top, x, body_bottom), fill="black", width=max(2, int(4 * scale)))
    draw.line((x, y + int(20 * scale), x - int(30 * scale), y + int(42 * scale)), fill="black", width=max(2, int(4 * scale)))
    draw.line((x, y + int(20 * scale), x + int(30 * scale), y + int(42 * scale)), fill="black", width=max(2, int(4 * scale)))
    draw.line((x, body_bottom, x - int(25 * scale), body_bottom + int(42 * scale)), fill="black", width=max(2, int(4 * scale)))
    draw.line((x, body_bottom, x + int(25 * scale), body_bottom + int(42 * scale)), fill="black", width=max(2, int(4 * scale)))


image = Image.new("RGB", (WIDTH, HEIGHT), "white")
draw = ImageDraw.Draw(image)

title_font = font(54, True)
subtitle_font = font(25)
label_font = font(21, True)
small_font = font(18)
tick_font = font(18, True)
speech_font = font(22, True)

centred(draw, (WIDTH / 2, 38), "POPULATION PYRAMID: COUNTRY K", title_font)
centred(draw, (WIDTH / 2, 105), "Percentage of the total population in each age group", subtitle_font, "#333333")

centre = WIDTH // 2
centre_gap = 58
plot_left = 170
plot_right = 1430
plot_top = 190
row_height = 39
row_gap = 5
scale = 34.5

age_groups = ["75+", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"]
male_values = [0.7, 0.9, 1.2, 1.6, 2.1, 2.7, 3.4, 4.2, 5.1, 6.2, 7.6, 9.2, 10.4, 11.1, 12.2, 13.7]
female_values = [0.9, 1.1, 1.4, 1.8, 2.3, 2.9, 3.6, 4.4, 5.2, 6.3, 7.7, 9.3, 10.5, 11.2, 12.0, 13.5]

plot_bottom = plot_top + len(age_groups) * (row_height + row_gap)
draw.rectangle((plot_left, plot_top - 18, plot_right, plot_bottom + 18), outline="black", width=4)
draw.line((centre, plot_top - 18, centre, plot_bottom + 18), fill="#777777", width=2)

for index, (age, male, female) in enumerate(zip(age_groups, male_values, female_values)):
    y0 = plot_top + index * (row_height + row_gap)
    y1 = y0 + row_height
    male_right = centre - centre_gap
    male_left = male_right - male * scale
    female_left = centre + centre_gap
    female_right = female_left + female * scale
    draw.rectangle((male_left, y0, male_right, y1), fill="black", outline="black", width=2)
    hatched_bar(draw, (female_left, y0, female_right, y1))
    centred(draw, (centre, y0 + 7), age, label_font)

axis_y = plot_bottom + 30
draw.line((plot_left, axis_y, plot_right, axis_y), fill="black", width=3)
for value in range(0, 15, 2):
    offset = value * scale
    for x in ({centre} if value == 0 else {centre - centre_gap - offset, centre + centre_gap + offset}):
        draw.line((x, axis_y - 7, x, axis_y + 7), fill="black", width=2)
        centred(draw, (x, axis_y + 13), str(value), tick_font)

centred(draw, (centre, axis_y + 48), "PERCENT", label_font)

legend_y = 980
draw.rectangle((485, legend_y, 535, legend_y + 28), fill="black")
draw.text((548, legend_y - 1), "MALES", font=label_font, fill="black")
hatched_bar(draw, (860, legend_y, 910, legend_y + 28), spacing=10)
draw.text((923, legend_y - 1), "FEMALES", font=label_font, fill="black")

# Small monochrome cartoon details make the regenerated source memorable without naming its classification.
stick_person(draw, 84, 842, .62, child=True)
draw.rounded_rectangle((9, 713, 160, 806), radius=18, outline="black", width=3, fill="white")
draw.polygon([(74, 806), (88, 829), (101, 804)], fill="white", outline="black")
centred(draw, (84, 730), "So many", speech_font)
centred(draw, (84, 758), "classmates!", speech_font)

stick_person(draw, 1517, 249, .55)
draw.line((1538, 298, 1560, 370), fill="black", width=4)
draw.rounded_rectangle((1438, 124, 1590, 210), radius=18, outline="black", width=3, fill="white")
draw.polygon([(1500, 209), (1517, 231), (1531, 207)], fill="white", outline="black")
centred(draw, (1514, 141), "Room at", speech_font)
centred(draw, (1514, 169), "the top?", speech_font)

draw.text((34, HEIGHT - 34), "Regenerated learning source - May Learning Hub", font=small_font, fill="#4c4c4c")
note = "Fictional country; percentages rounded for educational use."
note_box = draw.textbbox((0, 0), note, font=small_font)
draw.text((WIDTH - (note_box[2] - note_box[0]) - 34, HEIGHT - 34), note, font=small_font, fill="#4c4c4c")

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, "JPEG", quality=94, subsampling=0, optimize=True)
print(OUTPUT)
