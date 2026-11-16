// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Satu sumber warna dan ukuran untuk seluruh video.
// Navy diambil dari hoodie dan rambut maskot, emas bulan dari token
// --moon di mooncrust.my.id. Emas hanya dipakai di momen kunci: bulan,
// kata yang sedang diucapkan, dan item yang sedang dibahas.

export const C = {
  skyTop: '#141D47',
  sky: '#0B1230',
  floor: '#070B1E',
  surface: '#17214D',
  surfaceHi: '#212C62',
  ink: '#F4F1E8',
  muted: '#B9C0E0',
  dim: '#8A93C0',
  dusk: '#8C9EF0',
  duskSoft: 'rgba(140, 158, 240, 0.28)',
  moon: '#E8D38A',
  moonShade: '#1D2757',
} as const;

// Plus Jakarta Sans dibuat di Jakarta untuk teks berbahasa Indonesia.
// IBM Plex Mono hanya untuk teks yang memang kode atau perintah.
export const FONT = "'Plus Jakarta Sans', sans-serif";
export const MONO = "'IBM Plex Mono', monospace";

export const W = 1080;
export const H = 1350;
export const FPS = 30;

// Garis lantai panggung. Di bawahnya hanya ada caption, jadi caption
// tidak pernah menutupi visual.
export const FLOOR_Y = 1130;
