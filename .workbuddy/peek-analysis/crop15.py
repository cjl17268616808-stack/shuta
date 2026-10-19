import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v5_desktop.png"))
d.crop((1290, 590, 1590, 890)).resize((300*3, 300*3), Image.LANCZOS).save(os.path.join(out, "v5_desktop_zoom.png"))
n = Image.open(os.path.join(out, "v5_narrow.png"))
w,h = n.size
n.crop((w-260, h-260, w, h)).resize((260*3, 260*3), Image.LANCZOS).save(os.path.join(out, "v5_narrow_zoom.png"))
