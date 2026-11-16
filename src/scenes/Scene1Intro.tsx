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

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 11, stiffness: 100 } });
  const badge1Spring = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 120 } });
  const badge2Spring = spring({ frame: frame - 180, fps, config: { damping: 12, stiffness: 120 } });
  const badge3Spring = spring({ frame: frame - 320, fps, config: { damping: 12, stiffness: 120 } });

  // Floating ambient badges physics
  const float1 = Math.sin(frame / 16) * 12;
  const float2 = Math.cos(frame / 20) * 10;
  const float3 = Math.sin(frame / 14 + 1) * 14;

  // Kinetic Caption Phrases timed to vo_1.mp3 (~19.5s)
  const phrases: CaptionPhrase[] = [
    {
      startFrame: 10,
      endFrame: 160,
      words: [
        { text: 'Hai', start: 10, end: 24 },
        { text: 'teman-teman!', start: 25, end: 55 },
        { text: 'Kenalin', start: 60, end: 90 },
        { text: 'aku', start: 92, end: 110 },
        { text: 'Mooncrust! ✨', start: 112, end: 155 },
      ],
    },
    {
      startFrame: 165,
      endFrame: 310,
      words: [
        { text: 'Apakah', start: 170, end: 190 },
        { text: 'kalian', start: 192, end: 215 },
        { text: 'tahu', start: 218, end: 238 },
        { text: 'apa', start: 240, end: 255 },
        { text: 'itu', start: 258, end: 275 },
        { text: 'Vibe', start: 278, end: 292 },
        { text: 'Coding? 🚀', start: 295, end: 310 },
      ],
    },
    {
      startFrame: 315,
      endFrame: 590,
      words: [
        { text: 'Vibe', start: 318, end: 335 },
        { text: 'Coding', start: 338, end: 360 },
        { text: 'adalah', start: 362, end: 385 },
        { text: 'cara', start: 388, end: 405 },
        { text: 'baru', start: 408, end: 425 },
        { text: 'membangun', start: 428, end: 460 },
        { text: 'aplikasi', start: 462, end: 495 },
        { text: 'cukup', start: 500, end: 520 },
        { text: 'mengarahkan', start: 522, end: 555 },
        { text: 'AI!', start: 558, end: 588 },
      ],
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070A12',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Voiceover and SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_1.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={70} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={180} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={320} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
      </Sequence>

      {/* Dynamic Cyber Light Beams */}
      <div
        style={{
          position: 'absolute',
          top: -150,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          right: -80,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyber Grid */}
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

      {/* Top Header Section */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        {/* Glow Category Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 24px',
            borderRadius: 999,
            background: 'rgba(0, 240, 255, 0.12)',
            border: '1.5px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.3)',
            transform: `scale(${titleSpring})`,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#00F0FF',
              boxShadow: '0 0 10px #00F0FF',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#00F0FF',
            }}
          >
            MASTER SERIES • VIBE CODING
          </span>
        </div>

        {/* Big Kinetic Title */}
        <h1
          style={{
            margin: '22px 0 8px 0',
            fontSize: 56,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: -1.5,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #A5F3FC 60%, #818CF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: `scale(${titleSpring}) translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
            filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.7))',
          }}
        >
          CODING TANPA STRES?
        </h1>

        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#38BDF8',
            textAlign: 'center',
            transform: `scale(${titleSpring})`,
          }}
        >
          Arahkan AI, Bangun Software Masa Depan! ⚡
        </div>
      </div>

      {/* Floating 3D Code Cards Around Center */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 48,
          zIndex: 30,
          padding: '14px 22px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.25)',
          transform: `scale(${badge1Spring}) translateY(${float1}px) rotate(-3deg)`,
          opacity: badge1Spring,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 800, color: '#00F0FF' }}>
          ✨ ZERO BOILERPLATE
        </span>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
          {'{ vibeCoding: true }'}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 290,
          right: 48,
          zIndex: 30,
          padding: '14px 22px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.25)',
          transform: `scale(${badge2Spring}) translateY(${float2}px) rotate(4deg)`,
          opacity: badge2Spring,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 800, color: '#C084FC' }}>
          🧠 NATURAL PROMPT
        </span>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
          prompt =&gt; fullApp()
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 520,
          right: 40,
          zIndex: 30,
          padding: '14px 22px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.25)',
          transform: `scale(${badge3Spring}) translateY(${float3}px) rotate(-2deg)`,
          opacity: badge3Spring,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 800, color: '#34D399' }}>
          ⚡ 10X LEBIH CEPAT
        </span>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
          npm run ship-it 🚀
        </div>
      </div>

      {/* Hero Living Presenter Mooncrust */}
      <LivingMooncrust
        mascotSrc="maskot-laptop.png"
        size={440}
        position="bottom-left"
        isTalking={frame >= 10 && frame <= 585}
        nameTag="MOONCRUST"
        roleTag="✦ AI Presenter"
      />

      {/* Kinetic Reels/TikTok Style Captions */}
      <KineticCaptions phrases={phrases} containerBottom={38} />
    </AbsoluteFill>
  );
};
