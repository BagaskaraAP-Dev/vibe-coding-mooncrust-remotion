# Copyright (C) 2026 Bagaskara Amukti Palapa
# All rights reserved.
#
# Gambar maskot asli berlatar putih polos tanpa kanal alpha, jadi di latar
# gelap Mooncrust tampil sebagai kotak putih. Script ini membuang latar putih
# yang tersambung ke tepi gambar (flood fill), sehingga bagian putih di dalam
# karakter (bola mata, gigi) tetap utuh, lalu menyimpan PNG transparan ke
# public/mascot/.
#
# Jalankan:  uvx --with pillow python scripts/cutout-maskot.py
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public"
OUT = ROOT / "public" / "mascot"

FILES = {
    "maskot-laptop.png": "laptop.png",
    "maskot-tunjuk.png": "tunjuk.png",
    "maskot-penutup.png": "penutup.png",
}

THRESHOLD = 228  # piksel dengan semua kanal di atas ini dianggap latar
TARGET = 1100  # sisi terpanjang hasil akhir, cukup untuk tampil ~500px


def flood(px, mp, w, h, seeds) -> list:
    """Isi area putih yang tersambung dari titik-titik seed, kembalikan pikselnya."""
    filled = []
    queue = deque(seeds)
    while queue:
        x, y = queue.popleft()
        if mp[x, y]:
            continue
        if min(px[x, y][:3]) < THRESHOLD:
            continue
        mp[x, y] = 255
        filled.append((x, y))
        if x > 0:
            queue.append((x - 1, y))
        if x < w - 1:
            queue.append((x + 1, y))
        if y > 0:
            queue.append((x, y - 1))
        if y < h - 1:
            queue.append((x, y + 1))
    return filled


def background_mask(img: Image.Image) -> Image.Image:
    w, h = img.size
    px = img.load()
    mask = Image.new("L", (w, h), 0)
    mp = mask.load()
    border = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    border += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    flood(px, mp, w, h, border)

    # Celah putih yang tertutup (misalnya antara lengan dan badan) tidak
    # tersentuh flood dari tepi. Buang kantong putih besar di bawah wajah;
    # mata dan gigi ada di atas batas ini dan ukurannya kecil, jadi aman.
    probe = Image.new("L", (w, h), 0)
    pp = probe.load()
    for y in range(int(h * 0.58), h, 4):
        for x in range(0, w, 4):
            if mp[x, y] or pp[x, y] or min(px[x, y][:3]) < THRESHOLD:
                continue
            pocket = flood(px, pp, w, h, [(x, y)])
            if len(pocket) > 400:
                for qx, qy in pocket:
                    mp[qx, qy] = 255
    return mask


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    cut = {}
    for src_name, out_name in FILES.items():
        img = Image.open(SRC / src_name).convert("RGB")
        bg = background_mask(img)
        # Lebarkan latar 3px agar tepi putih anti-alias ikut terbuang,
        # lalu haluskan supaya pinggiran tidak bergerigi.
        bg = bg.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(1.6))
        alpha = Image.eval(bg, lambda v: 255 - v)
        rgba = img.convert("RGBA")
        rgba.putalpha(alpha)
        cut[out_name] = rgba

    # Semua pose dipotong dengan kotak yang sama. Wajah di gambar asli ada
    # di posisi yang sama, jadi saat pose berganti (crossfade) wajahnya
    # tetap menumpuk tepat dan tidak terlihat dobel.
    boxes = [im.getbbox() for im in cut.values()]
    box = (
        min(b[0] for b in boxes),
        min(b[1] for b in boxes),
        max(b[2] for b in boxes),
        max(b[3] for b in boxes),
    )
    for out_name, rgba in cut.items():
        im = rgba.crop(box)
        im.thumbnail((TARGET, TARGET), Image.LANCZOS)
        im.save(OUT / out_name, optimize=True)
        print(out_name, im.size)


main()
