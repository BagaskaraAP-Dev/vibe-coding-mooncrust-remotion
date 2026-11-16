// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Caption yang mengikuti voice-over kata per kata. Waktunya dari
// src/data/voice.json, jadi kata menyala tepat saat diucapkan. Caption
// hanya tampil di pita lantai (di bawah FLOOR_Y), area yang tidak dipakai
// visual lain, sehingga tidak pernah menutupi materi.
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FLOOR_Y, FONT } from '../theme';
import { VoiceName, Word, voiceWords } from '../lib/voice';

const MAX_CHARS = 30;
const MAX_WORDS = 6;

const toPhrases = (words: Word[]): Word[][] => {
  const phrases: Word[][] = [];
  let cur: Word[] = [];
  let chars = 0;
  words.forEach((w) => {
    cur.push(w);
    chars += w.text.length + 1;
    if (/[.,!?]$/.test(w.text) || chars > MAX_CHARS || cur.length >= MAX_WORDS) {
      phrases.push(cur);
      cur = [];
      chars = 0;
    }
  });
  if (cur.length) phrases.push(cur);
  return phrases;
};

export const KineticCaptions: React.FC<{ voice: VoiceName; from: number }> = ({ voice, from }) => {
  const frame = useCurrentFrame() - from;
  const { fps } = useVideoConfig();
  const phrases = toPhrases(voiceWords(voice));

  const index = phrases.findIndex((p, i) => {
    const show = p[0].start - 4;
    const next = phrases[i + 1];
    const hide = next ? next[0].start - 4 : p[p.length - 1].end + 24;
    return frame >= show && frame < hide;
  });
  if (index < 0) return null;
  const phrase = phrases[index];

  const enter = spring({ frame: frame - (phrase[0].start - 4), fps, config: { damping: 18, stiffness: 200 } });

  return (
    <div
      style={{
        position: 'absolute',
        top: FLOOR_Y + 30,
        left: 48,
        right: 48,
        height: 170,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        gap: '4px 14px',
        fontFamily: FONT,
        transform: `translateY(${(1 - enter) * 18}px)`,
        opacity: enter,
      }}
    >
      {phrase.map((w, i) => {
        const spoken = frame >= w.start;
        const next = phrase[i + 1];
        // Hanya satu kata yang menyala: kata terakhir yang sudah mulai diucapkan.
        const active = spoken && frame < w.end + 6 && !(next && frame >= next.start);
        const lift = active
          ? spring({ frame: frame - w.start, fps, config: { damping: 10, stiffness: 260 } })
          : 0;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.25,
              color: active ? C.moon : spoken ? C.ink : C.dim,
              transform: `translateY(${-lift * 5}px) scale(${1 + lift * 0.06})`,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
