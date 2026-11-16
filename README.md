# 🎬 Vibe Coding Bersama Mooncrust (Instagram Feeds Video)

> **Dibuat & Dirender secara Otonom oleh [Google Antigravity](https://deepmind.google) & Gemini**  
> Video animasi edukasi vertikal Instagram Feeds berdurasi **01:50 Menit (110 Detik / 3300 Frames @ 30 FPS)** dengan resolusi **1080x1350 (Rasio 4:5)** dan presenter **Mooncrust**.

🎥 **Download & Tonton Video MP4 Langsung:**  
👉 **[Download Video di GitHub Release v1.0.0](https://github.com/BagaskaraAP-Dev/vibe-coding-mooncrust-remotion/releases/tag/v1.0.0)** (24.9 MB)

---

## 🌟 Tentang Proyek
Proyek ini mengilustrasikan paradigma baru rekayasa perangkat lunak modern: **Vibe Coding**. Video ini menjelaskan bagaimana developer dapat mengarahkan kecerdasan buatan (AI) menggunakan bahasa sehari-hari untuk merancang arsitektur, menulis kode, hingga menguji dan merender software secara otonom.

### 📚 Daftar Adegan (Scenes)
1. **Scene 1: Pengenalan Vibe Coding** (00:00–00:20) — Konsep dasar mengarahkan AI tanpa mengetik kode dari nol sendirian.
2. **Scene 2: 3 Senjata Utama** (00:20–00:44) — Integrasi Cursor (Editor Pintar), Claude Code (CLI Terminal), dan Google Antigravity (Autonomous Agent).
3. **Scene 3: Model Context Protocol (MCP)** (00:44–01:08) — Menghubungkan otak AI ke Context7 Docs, database Supabase, GitHub, dan pengujian Playwright.
4. **Scene 4: Alur Kerja Terstruktur** (01:08–01:32) — Pipeline dari Master Brief, Sequential Thinking, pengecekan TypeScript, hingga produk siap pakai.
5. **Scene 5: Penutup & Pesan Arsitek** (01:32–01:50) — *"AI adalah co-pilot terbaikmu, tapi kamulah arsitek utamanya."*

---

## 🛠️ Tech Stack & Alat
- **Framework Animasi**: [Remotion](https://remotion.dev) (v4)
- **Audio Synthesis**: Microsoft Edge-TTS (`id-ID-GadisNeural`) & Script Generator Audio Lo-Fi Synth
- **Audio Visualizer**: `@remotion/media-utils` (`visualizeAudio` & `useAudioData`)
- **Typography**: `@remotion/google-fonts` (Plus Jakarta Sans & Poppins)
- **Desain & Animasi**: Antislop Principles, Spring Physics (`spring()`), Interpolation (`interpolate()`)

---

## 🚀 Cara Menjalankan Secara Lokal

### 1. Prasyarat
- [Node.js](https://nodejs.org) (v18+)
- [FFmpeg](https://ffmpeg.org)

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Jalankan Remotion Preview (Studio Interaktif)
```bash
npm run preview
```
Buka browser di `http://localhost:3000` untuk melihat preview video, scrubbing timeline, dan memeriksa tiap scene secara visual.

### 4. Render Video Final MP4
```bash
npm run build
```
Video final akan tersimpan di:
`out/ig-feeds-vibe-coding.mp4` (Resolusi: 1080x1350 @ 30fps, Durasi: 01:50)

---

## 📁 Struktur Folder
```text
belajarmasterbrief/
├── public/
│   ├── 01-ai-agents.png          # Diagram 3 Pilar AI
│   ├── 02-mcp-ecosystem.png      # Diagram Ekosistem MCP
│   ├── 03-vibe-workflow.png      # Diagram Alur Kerja Vibe Coding
│   ├── maskot-laptop.png         # Presenter Mooncrust di Laptop
│   ├── maskot-tunjuk.png         # Presenter Mooncrust Menunjuk
│   ├── maskot-penutup.png        # Presenter Mooncrust Melambaikan Tangan
│   └── assets/
│       ├── vo_1.mp3 s/d vo_5.mp3 # Voice-Over Bahasa Indonesia
│       ├── bgm_ig_loop.wav       # Musik Latar Lo-Fi Synth (15s Loop)
│       └── sfx_*.wav             # Sound Effects (Whoosh, Pop, Sparkle)
├── src/
│   ├── index.ts                  # Entry point registerRoot
│   ├── Root.tsx                  # Komposisi Video & Watermark
│   ├── components/
│   │   └── MooncrustPresenter.tsx# Komponen Avatar & Neon Spectrum Visualizer
│   └── scenes/
│       ├── Scene1Intro.tsx       # Scene 1
│       ├── Scene2Agents.tsx      # Scene 2
│       ├── Scene3MCP.tsx         # Scene 3
│       ├── Scene4Workflow.tsx    # Scene 4
│       └── Scene5Outro.tsx       # Scene 5
├── scripts/
│   └── gen-audio.mjs             # Script sintesis BGM & SFX WAV
├── remotion.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 Lisensi
Dibuat untuk tujuan edukasi & pembelajaran Vibe Coding.
Developed with ❤️ by **BagaskaraAP-Dev** using **Google Antigravity & Gemini**.
