// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Mooncrust yang "hidup", dengan gerak lembut ala video edukasi. Gambar
// maskotnya statis, jadi semua gerak datang dari transform yang mulus:
// - melayang pelan (napas) sepanjang waktu
// - saat bicara, ayunan kecil yang muncul dan hilang perlahan. Volume
//   voice-over dirata-rata setengah detik supaya tidak bergetar per frame
// - ganti pose dengan crossfade, bukan lompatan gambar
// - lompatan kecil yang halus di kata yang ditekankan
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

// Ketiga pose dipotong dengan kotak yang sama (lihat cutout-maskot.py),
// jadi ukurannya sama dan wajahnya menumpuk tepat saat crossfade.
const ASPECT = 904 / 1100;

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
const MOVE_FRAMES = 30;
const POSE_FADE = 8;
const HOP_FRAMES = 22;
const LEVEL_WINDOW_S = 0.5;

const smooth = (t: number) => Easing.inOut(Easing.sin)(Math.max(0, Math.min(1, t)));

const trackAt = (track: TrackPoint[], frame: number): { x: number; height: number } => {
  let cur = { x: track[0].x, height: track[0].height };
  for (let i = 1; i < track.length; i++) {
    const p = track[i];
    if (frame < p.at) break;
    const t = smooth((frame - p.at) / MOVE_FRAMES);
    cur = {
      x: interpolate(t, [0, 1], [cur.x, p.x]),
      height: interpolate(t, [0, 1], [cur.height, p.height]),
    };
  }
  return cur;
};

// Seberapa aktif suara di sekitar frame ini (0..1), dirata-rata setengah
// detik dengan bobot segitiga supaya naik-turunnya landai.
const useVoiceLevel = (name: VoiceName, from: number): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audio = useAudioData(staticFile(`assets/${name}.mp3`));
  if (!audio) return 0;
  const t = (frame - from) / fps;
  const samples = audio.channelWaveforms[0];
  const sr = audio.sampleRate;
  const half = (LEVEL_WINDOW_S / 2) * sr;
  const center = t * sr;
  let sum = 0;
  let weight = 0;
  for (let i = Math.floor(center - half); i < center + half; i += 16) {
    const w = 1 - Math.abs(i - center) / half;
    const s = i >= 0 && i < samples.length ? samples[i] : 0;
    sum += s * s * w;
    weight += w;
  }
  return weight ? Math.min(1, Math.sqrt(sum / weight) * 4) : 0;
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

  // Pose aktif, pose sebelumnya, dan seberapa jauh crossfade-nya
  let poseIndex = 0;
  poses.forEach((p, i) => {
    if (frame >= p.at) poseIndex = i;
  });
  const pose = poses[poseIndex].pose;
  const prevPose = poseIndex > 0 ? poses[poseIndex - 1].pose : null;
  const fade = poseIndex > 0 ? smooth((frame - poses[poseIndex].at) / POSE_FADE) : 1;
  const poseDip = 1 - 0.025 * Math.sin(Math.PI * fade);

  // Lompatan kecil berbentuk busur yang mulus
  let hopY = 0;
  hops.forEach((h) => {
    const d = (frame - h) / HOP_FRAMES;
    if (d < 0 || d > 1) return;
    hopY -= 18 * Math.sin(Math.PI * smooth(d));
  });

  const floatY = Math.sin(frame / 32) * 6;
  const talkY = -Math.abs(Math.sin(frame / 5)) * 5 * level;
  const tilt = Math.sin(frame / 48) * 1 + Math.sin(frame / 11) * 1.2 * level;

  const enterT = spring({ frame: frame - enter, fps, config: { damping: 200, stiffness: 80 } });
  const enterY = (1 - enterT) * height * 0.5;

  const bottom = FLOOR_Y + SINK;
  const moonSize = height * 0.92;
  const moonCenterY = bottom - height * 0.62;

  const sprite = (p: Pose, opacity: number) => {
    const width = height * ASPECT;
    return (
      <Img
        key={p}
        src={staticFile(`mascot/${p}.png`)}
        style={{
          position: 'absolute',
          left: (height - width) / 2,
          bottom: 0,
          width,
          height,
          opacity,
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      />
    );
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x - moonSize / 2,
          top: moonCenterY - moonSize / 2 + Math.sin(frame / 60) * 4,
          opacity: enterT,
        }}
      >
        <Moon id="moon-stage" size={moonSize} phase={moonPhase} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: x - height / 2,
          top: bottom - height,
          width: height,
          height,
          transformOrigin: '50% 100%',
          opacity: Math.min(1, enterT * 1.5),
          transform: `translateY(${enterY + hopY + floatY + talkY}px) rotate(${tilt}deg) scale(${poseDip})`,
        }}
      >
        {prevPose && fade < 1 && sprite(prevPose, 1 - fade)}
        {sprite(pose, fade)}
      </div>
    </>
  );
};
