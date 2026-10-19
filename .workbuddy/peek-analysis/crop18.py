import os
from PIL import Image
out = r"E:\XM\shuta\.workbuddy\peek-analysis"
prev = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\00\00671d9e96f11943183e61d30ac1cb4b769c61ec9fc84714698dd89ed9eafd2c").convert("RGB")
print("prev", prev.size)
prev.crop((880, 260, 1152, 540)).resize((272*3, 280*3), Image.LANCZOS).save(os.path.join(out, "prev_state_zoom.png"))
now = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\6b\6b70173aa28bcdbab651cd81a5de73a1b3bb0d04f24bc43946c3dfbacfd6dff7").convert("RGB")
print("now", now.size)
now.crop((180, 40, 543, 420)).resize((363*2, 380*2), Image.LANCZOS).save(os.path.join(out, "now_state_zoom.png"))
ref = Image.open(r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9").convert("RGB")
ref.crop((230, 30, 400, 200)).resize((170*4, 170*4), Image.LANCZOS).save(os.path.join(out, "ref_taku_zoom.png"))
print("ok")
