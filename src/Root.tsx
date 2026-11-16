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

import { Scene1Intro, SCENE1_DURATION } from './scenes/Scene1Intro';
import { Scene2Agents, SCENE2_DURATION } from './scenes/Scene2Agents';
import { Scene3MCP, SCENE3_DURATION } from './scenes/Scene3MCP';
import { Scene4Workflow, SCENE4_DURATION } from './scenes/Scene4Workflow';
import { Scene5Outro, SCENE5_DURATION } from './scenes/Scene5Outro';
import { C, FONT, FPS, H, W } from './theme';

loadJakarta('normal', { weights: ['600', '700', '800'], subsets: ['latin'] });
loadPlexMono('normal', { weights: ['400'], subsets: ['latin'] });

const T = 20;
const SCENES = [
  { label: 'Vibe Coding', duration: SCENE1_DURATION, Component: Scene1Intro },
  { label: 'Tiga senjata', duration: SCENE2_DURATION, Component: Scene2Agents },
  { label: 'MCP', duration: SCENE3_DURATION, Component: Scene3MCP },
  { label: 'Alur kerja', duration: SCENE4_DURATION, Component: Scene4Workflow },
  { label: 'Penutup', duration: SCENE5_DURATION, Component: Scene5Outro },
];

// Frame global saat tiap scene mulai (sudah dikurangi tumpang tindih transisi).
const STARTS = SCENES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].duration - T);
  return acc;
}, []);
export const TOTAL = STARTS[STARTS.length - 1] + SCENES[SCENES.length - 1].duration;

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
    <Audio
      src={staticFile('assets/bgm_ig_loop.wav')}
      loop
      volume={(f) =>
        interpolate(f, [0, 20, TOTAL - 60, TOTAL], [0, 0.1, 0.1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      }
    />

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
