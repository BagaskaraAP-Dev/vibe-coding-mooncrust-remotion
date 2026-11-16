# MASTER BRIEF: VIDEO IG FEEDS "VIBE CODING BERSAMA MOONCRUST" (01:50 MENIT)

## MISI UTAMA
Buat dan render video animasi edukasi Instagram Feeds berdurasi tepat **01:50 menit (110 detik / 3300 frames @ 30fps)** dengan resolusi **1080x1350 (Rasio 4:5 Portrait)** dan presenter **Mooncrust** hingga menjadi file MP4 siap tonton di `out/ig-feeds-vibe-coding.mp4`. Karena saya masih belajar, berikan juga penjelasan singkat cara kerja kodenya setelah render selesai.

---

## TAHAP 1: NORMALISASI NAMA FILE DI `public/` & SKILLS REMOTION
1. Periksa isi folder `public/` menggunakan terminal atau script Node.js:
   - Di Windows saya, beberapa file memiliki ekstensi tersembunyi (seperti `.png.jpg` atau `.png.jpeg`).
   - Tolong rapikan/rename otomatis keenam file gambar di dalam `public/` agar namanya persis menjadi:
     1. `public/01-ai-agents.png`
     2. `public/02-mcp-ecosystem.png`
     3. `public/03-vibe-workflow.png`
     4. `public/maskot-laptop.png`
     5. `public/maskot-tunjuk.png`
     6. `public/maskot-penutup.png`
2. Pastikan paket `remotion`, `@remotion/cli`, `@remotion/google-fonts`, `@remotion/transitions`, dan `@remotion/media-utils` terpasang.
3. Baca aturan di folder `skills/` (`SKILL.md`) dan gunakan **Context7 MCP** untuk memverifikasi sintaks `<Img>`, `<Audio loop>`, `<Sequence>`, `staticFile()`, `useAudioData()`, dan `visualizeAudio()`.

---

## TAHAP 2: GENERATE AUDIO SUARA WANITA & MUSIK LATAR (`public/assets/`)
1. Buat folder `public/assets/` jika belum ada.
2. **Generate 5 File Voice-Over Suara Wanita (`uvx edge-tts --voice id-ID-GadisNeural --rate=+2%`, fallback PowerShell Speech):**
   - `public/assets/vo_1.mp3` (00:00–00:20): *"Hai teman-teman! Kenalin aku Mooncrust. Apakah kalian tahu apa itu Vibe Coding? Vibe Coding adalah cara baru membangun aplikasi dan website modern cukup dengan mengarahkan AI menggunakan bahasa sehari-hari, tanpa harus mengetik ribuan baris kode sendirian dari nol!"*
   - `public/assets/vo_2.mp3` (00:20–00:44): *"Nah, coba lihat tiga senjata utama di atas ini! Pertama ada Cursor sebagai editor kode pintar. Kedua ada Claude Code yang bekerja cepat di dalam terminal. Dan ketiga ada Google Antigravity, agen otonom yang bisa memasang skills, menulis kode, sampai merender proyek secara mandiri."*
   - `public/assets/vo_3.mp3` (00:44–01:08): *"Supaya AI tidak halusinasi, kita hubungkan otaknya dengan MCP atau Model Context Protocol. Lewat MCP, AI langsung terhubung ke dokumentasi terbaru Context7, database Supabase, repository GitHub, hingga pengujian browser otomatis dengan Playwright."*
   - `public/assets/vo_4.mp3` (01:08–01:32): *"Alur kerjanya jadi super praktis! Dari satu Master Brief yang terstruktur, AI akan merancang arsitektur dengan Sequential Thinking, mengecek error TypeScript, hingga menghasilkan aplikasi web dan mobile yang siap digunakan."*
   - `public/assets/vo_5.mp3` (01:32–01:50): *"Seru banget kan? Ingat ya, AI adalah co-pilot terbaikmu, tapi kamulah arsitek utamanya. Terima kasih sudah belajar bareng Mooncrust! Jangan lupa simpan video ini dan selamat mencoba Vibe Coding!"*
3. **Generate SFX & BGM Loop (`scripts/gen-audio.mjs`):**
   - Buat `public/assets/bgm_ig_loop.wav` (musik latar lo-fi synth 15 detik yang di-loop mulus dengan `<Audio src={staticFile('assets/bgm_ig_loop.wav')} loop volume={0.11} />`).
   - Buat SFX pendek di `public/assets/`: `sfx_whoosh.wav`, `sfx_pop.wav`, dan `sfx_sparkle.wav`.

---

## TAHAP 3: STRUKTUR FOLDER KODE & DESAIN LAYOUT IG FEEDS (`1080x1350`)
Gunakan **Sequential Thinking MCP** untuk menyusun struktur proyek yang rapi dan mudah dipelajari:
```text
belajarmasterbrief/
├── public/
│   ├── 01-ai-agents.png
│   ├── 02-mcp-ecosystem.png
│   ├── 03-vibe-workflow.png
│   ├── maskot-laptop.png
│   ├── maskot-tunjuk.png
│   ├── maskot-penutup.png
│   └── assets/
│       ├── vo_1.mp3 s/d vo_5.mp3
│       ├── bgm_ig_loop.wav
│       └── sfx_*.wav
└── src/
    ├── index.ts
    ├── Root.tsx
    ├── components/
    │   └── MooncrustPresenter.tsx
    └── scenes/
        ├── Scene1Intro.tsx
        ├── Scene2Agents.tsx
        ├── Scene3MCP.tsx
        ├── Scene4Workflow.tsx
        └── Scene5Outro.tsx