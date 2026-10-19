import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v4_desktop.png"))
d.crop((1330, 610, 1590, 890)).resize((260*3, 280*3), Image.LANCZOS).save(os.path.join(out, "v4_desktop_zoom.png"))
n = Image.open(os.path.join(out, "v4_narrow.png"))
w,h = n.size
n.crop((w-250, h-250, w, h)).resize((250*3, 250*3), Image.LANCZOS).save(os.path.join(out, "v4_narrow_zoom.png"))
