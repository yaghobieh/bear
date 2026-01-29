import { useRef, useState, useEffect, CSSProperties } from 'react';
import { UseParallaxOptions, UseParallaxReturn } from './useParallax.types';

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
): UseParallaxReturn<T> {
  const {
    speed = 0.5,
    direction = 'vertical',
    disableOnMobile = true,
    useTransform = true,
  } = options;

  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (disableOnMobile && isMobile) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      setOffset(distanceFromCenter * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disableOnMobile, isMobile]);

  const style: CSSProperties = {
    ...(useTransform
      ? {
          transform:
            direction === 'vertical'
              ? `translate3d(0, ${offset}px, 0)`
              : `translate3d(${offset}px, 0, 0)`,
        }
      : {
          position: 'relative' as const,
          [direction === 'vertical' ? 'top' : 'left']: offset,
        }),
    willChange: 'transform',
  };

  return { ref, style, offset };
}

