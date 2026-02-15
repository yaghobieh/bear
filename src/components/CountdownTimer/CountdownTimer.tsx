import { FC, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { cn } from '@utils';
import type { CountdownTimerProps, CountdownTime } from './CountdownTimer.types';
import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  DEFAULT_LABELS,
  DEFAULT_SEPARATOR,
  PAD_LENGTH,
  SIZE_DIGIT_CLASSES,
  SIZE_LABEL_CLASSES,
  SIZE_GAP_CLASSES,
  SEPARATOR_MARGIN,
  UPDATE_INTERVAL,
} from './CountdownTimer.const';

const pad = (n: number): string => String(n).padStart(PAD_LENGTH, '0');

const calcRemaining = (target: number, now: number): CountdownTime => {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / MS_PER_DAY),
    hours: Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND),
    totalSeconds: Math.floor(diff / MS_PER_SECOND),
    isComplete: diff <= 0,
  };
};

/**
 * CountdownTimer - Visual countdown with days/hours/minutes/seconds.
 * Multiple variants, sizes, and theming via BearProvider CSS variables.
 */
export const CountdownTimer: FC<CountdownTimerProps> = (props) => {
  const {
    targetDate,
    duration,
    variant = 'default',
    size = 'md',
    showDays = true,
    showHours = true,
    showMinutes = true,
    showSeconds = true,
    showLabels = true,
    showSeparator = true,
    separator = DEFAULT_SEPARATOR,
    labels: labelsProp,
    onComplete,
    onTick,
    paused = false,
    render,
    className,
    style,
    testId,
  } = props;

  const labels = useMemo(() => ({ ...DEFAULT_LABELS, ...labelsProp }), [labelsProp]);
  const completeFired = useRef(false);

  const getTarget = useCallback((): number => {
    if (targetDate) return new Date(targetDate).getTime();
    if (duration) return Date.now() + duration * MS_PER_SECOND;
    return Date.now();
  }, [targetDate, duration]);

  const [target] = useState(getTarget);
  const [time, setTime] = useState<CountdownTime>(() => calcRemaining(target, Date.now()));

  useEffect(() => {
    if (paused) return;

    const tick = () => {
      const remaining = calcRemaining(target, Date.now());
      setTime(remaining);
      onTick?.(remaining);

      if (remaining.isComplete && !completeFired.current) {
        completeFired.current = true;
        onComplete?.();
      }
    };

    tick();
    const interval = setInterval(tick, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [target, paused, onComplete, onTick]);

  if (render) return <>{render(time)}</>;

  const digitCls = SIZE_DIGIT_CLASSES[size as keyof typeof SIZE_DIGIT_CLASSES] ?? SIZE_DIGIT_CLASSES.md;
  const labelCls = SIZE_LABEL_CLASSES[size as keyof typeof SIZE_LABEL_CLASSES] ?? SIZE_LABEL_CLASSES.md;
  const gapCls = SIZE_GAP_CLASSES[size as keyof typeof SIZE_GAP_CLASSES] ?? SIZE_GAP_CLASSES.md;

  const segments: { value: string; label: string }[] = [];
  if (showDays) segments.push({ value: pad(time.days), label: labels.days });
  if (showHours) segments.push({ value: pad(time.hours), label: labels.hours });
  if (showMinutes) segments.push({ value: pad(time.minutes), label: labels.minutes });
  if (showSeconds) segments.push({ value: pad(time.seconds), label: labels.seconds });

  const isCard = variant === 'card';
  const isFlip = variant === 'flip';

  return (
    <div
      className={cn('Bear-CountdownTimer', 'bear-flex bear-items-center', gapCls, className)}
      style={style}
      data-testid={testId}
      role="timer"
      aria-label="Countdown timer"
    >
      {segments.map((seg, i) => (
        <div key={seg.label} className="Bear-CountdownTimer__segment bear-flex bear-items-center">
          {i > 0 && showSeparator && !isCard && (
            <span
              className={cn(
                'Bear-CountdownTimer__separator',
                digitCls,
                SEPARATOR_MARGIN,
                'bear-text-gray-400 dark:bear-text-gray-500',
              )}
              aria-hidden="true"
            >
              {separator}
            </span>
          )}
          <div className="Bear-CountdownTimer__unit bear-flex bear-flex-col bear-items-center">
            <div
              className={cn(
                'Bear-CountdownTimer__digit',
                digitCls,
                'bear-tabular-nums bear-tracking-wider',
                isCard && [
                  'bear-px-3 bear-py-2 bear-rounded-lg',
                  'bear-bg-gray-100 dark:bear-bg-gray-800',
                  'bear-border bear-border-gray-200 dark:bear-border-gray-700',
                ],
                isFlip && [
                  'bear-px-3 bear-py-2 bear-rounded-lg',
                  'bear-bg-gray-900 dark:bear-bg-gray-100',
                  'bear-text-white dark:bear-text-gray-900',
                  'bear-shadow-lg',
                ],
                !isCard && !isFlip && 'bear-text-[var(--bear-text-primary)]',
              )}
            >
              {seg.value}
            </div>
            {showLabels && (
              <span
                className={cn(
                  'Bear-CountdownTimer__label',
                  labelCls,
                  'bear-mt-1 bear-uppercase bear-tracking-widest',
                  'bear-text-gray-500 dark:bear-text-gray-400',
                )}
              >
                {seg.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
