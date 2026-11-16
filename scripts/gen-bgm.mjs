// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Musik latar bergaya lagu edukasi, dikomposisi langsung di kode supaya
// orisinal dan bebas lisensi. Panjangnya pas 110 detik (tidak di-loop),
// jadi tidak ada sambungan yang terdengar.
//
// Instrumen:
// - ukulele: string dipetik dengan algoritma Karplus-Strong, pola genjreng
//   "D - D U - U D U" yang umum di lagu anak dan video edukasi
// - glockenspiel: melodi pendek yang muncul di awal, tengah, dan penutup
// - bass lembut, shaker, lalu kick dan tepuk tangan mulai scene 2
// Progresi C - G - Am - F, 100 BPM. Semua acak memakai seed tetap, jadi
// hasilnya selalu sama setiap kali dibuat ulang.
//
// Jalankan:  node scripts/gen-bgm.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'assets', 'bgm_edukasi.wav');

const SR = 44100;
const BPM = 100;
const BEAT = 60 / BPM;
const BAR = 4 * BEAT;
const LENGTH = 110;
const N = Math.round(SR * LENGTH);
const L = new Float32Array(N);
const R = new Float32Array(N);

let seed = 20261116;
const rnd = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};

const NOTE = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0,
  G2: 98.0, A2: 110.0, F2: 87.31, C2: 65.41,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5, D6: 1174.66, E6: 1318.51,
};

// Kunci ukulele (senar G4 C4 E4 A4), akar bass, dan nada kelima bass
const CHORDS = {
  C: { uke: [NOTE.G4, NOTE.C4, NOTE.E4, NOTE.C5], root: NOTE.C3, fifth: NOTE.G2 },
  G: { uke: [NOTE.G4, NOTE.D4, NOTE.G4, NOTE.B4], root: NOTE.G2, fifth: NOTE.D3 },
  Am: { uke: [NOTE.A4, NOTE.C4, NOTE.E4, NOTE.A4], root: NOTE.A2, fifth: NOTE.E3 },
  F: { uke: [NOTE.A4, NOTE.C4, NOTE.F4, NOTE.A4], root: NOTE.F2, fifth: NOTE.C3 },
};
const PROGRESSION = ['C', 'G', 'Am', 'F'];

const add = (startSec, data, gain, pan = 0) => {
  const start = Math.round(startSec * SR);
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < data.length; i++) {
    const idx = start + i;
    if (idx < 0 || idx >= N) continue;
    L[idx] += data[i] * gl;
    R[idx] += data[i] * gr;
  }
};

// Senar dipetik (Karplus-Strong). `dur` termasuk pelepasan 40 ms di akhir.
const pluck = (freq, dur, decay = 0.995) => {
  const n = Math.round(SR * dur);
  const len = Math.max(2, Math.round(SR / freq));
  const buf = new Float32Array(len);
  let lp = 0;
  for (let i = 0; i < len; i++) {
    lp = lp * 0.5 + (rnd() * 2 - 1) * 0.5;
    buf[i] = lp;
  }
  const out = new Float32Array(n);
  const release = Math.round(SR * 0.04);
  let p = 0;
  for (let i = 0; i < n; i++) {
    const next = (p + 1) % len;
    out[i] = buf[p];
    buf[p] = decay * 0.5 * (buf[p] + buf[next]);
    p = next;
    if (i > n - release) out[i] *= (n - i) / release;
  }
  return out;
};

const glock = (freq, dur) => {
  const n = Math.round(SR * dur);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const attack = Math.min(1, t / 0.002);
    out[i] =
      attack *
      (Math.sin(2 * Math.PI * freq * t) * Math.exp(-3 * t) +
        0.35 * Math.sin(2 * Math.PI * freq * 2.76 * t) * Math.exp(-9 * t) +
        0.15 * Math.sin(2 * Math.PI * freq * 5.4 * t) * Math.exp(-16 * t));
  }
  return out;
};

const bass = (freq, dur) => {
  const n = Math.round(SR * dur);
  const out = new Float32Array(n);
  const release = Math.round(SR * 0.03);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.01) * Math.exp(-2.2 * t) * (i > n - release ? (n - i) / release : 1);
    const w = 2 * Math.PI * freq * t;
    out[i] = env * (Math.sin(w) + 0.3 * Math.sin(2 * w) + 0.1 * Math.sin(3 * w));
  }
  return out;
};

const kick = () => {
  const n = Math.round(SR * 0.35);
  const out = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    phase += (2 * Math.PI * (48 + 70 * Math.exp(-t * 35))) / SR;
    out[i] = Math.sin(phase) * Math.exp(-t * 14);
  }
  return out;
};

const clap = () => {
  const n = Math.round(SR * 0.25);
  const out = new Float32Array(n);
  let prev = 0;
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const raw = rnd() * 2 - 1;
    const hp = raw - prev;
    prev = raw;
    lp = lp * 0.4 + hp * 0.6;
    let env = Math.exp(-t * 22) * 0.5;
    [0, 0.011, 0.022].forEach((b) => {
      if (t >= b) env += Math.exp(-(t - b) * 90);
    });
    out[i] = lp * env * 0.5;
  }
  return out;
};

