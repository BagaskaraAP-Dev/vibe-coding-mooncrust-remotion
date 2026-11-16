import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface CursorKeypoint {
  frame: number;
  x: number;
  y: number;
  isClick?: boolean;
}

interface AnimatedCursorProps {
  keypoints: CursorKeypoint[];
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ keypoints }) => {
  const frame = useCurrentFrame();

  if (keypoints.length === 0) return null;

  // If before first keypoint or after last
  const first = keypoints[0];
  const last = keypoints[keypoints.length - 1];

  let currentX = first.x;
  let currentY = first.y;

  if (frame <= first.frame) {
    currentX = first.x;
    currentY = first.y;
  } else if (frame >= last.frame) {
    currentX = last.x;
    currentY = last.y;
  } else {
    // Find active interval
    for (let i = 0; i < keypoints.length - 1; i++) {
      const p1 = keypoints[i];
      const p2 = keypoints[i + 1];
      if (frame >= p1.frame && frame <= p2.frame) {
        currentX = interpolate(frame, [p1.frame, p2.frame], [p1.x, p2.x]);
        currentY = interpolate(frame, [p1.frame, p2.frame], [p1.y, p2.y]);
        break;
      }
    }
  }

  // Check if near any click point (within 10 frames)
  const clickPoint = keypoints.find(
    (kp) => kp.isClick && Math.abs(frame - kp.frame) <= 12
  );

  const isClicking = Boolean(clickPoint);
  const clickDiff = clickPoint ? frame - clickPoint.frame : 0;
  const clickScale = isClicking ? interpolate(clickDiff, [0, 4, 12], [1, 0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1;
  const rippleScale = isClicking ? interpolate(clickDiff, [0, 12], [0.8, 2.4]) : 0;
  const rippleOpacity = isClicking ? interpolate(clickDiff, [0, 8, 12], [0.9, 0.4, 0]) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        zIndex: 150,
        pointerEvents: 'none',
        transform: `translate(-6px, -4px) scale(${clickScale})`,
        transition: 'transform 0.05s ease',
      }}
    >
      {/* Click Wave Ripple */}
      {isClicking && clickDiff >= 0 && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 36,
            height: 36,
            marginTop: -18,
            marginLeft: -18,
            borderRadius: '50%',
            border: '3px solid #00F0FF',
            boxShadow: '0 0 15px #00F0FF',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* Modern Neon SVG Mouse Cursor */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter:
            'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 10px rgba(0, 240, 255, 0.8))',
        }}
      >
        <path
          d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
          fill="#00F0FF"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>

      {/* AI Label Tag Following Cursor */}
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 18,
          padding: '3px 8px',
          borderRadius: 6,
          background: 'rgba(0, 240, 255, 0.95)',
          color: '#070A12',
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 0.5,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        AI CURSOR
      </div>
    </div>
  );
};
