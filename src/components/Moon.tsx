// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Bulan di belakang Mooncrust. Fasenya membesar dari sabit di scene 1
// sampai purnama di scene 5, jadi bulan sekaligus jadi penanda progres.
// Sisi gelapnya tetap sedikit lebih terang dari langit supaya rambut navy
// maskot tetap terpisah dari latar.
import React from 'react';
import { C } from '../theme';

interface MoonProps {
  id: string;
  size: number;
  phase: number;
  halo?: boolean;
}

const CRATERS = [
  { cx: -14, cy: -18, r: 9 },
  { cx: 16, cy: 8, r: 12 },
  { cx: -20, cy: 20, r: 6 },
  { cx: 6, cy: -30, r: 5 },
  { cx: 26, cy: -14, r: 4 },
];

export const Moon: React.FC<MoonProps> = ({ id, size, phase, halo = true }) => {
  const shadowX = Math.max(0, Math.min(1, phase)) * 100;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {halo && (
        <div
          style={{
            position: 'absolute',
            inset: -size * 0.18,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(232, 211, 138, ${0.08 + phase * 0.12}) 30%, transparent 70%)`,
          }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="-50 -50 100 100"
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        <defs>
          <clipPath id={`${id}-clip`}>
            <circle r={48} />
          </clipPath>
          <radialGradient id={`${id}-lit`} cx="38%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#F6E9B8" />
            <stop offset="100%" stopColor={C.moon} />
          </radialGradient>
        </defs>
        <circle r={48} fill={C.moonShade} />
        <g clipPath={`url(#${id}-clip)`}>
          <circle r={48} fill={`url(#${id}-lit)`} />
          {CRATERS.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="rgba(170, 146, 70, 0.22)" />
          ))}
          <circle cx={shadowX} r={48} fill={C.moonShade} />
        </g>
      </svg>
    </div>
  );
};
