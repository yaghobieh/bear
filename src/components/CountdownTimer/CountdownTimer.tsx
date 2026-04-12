import { FC, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { CountdownTimerProps, CountdownTime } from './CountdownTimer.types';
import {
  MS_PER_SECOND,
  DEFAULT_LABELS,
  DEFAULT_SEPARATOR,
  SIZE_DIGIT_CLASSES,
  SIZE_LABEL_CLASSES,
  SIZE_GAP_CLASSES,
  SEPARATOR_MARGIN,
  UPDATE_INTERVAL,
  NARROW_DIGIT_BREAKPOINT_CLASSES,
  NARROW_LABEL_BREAKPOINT_CLASSES,
} from './CountdownTimer.const';
import { pad, calcRemaining } from './CountdownTimer.utils';

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
    digitTypographyProps,
    labelTypographyProps,
    separatorTypographyProps,
    narrowLayout = true,
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

  const sizeKey = size as keyof typeof SIZE_DIGIT_CLASSES;
  const digitCls = SIZE_DIGIT_CLASSES[sizeKey] ?? SIZE_DIGIT_CLASSES.md;
  const labelCls = SIZE_LABEL_CLASSES[sizeKey] ?? SIZE_LABEL_CLASSES.md;
  const gapCls = SIZE_GAP_CLASSES[sizeKey] ?? SIZE_GAP_CLASSES.md;
  const narrowDigitCls = narrowLayout ? NARROW_DIGIT_BREAKPOINT_CLASSES[sizeKey] ?? NARROW_DIGIT_BREAKPOINT_CLASSES.md : '';
  const narrowLabelCls = narrowLayout ? NARROW_LABEL_BREAKPOINT_CLASSES[sizeKey] ?? NARROW_LABEL_BREAKPOINT_CLASSES.md : '';

  const segments: { value: string; label: string }[] = [];
  if (showDays) segments.push({ value: pad(time.days), label: labels.days });
  if (showHours) segments.push({ value: pad(time.hours), label: labels.hours });
  if (showMinutes) segments.push({ value: pad(time.minutes), label: labels.minutes });
  if (showSeconds) segments.push({ value: pad(time.seconds), label: labels.seconds });

  const isCard = variant === 'card';
  const isFlip = variant === 'flip';
  const isDigital = variant === 'digital';

  const { className: digitTyClass, variant: digitVariant, ...digitTyRest } = digitTypographyProps ?? {};
  const { className: labelTyClass, variant: labelVariant, ...labelTyRest } = labelTypographyProps ?? {};
  const { className: separatorTyClass, ...separatorTyRest } = separatorTypographyProps ?? {};

  return (
    <div
      className={cn(
        'Bear-CountdownTimer',
        'bear-flex bear-max-w-full bear-min-w-0 bear-flex-wrap bear-items-center bear-justify-center',
        gapCls,
        className
      )}
      style={style}
      data-testid={testId}
      role="timer"
      aria-label="Countdown timer"
    >
      {segments.map((seg, i) => (
        <div key={seg.label} className="Bear-CountdownTimer__segment bear-flex bear-min-w-0 bear-items-center bear-justify-center">
          {i > 0 && showSeparator && !isCard && (
            <span
              className={cn(
                'Bear-CountdownTimer__separator',
                digitCls,
                narrowDigitCls,
                SEPARATOR_MARGIN,
                'bear-text-gray-400 dark:bear-text-gray-500',
                separatorTyClass
              )}
              aria-hidden="true"
              {...separatorTyRest}
            >
              {separator}
            </span>
          )}
          <div className="Bear-CountdownTimer__unit bear-flex bear-min-w-0 bear-flex-col bear-items-center">
            <Typography
              component="div"
              variant={digitVariant ?? 'body2'}
              align="center"
              className={cn(
                'Bear-CountdownTimer__digit',
                digitCls,
                narrowDigitCls,
                'bear-tabular-nums bear-tracking-wider',
                isCard && [
                  'bear-px-3 bear-py-2 max-[480px]:bear-px-2 max-[480px]:bear-py-1.5 bear-rounded-lg',
                  'bear-bg-gray-100 dark:bear-bg-gray-800',
                  'bear-border bear-border-gray-200 dark:bear-border-gray-700',
                ],
                isFlip && [
                  'bear-px-3 bear-py-2 max-[480px]:bear-px-2 max-[480px]:bear-py-1.5 bear-rounded-lg',
                  'bear-bg-gray-900 dark:bear-bg-gray-100',
                  'bear-text-white dark:bear-text-gray-900',
                  'bear-shadow-lg',
                ],
                isDigital && [
                  'bear-rounded-md bear-px-2 bear-py-1',
                  'bear-bg-black bear-text-emerald-400 dark:bear-bg-zinc-900 dark:bear-text-emerald-300',
                  'bear-font-mono',
                ],
                !isCard && !isFlip && 'bear-text-[var(--bear-text-primary)]',
                digitTyClass
              )}
              {...digitTyRest}
            >
              {seg.value}
            </Typography>
            {showLabels && (
              <Typography
                component="span"
                variant={labelVariant ?? 'caption'}
                align="center"
                className={cn(
                  'Bear-CountdownTimer__label',
                  labelCls,
                  narrowLabelCls,
                  'bear-mt-1 bear-uppercase bear-tracking-widest',
                  'bear-text-gray-500 dark:bear-text-gray-400',
                  labelTyClass
                )}
                {...labelTyRest}
              >
                {seg.label}
              </Typography>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
