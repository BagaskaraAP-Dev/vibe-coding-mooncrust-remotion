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

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const quoteSpring = spring({ frame: frame - 15, fps, config: { damping: 11, stiffness: 100 } });
  const cta1Spring = spring({ frame: frame - 220, fps, config: { damping: 12, stiffness: 120 } });
  const cta2Spring = spring({ frame: frame - 280, fps, config: { damping: 12, stiffness: 120 } });

  // Floating sparkle particles
  const particles = [
    { x: 120, y: 220, delay: 0 },
    { x: 920, y: 260, delay: 20 },
    { x: 160, y: 520, delay: 40 },
    { x: 880, y: 560, delay: 60 },
    { x: 540, y: 180, delay: 80 },
  ];

  // Kinetic Caption Phrases timed to vo_5.mp3 (~16.1s)
  const phrases: CaptionPhrase[] = [
    {
      startFrame: 10,
      endFrame: 170,
      words: [
        { text: 'Seru', start: 10, end: 30 },
        { text: 'banget', start: 32, end: 55 },
        { text: 'kan? ✨', start: 58, end: 85 },
        { text: 'Ingat', start: 95, end: 115 },
        { text: 'ya,', start: 118, end: 130 },
        { text: 'AI', start: 132, end: 150 },
        { text: 'adalah', start: 152, end: 170 },
      ],
    },
    {
      startFrame: 175,
      endFrame: 330,
      words: [
        { text: 'Co-pilot', start: 175, end: 205 },
        { text: 'terbaikmu,', start: 208, end: 245 },
        { text: 'tapi', start: 248, end: 265 },
        { text: 'kamulah', start: 268, end: 295 },
        { text: 'arsitek', start: 298, end: 325 },
        { text: 'utamanya! 💡', start: 328, end: 360 },
      ],
    },
    {
      startFrame: 335,
      endFrame: 530,
      words: [
        { text: 'Terima', start: 338, end: 360 },
        { text: 'kasih,', start: 362, end: 385 },
        { text: 'jangan', start: 388, end: 410 },
        { text: 'lupa', start: 412, end: 428 },
        { text: 'simpan', start: 430, end: 455 },
        { text: 'video', start: 458, end: 478 },
        { text: 'ini', start: 480, end: 495 },
        { text: '& selamat mencoba! 👋', start: 498, end: 530 },
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
        <Audio src={staticFile('assets/vo_5.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={60} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.7} />
      </Sequence>
      <Sequence from={220} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={280} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.7} />
      </Sequence>

      {/* Cyber Golden & Violet Ambient Lighting */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          right: '50%',
          transform: 'translateX(50%)',
          width: 700,
          height: 500,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Sparkle Particles */}
      {particles.map((p, idx) => {
        const pY = p.y + Math.sin((frame + p.delay) / 15) * 16;
        const pScale = 0.8 + Math.sin((frame + p.delay) / 10) * 0.3;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: p.x,
              top: pY,
              fontSize: 24,
              transform: `scale(${pScale})`,
              filter: 'drop-shadow(0 0 10px #FBBF24)',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            ✨
          </div>
        );
      })}

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
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 8px #F59E0B',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#FDE68A' }}>
            GOLDEN MINDSET • PENUTUP
          </span>
        </div>

        <h1
          style={{
            margin: '16px 0 0 0',
            fontSize: 52,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: -1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #FDE68A 60%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
          }}
        >
          KAMULAH ARSITEK UTAMANYA!
        </h1>
      </div>

      {/* Inspirational Quote Card on Stage */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 50,
          right: 50,
          padding: '24px 30px',
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95))',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 35px rgba(245, 158, 11, 0.25)',
          textAlign: 'center',
          zIndex: 30,
          transform: `scale(${quoteSpring})`,
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 6 }}>💡</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.35 }}>
          "AI adalah <span style={{ color: '#FBBF24' }}>co-pilot terbaikmu</span>, tapi kamulah pemegang visi arsitekturnya."
        </div>
      </div>

      {/* 2 Interactive Call To Action Buttons */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 50,
          right: 50,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderRadius: 18,
            background: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid #38BDF8',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)',
            transform: `scale(${cta1Spring})`,
          }}
        >
          <span style={{ fontSize: 28 }}>💾</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8' }}>
              Simpan Video Ini
            </div>
            <div style={{ fontSize: 12, color: '#CBD5E1' }}>
              Untuk bahan belajar nanti
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderRadius: 18,
            background: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid #10B981',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)',
            transform: `scale(${cta2Spring})`,
          }}
        >
          <span style={{ fontSize: 28 }}>🚀</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#34D399' }}>
              Mulai Vibe Coding
            </div>
            <div style={{ fontSize: 12, color: '#CBD5E1' }}>
              Bangun proyek pertamamu!
            </div>
          </div>
        </div>
      </div>

      {/* Living Presenter Mooncrust Melambaikan Tangan di Center Stage */}
      <LivingMooncrust
        mascotSrc="maskot-penutup.png"
        size={460}
        position="center"
        isTalking={frame >= 10 && frame <= 510}
        nameTag="MOONCRUST"
        roleTag="✦ Sampai Jumpa! 👋"
      />

      {/* Kinetic Captions */}
      <KineticCaptions phrases={phrases} containerBottom={38} />
    </AbsoluteFill>
  );
};
