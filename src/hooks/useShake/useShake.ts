import { useRef, useState, useCallback, CSSProperties } from 'react';
import { UseShakeOptions, UseShakeReturn } from './useShake.types';

export function useShake<T extends HTMLElement = HTMLDivElement>(
  options: UseShakeOptions = {}
): UseShakeReturn<T> {
  const { intensity = 10, duration = 500, count = 5 } = options;

  const ref = useRef<T>(null);
  const [isShaking, setIsShaking] = useState(false);

  const shake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), duration);
  }, [duration]);

  const style: CSSProperties = isShaking
    ? {
        animation: `shake ${duration}ms ease-in-out`,
        ['--shake-intensity' as string]: `${intensity}px`,
        ['--shake-count' as string]: count,
      }
    : {};

  return { ref, style, isShaking, shake };
}

