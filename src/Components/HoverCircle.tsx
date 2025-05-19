import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

interface HoverCircleProps {
  isVisible: boolean;
  position: { x: number; y: number };
}

const HoverCircle: React.FC<HoverCircleProps> = ({ isVisible, position }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const circleStyle: CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: isMobile ? '60px' : '80px',
    height: isMobile ? '60px' : '80px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 10,
    opacity: isVisible ? 1 : 0,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(4px) hue-rotate(90deg) saturate(1.5)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    mixBlendMode: 'overlay',
    transition: 'opacity 0.3s ease, transform 0.15s ease-out, backdropFilter 0.8s ease',
  };

  return <div style={circleStyle} className="hover-circle" />;
};

export default HoverCircle;