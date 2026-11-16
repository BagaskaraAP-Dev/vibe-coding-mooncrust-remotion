// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Kerangka yang sama untuk setiap scene: langit, kamera, lantai, caption,
// dan voice-over. Lantai digambar setelah isi scene supaya potongan bawah
// gambar maskot tersembunyi di baliknya.
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { C, FLOOR_Y, FONT } from '../theme';
import { VoiceName } from '../lib/voice';
import { Camera } from './Camera';
import { KineticCaptions } from './KineticCaptions';
import { Sky } from './Sky';

interface StageProps {
  voice: VoiceName;
  voiceFrom: number;
  duration: number;
  impacts?: number[];
  shootingAt?: number[];
  sfx?: { at: number; src: 'sfx_pop' | 'sfx_sparkle' | 'sfx_whoosh'; volume?: number }[];
  // Digambar di atas lantai, untuk teks penutup di pita bawah.
  overlay?: React.ReactNode;
  children: React.ReactNode;
}

export const Stage: React.FC<StageProps> = ({
  voice,
  voiceFrom,
  duration,
  impacts,
  shootingAt,
  sfx = [],
  overlay,
  children,
}) => (
  <AbsoluteFill style={{ fontFamily: FONT, overflow: 'hidden', background: C.sky }}>
    <Sequence from={voiceFrom} layout="none">
      <Audio src={staticFile(`assets/${voice}.mp3`)} />
    </Sequence>
    {sfx.map((s, i) => (
      <Sequence key={i} from={s.at} durationInFrames={40} layout="none">
        <Audio src={staticFile(`assets/${s.src}.wav`)} volume={s.volume ?? 0.45} />
      </Sequence>
    ))}

    <Camera duration={duration} impacts={impacts}>
      <Sky shootingAt={shootingAt} />
      {children}
    </Camera>

    <div
      style={{
        position: 'absolute',
        top: FLOOR_Y,
        left: 0,
        right: 0,
        bottom: 0,
        background: C.floor,
        borderTop: `2px solid ${C.duskSoft}`,
      }}
    />
    <KineticCaptions voice={voice} from={voiceFrom} />
    {overlay}
  </AbsoluteFill>
);
