import os
from PIL import Image, ImageDraw
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
ref = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9").convert("RGB")
broken = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\b4\b4303d72b0c4e2feb3b28a95e009b0b1575e359cb8d306bd28a35b53b3496b0c").convert("RGB")
new = Image.open(os.path.join(out, "final_desktop.png")).convert("RGB")
# panels
p_broken = broken.crop((1490, 300, 1807, 900))
p_ref = ref.crop((40, 30, 380, 360))
p_new = new.crop((1290, 600, 1580, 890))
def fit(im, w, h):
    r = min(w / im.width, h / im.height)
    return im.resize((max(1,int(im.width*r)), max(1,int(im.height*r))), Image.LANCZOS)
W, H = 330, 470
panels = [fit(p_broken, W, H), fit(p_ref, W, H), fit(p_new, W, H)]
labels = ["before: Doubao", "wanted: ref", "now"]
canvas = Image.new("RGB", (W*3 + 40, H + 70), (250, 246, 236))
d = ImageDraw.Draw(canvas)
for i, p in enumerate(panels):
    x = 10 + i * (W + 10) + (W - p.width) // 2
    y = 50 + (H - p.height) // 2
    canvas.paste(p, (x, y))
    d.rectangle([10 + i*(W+10), 40, 10 + i*(W+10) + W, 40 + H], outline=(200, 190, 175))
canvas.save(os.path.join(out, "compare.png"))
print("saved compare.png", canvas.size)
