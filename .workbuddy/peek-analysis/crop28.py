import os
from PIL import Image, ImageDraw
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
a = Image.open(os.path.join(out, "v13_expanded.png")).crop((1000, 620, 1600, 890))
b = Image.open(os.path.join(out, "v15_compact.png")).crop((1000, 620, 1600, 890))
canvas = Image.new("RGB", (600, 270*2 + 30), (250,246,236))
canvas.paste(a, (0, 10)); canvas.paste(b, (0, 290))
d = ImageDraw.Draw(canvas)
d.text((8, 0), "expanded (speaking)", fill=(90,90,90))
d.text((8, 280), "compact (user is reading/scrolling)", fill=(90,90,90))
canvas.save(os.path.join(out, "compare_bubble.png"))
print("ok", canvas.size)
