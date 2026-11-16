import React from 'react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface LivingMooncrustProps {
  mascotSrc: string;
  size?: number;
  position?: 'bottom-left' | 'bottom-right' | 'center' | 'side-left';
  isTalking?: boolean;
  nameTag?: string;
  roleTag?: string;
}

export const LivingMooncrust: React.FC<LivingMooncrustProps> = ({
  mascotSrc,
  size = 360,
  position = 'bottom-left',
  isTalking = true,
  nameTag = 'MOONCRUST',
  roleTag = '✦ AI Presenter',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 110 },
  });

  // Squash & Stretch / Breathing physics
  const breatheY = Math.sin(frame / 14) * 8;
  const talkBob = isTalking ? Math.sin(frame * 0.4) * 6 : 0;
  const talkScaleX = isTalking ? 1 + Math.sin(frame * 0.4) * 0.03 : 1;
  const talkScaleY = isTalking ? 1 - Math.sin(frame * 0.4) * 0.03 : 1;
  const swayRotate = Math.sin(frame / 18) * 3.5;

  // Soundwave ripple rings when speaking
  const ripple1 = (frame * 3) % 60;
  const ripple1Scale = interpolate(ripple1, [0, 60], [1, 1.8]);
  const ripple1Opacity = interpolate(ripple1, [0, 40, 60], [0.8, 0.4, 0]);

  const ripple2 = (frame * 3 + 30) % 60;
  const ripple2Scale = interpolate(ripple2, [0, 60], [1, 1.8]);
  const ripple2Opacity = interpolate(ripple2, [0, 40, 60], [0.8, 0.4, 0]);

  // Position styles
  let posStyle: React.CSSProperties = {};
  if (position === 'bottom-left') {
    posStyle = { bottom: 150, left: 36 };
  } else if (position === 'bottom-right') {
    posStyle = { bottom: 150, right: 36 };
  } else if (position === 'side-left') {
    posStyle = { top: 380, left: 36 };
  } else {
    posStyle = { bottom: 200, left: '50%', transform: 'translateX(-50%)' };
  }

  return (
    <div
      style={{
        position: 'absolute',
        ...posStyle,
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        transform: `scale(${enterSpring}) translateY(${interpolate(
          enterSpring,
          [0, 1],
          [80, 0]
        )}px)`,
      }}
    >
      {/* Speech Acoustic Ring Waves */}
      {isTalking && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: size * 0.7,
              height: size * 0.7,
              marginTop: -(size * 0.35),
              marginLeft: -(size * 0.35),
              borderRadius: '50%',
              border: '2px solid #00F0FF',
              transform: `scale(${ripple1Scale})`,
              opacity: ripple1Opacity,
              boxShadow: '0 0 15px #00F0FF',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: size * 0.7,
              height: size * 0.7,
              marginTop: -(size * 0.35),
              marginLeft: -(size * 0.35),
              borderRadius: '50%',
              border: '2px solid #A855F7',
              transform: `scale(${ripple2Scale})`,
              opacity: ripple2Opacity,
              boxShadow: '0 0 15px #A855F7',
            }}
          />
        </>
      )}

      {/* Futuristic Hologram Pedestal Base */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          width: size * 0.85,
          height: 38,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.45) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 80%)',
          filter: 'blur(6px)',
          boxShadow: '0 0 35px rgba(0, 240, 255, 0.5)',
          transform: `scale(${1 + Math.sin(frame / 10) * 0.08})`,
        }}
      />

      {/* Main Character Sprite Container */}
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${breatheY + talkBob}px) rotate(${swayRotate}deg) scale(${talkScaleX}, ${talkScaleY})`,
          transformOrigin: 'bottom center',
          filter:
            'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 25px rgba(0, 240, 255, 0.35))',
        }}
      >
        <Img
          src={staticFile(mascotSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Floating Presenter Name Tag Pill */}
      <div
        style={{
          marginTop: -8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 999,
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 240, 255, 0.3)',
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
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 1.2,
            color: '#FFFFFF',
          }}
        >
          {nameTag}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#38BDF8',
          }}
        >
          {roleTag}
        </span>
      </div>
    </div>
  );
};
