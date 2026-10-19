import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
im = Image.open(os.path.join(out, "v14_compact.png"))
im.crop((1150, 640, 1600, 890)).resize((450*2, 250*2), Image.LANCZOS).save(os.path.join(out, "v14_compact_zoom.png"))
