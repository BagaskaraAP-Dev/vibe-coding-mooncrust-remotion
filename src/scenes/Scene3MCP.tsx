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

export const Scene3MCP: React.FC = () => {
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

  const pill1 = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 120 } });
  const pill2 = spring({ frame: frame - 170, fps, config: { damping: 12, stiffness: 120 } });
  const pill3 = spring({ frame: frame - 270, fps, config: { damping: 12, stiffness: 120 } });
  const pill4 = spring({ frame: frame - 370, fps, config: { damping: 12, stiffness: 120 } });

  const diagramScale = interpolate(frame, [0, 720], [1, 1.04]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090D1A',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      }}
    >
      {/* Audio Voiceover & SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_3.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={70} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={170} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={270} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={370} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
      </Sequence>

      {/* Ambient Neon Purple & Cyan glow */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 850,
          height: 600,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
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
            background: 'rgba(168, 85, 247, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            transform: `scale(${headerSpring})`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#A855F7',
              boxShadow: '0 0 10px #A855F7',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#C084FC',
            }}
          >
            INTEGRASI DUNIA NYATA • MCP
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
            background: 'linear-gradient(135deg, #FFFFFF 30%, #E9D5FF 70%, #C084FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: `scale(${headerSpring}) translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          MODEL CONTEXT PROTOCOL (MCP)
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
          AI Bebas Halusinasi & Terkoneksi Langsung ke Ekosistem Nyata
        </p>
      </div>

      {/* Middle Canvas: MCP Diagram & 4 Connectors */}
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
            border: '2px solid rgba(168, 85, 247, 0.35)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(168, 85, 247, 0.25)',
            background: '#0D111E',
            transform: `scale(${diagramSpring * diagramScale})`,
            position: 'relative',
          }}
        >
          <Img
            src={staticFile('02-mcp-ecosystem.png')}
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
              background: 'linear-gradient(180deg, rgba(13, 17, 30, 0.1) 0%, rgba(13, 17, 30, 0.4) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* 4 Connected Tools Grid */}
        <div
          style={{
            width: '100%',
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          {/* Connector 1: Context7 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 16,
              padding: '12px 16px',
              border: '1.5px solid rgba(0, 240, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${pill1})`,
              opacity: pill1,
            }}
          >
            <div
              style={{
                fontSize: 24,
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(0, 240, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              📖
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#00F0FF' }}>
                Context7 MCP
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Dokumentasi & API library resmi paling update
              </div>
            </div>
          </div>

          {/* Connector 2: Supabase */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 16,
              padding: '12px 16px',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${pill2})`,
              opacity: pill2,
            }}
          >
            <div
              style={{
                fontSize: 24,
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🗄️
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#34D399' }}>
                Supabase MCP
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Database SQL, auth user, dan backend cloud
              </div>
            </div>
          </div>

          {/* Connector 3: GitHub */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 16,
              padding: '12px 16px',
              border: '1.5px solid rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${pill3})`,
              opacity: pill3,
            }}
          >
            <div
              style={{
                fontSize: 24,
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🐙
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#FBBF24' }}>
                GitHub MCP
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Version control, commit repo, & Pull Request
              </div>
            </div>
          </div>

          {/* Connector 4: Playwright */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 16,
              padding: '12px 16px',
              border: '1.5px solid rgba(236, 72, 153, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${pill4})`,
              opacity: pill4,
            }}
          >
            <div
              style={{
                fontSize: 24,
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(236, 72, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🎭
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#F472B6' }}>
                Playwright MCP
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Testing browser otomatis & inspeksi visual E2E
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Mooncrust Bottom Deck */}
      <MooncrustPresenter
        mascotSrc="maskot-tunjuk.png"
        subtitleText="Supaya AI tidak halusinasi, kita hubungkan otaknya lewat MCP ke Context7, database Supabase, GitHub, hingga Playwright!"
        badgeText="MOONCRUST ✦ MCP PROTOCOL"
      />
    </AbsoluteFill>
  );
};
