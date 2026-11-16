// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Scene 2: tiga alat disusun bertumpuk. Alat yang sedang disebut narasi
// membesar dan memperlihatkan cara kerjanya, dua lainnya mengecil. Jadi
// ukuran kartu mengikuti apa yang sedang dibahas, bukan tiga kartu kembar.
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingMooncrust } from '../components/LivingMooncrust';
import { Stage } from '../components/Stage';
import { cue } from '../lib/voice';
import { appear, progress, typed } from '../lib/motion';
import { C, MONO } from '../theme';

export const SCENE2_DURATION = 775;
export const SCENE2_VOICE_FROM = 22;
const FROM = SCENE2_VOICE_FROM;
const c = (i: number) => cue('vo_2', FROM, i);

const ROW = 96;
const ROW_OPEN = 345;

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      background: C.floor,
      border: `2px solid ${C.duskSoft}`,
      borderRadius: 14,
      padding: '14px 18px',
      fontFamily: MONO,
      fontSize: 20,
      lineHeight: 1.6,
      color: C.ink,
      whiteSpace: 'pre',
    }}
  >
    {children}
  </div>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 21, fontWeight: 600, color: C.muted, lineHeight: 1.4, marginTop: 14 }}>
    {children}
  </div>
);

const CursorDemo: React.FC<{ frame: number }> = ({ frame }) => {
  const accepted = frame >= c(15);
  return (
    <>
      <Panel>
        <div>{'function total(h) {'}</div>
        <div>
          {'  return h'}
          <span style={{ color: accepted ? C.ink : C.dim, fontStyle: accepted ? 'normal' : 'italic' }}>
            {'.reduce((a, b) => a + b);'}
          </span>
        </div>
        <div>{'}'}</div>
      </Panel>
      <Note>Saran AI muncul saat kamu mengetik. Tekan Tab untuk memakainya.</Note>
    </>
  );
};

const ClaudeDemo: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Panel>
      <div style={{ color: C.dim }}>$ claude</div>
      <div>{'> ' + typed('rapikan komponen Navbar', frame, c(18) + 8, 0.9)}</div>
      <div style={{ color: C.muted, opacity: progress(frame, c(21), c(21) + 6) }}>
        {'  membaca src/Navbar.tsx'}
      </div>
      <div style={{ color: C.muted, opacity: progress(frame, c(23), c(23) + 6) }}>
        {'  mengubah 2 file'}
      </div>
    </Panel>
    <Note>Contoh: kamu menulis perintah biasa, agen membaca repo dan mengubah filenya.</Note>
  </>
);

const AgentDemo: React.FC<{ frame: number }> = ({ frame }) => {
  const tasks = [
    { label: 'Memasang skills', at: c(36) },
    { label: 'Menulis kode', at: c(38) },
    { label: 'Merender proyek', at: c(41) },
  ];
  return (
    <>
      <div style={{ fontSize: 21, fontWeight: 700, color: C.dim, marginBottom: 12 }}>
        Dikerjakan sendiri oleh agen
      </div>
      {tasks.map((t) => {
        const done = progress(frame, t.at, t.at + 10);
        return (
          <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <svg width={34} height={34} viewBox="0 0 34 34">
              <rect
                x={2}
                y={2}
                width={30}
                height={30}
                rx={8}
                fill="none"
                stroke={done > 0 ? C.moon : C.dusk}
                strokeWidth={2.5}
              />
              <path
                d="M9 17.5 L15 23 L25 11"
                fill="none"
                stroke={C.moon}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={30}
                strokeDashoffset={30 * (1 - done)}
              />
            </svg>
            <span style={{ fontSize: 28, fontWeight: 700, color: done > 0 ? C.ink : C.dim }}>{t.label}</span>
          </div>
        );
      })}
    </>
  );
};

export const Scene2Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = [
    { n: '1', name: 'Cursor', role: 'Editor kode pintar', on: c(11), off: c(18), Demo: CursorDemo },
    { n: '2', name: 'Claude Code', role: 'Agen di dalam terminal', on: c(18), off: c(29), Demo: ClaudeDemo },
    { n: '3', name: 'AI Autonomous Agents', role: 'Bekerja mandiri', on: c(29), off: Infinity, Demo: AgentDemo },
  ];

  const headIn = appear(frame, fps, c(3));

  return (
    <Stage
      voice="vo_2"
      voiceFrom={FROM}
      duration={SCENE2_DURATION}
      impacts={[c(11), c(18), c(29)]}
      sfx={[
        { at: c(11), src: 'sfx_pop' },
        { at: c(18), src: 'sfx_pop' },
        { at: c(29), src: 'sfx_pop' },
        { at: c(41), src: 'sfx_sparkle', volume: 0.35 },
      ]}
    >
      <LivingMooncrust
        voice={{ name: 'vo_2', from: FROM }}
        moonPhase={0.4}
        poses={[{ at: 0, pose: 'tunjuk' }]}
        track={[{ at: 0, x: 250, height: 620 }]}
        hops={[c(11), c(18), c(29)]}
        enter={4}
      />

      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 56,
          fontSize: 80,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -1.5,
          color: C.ink,
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * 30}px)`,
        }}
      >
        Tiga
        <br />
        senjata
        <br />
        utama
      </div>

      <div style={{ position: 'absolute', top: 300, left: 500, width: 530 }}>
        {tools.map((t, i) => {
          const enter = appear(frame, fps, c(3) + i * 6);
          const open =
            appear(frame, fps, t.on, 150) - (t.off === Infinity ? 0 : appear(frame, fps, t.off, 150));
          const openC = Math.max(0, Math.min(1, open));
          const active = frame >= t.on && frame < t.off;
          return (
            <div
              key={t.name}
              style={{
                height: ROW + openC * (ROW_OPEN - ROW),
                marginBottom: 18,
                overflow: 'hidden',
                borderRadius: 22,
                padding: '0 24px',
                background: active ? C.surfaceHi : C.surface,
                border: `2px solid ${active ? C.moon : 'transparent'}`,
                opacity: enter,
                transform: `translateX(${(1 - enter) * 60}px)`,
              }}
            >
              <div style={{ height: ROW - 4, display: 'flex', alignItems: 'center', gap: 18 }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: active ? C.moon : C.dim, width: 22 }}>
                  {t.n}
                </span>
                <div>
                  <div style={{ fontSize: 33, fontWeight: 800, color: C.ink, lineHeight: 1.1 }}>{t.name}</div>
                  <div style={{ fontSize: 21, fontWeight: 600, color: C.muted }}>{t.role}</div>
                </div>
              </div>
              <div style={{ opacity: openC, paddingTop: 6 }}>
                <t.Demo frame={frame} />
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
