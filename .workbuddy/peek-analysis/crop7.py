import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "peek2_desktop.png")); print("desktop", d.size)
d.crop((1380, 620, 1578, 802)).resize((198*3, 182*3), Image.LANCZOS).save(os.path.join(out, "peek2_desktop_zoom.png"))
n = Image.open(os.path.join(out, "peek2_narrow.png")); print("narrow", n.size)
w,h = n.size
n.crop((max(0,w-260), max(0,h-260), w, h)).resize((260*3, 260*3), Image.LANCZOS).save(os.path.join(out, "peek2_narrow_zoom.png"))
