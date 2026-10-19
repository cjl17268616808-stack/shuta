import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "peek3_desktop.png"))
d.crop((1300, 600, 1578, 802)).resize((278*3, 202*3), Image.LANCZOS).save(os.path.join(out, "peek3_desktop_zoom.png"))
