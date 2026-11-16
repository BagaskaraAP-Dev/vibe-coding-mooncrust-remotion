import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface EnergyStreamProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  label?: string;
  startFrame?: number;
}

export const EnergyStream: React.FC<EnergyStreamProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = '#00F0FF',
  label,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) return null;

  // Animated dash offset for streaming effect
  const dashOffset = -((frame * 4) % 40);

  // Moving glowing packet orb along the path (0 to 1)
  const packetProgress = ((frame - startFrame) * 0.035) % 1;
  const packetX = interpolate(packetProgress, [0, 1], [x1, x2]);
  const packetY = interpolate(packetProgress, [0, 1], [y1, y2]);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      <defs>
        <filter id={`glow-${color.replace('#', '')}`}>
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Dim Line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.25"
      />

      {/* Animated Flowing Laser Line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3.5"
        strokeDasharray="12 8"
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        filter={`url(#glow-${color.replace('#', '')})`}
      />

      {/* Moving Glowing Energy Packet */}
      <circle
        cx={packetX}
        cy={packetY}
        r="6.5"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="2.5"
        filter={`url(#glow-${color.replace('#', '')})`}
      />

      {/* Optional Midpoint Label */}
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 10}
          fill={color}
          fontSize="11"
          fontWeight="800"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', sans-serif"
        >
          {label}
        </text>
      )}
    </svg>
  );
};
