// Copyright (C) 2026 Bagaskara Amukti Palapa. All rights reserved.
//
// Waktu tiap kata voice-over, dari scripts/gen-voice.py (Edge-TTS
// WordBoundary). Semua animasi dan caption memakai cue() supaya jatuh
// tepat di kata yang diucapkan, bukan di angka frame tebakan.
import data from '../data/voice.json';
import { FPS } from '../theme';

export type VoiceName = keyof typeof data;

export interface Word {
  text: string;
  start: number;
  end: number;
}

const cache = new Map<VoiceName, Word[]>();

// Frame relatif terhadap awal file audio. Teks memakai token dari naskah
// agar tanda baca ikut tampil (WordBoundary membuangnya).
export const voiceWords = (name: VoiceName): Word[] => {
  const hit = cache.get(name);
  if (hit) return hit;
  const v = data[name];
  const tokens = v.text.split(/\s+/);
  const aligned = tokens.length === v.words.length;
  const words = v.words.map((w, i) => ({
    text: aligned ? tokens[i] : w.text,
    start: Math.round(w.start * FPS),
    end: Math.round(w.end * FPS),
  }));
  cache.set(name, words);
  return words;
};

// Frame scene saat kata ke-index mulai diucapkan.
export const cue = (name: VoiceName, from: number, index: number): number =>
  from + voiceWords(name)[index].start;

export const voiceEnd = (name: VoiceName, from: number): number => {
  const words = voiceWords(name);
  return from + words[words.length - 1].end;
};
