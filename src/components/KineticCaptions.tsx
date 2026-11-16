import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface CaptionPhrase {
  startFrame: number;
  endFrame: number;
  words: { text: string; start: number; end: number }[];
}

interface KineticCaptionsProps {
  phrases: CaptionPhrase[];
  containerBottom?: number;
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  phrases,
  containerBottom = 40,
}) => {
  const frame = useCurrentFrame();

  // Find the active phrase
  const activePhrase = phrases.find(
    (p) => frame >= p.startFrame && frame <= p.endFrame
  );

  if (!activePhrase) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: containerBottom,
        left: 30,
        right: 30,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px 12px',
        padding: '16px 24px',
        borderRadius: 22,
        background: 'rgba(10, 15, 29, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(0, 240, 255, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.2)',
        zIndex: 100,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {activePhrase.words.map((w, idx) => {
        const isActive = frame >= w.start && frame <= w.end;
        const isPast = frame > w.end;

        // Word pop scale when spoken
        const scale = isActive
          ? interpolate(frame, [w.start, w.start + 3, w.end], [1, 1.22, 1.1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : 1;

        return (
          <span
            key={idx}
            style={{
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.3,
              letterSpacing: 0.3,
              transform: `scale(${scale})`,
              transition: 'transform 0.05s ease',
              color: isActive
                ? '#FFE600'
                : isPast
                ? '#FFFFFF'
                : 'rgba(255, 255, 255, 0.38)',
              textShadow: isActive
                ? '0 0 20px rgba(255, 230, 0, 0.8), 0 0 40px rgba(255, 230, 0, 0.4)'
                : isPast
                ? '0 2px 6px rgba(0,0,0,0.6)'
                : 'none',
              display: 'inline-block',
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
