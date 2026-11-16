// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Scene 3: AI di tengah awalnya goyah dan menebak. Setelah MCP disebut,
// tiap server tersambung tepat saat namanya diucapkan, lalu titik cahaya
// mengalir dari server ke AI untuk menunjukkan arah datanya.
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingMooncrust } from '../components/LivingMooncrust';
import { Stage } from '../components/Stage';
import { cue } from '../lib/voice';
import { appear, progress, Swap } from '../lib/motion';
import { C, H, W } from '../theme';

export const SCENE3_DURATION = 675;
const FROM = 22;
const c = (i: number) => cue('vo_3', FROM, i);

const HUB = { x: 330, y: 690, r: 95 };
const CARD_W = 270;
const PULSE_PERIOD = 45;

export const Scene3MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mcpAt = c(8);

  const nodes = [
    { name: 'Context7', role: 'Dokumentasi terbaru', x: 200, y: 300, at: c(21) },
    { name: 'Supabase', role: 'Database', x: 500, y: 450, at: c(23) },
    { name: 'GitHub', role: 'Repository kode', x: 190, y: 1000, at: c(25) },
    { name: 'Playwright', role: 'Tes browser otomatis', x: 470, y: 930, at: c(31) },
  ];
  const latest = [...nodes].reverse().find((n) => frame >= n.at);

  const hubIn = appear(frame, fps, c(1));
  const guessing = frame >= c(3) && frame < mcpAt;
  const wobble = guessing ? Math.sin(frame * 0.9) * 4 : 0;
  const titleIn = appear(frame, fps, mcpAt);

  return (
    <Stage
      voice="vo_3"
      voiceFrom={FROM}
      duration={SCENE3_DURATION}
      impacts={[mcpAt, ...nodes.map((n) => n.at)]}
      sfx={[
        { at: mcpAt, src: 'sfx_sparkle', volume: 0.4 },
        ...nodes.map((n) => ({ at: n.at, src: 'sfx_pop' as const })),
      ]}
    >
      <LivingMooncrust
        voice={{ name: 'vo_3', from: FROM }}
        moonPhase={0.58}
        poses={[{ at: 0, pose: 'tunjuk' }]}
        track={[{ at: 0, x: 830, height: 600 }]}
        flip
        hops={[mcpAt, c(31)]}
        enter={4}
      />

      <div
        style={{
          position: 'absolute',
          top: 126,
          right: 56,
          textAlign: 'right',
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 30}px)`,
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 800, color: C.ink, letterSpacing: -3, lineHeight: 1 }}>MCP</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: C.muted, marginTop: 10, opacity: appear(frame, fps, c(10)) }}>
          Model Context Protocol
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, color: C.dim, marginTop: 6, opacity: appear(frame, fps, c(13)) }}>
          Jembatan AI ke sumber data asli
        </div>
      </div>

      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {nodes.map((n, i) => {
          const len = Math.hypot(n.x - HUB.x, n.y - HUB.y);
          const draw = progress(frame, n.at - 4, n.at + 14);
          if (draw <= 0) return null;
          return (
            <g key={i}>
              <line
                x1={HUB.x}
                y1={HUB.y}
                x2={n.x}
                y2={n.y}
                stroke={C.dusk}
                strokeOpacity={0.55}
                strokeWidth={3}
                strokeDasharray={len}
                strokeDashoffset={len * (1 - draw)}
              />
              {draw >= 1 &&
                [0, 0.5].map((k) => {
                  const t = (((frame - n.at) / PULSE_PERIOD + k) % 1 + 1) % 1;
                  return (
                    <circle
                      key={k}
                      cx={n.x + (HUB.x - n.x) * t}
                      cy={n.y + (HUB.y - n.y) * t}
                      r={5}
                      fill="#CDD5FF"
                      opacity={Math.sin(Math.PI * t)}
                    />
                  );
                })}
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          left: HUB.x - HUB.r,
          top: HUB.y - HUB.r,
          width: HUB.r * 2,
          height: HUB.r * 2,
          borderRadius: '50%',
          background: C.surfaceHi,
          border: `3px solid ${frame >= mcpAt ? C.moon : C.dusk}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transform: `scale(${hubIn}) rotate(${wobble}deg)`,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, color: C.ink, lineHeight: 1 }}>AI</div>
        <Swap
          style={{ marginTop: 6, width: 160 }}
          items={[
            { at: c(1), node: <div style={{ fontSize: 18, fontWeight: 600, color: C.muted }}>menebak tanpa konteks</div> },
            { at: mcpAt, node: <div style={{ fontSize: 18, fontWeight: 600, color: C.muted }}>membaca sumber asli</div> },
          ]}
        />
      </div>

      {guessing &&
        [
          { dx: -150, dy: -110 },
          { dx: 135, dy: -125 },
          { dx: 150, dy: 70 },
        ].map((q, i) => {
          const qIn = appear(frame, fps, c(3) + i * 5);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: HUB.x + q.dx - 15,
                top: HUB.y + q.dy - 30 + Math.sin(frame / 8 + i) * 6,
                fontSize: 52,
                fontWeight: 800,
                color: C.dim,
                opacity: qIn,
                transform: `scale(${qIn})`,
              }}
            >
              ?
            </div>
          );
        })}

      {nodes.map((n) => {
        const nIn = appear(frame, fps, n.at, 170);
        if (frame < n.at) return null;
        const isLatest = latest === n;
        return (
          <div
            key={n.name}
            style={{
              position: 'absolute',
              left: n.x - CARD_W / 2,
              top: n.y - 48,
              width: CARD_W,
              padding: '16px 22px',
              borderRadius: 18,
              background: C.surface,
              border: `2px solid ${isLatest ? C.moon : C.duskSoft}`,
              transform: `scale(${nIn})`,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800, color: C.ink, lineHeight: 1.15 }}>{n.name}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: C.muted }}>{n.role}</div>
          </div>
        );
      })}
    </Stage>
  );
};
