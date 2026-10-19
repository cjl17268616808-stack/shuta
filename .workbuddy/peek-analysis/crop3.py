import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
src2 = r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9"
im2 = Image.open(src2)
c = im2.crop((235, 45, 365, 205)).resize((130*6, 160*6), Image.NEAREST)
c.save(os.path.join(out, "shot2_geom_zoom.png"))
# sample colors along a vertical line through the avatar centre and through the bubble
px = im2.load()
for x in (300, 320, 265, 240):
    col = []
    for y in range(50, 200, 10):
        col.append(str(y) + ":" + str(px[x, y]))
    print("x=" + str(x), " ".join(col))
