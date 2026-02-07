import { useState, useEffect, useRef } from 'react';
import type { UseLazyLoadOptions, UseLazyLoadReturn } from './useLazyLoad.types';

/**
 * useLazyLoad - Lazy load content when it enters the viewport.
 * Useful for infinite scroll, lazy images, or deferring heavy renders.
 *
 * @example
 * ```tsx
 * const { ref, hasBeenViewed } = useLazyLoad();
 *
 * return (
 *   <div ref={ref}>
 *     {hasBeenViewed ? <HeavyComponent /> : <Skeleton />}
 *   </div>
 * );
 * ```
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useLazyLoad({ once: false });
 * useEffect(() => {
 *   if (isInView) loadMore();
 * }, [isInView]);
 * return <div ref={ref}>Load more trigger</div>;
 * ```
 */
export const useLazyLoad = <T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadOptions = {}
): UseLazyLoadReturn<T> => {
  const {
    rootMargin = '100px',
    threshold = 0,
    once = true,
    enabled = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    if (!enabled || !ref.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? false;
        setIsInView(inView);
        if (inView) {
          setHasBeenViewed(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, rootMargin, threshold, once]);

  return {
    ref,
    isInView,
    hasBeenViewed,
  };
};
