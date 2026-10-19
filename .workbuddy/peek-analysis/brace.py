import io
files = {
 "taku.css": r"E:\XM\shuta\css\taku.css",
 "animations.css": r"E:\XM\shuta\css\animations.css",
 "style.css": r"E:\XM\shuta\css\style.css",
}
for name, p in files.items():
    s = io.open(p, encoding="utf-8").read()
    depth = 0; bad = False
    for ch in s:
        if ch == "{": depth += 1
        elif ch == "}":
            depth -= 1
            if depth < 0: bad = True
    print(name, "depth=", depth, "underflow=", bad, "bytes=", len(s))
