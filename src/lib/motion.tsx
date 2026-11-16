// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Potongan gerak kecil yang dipakai berulang di semua scene.
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

// Nilai 0..1 (dengan sedikit overshoot) yang mulai di frame `at`.
export const appear = (frame: number, fps: number, at: number, stiffness = 140): number =>
  spring({ frame: frame - at, fps, config: { damping: 14, stiffness } });

// Teks yang diketik huruf demi huruf mulai frame `at`.
export const typed = (text: string, frame: number, at: number, charsPerFrame = 1.6): string =>
  text.slice(0, Math.max(0, Math.floor((frame - at) * charsPerFrame)));

// Progres linear 0..1 antara dua frame.
export const progress = (frame: number, from: number, to: number): number =>
  interpolate(frame, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// Mengganti isi di tempat yang sama: isi lama naik dan memudar, isi baru
// masuk dari bawah. Dipakai untuk judul yang berubah mengikuti narasi.
export const Swap: React.FC<{
  items: { at: number; node: React.ReactNode }[];
  style?: React.CSSProperties;
}> = ({ items, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let idx = -1;
  items.forEach((it, i) => {
    if (frame >= it.at) idx = i;
  });
  if (idx < 0) return null;
  const cur = items[idx];
  const prev = items[idx - 1];
  const enter = appear(frame, fps, cur.at, 160);
  const exit = progress(frame, cur.at, cur.at + 8);

  return (
    <div style={{ display: 'grid', ...style }}>
      {prev && exit < 1 && (
        <div style={{ gridArea: '1 / 1', opacity: 1 - exit, transform: `translateY(${-24 * exit}px)` }}>
          {prev.node}
        </div>
      )}
      <div
        style={{
          gridArea: '1 / 1',
          opacity: Math.min(1, enter * 1.4),
          transform: `translateY(${(1 - enter) * 34}px)`,
        }}
      >
        {cur.node}
      </div>
    </div>
  );
};
