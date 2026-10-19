import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
for name in ("v13_expanded", "v13_compact"):
    im = Image.open(os.path.join(out, name + ".png"))
    im.crop((1050, 620, 1600, 890)).resize((550*2, 270*2), Image.LANCZOS).save(os.path.join(out, name + "_zoom.png"))
