// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Kamera virtual per scene: dorongan zoom pelan sepanjang scene, dan
// guncangan kecil yang cepat reda di frame "pop" (saat elemen penting
// muncul). Guncangan memakai random() Remotion jadi hasil render selalu sama.
import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion';

interface CameraProps {
  duration: number;
  impacts?: number[];
  push?: number;
  children: React.ReactNode;
}

const SHAKE_FRAMES = 14;
const SHAKE_PX = 7;

export const Camera: React.FC<CameraProps> = ({ duration, impacts = [], push = 0.025, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [1, 1 + push], {
    extrapolateRight: 'clamp',
  });

  let x = 0;
  let y = 0;
  impacts.forEach((at, i) => {
    const d = frame - at;
    if (d < 0 || d > SHAKE_FRAMES) return;
    const amp = SHAKE_PX * (1 - d / SHAKE_FRAMES) ** 2;
    x += amp * (random(`cx-${i}-${frame}`) * 2 - 1);
    y += amp * (random(`cy-${i}-${frame}`) * 2 - 1);
  });

  return (
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};
