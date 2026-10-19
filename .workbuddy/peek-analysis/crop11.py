import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v3_desktop.png"))
d.crop((1320, 600, 1590, 890)).resize((270*3, 290*3), Image.LANCZOS).save(os.path.join(out, "v3_desktop_zoom.png"))
n = Image.open(os.path.join(out, "v3_narrow.png"))
w,h = n.size
n.crop((w-240, h-240, w, h)).resize((240*3, 240*3), Image.LANCZOS).save(os.path.join(out, "v3_narrow_zoom.png"))
