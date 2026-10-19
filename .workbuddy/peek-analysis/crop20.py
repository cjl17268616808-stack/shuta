import os
from PIL import Image, ImageDraw
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
ref = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9").convert("RGB")
new = Image.open(os.path.join(out, "v7_desktop.png")).convert("RGB")
p_ref = ref.crop((30, 25, 400, 360))
p_new = new.crop((1290, 590, 1590, 890))
def fit(im, w, h):
    r = min(w/im.width, h/im.height)
    return im.resize((max(1,int(im.width*r)), max(1,int(im.height*r))), Image.LANCZOS)
W,H = 430, 360
panels = [fit(p_ref, W, H), fit(p_new, W, H)]
canvas = Image.new("RGB", (W*2+30, H+50), (250,246,236))
d = ImageDraw.Draw(canvas)
for i,p in enumerate(panels):
    x = 10+i*(W+10)+(W-p.width)//2; y = 40+(H-p.height)//2
    canvas.paste(p,(x,y))
    d.rectangle([10+i*(W+10),30,10+i*(W+10)+W,30+H], outline=(205,195,180))
canvas.save(os.path.join(out, "compare4.png"))
print("ok", canvas.size)
