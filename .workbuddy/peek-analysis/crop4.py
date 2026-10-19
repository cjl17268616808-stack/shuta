from PIL import Image
src2 = r"C:\Users\C1770\.dsh\attachments\v1\objects\65\6523f8f6fc2d07340b8cca0916b9f0d9f43296814e1d4e459ac5375dd388d3a9"
im2 = Image.open(src2).convert("RGB")
px = im2.load()
def cls(p):
    r,g,b = p
    if r>200 and g<80 and b<80: return "#"      # red annotation
    if r<100 and g<100 and b<100: return "K"    # dark ink
    if abs(r-g)<25 and abs(g-b)<25:
        if r>245: return "."                    # white
        if r>200: return ":"                    # light grey (bubble bg)
        return "k"
    if b>150 and g>150 and r<150: return "C"    # cyan (avatar screen)
    if r>200 and g>170 and b<200: return "B"    # beige (avatar bg)
    return "?"
print("     " + "".join([str((x//10)%10) for x in range(240, 365, 2)]))
for y in range(100, 200, 4):
    row = "".join(cls(px[x,y]) for x in range(240, 365, 2))
    print(str(y).rjust(4) + " " + row)
