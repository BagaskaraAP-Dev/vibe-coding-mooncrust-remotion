# Copyright (C) 2026 Bagaskara Amukti Palapa
# All rights reserved.
#
# Membuat ulang voice-over vo_1..vo_5 dan mencatat waktu tiap kata
# (WordBoundary dari Edge-TTS) ke src/data/voice.json. Caption di video
# membaca file itu, jadi teks di layar selalu jatuh tepat saat kata diucapkan.
#
# Jalankan:  uvx --with edge-tts python scripts/gen-voice.py
import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "public" / "assets"
DATA = ROOT / "src" / "data"

VOICE = "id-ID-GadisNeural"
RATE = "+2%"

SCRIPT = {
    "vo_1": "Hai teman-teman! Kenalin aku Mooncrust. Apakah kalian tahu apa itu Vibe Coding? "
    "Vibe Coding adalah cara baru membangun aplikasi dan website modern cukup dengan "
    "mengarahkan AI menggunakan bahasa sehari-hari, tanpa harus mengetik ribuan baris kode "
    "sendirian dari nol!",
    "vo_2": "Nah, coba lihat tiga senjata utama di atas ini! Pertama ada Cursor sebagai editor "
    "kode pintar. Kedua ada Claude Code yang bekerja cepat di dalam terminal. Dan ketiga ada "
    "AI Autonomous Agents, agen otonom yang bisa memasang skills, menulis kode, sampai "
    "merender proyek secara mandiri.",
    "vo_3": "Supaya AI tidak halusinasi, kita hubungkan otaknya dengan MCP atau Model Context "
    "Protocol. Lewat MCP, AI langsung terhubung ke dokumentasi terbaru Context7, database "
    "Supabase, repository GitHub, hingga pengujian browser otomatis dengan Playwright.",
    "vo_4": "Alur kerjanya jadi super praktis! Dari satu Master Brief yang terstruktur, AI akan "
    "merancang arsitektur dengan Sequential Thinking, mengecek error TypeScript, hingga "
    "menghasilkan aplikasi web dan mobile yang siap digunakan.",
    "vo_5": "Seru banget kan? Ingat ya, AI adalah co-pilot terbaikmu, tapi kamulah arsitek "
    "utamanya. Terima kasih sudah belajar bareng Mooncrust! Jangan lupa simpan video ini dan "
    "selamat mencoba Vibe Coding!",
}

TICKS_PER_SECOND = 10_000_000  # Edge-TTS memakai satuan 100 nanodetik


async def render(name: str, text: str) -> dict:
    tts = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    audio = bytearray()
    words = []
    async for chunk in tts.stream():
        if chunk["type"] == "audio":
            audio.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            start = chunk["offset"] / TICKS_PER_SECOND
            words.append(
                {
                    "text": chunk["text"],
                    "start": round(start, 3),
                    "end": round(start + chunk["duration"] / TICKS_PER_SECOND, 3),
                }
            )
    (ASSETS / f"{name}.mp3").write_bytes(audio)
    return {"text": text, "words": words}


async def main() -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    result = {}
    for name, text in SCRIPT.items():
        result[name] = await render(name, text)
        print(f"{name}: {len(result[name]['words'])} kata")
    (DATA / "voice.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")


asyncio.run(main())
