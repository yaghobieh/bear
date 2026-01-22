import { FC, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { BearSize } from '../../types';
import type { RatingProps } from './Rating.types';

const SIZE_MAP: Record<BearSize, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 30,
  xl: 36,
};

const DEFAULT_COLOR = '#fbbf24'; // amber-400
const DEFAULT_EMPTY_COLOR = '#d1d5db'; // gray-300

/**
 * Rating component for displaying and capturing user ratings
 * 
 * @example
 * ```tsx
 * // Basic rating
 * <Rating value={3} onChange={(v) => setRating(v)} />
 * 
 * // Read-only rating with half stars
 * <Rating value={3.5} readOnly precision={0.5} />
 * 
 * // Custom size and color
 * <Rating value={4} size="lg" color="#ec4899" />
 * ```
 */
export const Rating: FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  size = 'md',
  readOnly = false,
  disabled = false,
  precision = 1,
  color = DEFAULT_COLOR,
  emptyColor = DEFAULT_EMPTY_COLOR,
  filledIcon,
  emptyIcon,
  halfIcon,
  highlightOnHover = true,
  showLabel = false,
  formatLabel,
  onChange,
  className,
  testId,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const displayValue = hoverValue !== null && !readOnly && !disabled ? hoverValue : currentValue;
  
  const iconSize = SIZE_MAP[size];

  const handleClick = useCallback((newValue: number) => {
    if (readOnly || disabled) return;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange, readOnly, disabled]);

  const handleMouseEnter = useCallback((index: number) => {
    if (readOnly || disabled || !highlightOnHover) return;
    setHoverValue(index);
  }, [readOnly, disabled, highlightOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (readOnly || disabled || !highlightOnHover) return;
    setHoverValue(null);
  }, [readOnly, disabled, highlightOnHover]);

  const StarIcon = useMemo(() => {
    const FilledStar: FC<{ size: number; color: string }> = ({ size: s, color: c }) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );

    const EmptyStar: FC<{ size: number; color: string }> = ({ size: s, color: c }) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );

    const HalfStar: FC<{ size: number; color: string; emptyColor: string }> = ({ size: s, color: c, emptyColor: ec }) => (
      <svg width={s} height={s} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stopColor={c} />
            <stop offset="50%" stopColor={ec} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon 
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" 
          fill="url(#halfGrad)" 
          stroke={ec} 
          strokeWidth="2"
        />
      </svg>
    );

    return { FilledStar, EmptyStar, HalfStar };
  }, []);

  const renderStar = (index: number) => {
    const fillLevel = displayValue - index;
    const isFilled = fillLevel >= 1;
    const isHalf = precision === 0.5 && fillLevel >= 0.5 && fillLevel < 1;
    const isEmpty = fillLevel < (precision === 0.5 ? 0.5 : 1);

    if (filledIcon && isFilled) {
      return filledIcon;
    }
    if (halfIcon && isHalf) {
      return halfIcon;
    }
    if (emptyIcon && isEmpty) {
      return emptyIcon;
    }

    if (isFilled) {
      return <StarIcon.FilledStar size={iconSize} color={color} />;
    }
    if (isHalf) {
      return <StarIcon.HalfStar size={iconSize} color={color} emptyColor={emptyColor} />;
    }
    return <StarIcon.EmptyStar size={iconSize} color={emptyColor} />;
  };

  const stars = useMemo(() => 
    Array.from({ length: max }, (_, i) => i + 1),
  [max]);

  const label = formatLabel 
    ? formatLabel(displayValue) 
    : `${displayValue} out of ${max}`;

  return (
    <div
      className={cn(
        'ember-inline-flex ember-items-center ember-gap-1',
        disabled && 'ember-opacity-50 ember-cursor-not-allowed',
        className
      )}
      role="radiogroup"
      aria-label="Rating"
      data-testid={testId}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {stars.map((starValue) => (
        <button
          key={starValue}
          type="button"
          role="radio"
          aria-checked={currentValue >= starValue}
          aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
          className={cn(
            'ember-p-0.5 ember-rounded ember-transition-transform ember-bg-transparent ember-border-none',
            !readOnly && !disabled && 'hover:ember-scale-110 ember-cursor-pointer',
            readOnly && 'ember-cursor-default',
            disabled && 'ember-cursor-not-allowed'
          )}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          disabled={disabled || readOnly}
        >
          {renderStar(starValue - 1)}
        </button>
      ))}
      
      {showLabel && (
        <span className="ember-ml-2 ember-text-sm ember-text-gray-600 dark:ember-text-gray-400">
          {label}
        </span>
      )}
    </div>
  );
};

export default Rating;