const shaker = () => {
  const n = Math.round(SR * 0.08);
  const out = new Float32Array(n);
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const raw = rnd() * 2 - 1;
    out[i] = (raw - prev) * Math.min(1, t / 0.01) * Math.exp(-t * 45);
    prev = raw;
  }
  return out;
};

// Melodi glockenspiel 4 birama: [ketukan, nada, panjang ketukan]
const MELODY = [
  [0, 'G5', 1], [1, 'E5', 0.5], [1.5, 'G5', 0.5], [2, 'C6', 1], [3, 'G5', 1],
  [4, 'D5', 1], [5, 'G5', 0.5], [5.5, 'B5', 0.5], [6, 'D6', 2],
  [8, 'C6', 1], [9, 'A5', 0.5], [9.5, 'G5', 0.5], [10, 'E5', 1], [11, 'A5', 1],
  [12, 'F5', 0.5], [12.5, 'A5', 0.5], [13, 'C6', 1], [14, 'A5', 1], [15, 'G5', 1],
];
const MELODY_BARS = [0, 16, 28, 40];

// Genjreng per birama, dalam hitungan seperdelapan: D - D U - U D U
const STRUM = [
  { at: 0, down: true },
  { at: 2, down: true },
  { at: 3, down: false },
  { at: 5, down: false },
  { at: 6, down: true },
  { at: 7, down: false },
];

const BARS = 45; // 45 x 2,4 detik = 108 detik, lalu akor penutup
const drumsOn = (b) => b >= 9 && !(b >= 36 && b < 40);

for (let b = 0; b < BARS; b++) {
  const barStart = b * BAR;
  const chord = CHORDS[PROGRESSION[b % 4]];

  STRUM.forEach((s, i) => {
    const next = STRUM[i + 1] ? STRUM[i + 1].at : 8;
    const t0 = barStart + (s.at * BEAT) / 2 + (rnd() - 0.5) * 0.008;
    const dur = ((next - s.at) * BEAT) / 2 + 0.04;
    const strings = s.down ? chord.uke : chord.uke.slice(1).reverse();
    const vel = s.down ? 1 : 0.6;
    strings.forEach((f, k) => {
      add(t0 + k * (s.down ? 0.014 : 0.01), pluck(f, dur), 0.26 * vel, -0.25);
    });
  });

  if (b >= 2) {
    add(barStart, bass(chord.root, BEAT * 1.5), 0.32);
    add(barStart + 2 * BEAT, bass(chord.root, BEAT), 0.3);
    add(barStart + 3.5 * BEAT, bass(chord.fifth, BEAT * 0.5), 0.22);
    for (let e = 0; e < 8; e++) add(barStart + (e * BEAT) / 2, shaker(), e % 2 ? 0.07 : 0.04, 0.4);
  }

  if (drumsOn(b)) {
    add(barStart, kick(), 0.42);
    add(barStart + 2 * BEAT, kick(), 0.36);
    add(barStart + BEAT, clap(), 0.2, 0.1);
    add(barStart + 3 * BEAT, clap(), 0.2, 0.1);
  }
}

MELODY_BARS.forEach((startBar) => {
  MELODY.forEach(([beat, note, len]) => {
    add(startBar * BAR + beat * BEAT, glock(NOTE[note], len * BEAT + 0.8), 0.17, 0.35);
  });
});

// Akor penutup di detik 108, dibiarkan berdering sampai akhir
const END = BARS * BAR;
CHORDS.C.uke.forEach((f, k) => add(END + k * 0.025, pluck(f, LENGTH - END, 0.998), 0.3, -0.25));
add(END, bass(NOTE.C3, LENGTH - END), 0.32);
add(END, kick(), 0.36);
add(END + 0.05, glock(NOTE.C6, LENGTH - END), 0.2, 0.35);
add(END + 0.05, glock(NOTE.E5, LENGTH - END), 0.12, 0.35);

// Saturasi lembut, normalisasi puncak, fade out 0,5 detik terakhir
let peak = 0;
for (let i = 0; i < N; i++) {
  L[i] = Math.tanh(L[i] * 1.2);
  R[i] = Math.tanh(R[i] * 1.2);
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.89 / peak;
const fade = Math.round(SR * 0.5);
const wav = Buffer.alloc(44 + N * 4);
wav.write('RIFF', 0);
wav.writeUInt32LE(36 + N * 4, 4);
wav.write('WAVE', 8);
wav.write('fmt ', 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SR, 24);
wav.writeUInt32LE(SR * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  const g = norm * (i > N - fade ? (N - i) / fade : 1);
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
}
fs.writeFileSync(OUT, wav);
console.log(`Created ${path.relative(ROOT, OUT)} (${LENGTH}s, ${BPM} BPM)`);
