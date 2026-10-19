import io
s = io.open(r"E:\XM\shuta\css\taku.css", encoding="utf-8").read()
d=0
for ch in s:
    if ch=="{": d+=1
    elif ch=="}": d-=1
print("brace depth:", d)
