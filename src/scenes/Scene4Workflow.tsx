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
import { EnergyStream } from '../components/EnergyStream';

export const Scene4Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Springs for 4 workflow stages
  const step1Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 120 } });
  const step2Spring = spring({ frame: frame - 140, fps, config: { damping: 12, stiffness: 120 } });
  const step3Spring = spring({ frame: frame - 270, fps, config: { damping: 12, stiffness: 120 } });
  const step4Spring = spring({ frame: frame - 400, fps, config: { damping: 12, stiffness: 120 } });

  // Rocket launch wobble for stage 4
  const rocketWobble = frame >= 400 ? Math.sin((frame - 400) * 0.4) * 4 : 0;
  const rocketLift = frame >= 400 ? interpolate(frame - 400, [0, 100], [0, -15], { extrapolateRight: 'clamp' }) : 0;

  // Kinetic Caption Phrases timed to vo_4.mp3 (~16.3s)
  const phrases: CaptionPhrase[] = [
    {
      startFrame: 10,
      endFrame: 180,
      words: [
        { text: 'Alur', start: 10, end: 28 },
        { text: 'kerjanya', start: 30, end: 58 },
        { text: 'jadi', start: 60, end: 78 },
        { text: 'super', start: 80, end: 105 },
        { text: 'praktis! ⚡', start: 108, end: 135 },
        { text: 'Dari', start: 140, end: 155 },
        { text: 'Master', start: 158, end: 178 },
        { text: 'Brief,', start: 180, end: 200 },
      ],
    },
    {
      startFrame: 205,
      endFrame: 360,
      words: [
        { text: 'AI', start: 205, end: 220 },
        { text: 'merancang', start: 222, end: 255 },
        { text: 'dengan', start: 258, end: 275 },
        { text: 'Sequential', start: 278, end: 315 },
        { text: 'Thinking, 🧠', start: 318, end: 360 },
      ],
    },
    {
      startFrame: 365,
      endFrame: 690,
      words: [
        { text: 'Mengecek', start: 368, end: 400 },
        { text: 'error', start: 402, end: 425 },
        { text: 'TypeScript, 🛡️', start: 428, end: 470 },
        { text: 'hingga', start: 475, end: 495 },
        { text: 'aplikasi', start: 498, end: 530 },
        { text: 'siap', start: 532, end: 555 },
        { text: 'digunakan! 🚀', start: 558, end: 620 },
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
        <Audio src={staticFile('assets/vo_4.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={140} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={270} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={400} durationInFrames={40}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.7} />
      </Sequence>

      {/* Cyber Glow & Grid */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          right: 100,
          width: 700,
          height: 600,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
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
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#A7F3D0' }}>
            PIPELINE OTOMATIS • WORKFLOW
          </span>
        </div>

        <h1
          style={{
            margin: '16px 0 0 0',
            fontSize: 52,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: -1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #A7F3D0 60%, #10B981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
          }}
        >
          ALUR EKSEKUSI VIBE CODING
        </h1>
      </div>

      {/* 4 Interactive Linear Factory Stages on Right/Top Canvas */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          right: 48,
          width: 540,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 40,
        }}
      >
        {/* Stage 1: Master Brief */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 18,
            background: frame >= 20 ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
            border: frame >= 20 ? '2px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: frame >= 20 ? '0 0 25px rgba(0, 240, 255, 0.35)' : 'none',
            transform: `scale(${step1Spring})`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            📋
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#00F0FF' }}>
              STEP 01 • INPUT
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
              Master Brief Terstruktur
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>
              Spesifikasi detail, tujuan, dan batasan jelas.
            </div>
          </div>
        </div>

        {/* Stage 2: Sequential Thinking */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 18,
            background: frame >= 140 ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
            border: frame >= 140 ? '2px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: frame >= 140 ? '0 0 25px rgba(192, 132, 252, 0.35)' : 'none',
            transform: `scale(${step2Spring})`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(192, 132, 252, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            🧠
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#C084FC' }}>
              STEP 02 • ARCHITECTURE
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
              Sequential Thinking
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>
              AI memecah masalah & merancang arsitektur bertahap.
            </div>
          </div>
        </div>

        {/* Stage 3: Type Safety & Tests */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 18,
            background: frame >= 270 ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
            border: frame >= 270 ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: frame >= 270 ? '0 0 25px rgba(245, 158, 11, 0.35)' : 'none',
            transform: `scale(${step3Spring})`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            🛡️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FBBF24' }}>
              STEP 03 • VERIFICATION
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
              Auto Verification & TypeScript
            </div>
            <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>
              ✓ 0 Errors Found • Type-Safe 100%
            </div>
          </div>
        </div>

        {/* Stage 4: Ready to Ship */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 18,
            background: frame >= 400 ? 'rgba(6, 78, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)',
            border: frame >= 400 ? '2px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: frame >= 400 ? '0 0 35px rgba(16, 185, 129, 0.5)' : 'none',
            transform: `scale(${step4Spring}) translateY(${rocketLift}px) rotate(${rocketWobble}deg)`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
            }}
          >
            🚀
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#34D399' }}>
              STEP 04 • DEPLOYMENT
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
              Aplikasi Siap Digunakan!
            </div>
            <div style={{ fontSize: 12, color: '#A7F3D0' }}>
              Web & Mobile apps terkirim langsung ke pengguna.
            </div>
          </div>
        </div>
      </div>

      {/* Flowing Laser Beams Connecting the 4 Stages */}
      {frame >= 140 && (
        <EnergyStream x1={760} y1={285} x2={760} y2={345} color="#00F0FF" />
      )}
      {frame >= 270 && (
        <EnergyStream x1={760} y1={425} x2={760} y2={485} color="#C084FC" />
      )}
      {frame >= 400 && (
        <EnergyStream x1={760} y1={565} x2={760} y2={625} color="#10B981" />
      )}

      {/* Living Presenter Mooncrust */}
      <LivingMooncrust
        mascotSrc="maskot-laptop.png"
        size={460}
        position="bottom-left"
        isTalking={frame >= 10 && frame <= 630}
        nameTag="MOONCRUST"
        roleTag="✦ Memandu Workflow"
      />

      {/* Kinetic Captions */}
      <KineticCaptions phrases={phrases} containerBottom={38} />
    </AbsoluteFill>
  );
};
