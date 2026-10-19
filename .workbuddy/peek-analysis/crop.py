import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
os.makedirs(out, exist_ok=True)
src1 = r"C:\Users\C1770\.dsh\attachments\v1\objects\b4\b4303d72b0c4e2feb3b28a95e009b0b1575e359cb8d306bd28a35b53b3496b0c"
src2 = r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9"
im1 = Image.open(src1); print("img1", im1.size, im1.mode)
im2 = Image.open(src2); print("img2", im2.size, im2.mode)
c1 = im1.crop((1400, 250, 1807, 950)).resize((407*2, 700*2), Image.LANCZOS)
c1.save(os.path.join(out, "shot1_right_zoom.png"))
c2 = im2.resize((im2.size[0]*2, im2.size[1]*2), Image.LANCZOS)
c2.save(os.path.join(out, "shot2_zoom.png"))
c3 = im2.crop((250, 90, 443, 260)).resize((193*4, 170*4), Image.LANCZOS)
c3.save(os.path.join(out, "shot2_redbox_zoom.png"))
print("ok")
