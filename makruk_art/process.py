#!/usr/bin/env python3
"""ตัดพื้นหลังขาวของภาพตัวหมากจาก ChatGPT → PNG โปร่งใส 2 สี (ขาว/ดำ) ขนาด 256x256"""
from PIL import Image, ImageFilter
from collections import deque
import os

SRC = "_incoming"
OUT = "../public/learn/makruk/pieces"
# สัดส่วนความสูงจริงของหมากรุกไทยโดยประมาณ (ขุนสูงสุด)
SCALE = {"bia":0.66, "ngai":0.66, "met":0.80, "ruea":0.82, "khon":0.90, "ma":0.95, "khun":1.0}
SIZE = 256

def cut_background(im):
    """เก็บเฉพาะเนื้อไม้ (พิกเซลที่มีสีจริง) แล้วคืนขอบด้วยการขยายหนึ่งชั้น
       เงาสตูดิโอเป็นเทาไร้สี จึงถูกตัดทิ้งไปพร้อมพื้นขาว"""
    im = im.convert("RGB")
    w, h = im.size
    px = im.load()
    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            mx, mn = max(r,g,b), min(r,g,b)
            if (mx - mn) >= 18 or mx < 190:       # มีสีชัด หรือเข้มกว่าเงา = เนื้อไม้
                mp[x, y] = 255
    # เก็บก้อนใหญ่สุดก้อนเดียว
    visited = bytearray(w*h)
    best = []
    for sy in range(0, h, 2):
        for sx in range(0, w, 2):
            if visited[sy*w+sx] or mp[sx, sy] == 0: continue
            comp, st = [], [(sx, sy)]
            visited[sy*w+sx] = 1
            while st:
                x, y = st.pop()
                comp.append((x, y))
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = x+dx, y+dy
                    if 0 <= nx < w and 0 <= ny < h and not visited[ny*w+nx] and mp[nx, ny] > 0:
                        visited[ny*w+nx] = 1
                        st.append((nx, ny))
            if len(comp) > len(best): best = comp
    keep = Image.new("L", (w, h), 0)
    kp = keep.load()
    for x, y in best: kp[x, y] = 255
    keep = keep.filter(ImageFilter.MaxFilter(5))          # คืนขอบ anti-alias ที่โดนตัด
    keep = keep.filter(ImageFilter.GaussianBlur(1.0))
    out = im.convert("RGBA")
    out.putalpha(keep)
    return out

def darken(im):
    """ทำเวอร์ชันไม้เข้มสำหรับฝ่ายดำ โดยคงลายไม้เดิม"""
    r, g, b, a = im.split()
    def curve(ch, lo, hi):
        return ch.point(lambda v: int(lo + (hi-lo) * (v/255.0) ** 1.45))
    return Image.merge("RGBA", (curve(r, 10, 76), curve(g, 8, 54), curve(b, 6, 42), a))

os.makedirs(OUT, exist_ok=True)
for key, scale in SCALE.items():
    src = os.path.join(SRC, key + ".png")
    im = cut_background(Image.open(src))
    bbox = im.getbbox()
    im = im.crop(bbox)
    target_h = int(SIZE * scale)
    ratio = target_h / im.height
    target_w = int(im.width * ratio)
    if target_w > SIZE:                                   # กว้างเกินช่อง ให้ย่อตามความกว้าง
        ratio = SIZE / im.width
        target_w, target_h = SIZE, int(im.height * ratio)
    im = im.resize((target_w, target_h), Image.LANCZOS)
    for tone, conv in (("w", lambda x: x), ("b", darken)):
        canvas = Image.new("RGBA", (SIZE, SIZE), (0,0,0,0))
        canvas.paste(conv(im), ((SIZE-target_w)//2, SIZE-target_h-4), conv(im))
        canvas.save(os.path.join(OUT, f"{key}_{tone}.png"))
    print(f"{key}: {bbox[2]-bbox[0]}x{bbox[3]-bbox[1]} → {target_w}x{target_h}")
