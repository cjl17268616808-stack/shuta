from PIL import Image
p = r"E:\XM\shuta\assets\img\taku-anchor.png"
im = Image.open(p).convert("RGB")
print(im.size)
im.resize((400,400), Image.LANCZOS).save(r"E:\XM\shuta\.workbuddy\peek-analysis\anchor_preview.png")
