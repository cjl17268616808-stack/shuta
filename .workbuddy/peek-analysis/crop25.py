import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
n = Image.open(os.path.join(out, "v12_narrow.png"))
w,h = n.size
n.crop((max(0,w-320), h-320, w, h)).resize((320*2, 320*2), Image.LANCZOS).save(os.path.join(out, "v12_narrow_zoom.png"))
