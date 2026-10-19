import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v8_desktop.png"))
d.crop((1150, 600, 1600, 890)).resize((450*2, 290*2), Image.LANCZOS).save(os.path.join(out, "v8_desktop_zoom.png"))
n = Image.open(os.path.join(out, "v8_narrow.png"))
w,h = n.size
n.crop((max(0,w-300), h-300, w, h)).resize((300*2, 300*2), Image.LANCZOS).save(os.path.join(out, "v8_narrow_zoom.png"))
