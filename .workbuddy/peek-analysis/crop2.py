import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
src2 = r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9"
im2 = Image.open(src2)
im2.crop((240, 40, 400, 240)).resize((160*5, 200*5), Image.LANCZOS).save(os.path.join(out, "shot2_avatar_zoom.png"))
src1 = r"C:\Users\C1770\.dsh\attachments\v1\objects\b4\b4303d72b0c4e2feb3b28a95e009b0b1575e359cb8d306bd28a35b53b3496b0c"
im1 = Image.open(src1)
im1.crop((1495, 380, 1807, 700)).resize((312*3, 320*3), Image.LANCZOS).save(os.path.join(out, "shot1_taku_zoom.png"))
print("ok")
