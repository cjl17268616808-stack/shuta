import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v9_desktop.png"))
d.crop((1150, 600, 1600, 890)).resize((450*2, 290*2), Image.LANCZOS).save(os.path.join(out, "v9_desktop_zoom.png"))
n = Image.open(os.path.join(out, "v9_narrow.png"))
w,h = n.size
n.crop((max(0,w-320), h-320, w, h)).resize((320*2, 320*2), Image.LANCZOS).save(os.path.join(out, "v9_narrow_zoom.png"))
