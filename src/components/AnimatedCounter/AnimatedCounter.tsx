import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ANIMATED_COUNTER_DECIMALS,
  ANIMATED_COUNTER_DURATION,
  BOOLEAN_TRUE,
  EASING_OUT,
  EMPTY_STRING,
  INTERSECTION_THRESHOLD_LOW,
  ONE,
  THOUSANDS_SEPARATOR,
  ZERO,
} from '@const';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { AnimatedCounterProps } from './AnimatedCounter.types';
import { EASING_FUNCTIONS, formatNumber } from './AnimatedCounter.utils';

export const AnimatedCounter = (props: AnimatedCounterProps) => {
  const {
    value,
    from = ZERO,
    duration = ANIMATED_COUNTER_DURATION,
    decimals = ANIMATED_COUNTER_DECIMALS,
    prefix = EMPTY_STRING,
    suffix = EMPTY_STRING,
    separator = THOUSANDS_SEPARATOR,
    easing = EASING_OUT,
    animateOnView = BOOLEAN_TRUE,
    typographyProps,
    testId,
    className,
    ...rest
  } = props;

  const [displayValue, setDisplayValue] = useState(from);
  const [hasStarted, setHasStarted] = useState(!animateOnView);
  const ref = useRef<HTMLSpanElement>(null);
  const easeFn = EASING_FUNCTIONS[easing];

  const animate = useCallback(() => {
    const start = performance.now();
    const diff = value - from;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, ONE);
      setDisplayValue(from + diff * easeFn(progress));
      if (progress < ONE) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [value, from, duration, easeFn]);

  useEffect(() => {
    if (!animateOnView) {
      animate();
      return;
    }
    const el = ref.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(BOOLEAN_TRUE);
          animate();
        }
      },
      { threshold: INTERSECTION_THRESHOLD_LOW }
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
