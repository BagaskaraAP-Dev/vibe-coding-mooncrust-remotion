// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Komposisi utama: lima scene disambung dengan TransitionSeries.
// Setiap transisi memakan 20 frame dari dua scene yang bertemu, jadi
// total = jumlah durasi scene - 4 x 20 = 3300 frame (110 detik @ 30 fps).
import React from 'react';
import { AbsoluteFill, Audio, Composition, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { linearTiming, springTiming, TransitionPresentation, TransitionSeries } from '@remotion/transitions';
import { iris } from '@remotion/transitions/iris';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans';
import { loadFont as loadPlexMono } from '@remotion/google-fonts/IBMPlexMono';

import { Scene1Intro, SCENE1_DURATION, SCENE1_VOICE_FROM } from './scenes/Scene1Intro';
import { Scene2Agents, SCENE2_DURATION, SCENE2_VOICE_FROM } from './scenes/Scene2Agents';
import { Scene3MCP, SCENE3_DURATION, SCENE3_VOICE_FROM } from './scenes/Scene3MCP';
import { Scene4Workflow, SCENE4_DURATION, SCENE4_VOICE_FROM } from './scenes/Scene4Workflow';
import { Scene5Outro, SCENE5_DURATION, SCENE5_VOICE_FROM } from './scenes/Scene5Outro';
import { cue, voiceEnd, VoiceName } from './lib/voice';
import { C, FONT, FPS, H, W } from './theme';

loadJakarta('normal', { weights: ['600', '700', '800'], subsets: ['latin'] });
loadPlexMono('normal', { weights: ['400'], subsets: ['latin'] });

const T = 20;
const SCENES: {
  label: string;
  duration: number;
  voice: VoiceName;
  voiceFrom: number;
  Component: React.FC;
}[] = [
  { label: 'Vibe Coding', duration: SCENE1_DURATION, voice: 'vo_1', voiceFrom: SCENE1_VOICE_FROM, Component: Scene1Intro },
  { label: 'Tiga senjata', duration: SCENE2_DURATION, voice: 'vo_2', voiceFrom: SCENE2_VOICE_FROM, Component: Scene2Agents },
  { label: 'MCP', duration: SCENE3_DURATION, voice: 'vo_3', voiceFrom: SCENE3_VOICE_FROM, Component: Scene3MCP },
  { label: 'Alur kerja', duration: SCENE4_DURATION, voice: 'vo_4', voiceFrom: SCENE4_VOICE_FROM, Component: Scene4Workflow },
  { label: 'Penutup', duration: SCENE5_DURATION, voice: 'vo_5', voiceFrom: SCENE5_VOICE_FROM, Component: Scene5Outro },
];

// Frame global saat tiap scene mulai (sudah dikurangi tumpang tindih transisi).
const STARTS = SCENES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].duration - T);
  return acc;
}, []);
export const TOTAL = STARTS[STARTS.length - 1] + SCENES[SCENES.length - 1].duration;

// Musik latar turun saat narasi berbicara dan naik lagi di sela scene serta
// di penutup. Rentang narasi diambil dari waktu kata pertama dan terakhir.
const BGM_OPEN = 0.38;
const BGM_UNDER_VOICE = 0.13;
const SPEECH = SCENES.map((s, i) => [
  STARTS[i] + cue(s.voice, s.voiceFrom, 0),
  STARTS[i] + voiceEnd(s.voice, s.voiceFrom),
]);
const bgmVolume = (f: number): number => {
  let duck = 0;
  SPEECH.forEach(([a, b]) => {
    duck = Math.max(
      duck,
      interpolate(f, [a - 12, a, b, b + 18], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    );
  });
  const fadeIn = interpolate(f, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  return fadeIn * (BGM_OPEN - (BGM_OPEN - BGM_UNDER_VOICE) * duck);
};

// Tiap presentasi punya tipe props sendiri; array campuran perlu tipe longgar.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TRANSITIONS: TransitionPresentation<any>[] = [
  slide({ direction: 'from-right' }),
  wipe({ direction: 'from-bottom-left' }),
  slide({ direction: 'from-bottom' }),
  // Lingkaran yang membesar: bulan purnama membuka scene penutup.
  iris({ width: W, height: H }),
];

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  let idx = 0;
  STARTS.forEach((s, i) => {
    if (frame >= s + T / 2) idx = i;
  });
  const sinceSwap = frame - (STARTS[idx] + T / 2);
  const swapIn = idx === 0 ? 1 : interpolate(sinceSwap, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 56,
        right: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: FONT,
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 800, color: C.ink, letterSpacing: -0.3 }}>Mooncrust</span>
      <span style={{ fontSize: 24, fontWeight: 700, color: C.muted, opacity: swapIn }}>
        <span style={{ color: C.moon }}>{idx + 1}</span>/{SCENES.length}
        <span style={{ marginLeft: 12 }}>{SCENES[idx].label}</span>
      </span>
    </div>
  );
};

export const MainVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.floor }}>
    <Audio src={staticFile('assets/bgm_edukasi.wav')} volume={bgmVolume} />

    <TransitionSeries>
      {SCENES.map((s, i) => (
        <React.Fragment key={s.label}>
          {i > 0 && (
            <TransitionSeries.Transition
              presentation={TRANSITIONS[i - 1]}
              timing={
                i === 4
                  ? linearTiming({ durationInFrames: T })
                  : springTiming({ config: { damping: 200 }, durationInFrames: T })
              }
            />
          )}
          <TransitionSeries.Sequence durationInFrames={s.duration} name={`0${i + 1} ${s.label}`}>
            <s.Component />
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
    </TransitionSeries>

    {STARTS.slice(1).map((s) => (
      <Sequence key={s} from={s - 4} durationInFrames={30} layout="none">
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.4} />
      </Sequence>
    ))}

    <Header />
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <Composition
    id="IgFeedsVibeCoding"
    component={MainVideo}
    durationInFrames={TOTAL}
    fps={FPS}
    width={W}
    height={H}
  />
);
