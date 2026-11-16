import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface TerminalTypingProps {
  command: string;
  outputs?: string[];
  startFrame?: number;
  charsPerFrame?: number;
  width?: number | string;
}

export const TerminalTyping: React.FC<TerminalTypingProps> = ({
  command,
  outputs = [],
  startFrame = 10,
  charsPerFrame = 1.2,
  width = '100%',
}) => {
  const frame = useCurrentFrame();

  const elapsed = Math.max(0, frame - startFrame);
  const charsCount = Math.floor(elapsed * charsPerFrame);
  const displayedCommand = command.slice(0, charsCount);
  const typingFinished = charsCount >= command.length;

  // Blinking cursor
  const showCursor = Math.floor(frame / 8) % 2 === 0;

  // Outputs staggered after typing finishes
  const outputStartFrame = startFrame + Math.ceil(command.length / charsPerFrame) + 8;
  const visibleOutputs = outputs.filter((_, idx) => {
    return frame >= outputStartFrame + idx * 12;
  });

  return (
    <div
      style={{
        width,
        background: '#090D16',
        borderRadius: 16,
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        boxShadow:
          '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(59, 130, 246, 0.15)',
        overflow: 'hidden',
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Terminal Titlebar with macOS style dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            backgroundColor: '#EF4444',
          }}
        />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
          }}
        />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            backgroundColor: '#10B981',
          }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 12,
            color: '#94A3B8',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
          }}
        >
          terminal — claude-code@vibe-agent
        </span>
      </div>

      {/* Terminal Body */}
      <div
        style={{
          padding: '14px 18px',
          fontSize: 15,
          lineHeight: 1.6,
          color: '#E2E8F0',
        }}
      >
        {/* Command Line Prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#00F0FF', fontWeight: 'bold' }}>➜</span>
          <span style={{ color: '#A855F7' }}>~/project</span>
          <span style={{ color: '#F1F5F9' }}>{displayedCommand}</span>
          {!typingFinished && showCursor && (
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 16,
                backgroundColor: '#00F0FF',
                marginLeft: 2,
              }}
            />
          )}
        </div>

        {/* Output lines */}
        {visibleOutputs.map((line, idx) => (
          <div
            key={idx}
            style={{
              marginTop: 6,
              color: line.startsWith('✓') || line.startsWith('⚡')
                ? '#10B981'
                : line.startsWith('>')
                ? '#38BDF8'
                : '#94A3B8',
              fontSize: 14,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
