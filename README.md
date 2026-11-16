# Vibe Coding Bersama Mooncrust

Video edukasi Instagram Feeds tentang Vibe Coding, dibawakan oleh Mooncrust.
Dibuat dengan [Remotion](https://remotion.dev): seluruh animasi ditulis sebagai
komponen React, lalu dirender menjadi MP4.

- Durasi 01:50 (3300 frame, 30 fps)
- Resolusi 1080x1350 (rasio 4:5)
- Video siap tonton: [GitHub Release v1.0.0](https://github.com/BagaskaraAP-Dev/vibe-coding-mooncrust-remotion/releases/tag/v1.0.0)

## Isi video

| Waktu | Scene | Yang dibahas |
| --- | --- | --- |
| 00:00 | Vibe Coding | Mooncrust menyapa, lalu memperlihatkan idenya: kalimat sehari-hari masuk, kode keluar. |
| 00:22 | Tiga senjata | Cursor (editor), Claude Code (agen di terminal), dan AI Autonomous Agents. Kartu alat yang sedang disebut membesar dan memperlihatkan cara kerjanya. |
| 00:47 | MCP | AI yang awalnya menebak, lalu tersambung ke Context7, Supabase, GitHub, dan Playwright tepat saat namanya diucapkan. |
| 01:09 | Alur kerja | Master Brief, Sequential Thinking, cek TypeScript, aplikasi siap dipakai. |
| 01:27 | Penutup | "AI adalah co-pilot terbaikmu, tapi kamulah arsitek utamanya." |

## Cara kerja proyek ini

Urutan dari naskah sampai MP4:

1. **Suara.** `scripts/gen-voice.py` membacakan naskah tiap scene dengan
   Edge-TTS (suara `id-ID-GadisNeural`) dan menyimpan `public/assets/vo_1.mp3`
   sampai `vo_5.mp3`. Selain audio, script ini mencatat kapan tiap kata mulai
   dan selesai diucapkan ke `src/data/voice.json`.
2. **Waktu kata menjadi frame.** `src/lib/voice.ts` mengubah detik di
   `voice.json` menjadi nomor frame. Fungsi `cue(voice, from, index)`
   menjawab "di frame berapa kata ke-sekian diucapkan". Semua animasi memakai
   fungsi ini, jadi kartu, garis, dan caption muncul tepat saat kata itu
   terdengar, bukan di angka frame tebakan.
3. **Caption.** `src/components/KineticCaptions.tsx` memecah kata menjadi
   frasa pendek (putus di tanda baca atau sekitar 30 huruf), lalu menyalakan
   satu kata yang sedang diucapkan dengan warna emas. Caption hanya tampil di
   pita lantai di bawah garis `FLOOR_Y`, area yang tidak dipakai visual lain.
4. **Maskot.** Gambar asli di `public/maskot-*.png` berlatar putih tanpa
   transparansi. `scripts/cutout-maskot.py` membuang latar putih dan
   menyimpan versi transparan ke `public/mascot/`. Komponen
   `src/components/LivingMooncrust.tsx` lalu menghidupkannya:
   - mengangguk dan memantul mengikuti volume voice-over asli (dibaca dengan
     `useAudioData` dari `@remotion/media-utils`), jadi diam saat jeda
   - berganti pose dengan squash lalu pop
   - melompat kecil di kata yang ditekankan
   - berpindah posisi dan ukuran di tengah scene
5. **Panggung.** `src/components/Stage.tsx` adalah kerangka tiap scene:
   langit berbintang (`Sky`), kamera yang pelan mendorong maju dan bergetar
   kecil saat ada elemen penting muncul (`Camera`), lantai, caption, dan
   audio.
6. **Bulan.** `src/components/Moon.tsx` menggambar bulan di belakang
   Mooncrust. Fasenya membesar dari sabit di scene 1 sampai purnama di
   scene 5, jadi sekaligus menandai progres video.
7. **Transisi.** `src/Root.tsx` menyambung lima scene dengan
   `TransitionSeries` dari `@remotion/transitions`: slide, wipe, slide, lalu
   iris (lingkaran yang membesar seperti bulan) ke scene penutup. Tiap
   transisi memakan 20 frame dari dua scene yang bertemu, sehingga
   `jumlah durasi scene - 4 x 20 = 3300 frame`.

Warna dan ukuran dasar ada di `src/theme.ts`. Navy diambil dari hoodie dan
rambut maskot, emas dari warna bulan mooncrust.my.id.

## Menjalankan

Prasyarat: Node.js 18 atau lebih baru. Untuk membuat ulang suara dan
potongan maskot, butuh juga [uv](https://docs.astral.sh/uv/).

```bash
npm install
npm run preview   # Remotion Studio di http://localhost:3000
npm run build     # render ke out/ig-feeds-vibe-coding.mp4
npx tsc --noEmit  # cek tipe TypeScript
```

Membuat ulang aset (hanya jika naskah atau gambar maskot berubah):

```bash
uvx --with edge-tts python scripts/gen-voice.py
uvx --with pillow python scripts/cutout-maskot.py
node scripts/gen-audio.mjs   # musik latar dan efek suara
```

## Struktur folder

```text
public/
  maskot-*.png          gambar maskot asli (latar putih)
  mascot/               maskot transparan hasil cutout-maskot.py
  assets/               voice-over, musik latar, efek suara
scripts/
  gen-voice.py          voice-over + waktu tiap kata
  cutout-maskot.py      buang latar putih maskot
  gen-audio.mjs         musik latar dan efek suara
src/
  Root.tsx              komposisi, transisi, header
  theme.ts              warna, font, ukuran
  data/voice.json       waktu tiap kata (hasil gen-voice.py)
  lib/voice.ts          cue(): kata menjadi frame
  lib/motion.tsx        potongan gerak yang dipakai ulang
  components/           Stage, Sky, Moon, Camera, LivingMooncrust, KineticCaptions
  scenes/               Scene1Intro sampai Scene5Outro
```

## Hak cipta

Copyright (C) 2026 Bagaskara Amukti Palapa. Mooncrust dan karakternya milik
Bagaskara Amukti Palapa ([mooncrust.my.id](https://mooncrust.my.id)).
Dibuat untuk bahan belajar Vibe Coding.
