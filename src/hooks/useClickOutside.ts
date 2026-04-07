import { useEffect, useRef, useCallback, RefObject } from 'react';

export type UseClickOutsideMultipleOptions = {
  enabled?: boolean;
};

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const useClickOutsideMultiple = <T extends HTMLElement>(
  refs: RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  options: UseClickOutsideMultipleOptions = {}
): void => {
  const { enabled = true } = options;
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const onOutside = useCallback((event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    if (refs.some((r) => r.current?.contains(target))) return;
    handlerRef.current(event);
  }, [refs]);

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, [enabled, onOutside]);
};

