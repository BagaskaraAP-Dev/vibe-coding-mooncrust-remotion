// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Scene 1: Mooncrust menyapa di tengah panggung, lalu bergeser ke kiri
// saat menjelaskan Vibe Coding. Sisi kanan memperlihatkan idenya secara
// langsung: kalimat sehari-hari masuk, kode keluar.
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingMooncrust } from '../components/LivingMooncrust';
import { Stage } from '../components/Stage';
import { cue } from '../lib/voice';
import { appear, Swap, typed } from '../lib/motion';
import { C, MONO } from '../theme';

export const SCENE1_DURATION = 680;
export const SCENE1_VOICE_FROM = 8;
const FROM = SCENE1_VOICE_FROM;
const c = (i: number) => cue('vo_1', FROM, i);

const PROMPT = 'Buatkan halaman daftar tugas, lengkap dengan tombol hapus.';
const CODE = [
  'function DaftarTugas() {',
  '  const [tugas, setTugas] =',
  '    useState([]);',
  '  return <List items={tugas} />;',
  '}',
];

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 34, fontWeight: 600, color: C.muted }}>{children}</div>
);
const Big: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 104, fontWeight: 800, color: C.ink, letterSpacing: -2, lineHeight: 1.05 }}>
    {children}
  </div>
);

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const split = c(12);

  const bubbleIn = appear(frame, fps, c(27));
  const codeIn = appear(frame, fps, c(29));

  return (
    <Stage
      voice="vo_1"
      voiceFrom={FROM}
      duration={SCENE1_DURATION}
      impacts={[c(4), split, c(29)]}
      shootingAt={[30]}
      sfx={[
        { at: c(4), src: 'sfx_sparkle', volume: 0.4 },
        { at: split, src: 'sfx_pop' },
        { at: c(27), src: 'sfx_pop' },
        { at: c(29), src: 'sfx_pop' },
      ]}
    >
      <LivingMooncrust
        voice={{ name: 'vo_1', from: FROM }}
        moonPhase={0.22}
        poses={[
          { at: 0, pose: 'penutup' },
          { at: split, pose: 'laptop' },
        ]}
        track={[
          { at: 0, x: 540, height: 760 },
          { at: split, x: 290, height: 640 },
        ]}
        hops={[c(0) + 1, c(4), c(37)]}
      />

      {frame < split + 10 && (
        <Swap
          style={{
            position: 'absolute',
            top: 150,
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: frame >= split ? 1 - (frame - split) / 10 : 1,
          }}
          items={[
            {
              at: c(2),
              node: (
                <>
                  <Kicker>Kenalin, aku</Kicker>
                  <Big>Mooncrust</Big>
                </>
              ),
            },
            {
              at: c(10),
              node: (
                <>
                  <Kicker>Apa itu</Kicker>
                  <Big>Vibe Coding?</Big>
                </>
              ),
            },
          ]}
        />
      )}

      {frame >= split && (
        <div style={{ position: 'absolute', top: 140, left: 56, right: 56 }}>
          <div
            style={{
              opacity: appear(frame, fps, split),
              transform: `translateX(${(1 - appear(frame, fps, split)) * -40}px)`,
            }}
          >
            <Big>Vibe Coding</Big>
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 32,
              fontWeight: 600,
              color: C.muted,
              lineHeight: 1.35,
              maxWidth: 900,
              opacity: appear(frame, fps, c(17)),
            }}
          >
            Cara baru bikin aplikasi: kamu yang mengarahkan, AI yang menulis kodenya.
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', top: 410, left: 584, width: 444 }}>
        {frame >= c(27) && (
          <div style={{ opacity: bubbleIn, transform: `translateY(${(1 - bubbleIn) * 30}px)` }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.dim, marginBottom: 10 }}>
              Kamu cukup bilang
            </div>
            <div
              style={{
                background: C.surface,
                borderRadius: '22px 22px 22px 6px',
                padding: '20px 24px',
                fontSize: 29,
                fontWeight: 600,
                lineHeight: 1.35,
                color: C.ink,
                minHeight: 130,
              }}
            >
              {typed(PROMPT, frame, c(27) + 4)}
            </div>
          </div>
        )}

        {frame >= c(29) && (
          <div style={{ marginTop: 34, opacity: codeIn, transform: `translateY(${(1 - codeIn) * 30}px)` }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.dim, marginBottom: 10 }}>
              AI yang menulis kodenya
            </div>
            <div
              style={{
                background: C.floor,
                border: `2px solid ${C.duskSoft}`,
                borderRadius: 16,
                padding: '18px 20px',
                fontFamily: MONO,
                fontSize: 21,
                lineHeight: 1.6,
                color: C.ink,
                whiteSpace: 'pre',
              }}
            >
              {CODE.map((line, i) => {
                const lineIn = appear(frame, fps, c(29) + 6 + i * 9, 200);
                return (
                  <div key={i} style={{ opacity: lineIn, transform: `translateX(${(1 - lineIn) * 16}px)` }}>
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Stage>
  );
};
