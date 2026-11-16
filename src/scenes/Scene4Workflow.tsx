import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { MooncrustPresenter } from '../components/MooncrustPresenter';

export const Scene4Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const headerSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const diagramSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const step1 = spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 120 } });
  const step2 = spring({ frame: frame - 150, fps, config: { damping: 12, stiffness: 120 } });
  const step3 = spring({ frame: frame - 250, fps, config: { damping: 12, stiffness: 120 } });
  const step4 = spring({ frame: frame - 350, fps, config: { damping: 12, stiffness: 120 } });

  const diagramScale = interpolate(frame, [0, 720], [1, 1.04]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0F1D',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      }}
    >
      {/* Audio Voiceover & SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_4.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={60} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={150} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={250} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={350} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
      </Sequence>

      {/* Cyber Blue & Green Ambient Lighting */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 850,
          height: 600,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 999,
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            transform: `scale(${headerSpring})`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#34D399',
            }}
          >
            PIPELINE PRAKTIS • WORKFLOW
          </span>
        </div>

        <h1
          style={{
            margin: '18px 0 6px 0',
            fontSize: 48,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: -1,
            background: 'linear-gradient(135deg, #FFFFFF 30%, #A7F3D0 70%, #34D399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: `scale(${headerSpring}) translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          ALUR KERJA VIBE CODING
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 21,
            fontWeight: 500,
            color: '#94A3B8',
            textAlign: 'center',
            transform: `scale(${headerSpring})`,
          }}
        >
          Dari Satu Master Brief Terstruktur Menjadi Software Siap Rilis
        </p>
      </div>

      {/* Middle Canvas: Workflow Diagram & 4 Linear Steps */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 50,
          right: 50,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Main Diagram Card */}
        <div
          style={{
            width: '100%',
            height: 380,
            borderRadius: 24,
            overflow: 'hidden',
            border: '2px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.25)',
            background: '#0B131E',
            transform: `scale(${diagramSpring * diagramScale})`,
            position: 'relative',
          }}
        >
          <Img
            src={staticFile('03-vibe-workflow.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(11, 19, 30, 0.1) 0%, rgba(11, 19, 30, 0.4) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* 4 Step Process Pipeline */}
        <div
          style={{
            width: '100%',
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 10,
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 14,
              padding: '12px 10px',
              border: '1.5px solid rgba(0, 240, 255, 0.35)',
              textAlign: 'center',
              transform: `scale(${step1})`,
              opacity: step1,
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>📋</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#00F0FF', marginBottom: 2 }}>
              1. Master Brief
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.3 }}>
              Instruksi jelas & terstruktur
            </div>
          </div>

          {/* Step 2 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 14,
              padding: '12px 10px',
              border: '1.5px solid rgba(168, 85, 247, 0.35)',
              textAlign: 'center',
              transform: `scale(${step2})`,
              opacity: step2,
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>🧠</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#C084FC', marginBottom: 2 }}>
              2. Sequential
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.3 }}>
              Rancang arsitektur bertahap
            </div>
          </div>

          {/* Step 3 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 14,
              padding: '12px 10px',
              border: '1.5px solid rgba(245, 158, 11, 0.35)',
              textAlign: 'center',
              transform: `scale(${step3})`,
              opacity: step3,
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>🛡️</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FBBF24', marginBottom: 2 }}>
              3. Verification
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.3 }}>
              Auto test & cek TypeScript
            </div>
          </div>

          {/* Step 4 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 14,
              padding: '12px 10px',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              textAlign: 'center',
              transform: `scale(${step4})`,
              opacity: step4,
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>🚀</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#34D399', marginBottom: 2 }}>
              4. Ship Product
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.3 }}>
              Web & mobile siap rilis
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Mooncrust Bottom Deck */}
      <MooncrustPresenter
        mascotSrc="maskot-laptop.png"
        subtitleText="Alur kerjanya praktis! Dari Master Brief, AI merancang dengan Sequential Thinking, verifikasi TypeScript, sampai software siap digunakan!"
        badgeText="MOONCRUST ✦ PRAKTIK ALUR KERJA"
      />
    </AbsoluteFill>
  );
};
