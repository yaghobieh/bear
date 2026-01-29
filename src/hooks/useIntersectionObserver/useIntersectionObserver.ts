import { useState, useEffect, useRef, RefObject } from 'react';
import type { UseIntersectionObserverOptions, UseIntersectionObserverReturn } from './useIntersectionObserver.types';

/**
 * useIntersectionObserver - Detect when an element enters/leaves the viewport
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { isIntersecting, intersectionRatio } = useIntersectionObserver(ref, {
 *   threshold: 0.5,
 * });
 * 
 * return (
 *   <div ref={ref} style={{ opacity: isIntersecting ? 1 : 0.5 }}>
 *     {isIntersecting ? 'Visible!' : 'Not visible'}
 *   </div>
 * );
 * ```
 */
export const useIntersectionObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    enabled = true,
    onChange,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    if (!enabled || !ref.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (frozen.current && freezeOnceVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
        onChange?.(observerEntry);

        if (freezeOnceVisible && observerEntry.isIntersecting) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, enabled, onChange]);

  return {
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
    intersectionRatio: entry?.intersectionRatio ?? 0,
  };
};

/**
 * useInView - Simple boolean for whether element is in view
 */
export const useInView = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: Omit<UseIntersectionObserverOptions, 'onChange'> = {}
): boolean => {
  const { isIntersecting } = useIntersectionObserver(ref, options);
  return isIntersecting;
};

export default useIntersectionObserver;

