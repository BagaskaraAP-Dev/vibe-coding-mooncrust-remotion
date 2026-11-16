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

export const Scene2Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations
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

  const tag1Spring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const tag2Spring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const tag3Spring = spring({
    frame: frame - 380,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Dynamic zoom on diagram as scene progresses
  const diagramScale = interpolate(frame, [0, 720], [1, 1.05]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#080C16',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      }}
    >
      {/* Audio Voiceover & SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_2.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={80} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={220} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={380} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
      </Sequence>

      {/* Cyber Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern */}
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
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            transform: `scale(${headerSpring})`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 10px #3B82F6',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#60A5FA',
            }}
          >
            TOOLSET UTAMA • 3 PILAR AI
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
            background: 'linear-gradient(135deg, #FFFFFF 30%, #93C5FD 70%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: `scale(${headerSpring}) translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          3 SENJATA UTAMA VIBE CODING
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
          Kombinasi Editor Pintar, CLI Terminal, & Agen Otonom
        </p>
      </div>

      {/* Middle Canvas: High-Res Diagram & Floating Badges */}
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
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(59, 130, 246, 0.25)',
            background: '#0B1120',
            transform: `scale(${diagramSpring * diagramScale})`,
            position: 'relative',
          }}
        >
          <Img
            src={staticFile('01-ai-agents.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Subtle Glass Gradient Overlay on diagram edges */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(11, 17, 32, 0.1) 0%, rgba(11, 17, 32, 0.4) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* 3 Interactive Highlight Cards underneath */}
        <div
          style={{
            width: '100%',
            marginTop: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 14,
          }}
        >
          {/* Card 1: Cursor */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 18,
              padding: '16px 14px',
              border: '1.5px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              transform: `scale(${tag1Spring}) translateY(${interpolate(tag1Spring, [0, 1], [30, 0])}px)`,
              opacity: tag1Spring,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#60A5FA',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              01 • EDITOR
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>
              Cursor AI
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>
              Editor pintar berbasis VS Code untuk inline edit & navigasi kode kilat.
            </div>
          </div>

          {/* Card 2: Claude Code */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 18,
              padding: '16px 14px',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              transform: `scale(${tag2Spring}) translateY(${interpolate(tag2Spring, [0, 1], [30, 0])}px)`,
              opacity: tag2Spring,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#FBBF24',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              02 • TERMINAL
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>
              Claude Code
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>
              Asisten CLI ultra cepat yang memahami seluruh struktur codebase repositori.
            </div>
          </div>

          {/* Card 3: Google Antigravity */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 18,
              padding: '16px 14px',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              transform: `scale(${tag3Spring}) translateY(${interpolate(tag3Spring, [0, 1], [30, 0])}px)`,
              opacity: tag3Spring,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34D399',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              03 • AGENTIC AI
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>
              Antigravity
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.4 }}>
              Agen otonom pengelola tools, skills, test, hingga render video mandiri.
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Mooncrust Bottom Deck */}
      <MooncrustPresenter
        mascotSrc="maskot-tunjuk.png"
        subtitleText="Lihat 3 senjata utama di atas! Ada Cursor sebagai editor pintar, Claude Code di terminal, dan Google Antigravity sebagai agen otonom mandiri!"
        badgeText="MOONCRUST ✦ 3 SENJATA AI"
      />
    </AbsoluteFill>
  );
};
