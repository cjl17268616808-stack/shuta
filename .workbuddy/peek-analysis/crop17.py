import os
from PIL import Image, ImageDraw
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
before = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\00\00671d9e96f11943183e61d30ac1cb4b769c61ec9fc84714698dd89ed9eafd2c").convert("RGB")
after = Image.open(os.path.join(out, "v6_desktop.png")).convert("RGB")
p_before = before.crop((770, 230, 1140, 520))
p_after = after.crop((1300, 600, 1590, 880))
def fit(im, w, h):
    r = min(w/im.width, h/im.height)
    return im.resize((max(1,int(im.width*r)), max(1,int(im.height*r))), Image.LANCZOS)
W,H = 420, 340
panels = [fit(p_before, W, H), fit(p_after, W, H)]
canvas = Image.new("RGB", (W*2 + 30, H + 50), (250,246,236))
d = ImageDraw.Draw(canvas)
for i,p in enumerate(panels):
    x = 10 + i*(W+10) + (W-p.width)//2
    y = 40 + (H-p.height)//2
    canvas.paste(p, (x,y))
    d.rectangle([10+i*(W+10), 30, 10+i*(W+10)+W, 30+H], outline=(205,195,180))
canvas.save(os.path.join(out, "compare3.png"))
print("ok", canvas.size)
