import { useState, useEffect, useCallback, RefObject } from 'react';
import type { UseResizeObserverOptions, UseResizeObserverReturn } from './useResizeObserver.types';

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseResizeObserverOptions = {}
): UseResizeObserverReturn {
  const { enabled = true } = options;
  const [contentRect, setContentRect] = useState<DOMRectReadOnly | null>(null);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (entry) setContentRect(entry.contentRect);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(handleResize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, enabled, handleResize]);

  return {
    width: contentRect?.width ?? 0,
    height: contentRect?.height ?? 0,
    contentRect,
  };
}
