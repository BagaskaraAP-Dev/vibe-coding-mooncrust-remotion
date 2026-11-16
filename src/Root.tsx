import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans';
import { loadFont as loadPoppins } from '@remotion/google-fonts/Poppins';

import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Agents } from './scenes/Scene2Agents';
import { Scene3MCP } from './scenes/Scene3MCP';
import { Scene4Workflow } from './scenes/Scene4Workflow';
import { Scene5Outro } from './scenes/Scene5Outro';

// Load aesthetic fonts with specific weights and subsets
loadJakarta('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});
loadPoppins('normal', {
  weights: ['600', '700', '800'],
  subsets: ['latin'],
  ignoreTooManyRequestsWarning: true,
});

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Global video progress (0% to 100%)
  const progressPercent = (frame / durationInFrames) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: '#070A12' }}>
      {/* Background Chill Lo-Fi Music (Seamless loop, volume=0.11) */}
      <Audio src={staticFile('assets/bgm_ig_loop.wav')} loop volume={0.11} />

      {/* 5 Distinct Video Scenes */}
      <Sequence from={0} durationInFrames={600} name="01 - Intro & Vibe Coding">
        <Scene1Intro />
      </Sequence>

      <Sequence from={600} durationInFrames={720} name="02 - 3 Senjata Utama AI">
        <Scene2Agents />
      </Sequence>

      <Sequence from={1320} durationInFrames={720} name="03 - MCP Ecosystem">
        <Scene3MCP />
      </Sequence>

      <Sequence from={2040} durationInFrames={720} name="04 - Praktik Alur Kerja">
        <Scene4Workflow />
      </Sequence>

      <Sequence from={2760} durationInFrames={540} name="05 - Outro & Tips Arsitek">
        <Scene5Outro />
      </Sequence>

      {/* Global Top Progress Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #00F0FF, #8B5CF6, #F59E0B)',
            boxShadow: '0 0 12px rgba(0, 240, 255, 0.8)',
          }}
        />
      </div>

      {/* Watermark: Google Antigravity & Gemini */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 32,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 999,
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <span style={{ fontSize: 13 }}>✨</span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: '#E2E8F0',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Built by <span style={{ color: '#38BDF8' }}>Google Antigravity</span> & <span style={{ color: '#C084FC' }}>Gemini</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => {
  return (
    <Composition
      id="IgFeedsVibeCoding"
      component={MainVideo}
      durationInFrames={3300}
      fps={30}
      width={1080}
      height={1350}
    />
  );
};
