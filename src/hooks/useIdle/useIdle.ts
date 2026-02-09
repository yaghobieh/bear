import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseIdleOptions, UseIdleReturn } from './useIdle.types';

const DEFAULT_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
];

const DEFAULT_TIMEOUT = 60000; // 1 minute

/**
 * useIdle - Detect user inactivity
 * 
 * @example
 * ```tsx
 * const { isIdle, remaining, reset } = useIdle({
 *   timeout: 30000, // 30 seconds
 *   onIdle: () => console.log('User is idle'),
 *   onActive: () => console.log('User is active'),
 * });
 * 
 * return (
 *   <div>
 *     {isIdle ? 'User is idle' : `Active (${remaining}ms until idle)`}
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * );
 * ```
 */
export function useIdle(options: UseIdleOptions = {}): UseIdleReturn {
  const {
    timeout = DEFAULT_TIMEOUT,
    events = DEFAULT_EVENTS,
    initialState = false,
    onIdle,
    onActive,
  } = options;

  const [isIdle, setIsIdle] = useState(initialState);
  const [lastActive, setLastActive] = useState(Date.now());
  const [remaining, setRemaining] = useState(timeout);
  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);

  // Keep callback refs updated
  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  }, [onIdle, onActive]);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (isPaused) return;
    
    clearTimers();
    const startTime = Date.now();
    setRemaining(timeout);

    // Update remaining time every second
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setRemaining(Math.max(0, timeout - elapsed));
    }, 1000);

    // Set idle after timeout
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      onIdleRef.current?.();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, timeout);
  }, [timeout, isPaused, clearTimers]);

  const handleActivity = useCallback(() => {
    if (isPaused) return;
    
    const wasIdle = isIdle;
    setIsIdle(false);
    setLastActive(Date.now());
    startTimer();

    if (wasIdle) {
      onActiveRef.current?.();
    }
  }, [isPaused, isIdle, startTimer]);

  const reset = useCallback(() => {
    setIsIdle(false);
    setLastActive(Date.now());
    startTimer();
  }, [startTimer]);

  const pause = useCallback(() => {
    setIsPaused(true);
    clearTimers();
  }, [clearTimers]);

  const resume = useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  // Set up event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Start initial timer
    startTimer();

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      clearTimers();
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [events, handleActivity, startTimer, clearTimers]);

  return {
    isIdle,
    remaining,
    lastActive,
    reset,
    pause,
    resume,
  };
}

export default useIdle;
