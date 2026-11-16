// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Mooncrust yang "hidup". Gambar maskotnya statis, jadi semua ekspresi
// datang dari gerak:
// - bicara: anggukan dan pantulan digerakkan oleh volume voice-over asli
//   (bukan sinus buatan), jadi diam saat jeda dan aktif saat kalimat ramai
// - ganti pose: squash sebelum berganti gambar, lalu pop dengan overshoot
// - lompatan kecil di kata yang ditekankan: antisipasi, naik, mendarat
// - pindah posisi dan ukuran di tengah scene lewat `track`
// Bagian bawah gambar terpotong (hoodie), jadi badan selalu ditanam 70px
// di bawah garis lantai dan lantai digambar di atasnya.
import React from 'react';
import { useAudioData } from '@remotion/media-utils';
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FLOOR_Y } from '../theme';
import { VoiceName } from '../lib/voice';
import { Moon } from './Moon';

export type Pose = 'laptop' | 'tunjuk' | 'penutup';

const ASPECT: Record<Pose, number> = {
  laptop: 904 / 1100,
  tunjuk: 763 / 1100,
  penutup: 713 / 1100,
};

interface TrackPoint {
  at: number;
  x: number;
  height: number;
}

interface LivingMooncrustProps {
  poses: { at: number; pose: Pose }[];
  track: TrackPoint[];
  voice: { name: VoiceName; from: number };
  hops?: number[];
  flip?: boolean;
  enter?: number;
  moonPhase: number;
}

const SINK = 70;
const MOVE_FRAMES = 26;

const trackAt = (track: TrackPoint[], frame: number): { x: number; height: number } => {
  let cur = { x: track[0].x, height: track[0].height };
  for (let i = 1; i < track.length; i++) {
    const p = track[i];
    if (frame < p.at) break;
    const t = interpolate(frame, [p.at, p.at + MOVE_FRAMES], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    cur = {
      x: interpolate(t, [0, 1], [cur.x, p.x]),
      height: interpolate(t, [0, 1], [cur.height, p.height]),
    };
  }
  return cur;
};

// Volume (RMS) voice-over di sekitar frame ini, 0..1.
const useVoiceLevel = (name: VoiceName, from: number): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audio = useAudioData(staticFile(`assets/${name}.mp3`));
  if (!audio) return 0;
  const t = (frame - from) / fps;
  if (t < 0) return 0;
  const samples = audio.channelWaveforms[0];
  const sr = audio.sampleRate;
  const s0 = Math.max(0, Math.floor((t - 1 / fps) * sr));
  const s1 = Math.min(samples.length, Math.floor((t + 1 / fps) * sr));
  let sum = 0;
  let n = 0;
  for (let i = s0; i < s1; i += 4) {
    sum += samples[i] * samples[i];
    n++;
  }
  return n ? Math.min(1, Math.sqrt(sum / n) * 5) : 0;
};

export const LivingMooncrust: React.FC<LivingMooncrustProps> = ({
  poses,
  track,
  voice,
  hops = [],
  flip = false,
  enter = 0,
  moonPhase,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const level = useVoiceLevel(voice.name, voice.from);

  const { x, height } = trackAt(track, frame);

  // Pose aktif dan efek pergantiannya
  let poseIndex = 0;
  poses.forEach((p, i) => {
    if (frame >= p.at) poseIndex = i;
  });
  const pose = poses[poseIndex].pose;
  let squashY = 1;
  const next = poses[poseIndex + 1];
  if (next && frame >= next.at - 6) {
    const t = (frame - (next.at - 6)) / 6;
    squashY = 1 - 0.1 * t;
  } else if (poseIndex > 0) {
    const pop = spring({
      frame: frame - poses[poseIndex].at,
      fps,
      config: { damping: 7, stiffness: 220 },
    });
    squashY = interpolate(pop, [0, 1], [0.9, 1]);
  }

  // Lompatan di kata yang ditekankan
  let hopY = 0;
  hops.forEach((h) => {
    const d = frame - h;
    if (d < 0 || d > 16) return;
    if (d < 3) {
      squashY *= 1 - 0.05 * (d / 3);
    } else if (d < 13) {
      hopY -= 30 * Math.sin((Math.PI * (d - 3)) / 10);
      squashY *= 1.03;
    } else {
      squashY *= 0.96 + 0.04 * ((d - 13) / 3);
    }
  });

  const squashX = 1 / Math.sqrt(squashY);
  const breathe = 1 + Math.sin(frame / 22) * 0.012;
  const talkY = -level * 12;
  const nod = Math.sin(frame * 0.45) * level * 2.4;
  const sway = Math.sin(frame / 45) * 1.2;

  const enterSpring = spring({ frame: frame - enter, fps, config: { damping: 13, stiffness: 110 } });
  const enterY = (1 - enterSpring) * height * 0.6;

  const width = height * ASPECT[pose];
  const bottom = FLOOR_Y + SINK;
  const moonSize = height * 0.92;
  const moonCenterY = bottom - height * 0.62;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x - moonSize / 2,
          top: moonCenterY - moonSize / 2 + Math.sin(frame / 60) * 4,
          opacity: enterSpring,
        }}
      >
        <Moon id="moon-stage" size={moonSize} phase={moonPhase} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: x - width / 2,
          top: bottom - height,
          width,
          height,
          transformOrigin: '50% 100%',
          transform: `translateY(${enterY + hopY + talkY}px) rotate(${sway + nod}deg) scale(${squashX * (2 - breathe)}, ${squashY * breathe})`,
        }}
      >
        <Img
          src={staticFile(`mascot/${pose}.png`)}
          style={{
            width: '100%',
            height: '100%',
            transform: flip ? 'scaleX(-1)' : undefined,
          }}
        />
      </div>
    </>
  );
};
