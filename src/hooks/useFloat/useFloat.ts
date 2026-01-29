import { useRef, useState, useEffect, useCallback, CSSProperties } from 'react';
import { UseFloatOptions, UseFloatReturn } from './useFloat.types';

export function useFloat<T extends HTMLElement = HTMLDivElement>(
  options: UseFloatOptions = {}
): UseFloatReturn<T> {
  const {
    distance = 10,
    duration = 3000,
    delay = 0,
    direction = 'vertical',
    autoStart = true,
  } = options;

  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (autoStart) {
      const timeout = setTimeout(start, delay);
      return () => clearTimeout(timeout);
    }
  }, [autoStart, delay, start]);

  const getAnimationName = () => {
    switch (direction) {
      case 'horizontal':
        return 'float-horizontal';
      case 'diagonal':
        return 'float-diagonal';
      default:
        return 'float-vertical';
    }
  };

  const style: CSSProperties = isActive
    ? {
        animation: `${getAnimationName()} ${duration}ms ease-in-out infinite`,
        ['--float-distance' as string]: `${distance}px`,
      }
    : {};

  return { ref, style, isActive, start, stop };
}

