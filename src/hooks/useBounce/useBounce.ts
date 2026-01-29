import { useRef, useState, useEffect, useCallback, CSSProperties } from 'react';
import { UseBounceOptions, UseBounceReturn } from './useBounce.types';

export function useBounce<T extends HTMLElement = HTMLDivElement>(
  options: UseBounceOptions = {}
): UseBounceReturn<T> {
  const {
    height = 20,
    duration = 600,
    count = 0,
    delay = 0,
    autoStart = true,
  } = options;

  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  void currentCount; // Used in interval effect

  const start = useCallback(() => {
    setCurrentCount(0);
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const toggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (autoStart) {
      const timeout = setTimeout(start, delay);
      return () => clearTimeout(timeout);
    }
  }, [autoStart, delay, start]);

  useEffect(() => {
    if (!isActive || count === 0) return;

    const interval = setInterval(() => {
      setCurrentCount((prev) => {
        if (prev + 1 >= count) {
          stop();
          return prev;
        }
        return prev + 1;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [isActive, count, duration, stop]);

  const style: CSSProperties = isActive
    ? {
        animation: `bounce-custom ${duration}ms ease-in-out infinite`,
        ['--bounce-height' as string]: `-${height}px`,
      }
    : {};

  return { ref, style, isActive, start, stop, toggle };
}

