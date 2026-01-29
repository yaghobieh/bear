import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseDebounceOptions } from './useDebounce.types';

const DEFAULT_DELAY = 300;

/**
 * useDebounce - Debounce a value
 * 
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 * 
 * useEffect(() => {
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = DEFAULT_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback - Debounce a callback function
 * 
 * @example
 * ```tsx
 * const debouncedSave = useDebouncedCallback((value) => {
 *   saveToServer(value);
 * }, 500);
 * ```
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = DEFAULT_DELAY,
  options: UseDebounceOptions = {}
): { callback: (...args: Parameters<T>) => void; cancel: () => void; flush: () => void; isPending: () => boolean } {
  const { leading = false, trailing = true, maxWait } = options;

  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<unknown[] | null>(null);
  const lastCallTimeRef = useRef<number | null>(null);

  // Update callback ref on each render
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
    lastArgsRef.current = null;
    lastCallTimeRef.current = null;
  }, []);

  const flush = useCallback(() => {
    if (lastArgsRef.current) {
      callbackRef.current(...lastArgsRef.current);
      cancel();
    }
  }, [cancel]);

  const isPending = useCallback(() => {
    return timeoutRef.current !== null;
  }, []);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    lastArgsRef.current = args;
    const now = Date.now();

    // Leading edge
    if (leading && !timeoutRef.current) {
      callbackRef.current(...args);
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set trailing edge timeout
    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        if (lastArgsRef.current && trailing) {
          callbackRef.current(...lastArgsRef.current);
        }
        cancel();
      }, delay);
    }

    // Max wait handling
    if (maxWait !== undefined && !maxTimeoutRef.current) {
      lastCallTimeRef.current = now;
      maxTimeoutRef.current = setTimeout(() => {
        if (lastArgsRef.current) {
          callbackRef.current(...lastArgsRef.current);
        }
        cancel();
      }, maxWait);
    }
  }, [delay, leading, trailing, maxWait, cancel]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { callback: debouncedCallback, cancel, flush, isPending };
}

export default useDebounce;

