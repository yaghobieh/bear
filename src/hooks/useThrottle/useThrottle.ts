import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseThrottleOptions } from './useThrottle.types';

const DEFAULT_DELAY = 300;

/**
 * useThrottle - Throttle a value
 * 
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0);
 * const throttledScrollY = useThrottle(scrollY, 100);
 * ```
 */
export function useThrottle<T>(value: T, delay: number = DEFAULT_DELAY): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, delay - timeSinceLastExecution);

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  return throttledValue;
}

/**
 * useThrottledCallback - Throttle a callback function
 * 
 * @example
 * ```tsx
 * const throttledScroll = useThrottledCallback((e) => {
 *   handleScroll(e);
 * }, 100);
 * ```
 */
export function useThrottledCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number = DEFAULT_DELAY,
  options: UseThrottleOptions = {}
): { callback: (...args: Parameters<T>) => void; cancel: () => void } {
  const { leading = true, trailing = true } = options;

  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const lastCallTimeRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    lastArgsRef.current = null;
    lastCallTimeRef.current = null;
  }, []);

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    lastArgsRef.current = args;

    const invoke = () => {
      lastCallTimeRef.current = Date.now();
      callbackRef.current(...(lastArgsRef.current as Parameters<T>));
    };

    // First call (leading edge)
    if (lastCallTimeRef.current === null) {
      if (leading) {
        invoke();
      } else {
        lastCallTimeRef.current = now;
      }
      return;
    }

    const timeSinceLastCall = now - lastCallTimeRef.current;

    if (timeSinceLastCall >= delay) {
      // Enough time has passed, invoke immediately
      invoke();
    } else if (trailing) {
      // Schedule trailing edge call
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        invoke();
      }, delay - timeSinceLastCall);
    }
  }, [delay, leading, trailing]);

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return { callback: throttledCallback, cancel };
}

export default useThrottle;

