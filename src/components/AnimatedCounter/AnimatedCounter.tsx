import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { AnimatedCounterProps } from './AnimatedCounter.types';
import { DEFAULT_DURATION, DEFAULT_DECIMALS, DEFAULT_SEPARATOR, DEFAULT_EASING } from './AnimatedCounter.const';
import { EASING_FUNCTIONS, formatNumber } from './AnimatedCounter.utils';

export const AnimatedCounter: FC<AnimatedCounterProps> = ({
  value,
  from = 0,
  duration = DEFAULT_DURATION,
  decimals = DEFAULT_DECIMALS,
  prefix = '',
  suffix = '',
  separator = DEFAULT_SEPARATOR,
  easing = DEFAULT_EASING,
  animateOnView = true,
  typographyProps,
  testId,
  className,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState(from);
  const [hasStarted, setHasStarted] = useState(!animateOnView);
  const ref = useRef<HTMLSpanElement>(null);
  const easeFn = EASING_FUNCTIONS[easing];

  const animate = useCallback(() => {
    const start = performance.now();
    const diff = value - from;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(from + diff * easeFn(progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, from, duration, easeFn]);

  useEffect(() => {
    if (!animateOnView) {
      animate();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          animate();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOnView, animate, hasStarted]);

  const formatted = `${prefix}${formatNumber(displayValue, decimals, separator)}${suffix}`;

  return (
    <Typography
      variant="h3"
      component="span"
      {...typographyProps}
      className={cn('Bear-AnimatedCounter bear-tabular-nums', typographyProps?.className, className)}
      data-testid={testId}
    >
      <span ref={ref} {...rest}>{formatted}</span>
    </Typography>
  );
};
