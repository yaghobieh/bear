import { useRef, useState, useCallback } from 'react';

interface SpotlightPosition {
  x: number;
  y: number;
}

const OFFSCREEN = -1000;

interface UseSpotlightOptions {
  enabled: boolean;
  onMouseMove?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

export function useSpotlight({ enabled, onMouseMove, onMouseEnter, onMouseLeave }: UseSpotlightOptions) {
  const spotlightRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState<SpotlightPosition>({ x: OFFSCREEN, y: OFFSCREEN });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (enabled && spotlightRef.current) {
      const rect = spotlightRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    onMouseMove?.(e);
  }, [enabled, onMouseMove]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (enabled) {
      setIsHovered(true);
      if (spotlightRef.current) {
        const rect = spotlightRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    }
    onMouseEnter?.(e);
  }, [enabled, onMouseEnter]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setPosition({ x: OFFSCREEN, y: OFFSCREEN });
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  return {
    spotlightRef,
    position,
    isHovered,
    handlers: { handleMouseMove, handleMouseEnter, handleMouseLeave },
  };
}
