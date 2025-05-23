
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type BorderGlowType = 'blue' | 'purple' | 'green' | 'red' | 'multi' | 'none';
type GlowIntensity = 'low' | 'medium' | 'high';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  borderGlow?: BorderGlowType;
  intensity?: GlowIntensity;
  hover?: boolean;
  withCorners?: boolean;
  animated?: boolean;
  magneticEffect?: boolean;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  borderGlow = 'blue',
  intensity = 'medium',
  hover = false,
  withCorners = false,
  animated = false,
  magneticEffect = false,
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse interaction for magnetic effect
  useEffect(() => {
    if (!magneticEffect) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };
    
    const elements = document.querySelectorAll('.magnetic-panel');
    
    elements.forEach(element => {
      element.addEventListener('mousemove', handleMouseMove as EventListener);
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    });
    
    return () => {
      elements.forEach(element => {
        element.removeEventListener('mousemove', handleMouseMove as EventListener);
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, [magneticEffect]);
  
  // Color mapping for consistent styling - enhanced for warmer tones
  const colorMap = {
    blue: {
      border: 'border-logo-blue/40',
      shadow: 'rgba(30, 174, 219, ',
      hover: 'hover:shadow-[0_0_20px_rgba(30,174,219,0.3)] hover:border-logo-blue/60',
      cornerColor: 'border-logo-blue/40',
    },
    purple: {
      border: 'border-plasma-violet/40',
      shadow: 'rgba(161, 98, 255, ',
      hover: 'hover:shadow-[0_0_20px_rgba(161,98,255,0.3)] hover:border-plasma-violet/60',
      cornerColor: 'border-plasma-violet/40',
    },
    green: {
      border: 'border-bio-green/40',
      shadow: 'rgba(142, 228, 175, ',
      hover: 'hover:shadow-[0_0_20px_rgba(142,228,175,0.3)] hover:border-bio-green/60',
      cornerColor: 'border-bio-green/40',
    },
    red: {
      border: 'border-warm-rose/40',
      shadow: 'rgba(255, 51, 102, ',
      hover: 'hover:shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:border-quantum-red/60',
      cornerColor: 'border-warm-rose/40',
    },
    multi: {
      border: 'border-transparent bg-gradient-to-r from-warm-rose/30 via-plasma-violet/30 to-bio-green/30',
      shadow: 'rgba(255, 51, 102, ',
      hover: 'hover:shadow-[0_0_20px_rgba(255,51,102,0.3)]',
      cornerColor: 'border-warm-rose/40',
    },
    none: {
      border: 'border-graphite-700/20',
      shadow: 'rgba(0, 0, 0, ',
      hover: 'hover:shadow-[0_0_10px_rgba(39,44,51,0.3)] hover:border-graphite-700/40',
      cornerColor: 'border-graphite-700/30',
    },
  };

  // Intensity mapping for shadow strength - enhanced for more drama
  const intensityMap = {
    low: '0.15)',
    medium: '0.25)',
    high: '0.35)',
  };

  // Get styles based on color and intensity
  const borderColor = colorMap[borderGlow].border;
  const shadowColor = colorMap[borderGlow].shadow + intensityMap[intensity];
  const hoverEffect = hover ? `transition-all duration-500 ${colorMap[borderGlow].hover}` : '';
  const cornerColor = colorMap[borderGlow].cornerColor;
  
  // Magnetic effect styling
  const magneticStyle = magneticEffect && isHovering ? {
    '--x': `${mousePosition.x}%`,
    '--y': `${mousePosition.y}%`
  } as React.CSSProperties : {};
  
  return (
    <div 
      className={cn(
        "relative bg-dark-surface/60 backdrop-blur-md p-5 rounded-lg border",
        borderColor,
        `shadow-[0_0_15px_${shadowColor}]`,
        hoverEffect,
        animated && 'animate-pulse-subtle',
        magneticEffect && 'magnetic-panel',
        className
      )}
      style={magneticStyle}
    >
      {/* Enhanced gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-gunmetal-900/30 via-transparent to-dark-surface/20 rounded-lg pointer-events-none"></div>
      
      {/* Corner brackets for futuristic effect - enhanced */}
      {withCorners && (
        <>
          <div className={`absolute top-0 left-0 w-5 h-5 border-t border-l ${cornerColor} rounded-tl-sm`}></div>
          <div className={`absolute top-0 right-0 w-5 h-5 border-t border-r ${cornerColor} rounded-tr-sm`}></div>
          <div className={`absolute bottom-0 left-0 w-5 h-5 border-b border-l ${cornerColor} rounded-bl-sm`}></div>
          <div className={`absolute bottom-0 right-0 w-5 h-5 border-b border-r ${cornerColor} rounded-br-sm`}></div>
        </>
      )}
      
      {/* Inner glow effect - enhanced with magnetic response */}
      {magneticEffect && (
        <div 
          className="absolute inset-0 bg-gradient-radial from-warm-rose/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${colorMap[borderGlow].shadow}${intensityMap[intensity]} 0%, transparent 70%)`
          }}
        ></div>
      )}
      
      {/* Content with z-index to appear above the background */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassPanel;
