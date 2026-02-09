import { useState, useEffect, useCallback, useRef } from 'react';
import type { UsePageVisibilityOptions, UsePageVisibilityReturn } from './usePageVisibility.types';

/**
 * usePageVisibility - Detect when page/tab is visible or hidden
 * 
 * @example
 * ```tsx
 * const { isVisible, visibilityState } = usePageVisibility({
 *   onVisible: () => console.log('Tab is visible'),
 *   onHidden: () => console.log('Tab is hidden'),
 * });
 * 
 * // Pause video when tab is hidden
 * useEffect(() => {
 *   if (!isVisible) videoRef.current?.pause();
 * }, [isVisible]);
 * ```
 */
export function usePageVisibility(options: UsePageVisibilityOptions = {}): UsePageVisibilityReturn {
  const { onVisible, onHidden } = options;

  const [visibilityState, setVisibilityState] = useState<DocumentVisibilityState>(() =>
    typeof document !== 'undefined' ? document.visibilityState : 'visible'
  );

  const onVisibleRef = useRef(onVisible);
  const onHiddenRef = useRef(onHidden);

  // Keep refs updated
  useEffect(() => {
    onVisibleRef.current = onVisible;
    onHiddenRef.current = onHidden;
  }, [onVisible, onHidden]);

  const handleVisibilityChange = useCallback(() => {
    const state = document.visibilityState;
    setVisibilityState(state);

    if (state === 'visible') {
      onVisibleRef.current?.();
    } else if (state === 'hidden') {
      onHiddenRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return {
    isVisible: visibilityState === 'visible',
    visibilityState,
  };
}

export default usePageVisibility;
