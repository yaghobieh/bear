import { useCallback, useRef } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import type { UseLongPressOptions, UseLongPressReturn } from './useLongPress.types';

const DEFAULT_THRESHOLD = 400;

/**
 * useLongPress - Detect long press gestures
 * 
 * @example
 * ```tsx
 * const longPressProps = useLongPress({
 *   threshold: 500,
 *   onLongPress: () => console.log('Long pressed!'),
 *   onClick: () => console.log('Clicked!'),
 * });
 * 
 * return <button {...longPressProps}>Hold me</button>;
 * ```
 */
export function useLongPress(options: UseLongPressOptions = {}): UseLongPressReturn {
  const {
    threshold = DEFAULT_THRESHOLD,
    onLongPress,
    onClick,
    onStart,
    onFinish,
    onCancel,
    filterEvents,
    disabled = false,
  } = options;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);
  const isActiveRef = useRef(false);
  const startEventRef = useRef<MouseEvent | TouchEvent | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback((event: MouseEvent | TouchEvent) => {
    if (disabled) return;
    if (filterEvents && !filterEvents(event)) return;

    isActiveRef.current = true;
    isLongPressRef.current = false;
    startEventRef.current = event;

    onStart?.(event);

    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress?.(event);
    }, threshold);
  }, [disabled, filterEvents, onStart, onLongPress, threshold]);

  const cancel = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isActiveRef.current) return;
    
    clear();
    isActiveRef.current = false;
    onCancel?.(event);
  }, [clear, onCancel]);

  const stop = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isActiveRef.current) return;

    clear();
    isActiveRef.current = false;

    if (!isLongPressRef.current && onClick) {
      onClick(event);
    }

    onFinish?.(event);
  }, [clear, onClick, onFinish]);

  const onMouseDown = useCallback((event: MouseEvent) => {
    // Only respond to left click
    if (event.button !== 0) return;
    start(event);
  }, [start]);

  const onMouseUp = useCallback((event: MouseEvent) => {
    stop(event);
  }, [stop]);

  const onMouseLeave = useCallback((event: MouseEvent) => {
    cancel(event);
  }, [cancel]);

  const onTouchStart = useCallback((event: TouchEvent) => {
    start(event);
  }, [start]);

  const onTouchEnd = useCallback((event: TouchEvent) => {
    stop(event);
  }, [stop]);

  return {
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
  };
}

export default useLongPress;
