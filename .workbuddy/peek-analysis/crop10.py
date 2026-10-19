import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v2_desktop.png"))
d.crop((1320, 610, 1590, 890)).resize((270*3, 280*3), Image.LANCZOS).save(os.path.join(out, "v2_desktop_zoom.png"))
n = Image.open(os.path.join(out, "v2_narrow.png"))
w,h = n.size
n.crop((w-240, h-240, w, h)).resize((240*3, 240*3), Image.LANCZOS).save(os.path.join(out, "v2_narrow_zoom.png"))
