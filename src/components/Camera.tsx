// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Kamera virtual per scene: dorongan zoom pelan sepanjang scene, dan
// denyut zoom kecil yang halus saat elemen penting muncul. Denyutnya
// berupa kurva naik-turun yang mulus, bukan guncangan acak per frame,
// supaya gambar tidak terlihat patah-patah.
import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

interface CameraProps {
  duration: number;
  impacts?: number[];
  push?: number;
  children: React.ReactNode;
}

const PULSE_FRAMES = 24;
const PULSE_SCALE = 0.012;

export const Camera: React.FC<CameraProps> = ({ duration, impacts = [], push = 0.025, children }) => {
  const frame = useCurrentFrame();
  const base = interpolate(frame, [0, duration], [1, 1 + push], {
    extrapolateRight: 'clamp',
  });

  let pulse = 0;
  impacts.forEach((at) => {
    const d = (frame - at) / PULSE_FRAMES;
    if (d < 0 || d > 1) return;
    pulse += PULSE_SCALE * Math.sin(Math.PI * Easing.out(Easing.quad)(d));
  });

  return <AbsoluteFill style={{ transform: `scale(${base + pulse})` }}>{children}</AbsoluteFill>;
};
