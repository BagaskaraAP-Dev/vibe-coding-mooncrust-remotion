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

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const card1Spring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const card2Spring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const card3Spring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Mascot hero center illustration in scene 1
  const mascotCenterSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Floating background orbs
  const orb1Y = Math.sin(frame / 25) * 20;
  const orb2X = Math.cos(frame / 30) * 25;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0E1A',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      }}
    >
      {/* Background Audio Voiceover & SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_1.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={45} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={120} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={220} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
      </Sequence>

      {/* Ambient Cyber Lighting Gradients */}
      <div
        style={{
          position: 'absolute',
          top: -120 + orb1Y,
          left: -100,
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 250,
          right: -120 + orb2X,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyber Grid Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Section */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 999,
            background: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
            transform: `scale(${titleSpring})`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
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
            SERI BELAJAR AI • EPISODE 01
          </span>
        </div>

        {/* Main Scene Title */}
        <h1
          style={{
            margin: '20px 0 6px 0',
            fontSize: 52,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: -1,
            background: 'linear-gradient(135deg, #FFFFFF 20%, #A5F3FC 60%, #818CF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: `scale(${titleSpring}) translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          APA ITU VIBE CODING?
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 500,
            color: '#94A3B8',
            textAlign: 'center',
            transform: `scale(${titleSpring})`,
          }}
        >
          Membangun Aplikasi & Web Modern Cukup Lewat Bahasa Alami
        </p>
      </div>

      {/* Middle Canvas: Hero Visual and Interactive Cards */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          left: 54,
          right: 54,
          bottom: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Center Hero Mascot Display */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            padding: '20px 30px',
            background: 'rgba(30, 41, 59, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: 24,
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            transform: `scale(${mascotCenterSpring})`,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 20,
              overflow: 'hidden',
              background: 'radial-gradient(circle, #1E293B, #0F172A)',
              border: '2px solid rgba(0, 240, 255, 0.4)',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('maskot-laptop.png')}
              style={{
                width: 140,
                height: 140,
                objectFit: 'cover',
                transform: `translateY(${Math.sin(frame / 12) * 5}px)`,
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#38BDF8',
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              PARADIGMA BARU CODING
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: '#F8FAFC',
                lineHeight: 1.25,
              }}
            >
              "Kamu Mengarahkan AI, AI Menulis Kodenya"
            </div>
            <div
              style={{
                fontSize: 16,
                color: '#CBD5E1',
                marginTop: 6,
              }}
            >
              Bukan lagi mengetik ribuan baris kode manual dari nol sendirian.
            </div>
          </div>
        </div>

        {/* 3 Benefit Feature Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Card 1 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              borderRadius: 18,
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              transform: `scale(${card1Spring}) translateX(${interpolate(card1Spring, [0, 1], [-40, 0])}px)`,
              opacity: card1Spring,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(0, 240, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              💬
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
                Bahasa Sehari-hari (Natural Prompting)
              </div>
              <div style={{ fontSize: 14, color: '#94A3B8' }}>
                Cukup jelaskan ide dan fitur dalam bahasa manusia yang jelas.
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              borderRadius: 18,
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              transform: `scale(${card2Spring}) translateX(${interpolate(card2Spring, [0, 1], [-40, 0])}px)`,
              opacity: card2Spring,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
                Kecepatan Eksekusi Berlipat Ganda
              </div>
              <div style={{ fontSize: 14, color: '#94A3B8' }}>
                Prototype, bug-fix, hingga deploy selesai dalam hitungan menit.
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              borderRadius: 18,
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(236, 72, 153, 0.25)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              transform: `scale(${card3Spring}) translateX(${interpolate(card3Spring, [0, 1], [-40, 0])}px)`,
              opacity: card3Spring,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(236, 72, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              🎯
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
                Fokus ke Problem Solving & Ide
              </div>
              <div style={{ fontSize: 14, color: '#94A3B8' }}>
                Kamu bertindak sebagai konseptor arsitektur dan pengarah visi.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Mooncrust Bottom Deck */}
      <MooncrustPresenter
        mascotSrc="maskot-laptop.png"
        subtitleText="Hai teman-teman! Kenalin aku Mooncrust. Vibe Coding adalah cara baru bikin aplikasi modern cuma dengan mengarahkan AI tanpa ngetik kode dari nol!"
        badgeText="MOONCRUST ✦ INTRO"
      />
    </AbsoluteFill>
  );
};
