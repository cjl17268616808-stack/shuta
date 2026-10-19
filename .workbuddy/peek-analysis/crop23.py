import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
d = Image.open(os.path.join(out, "v10_desktop.png"))
d.crop((1100, 590, 1600, 890)).resize((500*2, 300*2), Image.LANCZOS).save(os.path.join(out, "v10_desktop_zoom.png"))
