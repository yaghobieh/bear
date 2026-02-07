import { FC, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@utils';
import type { SliderRangeProps, SliderRangeValue } from './SliderRange.types';
import type { BearSize, BearVariant } from '../../types';

const SIZE_STYLES: Record<BearSize, { track: string; thumb: string; height: string }> = {
  xs: { track: 'bear-h-1', thumb: 'bear-w-3 bear-h-3', height: 'bear-h-6' },
  sm: { track: 'bear-h-1.5', thumb: 'bear-w-4 bear-h-4', height: 'bear-h-8' },
  md: { track: 'bear-h-2', thumb: 'bear-w-5 bear-h-5', height: 'bear-h-10' },
  lg: { track: 'bear-h-2.5', thumb: 'bear-w-6 bear-h-6', height: 'bear-h-12' },
  xl: { track: 'bear-h-3', thumb: 'bear-w-7 bear-h-7', height: 'bear-h-14' },
};

const COLOR_STYLES: Record<BearVariant, { track: string; thumb: string }> = {
  primary: { track: 'bear-bg-bear-500', thumb: 'bear-bg-bear-500 bear-border-bear-600' },
  secondary: { track: 'bear-bg-gray-500', thumb: 'bear-bg-gray-500 bear-border-gray-600' },
  success: { track: 'bear-bg-green-500', thumb: 'bear-bg-green-500 bear-border-green-600' },
  warning: { track: 'bear-bg-amber-500', thumb: 'bear-bg-amber-500 bear-border-amber-600' },
  error: { track: 'bear-bg-red-500', thumb: 'bear-bg-red-500 bear-border-red-600' },
  danger: { track: 'bear-bg-red-500', thumb: 'bear-bg-red-500 bear-border-red-600' },
  info: { track: 'bear-bg-blue-500', thumb: 'bear-bg-blue-500 bear-border-blue-600' },
  ghost: { track: 'bear-bg-gray-400', thumb: 'bear-bg-gray-400 bear-border-gray-500' },
  outline: { track: 'bear-bg-gray-600', thumb: 'bear-bg-white dark:bear-bg-gray-200 bear-border-gray-600 dark:bear-border-gray-400' },
};

const stepValue = (raw: number, min: number, max: number, step: number) => {
  const v = Math.round(raw / step) * step;
  return Math.max(min, Math.min(max, v));
};

export const SliderRange: FC<SliderRangeProps> = ({
  value: controlledValue,
  defaultValue = [20, 80],
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  color = 'primary',
  disabled = false,
  onChange,
  onChangeCommitted,
  valueFormatter = (v) => String(v),
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<SliderRangeValue>(defaultValue);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const value: SliderRangeValue = controlledValue ?? internalValue;
  const [low, high] = value;
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  const sizeStyles = SIZE_STYLES[size];
  const colorStyles = COLOR_STYLES[color];

  const updateValue = useCallback(
    (clientX: number, thumb: 'min' | 'max') => {
      if (!trackRef.current || disabled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percent * (max - min);
      const stepped = stepValue(rawValue, min, max, step);

      if (thumb === 'min') {
        const newLow = Math.min(stepped, high - step);
        const next: SliderRangeValue = [newLow, high];
        if (controlledValue === undefined) setInternalValue(next);
        onChange?.(next);
      } else {
        const newHigh = Math.max(stepped, low + step);
        const next: SliderRangeValue = [low, newHigh];
        if (controlledValue === undefined) setInternalValue(next);
        onChange?.(next);
      }
    },
    [min, max, step, low, high, disabled, controlledValue, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent, thumb: 'min' | 'max') => {
    if (disabled) return;
    e.preventDefault();
    setActiveThumb(thumb);
    updateValue(e.clientX, thumb);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (activeThumb) updateValue(e.clientX, activeThumb);
    },
    [activeThumb, updateValue]
  );

  const handleMouseUp = useCallback(() => {
    if (activeThumb) {
      setActiveThumb(null);
      onChangeCommitted?.(value);
    }
  }, [activeThumb, value, onChangeCommitted]);

  useEffect(() => {
    if (activeThumb) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [activeThumb, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={cn(
        'bear-relative bear-w-full bear-flex bear-items-center',
        sizeStyles.height,
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        className
      )}
      data-testid="slider-range"
      {...props}
    >
      <div
        ref={trackRef}
        className={cn(
          'bear-relative bear-w-full bear-rounded-full bear-bg-gray-200 dark:bear-bg-gray-700',
          sizeStyles.track,
          !disabled && 'bear-cursor-pointer'
        )}
      >
        <div
          className={cn('bear-absolute bear-inset-y-0 bear-left-0 bear-rounded-full', colorStyles.track)}
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />

        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={low}
          aria-label="Range minimum"
          className={cn(
            'bear-absolute bear-top-1/2 bear--translate-y-1/2 bear--translate-x-1/2 bear-rounded-full bear-border-2 bear-shadow-md',
            sizeStyles.thumb,
            colorStyles.thumb,
            !disabled && 'bear-cursor-grab active:bear-cursor-grabbing hover:bear-scale-110',
            activeThumb === 'min' && 'bear-scale-125 bear-z-10'
          )}
          style={{ left: `${lowPct}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        />

        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={high}
          aria-label="Range maximum"
          className={cn(
            'bear-absolute bear-top-1/2 bear--translate-y-1/2 bear--translate-x-1/2 bear-rounded-full bear-border-2 bear-shadow-md',
            sizeStyles.thumb,
            colorStyles.thumb,
            !disabled && 'bear-cursor-grab active:bear-cursor-grabbing hover:bear-scale-110',
            activeThumb === 'max' && 'bear-scale-125 bear-z-10'
          )}
          style={{ left: `${highPct}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
        />
      </div>
    </div>
  );
};
