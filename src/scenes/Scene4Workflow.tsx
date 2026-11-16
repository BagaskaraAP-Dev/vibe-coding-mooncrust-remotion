// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Scene 4: empat tahap yang memang disebut narasi, disusun sebagai jalur
// vertikal. Titik emas berjalan ke tahap berikutnya tepat saat tahap itu
// diucapkan; tahap yang belum dibahas tetap redup.
import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { LivingMooncrust } from '../components/LivingMooncrust';
import { Stage } from '../components/Stage';
import { cue } from '../lib/voice';
import { appear, progress } from '../lib/motion';
import { C, MONO } from '../theme';

export const SCENE4_DURATION = 570;
export const SCENE4_VOICE_FROM = 22;
const FROM = SCENE4_VOICE_FROM;
const c = (i: number) => cue('vo_4', FROM, i);

const PATH_X = 92;
const STEP_Y = [360, 545, 730, 915];

const Devices: React.FC<{ frame: number }> = ({ frame }) => {
  const web = progress(frame, c(24), c(24) + 16);
  const mobile = progress(frame, c(26), c(26) + 16);
  return (
    <svg width={260} height={96} viewBox="0 0 260 96" style={{ marginTop: 10 }}>
      <rect
        x={2}
        y={2}
        width={170}
        height={92}
        rx={10}
        fill="none"
        stroke={C.ink}
        strokeWidth={3}
        strokeDasharray={524}
        strokeDashoffset={524 * (1 - web)}
      />
      <line x1={2} y1={22} x2={172} y2={22} stroke={C.ink} strokeWidth={3} opacity={web} />
      <rect
        x={196}
        y={2}
        width={56}
        height={92}
        rx={12}
        fill="none"
        stroke={C.ink}
        strokeWidth={3}
        strokeDasharray={296}
        strokeDashoffset={296 * (1 - mobile)}
      />
      <line x1={214} y1={84} x2={234} y2={84} stroke={C.ink} strokeWidth={3} opacity={mobile} />
    </svg>
  );
};

export const Scene4Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { title: 'Master Brief', at: c(7), detail: 'Tujuan, fitur, dan batasan ditulis jelas di satu dokumen.' },
    { title: 'Sequential Thinking', at: c(13), detail: 'AI memecah masalah jadi langkah kecil sebelum menulis kode.' },
    { title: 'Cek TypeScript', at: c(18), detail: null },
    { title: 'Aplikasi siap dipakai', at: c(22), detail: null },
  ];

  // Posisi titik emas di jalur
  let dotY = STEP_Y[0];
  steps.forEach((s, i) => {
    if (i === 0) return;
    const t = interpolate(frame, [s.at, s.at + 20], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    dotY = interpolate(t, [0, 1], [dotY, STEP_Y[i]]);
  });
  const pathIn = appear(frame, fps, c(7));
  const titleIn = appear(frame, fps, c(0));

  return (
    <Stage
      voice="vo_4"
      voiceFrom={FROM}
      duration={SCENE4_DURATION}
      impacts={steps.map((s) => s.at)}
      sfx={[
        ...steps.map((s) => ({ at: s.at, src: 'sfx_pop' as const })),
        { at: c(29), src: 'sfx_sparkle', volume: 0.35 },
      ]}
    >
      <LivingMooncrust
        voice={{ name: 'vo_4', from: FROM }}
        moonPhase={0.78}
        poses={[{ at: 0, pose: 'laptop' }]}
        track={[{ at: 0, x: 820, height: 600 }]}
        flip
        hops={[c(4), c(29)]}
        enter={4}
      />

      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 56,
          fontSize: 66,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: -1.2,
          color: C.ink,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 30}px)`,
        }}
      >
        Dari brief
        <br />
        sampai aplikasi
      </div>

      <div
        style={{
          position: 'absolute',
          left: PATH_X - 2,
          top: STEP_Y[0],
          width: 4,
          height: (STEP_Y[3] - STEP_Y[0]) * pathIn,
          background: C.duskSoft,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: PATH_X - 2,
          top: STEP_Y[0],
          width: 4,
          height: dotY - STEP_Y[0],
          background: C.moon,
          borderRadius: 2,
        }}
      />

      {steps.map((s, i) => {
        const reached = frame >= s.at;
        const sIn = appear(frame, fps, c(7) + i * 5);
        const detailIn = appear(frame, fps, s.at);
        return (
          <React.Fragment key={s.title}>
            <div
              style={{
                position: 'absolute',
                left: PATH_X - 16,
                top: STEP_Y[i] - 16,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: reached ? C.moon : C.sky,
                border: `3px solid ${reached ? C.moon : C.dusk}`,
                transform: `scale(${sIn * (reached ? 1 + 0.25 * (1 - detailIn) : 1)})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 140,
                top: STEP_Y[i] - 26,
                width: 420,
                opacity: sIn * (reached ? 1 : 0.55),
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 800, color: C.ink, lineHeight: 1.15 }}>{s.title}</div>
              {reached && (
                <div style={{ opacity: detailIn, transform: `translateY(${(1 - detailIn) * 14}px)` }}>
                  {s.detail && (
                    <div style={{ fontSize: 23, fontWeight: 600, color: C.muted, lineHeight: 1.4, marginTop: 6 }}>
                      {s.detail}
                    </div>
                  )}
                  {i === 2 && (
                    <>
                      <div
                        style={{
                          display: 'inline-block',
                          marginTop: 10,
                          padding: '6px 14px',
                          borderRadius: 10,
                          background: C.floor,
                          border: `2px solid ${C.duskSoft}`,
                          fontFamily: MONO,
                          fontSize: 22,
                          color: C.ink,
                        }}
                      >
                        npx tsc --noEmit
                      </div>
                      <div style={{ fontSize: 23, fontWeight: 600, color: C.muted, marginTop: 8 }}>
                        Error ketahuan sebelum aplikasi jalan.
                      </div>
                    </>
                  )}
                  {i === 3 && <Devices frame={frame} />}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </Stage>
  );
};
