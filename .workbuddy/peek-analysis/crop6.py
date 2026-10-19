import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "peek_desktop.png"))
print("desktop", d.size)
d.crop((1150, 520, 1600, 900)).resize((450*2, 380*2), Image.LANCZOS).save(os.path.join(out, "peek_desktop_zoom.png"))
n = Image.open(os.path.join(out, "peek_narrow.png"))
print("narrow", n.size)
n.crop((120, 560, 430, 860)).resize((310*2, 300*2), Image.LANCZOS).save(os.path.join(out, "peek_narrow_zoom.png"))
