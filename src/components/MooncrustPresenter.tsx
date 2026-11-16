import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

interface MooncrustPresenterProps {
  mascotSrc: string;
  subtitleText: string;
  badgeText?: string;
  speakerTag?: string;
}

export const MooncrustPresenter: React.FC<MooncrustPresenterProps> = ({
  mascotSrc,
  subtitleText,
  badgeText = 'MOONCRUST ✦ AI PRESENTER',
  speakerTag = 'Mooncrust',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Mascot subtle breathing float animation
  const floatY = Math.sin(frame / 14) * 8;
  const floatScale = 1 + Math.sin(frame / 20) * 0.015;

  // Audio spectrum visualizer
  const audioData = useAudioData(staticFile('assets/bgm_ig_loop.wav'));
  let visualizerBars: number[] = [];

  if (audioData) {
    try {
      visualizerBars = visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: 32,
      });
    } catch {
      visualizerBars = [];
    }
  }

  // Fallback to organic procedural spectrum if audioData is loading
  if (visualizerBars.length === 0) {
    visualizerBars = Array.from({ length: 32 }, (_, i) => {
      const wave1 = Math.sin((frame * 0.15) + i * 0.4) * 0.5 + 0.5;
      const wave2 = Math.cos((frame * 0.22) + i * 0.6) * 0.3 + 0.3;
      return Math.min(1, Math.max(0.08, (wave1 + wave2) * 0.6));
    });
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 480,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Visualizer Soundwave Bar */}
      <div
        style={{
          width: '90%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 6,
          height: 44,
          marginBottom: 12,
        }}
      >
        {visualizerBars.slice(0, 28).map((val, idx) => {
          const height = Math.max(8, Math.min(44, val * 48));
          return (
            <div
              key={idx}
              style={{
                width: 6,
                height,
                borderRadius: 4,
                background:
                  idx % 2 === 0
                    ? 'linear-gradient(180deg, #00F0FF 0%, #3B82F6 100%)'
                    : 'linear-gradient(180deg, #A855F7 0%, #EC4899 100%)',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)',
                transition: 'height 0.05s ease',
              }}
            />
          );
        })}
      </div>

      {/* Main Bottom Deck: Presenter Avatar & Speech Card */}
      <div
        style={{
          width: '92%',
          marginBottom: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 28,
          padding: '18px 24px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(59, 130, 246, 0.2)',
          transform: `scale(${entrySpring}) translateY(${interpolate(entrySpring, [0, 1], [40, 0])}px)`,
        }}
      >
        {/* Presenter Avatar Ring */}
        <div
          style={{
            position: 'relative',
            width: 140,
            height: 140,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Animated Neon Glowing Halo */}
          <div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00F0FF, #8B5CF6, #EC4899)',
              filter: 'blur(8px)',
              opacity: 0.85,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0F172A, #1E293B)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Img
              src={staticFile(mascotSrc)}
              style={{
                width: 130,
                height: 130,
                objectFit: 'cover',
                transform: `translateY(${floatY}px) scale(${floatScale})`,
              }}
            />
          </div>

          {/* Online / Active Pulse Dot */}
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              border: '3px solid #0F172A',
              boxShadow: '0 0 10px #10B981',
            }}
          />
        </div>

        {/* Speech & Presenter Info */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {/* Top Tag Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 1.5,
                color: '#00F0FF',
                textTransform: 'uppercase',
                background: 'rgba(0, 240, 255, 0.12)',
                padding: '4px 10px',
                borderRadius: 8,
                border: '1px solid rgba(0, 240, 255, 0.3)',
              }}
            >
              {badgeText}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#94A3B8',
              }}
            >
              🎙️ {speakerTag}
            </span>
          </div>

          {/* Subtitle / Speech Bubble Text */}
          <p
            style={{
              margin: 0,
              fontSize: 21,
              lineHeight: 1.45,
              fontWeight: 600,
              color: '#F8FAFC',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            "{subtitleText}"
          </p>
        </div>
      </div>
    </div>
  );
};
