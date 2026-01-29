import { useRef, useState, useEffect, useCallback, CSSProperties } from 'react';
import { UseSlideOptions, UseSlideReturn, SlideDirection } from './useSlide.types';

const getTransform = (direction: SlideDirection, distance: number, active: boolean): string => {
  if (active) return 'translate3d(0, 0, 0)';
  
  switch (direction) {
    case 'left':
      return `translate3d(${distance}px, 0, 0)`;
    case 'right':
      return `translate3d(-${distance}px, 0, 0)`;
    case 'up':
      return `translate3d(0, ${distance}px, 0)`;
    case 'down':
      return `translate3d(0, -${distance}px, 0)`;
    default:
      return 'translate3d(0, 0, 0)';
  }
};

export function useSlide<T extends HTMLElement = HTMLDivElement>(
  options: UseSlideOptions = {}
): UseSlideReturn<T> {
  const {
    direction = 'left',
    distance = 50,
    duration = 500,
    delay = 0,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    triggerOnMount = true,
    triggerOnView = false,
    threshold = 0.1,
    loop = false,
    loopInterval = 2000,
  } = options;

  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);
  const loopRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = useCallback(() => {
    setIsActive(true);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
  }, []);

  // Trigger on mount
  useEffect(() => {
    if (triggerOnMount && !triggerOnView) {
      const timeout = setTimeout(() => {
        trigger();
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [triggerOnMount, triggerOnView, delay, trigger]);

  // Trigger on view
  useEffect(() => {
    if (!triggerOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => trigger(), delay);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnView, threshold, delay, trigger]);

  // Loop animation
  useEffect(() => {
    if (!loop || !isActive) return;

    loopRef.current = setInterval(() => {
      setIsActive(false);
      setTimeout(() => setIsActive(true), 100);
    }, loopInterval);

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [loop, loopInterval, isActive]);

  const style: CSSProperties = {
    transform: getTransform(direction, distance, isActive),
    opacity: isActive ? 1 : 0,
    transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
    willChange: 'transform, opacity',
  };

  return { ref, style, isActive, trigger, reset };
}

