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

export const Scene3MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const coreSpring = spring({ frame: frame - 15, fps, config: { damping: 11, stiffness: 100 } });
  const node1Spring = spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 120 } });
  const node2Spring = spring({ frame: frame - 150, fps, config: { damping: 12, stiffness: 120 } });
  const node3Spring = spring({ frame: frame - 240, fps, config: { damping: 12, stiffness: 120 } });
  const node4Spring = spring({ frame: frame - 330, fps, config: { damping: 12, stiffness: 120 } });

  // Core pulse animation
  const pulseScale = 1 + Math.sin(frame / 8) * 0.05;

  // Kinetic Caption Phrases timed to vo_3.mp3 (~20.5s)
  const phrases: CaptionPhrase[] = [
    {
      startFrame: 10,
      endFrame: 190,
      words: [
        { text: 'Supaya', start: 10, end: 30 },
        { text: 'AI', start: 32, end: 45 },
        { text: 'tidak', start: 48, end: 68 },
        { text: 'halusinasi,', start: 70, end: 110 },
        { text: 'kita', start: 115, end: 130 },
        { text: 'hubungkan', start: 132, end: 160 },
        { text: 'dengan', start: 162, end: 175 },
        { text: 'MCP! 🧠', start: 178, end: 190 },
      ],
    },
    {
      startFrame: 195,
      endFrame: 410,
      words: [
        { text: 'Lewat', start: 195, end: 215 },
        { text: 'MCP,', start: 218, end: 240 },
        { text: 'AI', start: 242, end: 258 },
        { text: 'terhubung', start: 260, end: 295 },
        { text: 'ke', start: 298, end: 310 },
        { text: 'dokumentasi', start: 312, end: 350 },
        { text: 'Context7,', start: 352, end: 385 },
        { text: 'dan', start: 388, end: 400 },
        { text: 'Supabase!', start: 402, end: 410 },
      ],
    },
    {
      startFrame: 415,
      endFrame: 710,
      words: [
        { text: 'Hingga', start: 418, end: 440 },
        { text: 'repository', start: 442, end: 480 },
        { text: 'GitHub,', start: 482, end: 515 },
        { text: 'serta', start: 518, end: 535 },
        { text: 'testing', start: 538, end: 565 },
        { text: 'browser', start: 568, end: 600 },
        { text: 'otomatis', start: 602, end: 638 },
        { text: 'Playwright! 🎭', start: 642, end: 700 },
      ],
    },
  ];

  // Core coordinates
  const coreX = 740;
  const coreY = 380;

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
        <Audio src={staticFile('assets/vo_3.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={60} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={150} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={240} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={330} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.7} />
      </Sequence>

      {/* Cyber Glow & Grid */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          right: 50,
          width: 700,
          height: 600,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 70%)',
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
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1.5px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#C084FC',
              boxShadow: '0 0 8px #C084FC',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#E9D5FF' }}>
            BEBAS HALUSINASI • PROTOCOL
          </span>
        </div>

        <h1
          style={{
            margin: '16px 0 0 0',
            fontSize: 52,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: -1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #E9D5FF 60%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
          }}
        >
          MODEL CONTEXT PROTOCOL (MCP)
        </h1>
      </div>

      {/* Center MCP Glowing Brain Hub */}
      <div
        style={{
          position: 'absolute',
          left: coreX - 90,
          top: coreY - 90,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #7E22CE 0%, #1E1B4B 80%)',
          border: '3px solid #C084FC',
          boxShadow: '0 0 45px rgba(192, 132, 252, 0.6), 0 20px 40px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          transform: `scale(${coreSpring * pulseScale})`,
        }}
      >
        <span style={{ fontSize: 42 }}>🧠</span>
        <span style={{ fontSize: 14, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
          MCP CORE
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#A5F3FC' }}>
          HUB OTOMATIS
        </span>
      </div>

      {/* 4 Connected Satellite Nodes */}
      {/* Node 1: Context7 Docs (Top-Right) */}
      <div
        style={{
          position: 'absolute',
          top: 190,
          right: 48,
          zIndex: 45,
          padding: '16px 20px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.92)',
          border: '2px solid #00F0FF',
          boxShadow: '0 0 25px rgba(0, 240, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${node1Spring})`,
          opacity: node1Spring,
        }}
      >
        <span style={{ fontSize: 28 }}>📖</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#00F0FF' }}>
            Context7 MCP
          </div>
          <div style={{ fontSize: 12, color: '#CBD5E1' }}>Dokumentasi Resmi Live</div>
        </div>
      </div>

      {/* Node 2: Supabase (Bottom-Right) */}
      <div
        style={{
          position: 'absolute',
          top: 530,
          right: 48,
          zIndex: 45,
          padding: '16px 20px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.92)',
          border: '2px solid #10B981',
          boxShadow: '0 0 25px rgba(16, 185, 129, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${node2Spring})`,
          opacity: node2Spring,
        }}
      >
        <span style={{ fontSize: 28 }}>🗄️</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#34D399' }}>
            Supabase MCP
          </div>
          <div style={{ fontSize: 12, color: '#CBD5E1' }}>Cloud Database & Auth</div>
        </div>
      </div>

      {/* Node 3: GitHub (Mid-Right Edge) */}
      <div
        style={{
          position: 'absolute',
          top: 350,
          right: 32,
          zIndex: 45,
          padding: '14px 18px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.92)',
          border: '2px solid #F59E0B',
          boxShadow: '0 0 25px rgba(245, 158, 11, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${node3Spring})`,
          opacity: node3Spring,
        }}
      >
        <span style={{ fontSize: 28 }}>🐙</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#FBBF24' }}>
            GitHub MCP
          </div>
          <div style={{ fontSize: 12, color: '#CBD5E1' }}>Push Repo & Review PR</div>
        </div>
      </div>

      {/* Node 4: Playwright (Lower Center) */}
      <div
        style={{
          position: 'absolute',
          top: 590,
          left: 450,
          zIndex: 45,
          padding: '14px 20px',
          borderRadius: 18,
          background: 'rgba(15, 23, 42, 0.92)',
          border: '2px solid #EC4899',
          boxShadow: '0 0 25px rgba(236, 72, 153, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${node4Spring})`,
          opacity: node4Spring,
        }}
      >
        <span style={{ fontSize: 28 }}>🎭</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#F472B6' }}>
            Playwright MCP
          </div>
          <div style={{ fontSize: 12, color: '#CBD5E1' }}>Automated E2E Testing</div>
        </div>
      </div>

      {/* Live Animated Flowing Energy Streams */}
      <EnergyStream
        x1={coreX}
        y1={coreY}
        x2={930}
        y2={230}
        color="#00F0FF"
        label="LIVE DOCS"
        startFrame={60}
      />
      <EnergyStream
        x1={coreX}
        y1={coreY}
        x2={930}
        y2={570}
        color="#10B981"
        label="SQL DATA"
        startFrame={150}
      />
      <EnergyStream
        x1={coreX}
        y1={coreY}
        x2={950}
        y2={390}
        color="#F59E0B"
        label="CODE REPO"
        startFrame={240}
      />
      <EnergyStream
        x1={coreX}
        y1={coreY}
        x2={560}
        y2={620}
        color="#EC4899"
        label="UI TEST"
        startFrame={330}
      />

      {/* Living Presenter Mooncrust */}
      <LivingMooncrust
        mascotSrc="maskot-tunjuk.png"
        size={460}
        position="bottom-left"
        isTalking={frame >= 10 && frame <= 700}
        nameTag="MOONCRUST"
        roleTag="✦ Presenter MCP"
      />

      {/* Kinetic Captions */}
      <KineticCaptions phrases={phrases} containerBottom={38} />
    </AbsoluteFill>
  );
};
