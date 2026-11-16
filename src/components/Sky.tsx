// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Langit malam Mooncrust: bintang yang berkelip pelan dan bergeser sedikit,
// plus bintang jatuh di frame tertentu. Geraknya sengaja lambat agar
// tidak bersaing dengan materi di depan.
import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion';
import { C, FLOOR_Y, W } from '../theme';

const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: random(`sx${i}`) * W,
  y: random(`sy${i}`) * (FLOOR_Y - 40),
  size: 1.2 + random(`ss${i}`) * 2.4,
  period: 40 + random(`sp${i}`) * 70,
  phase: random(`sph${i}`) * Math.PI * 2,
  drift: 0.02 + random(`sd${i}`) * 0.08,
}));

export const Sky: React.FC<{ shootingAt?: number[] }> = ({ shootingAt = [] }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ background: `linear-gradient(180deg, ${C.skyTop} 0%, ${C.sky} 70%)` }}
    >
      {STARS.map((s, i) => {
        const twinkle = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(frame / (s.period / 6) + s.phase));
        const x = (((s.x - frame * s.drift) % W) + W) % W;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: C.ink,
              opacity: twinkle,
            }}
          />
        );
      })}

      {shootingAt.map((at, i) => {
        const d = frame - at;
        if (d < 0 || d > 26) return null;
        const t = d / 26;
        const x0 = 760 - i * 300;
        return (
          <div
            key={`shoot-${at}`}
            style={{
              position: 'absolute',
              left: x0 + t * 360,
              top: 150 + t * 170,
              width: 140,
              height: 2,
              borderRadius: 2,
              transform: 'rotate(25deg)',
              transformOrigin: 'right center',
              background: `linear-gradient(90deg, transparent, ${C.ink})`,
              opacity: interpolate(t, [0, 0.2, 0.8, 1], [0, 1, 0.8, 0]),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
