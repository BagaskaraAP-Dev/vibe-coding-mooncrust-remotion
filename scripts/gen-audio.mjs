import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.resolve(__dirname, '../public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Helper to create WAV buffer
function createWavBuffer(samples, sampleRate = 44100, numChannels = 2) {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = samples.length * numChannels * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    // Clamp to [-1, 1]
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intSample = s < 0 ? s * 32768 : s * 32767;
    for (let c = 0; c < numChannels; c++) {
      buffer.writeInt16LE(Math.round(intSample), offset);
      offset += 2;
    }
  }

  return buffer;
}

// 1. Generate Lo-fi Synth BGM (15 seconds seamless loop)
function generateBgm() {
  const sampleRate = 44100;
  const duration = 15.0; // 15 seconds
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Lo-fi chord progression (Fmaj7 - Em7 - Dm7 - Cmaj7)
  // 15 seconds / 4 chords = 3.75s per chord
  const chords = [
    [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
    [164.81, 196.00, 246.94, 293.66], // Em7 (E3, G3, B3, D4)
    [146.83, 174.61, 220.00, 261.63], // Dm7 (D3, F3, A3, C4)
    [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
  ];

  const chordDuration = duration / chords.length;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const chordIndex = Math.floor(t / chordDuration) % chords.length;
    const chordTime = t - chordIndex * chordDuration;
    const freqs = chords[chordIndex];

    let val = 0;

    // Synth pad tone (soft saw + sine mix)
    for (let f = 0; f < freqs.length; f++) {
      const freq = freqs[f];
      // Subtle vibrato/detune
      const detune = Math.sin(2 * Math.PI * 3.5 * t + f) * 0.8;
      const actualFreq = freq + detune;
      
      const sine = Math.sin(2 * Math.PI * actualFreq * t);
      // Soft 2nd harmonic
      const soft2 = 0.3 * Math.sin(2 * Math.PI * actualFreq * 2 * t);
      
      // Chord envelope: gentle attack, gentle sustain
      const env = Math.min(1, chordTime / 0.3) * Math.min(1, (chordDuration - chordTime) / 0.2);
      val += (sine + soft2) * 0.12 * env;
    }

    // Gentle sub-bass on root note
    const rootFreq = freqs[0] / 2;
    const bass = Math.sin(2 * Math.PI * rootFreq * t) * 0.18 * Math.min(1, chordTime / 0.15);
    val += bass;

    // Lo-fi soft chill percussion tap on beats (tempo = 80 bpm => 0.75s per beat)
    const beatTime = t % 0.75;
    if (beatTime < 0.08) {
      const drumDecay = Math.exp(-beatTime * 45);
      const drumNoise = (Math.random() * 2 - 1) * 0.04 * drumDecay;
      const kick = Math.sin(2 * Math.PI * (120 - beatTime * 600) * beatTime) * 0.15 * drumDecay;
      val += kick + drumNoise;
    }

    // Warm lo-fi texture (very subtle warm tape noise)
    val += (Math.random() * 2 - 1) * 0.008;

    samples[i] = val * 0.7;
  }

  // Seamless loop crossfade (last 0.5s blended with first 0.5s)
  const fadeSamples = Math.floor(sampleRate * 0.5);
  for (let i = 0; i < fadeSamples; i++) {
    const progress = i / fadeSamples;
    const endIdx = totalSamples - fadeSamples + i;
    const mixed = samples[endIdx] * (1 - progress) + samples[i] * progress;
    samples[i] = mixed;
    samples[endIdx] = mixed;
  }

  return createWavBuffer(samples, sampleRate, 2);
}

// 2. SFX Whoosh (~0.35s)
function generateWhoosh() {
  const sampleRate = 44100;
  const duration = 0.35;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;
    // Bell envelope
    const env = Math.sin(progress * Math.PI);
    // Swept filtered noise
    const noise = Math.random() * 2 - 1;
    const sweepFreq = 300 + Math.sin(progress * Math.PI) * 1200;
    const tone = Math.sin(2 * Math.PI * sweepFreq * t);
    samples[i] = (noise * 0.5 + tone * 0.5) * env * 0.6;
  }

  return createWavBuffer(samples, sampleRate, 2);
}

// 3. SFX Pop (~0.12s)
function generatePop() {
  const sampleRate = 44100;
  const duration = 0.12;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    // Rapid pitch drop from 750Hz to 180Hz
    const freq = 180 + 570 * Math.exp(-t * 35);
    const env = Math.exp(-t * 28);
    const wave = Math.sin(2 * Math.PI * freq * t);
    samples[i] = wave * env * 0.7;
  }

  return createWavBuffer(samples, sampleRate, 2);
}

// 4. SFX Sparkle (~0.6s)
function generateSparkle() {
  const sampleRate = 44100;
  const duration = 0.6;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  const notes = [1318.51, 1661.22, 1975.53, 2637.02]; // E6, G#6, B6, E7
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let val = 0;
    for (let n = 0; n < notes.length; n++) {
      const noteDelay = n * 0.08;
      if (t >= noteDelay) {
        const noteT = t - noteDelay;
        const env = Math.exp(-noteT * 7);
        const chime = Math.sin(2 * Math.PI * notes[n] * noteT);
        val += chime * env * 0.2;
      }
    }
    samples[i] = val;
  }

  return createWavBuffer(samples, sampleRate, 2);
}

// Write files
console.log('Generating BGM and SFX audio files...');
fs.writeFileSync(path.join(assetsDir, 'bgm_ig_loop.wav'), generateBgm());
console.log('Created: public/assets/bgm_ig_loop.wav');

fs.writeFileSync(path.join(assetsDir, 'sfx_whoosh.wav'), generateWhoosh());
console.log('Created: public/assets/sfx_whoosh.wav');

fs.writeFileSync(path.join(assetsDir, 'sfx_pop.wav'), generatePop());
console.log('Created: public/assets/sfx_pop.wav');

fs.writeFileSync(path.join(assetsDir, 'sfx_sparkle.wav'), generateSparkle());
console.log('Created: public/assets/sfx_sparkle.wav');

console.log('All SFX and BGM generated successfully!');
