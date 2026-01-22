import { FC, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../utils/cn';
import type { SliderProps } from './Slider.types';
import type { BearSize, BearVariant } from '../../types';

const SIZE_STYLES: Record<BearSize, { track: string; thumb: string; height: string }> = {
  xs: { track: 'bear-h-1', thumb: 'bear-w-3 bear-h-3', height: 'bear-h-6' },
  sm: { track: 'bear-h-1.5', thumb: 'bear-w-4 bear-h-4', height: 'bear-h-8' },
  md: { track: 'bear-h-2', thumb: 'bear-w-5 bear-h-5', height: 'bear-h-10' },
  lg: { track: 'bear-h-2.5', thumb: 'bear-w-6 bear-h-6', height: 'bear-h-12' },
  xl: { track: 'bear-h-3', thumb: 'bear-w-7 bear-h-7', height: 'bear-h-14' },
};

const COLOR_STYLES: Record<BearVariant, { track: string; thumb: string }> = {
  primary: { 
    track: 'bear-bg-bear-500', 
    thumb: 'bear-bg-bear-500 bear-border-bear-600' 
  },
  secondary: { 
    track: 'bear-bg-gray-500', 
    thumb: 'bear-bg-gray-500 bear-border-gray-600' 
  },
  success: { 
    track: 'bear-bg-green-500', 
    thumb: 'bear-bg-green-500 bear-border-green-600' 
  },
  warning: { 
    track: 'bear-bg-amber-500', 
    thumb: 'bear-bg-amber-500 bear-border-amber-600' 
  },
  error: { 
    track: 'bear-bg-red-500', 
    thumb: 'bear-bg-red-500 bear-border-red-600' 
  },
  danger: { 
    track: 'bear-bg-red-500', 
    thumb: 'bear-bg-red-500 bear-border-red-600' 
  },
  info: { 
    track: 'bear-bg-blue-500', 
    thumb: 'bear-bg-blue-500 bear-border-blue-600' 
  },
  ghost: { 
    track: 'bear-bg-gray-400', 
    thumb: 'bear-bg-gray-400 bear-border-gray-500' 
  },
  outline: { 
    track: 'bear-bg-gray-600', 
    thumb: 'bear-bg-white bear-border-gray-600' 
  },
};

/**
 * Slider component for range input
 * 
 * @example
 * ```tsx
 * <Slider value={50} onChange={(val) => console.log(val)} />
 * <Slider min={0} max={100} step={10} marks />
 * <Slider color="success" showValue />
 * ```
 */
export const Slider: FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  color = 'primary',
  showValue = false,
  marks = false,
  disabled = false,
  orientation = 'horizontal',
  onChange,
  onChangeCommitted,
  valueFormatter = (v) => String(v),
  ariaLabel = 'Slider',
  className,
  testId,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const sizeStyles = SIZE_STYLES[size];
  const colorStyles = COLOR_STYLES[color];

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current || disabled) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  }, [min, max, step, disabled, onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    setShowTooltip(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  }, [isDragging, updateValue]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setShowTooltip(false);
      onChangeCommitted?.(value);
    }
  }, [isDragging, value, onChangeCommitted]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = value;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const renderMarks = () => {
    if (!marks) return null;

    const markPositions: { value: number; label?: string }[] = Array.isArray(marks)
      ? marks
      : Array.from({ length: (max - min) / step + 1 }, (_, i) => ({
          value: min + i * step,
        }));

    return (
      <div className="bear-absolute bear-inset-x-0 bear-top-1/2 bear--translate-y-1/2 bear-flex bear-justify-between">
        {markPositions.map((mark) => {
          const pos = ((mark.value - min) / (max - min)) * 100;
          return (
            <div
              key={mark.value}
              className="bear-absolute bear-flex bear-flex-col bear-items-center"
              style={{ left: `${pos}%` }}
            >
              <div className="bear-w-0.5 bear-h-2 bear-bg-gray-400 dark:bear-bg-gray-500" />
              {mark.label && (
                <span className="bear-mt-1 bear-text-xs bear-text-gray-500">
                  {mark.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'bear-relative bear-w-full bear-flex bear-items-center',
        sizeStyles.height,
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        className
      )}
      data-testid={testId}
      {...props}
    >
      <div
        ref={trackRef}
        className={cn(
          'bear-relative bear-w-full bear-rounded-full bear-bg-gray-200 dark:bear-bg-gray-700',
          sizeStyles.track,
          !disabled && 'bear-cursor-pointer'
        )}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cn('bear-absolute bear-inset-y-0 bear-left-0 bear-rounded-full', colorStyles.track)}
          style={{ width: `${percentage}%` }}
        />

        {renderMarks()}

        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(
            'bear-absolute bear-top-1/2 bear--translate-y-1/2 bear--translate-x-1/2 bear-rounded-full',
            'bear-border-2 bear-shadow-md bear-transition-transform',
            'focus:bear-outline-none focus:bear-ring-2 focus:bear-ring-bear-500 focus:bear-ring-offset-2',
            sizeStyles.thumb,
            colorStyles.thumb,
            !disabled && 'bear-cursor-grab active:bear-cursor-grabbing hover:bear-scale-110',
            isDragging && 'bear-scale-125'
          )}
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => !isDragging && setShowTooltip(false)}
        >
          {showValue && showTooltip && (
            <div className="bear-absolute bear-bottom-full bear-left-1/2 bear--translate-x-1/2 bear-mb-2 bear-px-2 bear-py-1 bear-bg-gray-900 bear-text-white bear-text-xs bear-rounded bear-whitespace-nowrap">
              {valueFormatter(value)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;

