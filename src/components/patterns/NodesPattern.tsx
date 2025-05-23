
import React from 'react';
import { PatternProps, getOpacity } from './types';

const NodesPattern: React.FC<PatternProps> = ({
  intensity = 'medium',
  animated = false, // Default to false to ensure it's never animated
  color = 'blue'
}) => {
  // Explicitly override any animation
  const animationStyle = {animation: 'none !important'};
  
  return (
    <div className={`absolute inset-0 ${getOpacity(intensity)}`} style={animationStyle}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div 
          key={i}
          className={`absolute rounded-full border border-arc-blue/40 ${color === 'violet' ? 'bg-plasma-violet/10' : color === 'green' ? 'bg-bio-green/10' : 'bg-arc-blue/10'}`}
          style={{
            width: `${Math.random() * 300 + 120}px`,
            height: `${Math.random() * 300 + 120}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'translate(-50%, -50%)',
            opacity: Math.random() * 0.5 + 0.15,
            animation: 'none !important'
          }}
        />
      ))}
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={`node-${i}`}
          className={`absolute rounded-full ${color === 'violet' ? 'bg-plasma-violet/40' : color === 'green' ? 'bg-bio-green/40' : 'bg-arc-blue/40'}`}
          style={{
            width: '4px',
            height: '4px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: 'none !important'
          }}
        />
      ))}
    </div>
  );
};

export default NodesPattern;
