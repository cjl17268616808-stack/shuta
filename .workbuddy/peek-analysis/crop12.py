import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
n = Image.open(os.path.join(out, "v3_narrow.png"))
w,h = n.size
n.crop((w-250, h-250, w, h)).resize((250*3, 250*3), Image.LANCZOS).save(os.path.join(out, "v3_narrow_zoom2.png"))
d = Image.open(os.path.join(out, "v3_desktop.png"))
print("sizes", d.size, n.size)
