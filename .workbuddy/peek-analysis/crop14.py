import os
from PIL import Image, ImageDraw
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
bad = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\9e\9ed202dfb4e1a6e5090e1e29d839741adf1e1fd0e693780f59ebb0388cfc4ef0").convert("RGB")
new = Image.open(os.path.join(out, "v4_desktop.png")).convert("RGB")
ref = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9").convert("RGB")
p_bad = bad.crop((230, 150, 607, 470))
p_new = new.crop((1330, 610, 1590, 890))
p_ref = ref.crop((45, 35, 380, 355))
def fit(im, w, h):
    r = min(w / im.width, h / im.height)
    return im.resize((max(1,int(im.width*r)), max(1,int(im.height*r))), Image.LANCZOS)
W, H = 360, 400
panels = [fit(p_bad, W, H), fit(p_ref, W, H), fit(p_new, W, H)]
canvas = Image.new("RGB", (W*3 + 40, H + 60), (250, 246, 236))
d = ImageDraw.Draw(canvas)
for i, p in enumerate(panels):
    x = 10 + i*(W+10) + (W - p.width)//2
    y = 40 + (H - p.height)//2
    canvas.paste(p, (x, y))
    d.rectangle([10 + i*(W+10), 30, 10 + i*(W+10) + W, 30 + H], outline=(205, 195, 180))
canvas.save(os.path.join(out, "compare2.png"))
print("ok", canvas.size)
