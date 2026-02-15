import { FC, useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import type { MarqueeProps } from './Marquee.types';
import { DEFAULT_SPEED, DEFAULT_GRADIENT_WIDTH, DEFAULT_GAP, MARQUEE_ANIMATION } from './Marquee.const';

/**
 * Marquee - Infinite scrolling content with smooth animation.
 * Supports pause-on-hover, gradient edges, and theming via BearProvider.
 */
export const Marquee: FC<MarqueeProps> = (props) => {
  const {
    children,
    direction = 'left',
    speed = DEFAULT_SPEED,
    pauseOnHover = false,
    pauseOnClick = false,
    play = true,
    gradient = false,
    gradientWidth = DEFAULT_GRADIENT_WIDTH,
    gap = DEFAULT_GAP,
    className,
    style,
    testId,
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(!play);

  useEffect(() => {
    setIsPaused(!play);
  }, [play]);

  const measureContent = useCallback(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measureContent();
    const observer = new ResizeObserver(measureContent);
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [measureContent]);

  const isHorizontal = direction === 'left' || direction === 'right';
  const distance = isHorizontal ? contentWidth : contentHeight;
  const duration = distance / speed;
  const animationName = MARQUEE_ANIMATION[direction];

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && play) setIsPaused(false);
  }, [pauseOnHover, play]);

  const handleClick = useCallback(() => {
    if (pauseOnClick) setIsPaused((p) => !p);
  }, [pauseOnClick]);

  return (
    <div
      className={cn(
        'Bear-Marquee',
        'bear-overflow-hidden bear-relative',
        gradient && isHorizontal && 'Bear-Marquee--gradient-h',
        gradient && !isHorizontal && 'Bear-Marquee--gradient-v',
        className,
      )}
      style={{
        '--bear-marquee-gradient-w': `${gradientWidth}px`,
        ...style,
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-testid={testId}
      role="marquee"
      aria-live="off"
    >
      <div
        className={cn(
          'Bear-Marquee__track',
          'bear-flex bear-w-max',
          !isHorizontal && 'bear-flex-col',
        )}
        style={{
          gap,
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        <div
          ref={contentRef}
          className={cn(
            'Bear-Marquee__content',
            'bear-flex bear-shrink-0',
            !isHorizontal && 'bear-flex-col',
          )}
          style={{ gap }}
        >
          {children}
        </div>
        <div
          className={cn(
            'Bear-Marquee__content',
            'bear-flex bear-shrink-0',
            !isHorizontal && 'bear-flex-col',
          )}
          style={{ gap }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
