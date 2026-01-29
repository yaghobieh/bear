import { useEffect, useCallback, RefObject, useRef } from 'react';
import type { UseClickOutsideOptions } from './useClickOutside.types';

const DEFAULT_EVENTS: UseClickOutsideOptions['events'] = ['mousedown', 'touchstart'];

/**
 * useClickOutside - Detect clicks outside an element
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * 
 * useClickOutside(ref, () => {
 *   closeDropdown();
 * });
 * 
 * return <div ref={ref}>Dropdown content</div>;
 * ```
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  options: UseClickOutsideOptions = {}
): void => {
  const {
    events = DEFAULT_EVENTS,
    ignoreSelectors = [],
    enabled = true,
  } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (!enabled) return;
    
    const target = event.target as Node;
    
    // Check if click is outside the ref element
    if (!ref.current || ref.current.contains(target)) {
      return;
    }

    // Check if click is on an ignored element
    if (ignoreSelectors.length > 0 && target instanceof Element) {
      const isIgnored = ignoreSelectors.some((selector) =>
        target.closest(selector) !== null
      );
      if (isIgnored) return;
    }

    callbackRef.current(event);
  }, [ref, enabled, ignoreSelectors]);

  useEffect(() => {
    if (!enabled) return;

    events.forEach((eventName) => {
      document.addEventListener(eventName, handleClickOutside as EventListener);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handleClickOutside as EventListener);
      });
    };
  }, [events, handleClickOutside, enabled]);
};

/**
 * useClickOutsideMultiple - Detect clicks outside multiple elements
 */
export const useClickOutsideMultiple = <T extends HTMLElement>(
  refs: RefObject<T>[],
  callback: (event: MouseEvent | TouchEvent) => void,
  options: UseClickOutsideOptions = {}
): void => {
  const {
    events = DEFAULT_EVENTS,
    ignoreSelectors = [],
    enabled = true,
  } = options;

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (!enabled) return;
    
    const target = event.target as Node;
    
    // Check if click is inside any of the ref elements
    const isInside = refs.some((ref) => ref.current?.contains(target));
    if (isInside) return;

    // Check if click is on an ignored element
    if (ignoreSelectors.length > 0 && target instanceof Element) {
      const isIgnored = ignoreSelectors.some((selector) =>
        target.closest(selector) !== null
      );
      if (isIgnored) return;
    }

    callbackRef.current(event);
  }, [refs, enabled, ignoreSelectors]);

  useEffect(() => {
    if (!enabled) return;

    events.forEach((eventName) => {
      document.addEventListener(eventName, handleClickOutside as EventListener);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handleClickOutside as EventListener);
      });
    };
  }, [events, handleClickOutside, enabled]);
};

export default useClickOutside;

