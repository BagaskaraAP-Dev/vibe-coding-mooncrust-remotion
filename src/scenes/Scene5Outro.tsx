// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Scene 5: bulan sudah purnama. Kutipan muncul kata demi kata mengikuti
// suara, Mooncrust berganti pose ke salam saat mengucap terima kasih,
// lalu video ditutup dengan nama Mooncrust dan pembuatnya.
import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingMooncrust } from '../components/LivingMooncrust';
import { Stage } from '../components/Stage';
import { cue, voiceEnd, voiceWords } from '../lib/voice';
import { appear, progress } from '../lib/motion';
import { C, FLOOR_Y } from '../theme';

export const SCENE5_DURATION = 680;
const FROM = 22;
const c = (i: number) => cue('vo_5', FROM, i);

const QUOTE_FIRST = 5;
const QUOTE_LAST = 12;
const ACCENT_FROM = 10;

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const signOffAt = voiceEnd('vo_5', FROM) + 24;
  const quoteOut = progress(frame, signOffAt - 12, signOffAt);
  const signIn = appear(frame, fps, signOffAt, 120);
  const words = voiceWords('vo_5').slice(QUOTE_FIRST, QUOTE_LAST + 1);

  return (
    <Stage
      voice="vo_5"
      voiceFrom={FROM}
      duration={SCENE5_DURATION}
      impacts={[c(ACCENT_FROM), c(13), signOffAt]}
      shootingAt={[signOffAt + 10, signOffAt + 70]}
      sfx={[
        { at: c(ACCENT_FROM), src: 'sfx_sparkle', volume: 0.35 },
        { at: c(13), src: 'sfx_pop' },
        { at: signOffAt, src: 'sfx_sparkle', volume: 0.4 },
      ]}
      overlay={
        frame >= signOffAt && (
          <div
            style={{
              position: 'absolute',
              top: FLOOR_Y + 44,
              left: 0,
              right: 0,
              textAlign: 'center',
              opacity: signIn,
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 700, color: C.ink }}>Dibuat oleh Bagaskara Amukti Palapa</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: C.muted, marginTop: 10 }}>mooncrust.my.id</div>
          </div>
        )
      }
    >
      <LivingMooncrust
        voice={{ name: 'vo_5', from: FROM }}
        moonPhase={1}
        poses={[
          { at: 0, pose: 'laptop' },
          { at: c(13), pose: 'penutup' },
        ]}
        track={[{ at: 0, x: 540, height: 700 }]}
        hops={[c(0), c(12), signOffAt + 6]}
        enter={4}
      />

      {frame < signOffAt && (
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 60,
            right: 60,
            textAlign: 'center',
            opacity: 1 - quoteOut,
            transform: `translateY(${-30 * quoteOut}px)`,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 600, color: C.muted, opacity: appear(frame, fps, c(3)) }}>
            Ingat ya,
          </div>
          <div style={{ marginTop: 8, fontSize: 56, fontWeight: 800, lineHeight: 1.18, letterSpacing: -0.8 }}>
            {words.map((w, i) => {
              const wIn = appear(frame, fps, FROM + w.start, 200);
              const accent = QUOTE_FIRST + i >= ACCENT_FROM;
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: 16,
                    color: accent ? C.moon : C.ink,
                    opacity: Math.min(1, wIn * 1.5),
                    transform: `translateY(${(1 - wIn) * 20}px)`,
                  }}
                >
                  {w.text}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {frame >= signOffAt && (
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: signIn,
            transform: `translateY(${(1 - signIn) * 30}px)`,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 600, color: C.muted }}>Terima kasih sudah belajar bareng</div>
          <div style={{ fontSize: 116, fontWeight: 800, color: C.ink, letterSpacing: -2.5, lineHeight: 1.05 }}>
            Mooncrust
          </div>
        </div>
      )}
    </Stage>
  );
};
