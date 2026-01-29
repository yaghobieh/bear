import { useRef, useState, useEffect, useCallback, CSSProperties } from 'react';
import { UsePulseOptions, UsePulseReturn } from './usePulse.types';

export function usePulse<T extends HTMLElement = HTMLDivElement>(
  options: UsePulseOptions = {}
): UsePulseReturn<T> {
  const {
    scale = 1.05,
    duration = 1000,
    delay = 0,
    count = 0,
    autoStart = false,
  } = options;

  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);
  const [singlePulse, setSinglePulse] = useState(false);
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

  const pulse = useCallback(() => {
    setSinglePulse(true);
    setTimeout(() => setSinglePulse(false), duration);
  }, [duration]);

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

  const style: CSSProperties = isActive || singlePulse
    ? {
        animation: `pulse-scale ${duration}ms ease-in-out ${isActive ? 'infinite' : ''}`,
        ['--pulse-scale' as string]: scale,
      }
    : {};

  return { ref, style, isActive, start, stop, toggle, pulse };
}

