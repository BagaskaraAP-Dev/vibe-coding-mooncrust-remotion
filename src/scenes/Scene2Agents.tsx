import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { LivingMooncrust } from '../components/LivingMooncrust';
import { KineticCaptions, CaptionPhrase } from '../components/KineticCaptions';
import { AnimatedCursor, CursorKeypoint } from '../components/AnimatedCursor';
import { TerminalTyping } from '../components/TerminalTyping';

export const Scene2Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Springs for cards
  const card1Spring = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 120 } });
  const card2Spring = spring({ frame: frame - 160, fps, config: { damping: 12, stiffness: 120 } });
  const card3Spring = spring({ frame: frame - 340, fps, config: { damping: 12, stiffness: 120 } });

  // Virtual Cursor Flight Path and Clicks
  const cursorKeypoints: CursorKeypoint[] = [
    { frame: 10, x: 200, y: 700 },
    { frame: 65, x: 240, y: 260, isClick: true }, // clicks Cursor card
    { frame: 120, x: 280, y: 300 },
    { frame: 210, x: 620, y: 260, isClick: true }, // clicks Claude Code card
    { frame: 280, x: 650, y: 320 },
    { frame: 390, x: 920, y: 260, isClick: true }, // clicks Antigravity card
    { frame: 480, x: 750, y: 480 },
    { frame: 700, x: 700, y: 550 },
  ];

  // Active click highlights
  const isCard1Active = frame >= 65 && frame < 200;
  const isCard2Active = frame >= 210 && frame < 380;
  const isCard3Active = frame >= 390;

  // Kinetic Caption Phrases timed to vo_2.mp3 (~22.6s)
  const phrases: CaptionPhrase[] = [
    {
      startFrame: 10,
      endFrame: 180,
      words: [
        { text: 'Coba', start: 10, end: 28 },
        { text: 'lihat', start: 30, end: 50 },
        { text: 'tiga', start: 52, end: 72 },
        { text: 'senjata', start: 75, end: 100 },
        { text: 'utama', start: 102, end: 128 },
        { text: 'di', start: 130, end: 145 },
        { text: 'atas', start: 148, end: 165 },
        { text: 'ini!', start: 168, end: 180 },
      ],
    },
    {
      startFrame: 185,
      endFrame: 360,
      words: [
        { text: 'Pertama', start: 188, end: 215 },
        { text: 'ada', start: 218, end: 232 },
        { text: 'Cursor', start: 235, end: 265 },
        { text: 'editor', start: 268, end: 295 },
        { text: 'pintar,', start: 298, end: 320 },
        { text: 'kedua', start: 322, end: 345 },
        { text: 'Claude Code ⚡', start: 348, end: 360 },
      ],
    },
    {
      startFrame: 365,
      endFrame: 710,
      words: [
        { text: 'Dan', start: 368, end: 385 },
        { text: 'ketiga', start: 388, end: 412 },
        { text: 'Google', start: 415, end: 440 },
        { text: 'Antigravity,', start: 442, end: 475 },
        { text: 'agen', start: 480, end: 505 },
        { text: 'otonom', start: 508, end: 535 },
        { text: 'yang', start: 538, end: 555 },
        { text: 'bisa', start: 558, end: 578 },
        { text: 'merender', start: 580, end: 615 },
        { text: 'proyek', start: 618, end: 648 },
        { text: 'mandiri! 🚀', start: 652, end: 700 },
      ],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070A14',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Audio & SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_2.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={65} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={210} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={390} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.7} />
      </Sequence>

      {/* Cyber Glow & Grid */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 850,
          height: 600,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 20px',
            borderRadius: 999,
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1.5px solid rgba(59, 130, 246, 0.4)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#60A5FA',
              boxShadow: '0 0 8px #60A5FA',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#93C5FD' }}>
            3 SENJATA UTAMA • AI TOOLKIT
          </span>
        </div>

        <h1
          style={{
            margin: '16px 0 0 0',
            fontSize: 52,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: -1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #BAE6FD 60%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
          }}
        >
          TRIO AGENT VIBE CODING
        </h1>
      </div>

      {/* 3 Interactive Animated Tool Cards at the Top Stage */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 40,
          right: 40,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 18,
          zIndex: 30,
        }}
      >
        {/* Tool 1: Cursor */}
        <div
          style={{
            padding: '22px 18px',
            borderRadius: 22,
            background: isCard1Active
              ? 'rgba(30, 58, 138, 0.7)'
              : 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: isCard1Active
              ? '2.5px solid #00F0FF'
              : '1.5px solid rgba(59, 130, 246, 0.3)',
            boxShadow: isCard1Active
              ? '0 0 35px rgba(0, 240, 255, 0.5), 0 20px 40px rgba(0,0,0,0.7)'
              : '0 12px 30px rgba(0,0,0,0.4)',
            transform: `scale(${card1Spring * (isCard1Active ? 1.05 : 1)})`,
            transition: 'border 0.2s, box-shadow 0.2s, transform 0.2s',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>💻</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#60A5FA', letterSpacing: 1 }}>
            01 • SMART IDE
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginTop: 2 }}>
            Cursor
          </div>
          <div style={{ fontSize: 13, color: '#CBD5E1', marginTop: 6, lineHeight: 1.4 }}>
            Editor pintar untuk edit kode secepat kilat.
          </div>
        </div>

        {/* Tool 2: Claude Code */}
        <div
          style={{
            padding: '22px 18px',
            borderRadius: 22,
            background: isCard2Active
              ? 'rgba(120, 53, 15, 0.7)'
              : 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: isCard2Active
              ? '2.5px solid #F59E0B'
              : '1.5px solid rgba(245, 158, 11, 0.3)',
            boxShadow: isCard2Active
              ? '0 0 35px rgba(245, 158, 11, 0.5), 0 20px 40px rgba(0,0,0,0.7)'
              : '0 12px 30px rgba(0,0,0,0.4)',
            transform: `scale(${card2Spring * (isCard2Active ? 1.05 : 1)})`,
            transition: 'border 0.2s, box-shadow 0.2s, transform 0.2s',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#FBBF24', letterSpacing: 1 }}>
            02 • TERMINAL CLI
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginTop: 2 }}>
            Claude Code
          </div>
          <div style={{ fontSize: 13, color: '#CBD5E1', marginTop: 6, lineHeight: 1.4 }}>
            Agen CLI terminal memahami seluruh repositori.
          </div>
        </div>

        {/* Tool 3: Google Antigravity */}
        <div
          style={{
            padding: '22px 18px',
            borderRadius: 22,
            background: isCard3Active
              ? 'rgba(6, 78, 59, 0.7)'
              : 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: isCard3Active
              ? '2.5px solid #10B981'
              : '1.5px solid rgba(16, 185, 129, 0.3)',
            boxShadow: isCard3Active
              ? '0 0 35px rgba(16, 185, 129, 0.5), 0 20px 40px rgba(0,0,0,0.7)'
              : '0 12px 30px rgba(0,0,0,0.4)',
            transform: `scale(${card3Spring * (isCard3Active ? 1.05 : 1)})`,
            transition: 'border 0.2s, box-shadow 0.2s, transform 0.2s',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#34D399', letterSpacing: 1 }}>
            03 • AUTONOMOUS
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginTop: 2 }}>
            Antigravity
          </div>
          <div style={{ fontSize: 13, color: '#CBD5E1', marginTop: 6, lineHeight: 1.4 }}>
            Agen otonom pengelola skills & render video.
          </div>
        </div>
      </div>

      {/* Active Interactive Demonstration in Middle Center */}
      <div
        style={{
          position: 'absolute',
          top: 450,
          right: 40,
          left: 450,
          zIndex: 35,
        }}
      >
        {frame < 360 ? (
          <TerminalTyping
            command='claude "buat video animasi ig feeds"'
            outputs={[
              '✓ Reading master brief...',
              '✓ Synthesizing lo-fi audio loop & SFX...',
              '⚡ Compiling Remotion components in 1.4s',
            ]}
            startFrame={190}
            charsPerFrame={1.1}
          />
        ) : (
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 20,
              background: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(16, 185, 129, 0.25)',
              color: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>✨</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#34D399' }}>
                GOOGLE ANTIGRAVITY ENGINE
              </span>
            </div>
            <div style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>
              Menjalankan MCP servers, menguji kode dengan Playwright, dan merender MP4 3300 frames secara otomatis tanpa henti!
            </div>
          </div>
        )}
      </div>

      {/* Living Presenter Mooncrust Menunjuk ke Atas */}
      <LivingMooncrust
        mascotSrc="maskot-tunjuk.png"
        size={460}
        position="bottom-left"
        isTalking={frame >= 10 && frame <= 700}
        nameTag="MOONCRUST"
        roleTag="✦ Menunjuk Senjata AI"
      />

      {/* Animated AI Mouse Cursor that Clicks on Screen */}
      <AnimatedCursor keypoints={cursorKeypoints} />

      {/* Kinetic Captions */}
      <KineticCaptions phrases={phrases} containerBottom={38} />
    </AbsoluteFill>
  );
};
