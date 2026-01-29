import { useEffect, useCallback, useRef } from 'react';
import type { UseKeyPressOptions, KeyFilter } from './useKeyPress.types';

const isKeyMatch = (event: KeyboardEvent, key: KeyFilter): boolean => {
  if (typeof key === 'function') {
    return key(event);
  }
  
  const keys = Array.isArray(key) ? key : [key];
  return keys.some((k) => {
    const lowerKey = k.toLowerCase();
    return (
      event.key.toLowerCase() === lowerKey ||
      event.code.toLowerCase() === lowerKey
    );
  });
};

/**
 * useKeyPress - Detect when a key is pressed
 * 
 * @example
 * ```tsx
 * // Single key
 * useKeyPress('Escape', () => closeModal());
 * 
 * // Multiple keys
 * useKeyPress(['ArrowUp', 'ArrowDown'], (e) => handleArrow(e));
 * 
 * // With modifiers
 * useKeyPress('k', () => openSearch(), { metaKey: true });
 * ```
 */
export const useKeyPress = (
  key: KeyFilter,
  callback: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {}
): void => {
  const {
    target,
    event = 'keydown',
    preventDefault = false,
    stopPropagation = false,
    metaKey = false,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
  } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Check modifier keys
    if (metaKey && !e.metaKey) return;
    if (ctrlKey && !e.ctrlKey) return;
    if (shiftKey && !e.shiftKey) return;
    if (altKey && !e.altKey) return;

    // Check if key matches
    if (!isKeyMatch(e, key)) return;

    if (preventDefault) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }

    callbackRef.current(e);
  }, [key, metaKey, ctrlKey, shiftKey, altKey, preventDefault, stopPropagation]);

  useEffect(() => {
    const targetElement = target || document;
    
    targetElement.addEventListener(event, handleKeyPress as EventListener);
    
    return () => {
      targetElement.removeEventListener(event, handleKeyPress as EventListener);
    };
  }, [target, event, handleKeyPress]);
};

/**
 * useKeyPressState - Track if a key is currently pressed
 */
export const useKeyPressState = (key: KeyFilter): boolean => {
  const pressedRef = useRef(false);

  useKeyPress(key, () => {
    pressedRef.current = true;
  }, { event: 'keydown' });

  useKeyPress(key, () => {
    pressedRef.current = false;
  }, { event: 'keyup' });

  return pressedRef.current;
};

export default useKeyPress;

