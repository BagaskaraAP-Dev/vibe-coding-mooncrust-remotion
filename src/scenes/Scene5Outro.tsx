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

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const headerSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const quoteSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const heroMascotSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const cta1Spring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const cta2Spring = spring({
    frame: frame - 260,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Mascot waving and breathing
  const waveRotate = Math.sin(frame / 8) * 3;
  const mascotFloatY = Math.sin(frame / 15) * 8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090D18',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', 'Poppins', sans-serif",
      }}
    >
      {/* Audio Voiceover & SFX */}
      <Sequence from={5}>
        <Audio src={staticFile('assets/vo_5.mp3')} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={60} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={180} durationInFrames={20}>
        <Audio src={staticFile('assets/sfx_pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={260} durationInFrames={30}>
        <Audio src={staticFile('assets/sfx_sparkle.wav')} volume={0.6} />
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
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          right: -100,
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
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            transform: `scale(${headerSpring})`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 10px #F59E0B',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#FBBF24',
            }}
          >
            PENUTUP & KUNCI UTAMA • OUTRO
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
            background: 'linear-gradient(135deg, #FFFFFF 30%, #FDE68A 70%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: `scale(${headerSpring}) translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          KAMULAH ARSITEK UTAMANYA!
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
          Kolaborasi Harmonis Antara Kreativitas Manusia & Kecepatan AI
        </p>
      </div>

      {/* Middle Canvas: Hero Mascot Farewell & Golden Quote */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 54,
          right: 54,
          bottom: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Inspiring Gold Quote Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
            backdropFilter: 'blur(16px)',
            borderRadius: 24,
            padding: '24px 30px',
            border: '2px solid rgba(245, 158, 11, 0.35)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.15)',
            transform: `scale(${quoteSpring})`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 6 }}>💡</div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.35,
            }}
          >
            "AI adalah <span style={{ color: '#FBBF24' }}>co-pilot terbaikmu</span>, tapi kamulah yang memegang kemudi arsitekturnya."
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#94A3B8',
              marginTop: 10,
            }}
          >
            — Mooncrust Vibe Coding Mindset
          </div>
        </div>

        {/* Mascot Center Stage Farewell */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            padding: '18px 24px',
            borderRadius: 24,
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            transform: `scale(${heroMascotSpring})`,
          }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'radial-gradient(circle, #334155, #0F172A)',
              border: '2.5px solid #F59E0B',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('maskot-penutup.png')}
              style={{
                width: 125,
                height: 125,
                objectFit: 'cover',
                transform: `translateY(${mascotFloatY}px) rotate(${waveRotate}deg)`,
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FBBF24', letterSpacing: 1 }}>
              TERIMA KASIH TELAH BELAJAR BERSAMA
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>
              Sampai Jumpa di Sesi Berikutnya! 👋
            </div>
            <div style={{ fontSize: 14, color: '#CBD5E1', marginTop: 4 }}>
              Jadikan coding menyenangkan dan ekspresikan ide gilamu hari ini.
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 8,
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: 13 }}>⚡</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#BAE6FD' }}>
                Video Dibuat & Dirender Otomatis oleh <span style={{ color: '#FFFFFF' }}>Google Antigravity</span> & <span style={{ color: '#C084FC' }}>Gemini</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2 Call To Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* CTA 1 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 18,
              padding: '16px 14px',
              border: '1.5px solid rgba(59, 130, 246, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${cta1Spring})`,
              opacity: cta1Spring,
            }}
          >
            <div style={{ fontSize: 24 }}>💾</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#60A5FA' }}>
                Simpan Video Ini
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Buat contekan belajar nanti
              </div>
            </div>
          </div>

          {/* CTA 2 */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: 18,
              padding: '16px 14px',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${cta2Spring})`,
              opacity: cta2Spring,
            }}
          >
            <div style={{ fontSize: 24 }}>🚀</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#34D399' }}>
                Coba Vibe Coding
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Mulai bangun websitemu!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Presenter Mooncrust Bottom Deck */}
      <MooncrustPresenter
        mascotSrc="maskot-penutup.png"
        subtitleText="Ingat ya, AI adalah co-pilot terbaikmu, tapi kamulah arsitek utamanya. Terima kasih sudah belajar bareng Mooncrust! Selamat mencoba!"
        badgeText="MOONCRUST ✦ PENUTUP"
      />
    </AbsoluteFill>
  );
};
