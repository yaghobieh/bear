import { useRef, useState, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { UseSpotlightOptions, UseSpotlightReturn } from './useSpotlight.types';

/**
 * Hook for mouse-follow spotlight/hover effect
 * 
 * @example
 * ```tsx
 * const { ref, spotlightStyle, handlers } = useSpotlight({
 *   size: 100,
 *   color: 'rgba(255, 255, 255, 0.15)'
 * });
 * 
 * return (
 *   <button
 *     ref={ref}
 *     {...handlers}
 *     style={{ position: 'relative', overflow: 'hidden' }}
 *   >
 *     <span style={spotlightStyle} />
 *     Click me
 *   </button>
 * );
 * ```
 */
export const useSpotlight = (options: UseSpotlightOptions = {}): UseSpotlightReturn => {
  const {
    size = 120,
    color = 'rgba(255, 255, 255, 0.15)',
    enabled = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [enabled]);

  const onMouseEnter = useCallback(() => {
    if (enabled) setIsHovered(true);
  }, [enabled]);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const spotlightStyle = useMemo((): CSSProperties => {
    if (!enabled || !isHovered) {
      return {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.2s ease',
      };
    }

    return {
      position: 'absolute',
      pointerEvents: 'none',
      left: position.x - size / 2,
      top: position.y - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: 1,
      transition: 'opacity 0.2s ease',
      zIndex: 0,
    };
  }, [enabled, isHovered, position.x, position.y, size, color]);

  const handlers = useMemo(() => ({
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  }), [onMouseMove, onMouseEnter, onMouseLeave]);

  return {
    ref,
    spotlightStyle,
    isHovered,
    handlers,
  };
};
