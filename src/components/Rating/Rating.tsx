import { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '@utils';
import type { RatingProps } from './Rating.types';
import {
  RATING_BASE_CLASSES,
  RATING_SIZE_CLASSES,
  RATING_STAR_BASE_CLASSES,
  RATING_STAR_DISABLED_CLASSES,
  RATING_STAR_READONLY_CLASSES,
  RATING_DEFAULT_COLOR,
  RATING_DEFAULT_EMPTY_COLOR,
  RATING_DEFAULT_MAX,
  RATING_DEFAULT_LABELS,
} from './Rating.const';

// Star icon component
const StarIcon = ({ size, filled, half, color, emptyColor }: {
  size: number;
  filled: boolean;
  half?: boolean;
  color: string;
  emptyColor: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {half ? (
      <>
        <defs>
          <linearGradient id={`half-${size}`}>
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor={emptyColor} />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={`url(#half-${size})`}
          stroke={color}
          strokeWidth="1"
        />
      </>
    ) : (
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? color : emptyColor}
        stroke={filled ? color : emptyColor}
        strokeWidth="1"
      />
    )}
  </svg>
);

/**
 * Rating - Star rating component
 * 
 * @example
 * ```tsx
 * const [rating, setRating] = useState(3);
 * 
 * <Rating value={rating} onChange={setRating} />
 * <Rating value={3.5} allowHalf readOnly />
 * ```
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      max = RATING_DEFAULT_MAX,
      size = 'md',
      onChange,
      allowHalf = false,
      allowClear = true,
      disabled = false,
      readOnly = false,
      filledIcon,
      emptyIcon,
      halfIcon,
      color = RATING_DEFAULT_COLOR,
      emptyColor = RATING_DEFAULT_EMPTY_COLOR,
      showValue = false,
      labelFormatter,
      labels = RATING_DEFAULT_LABELS,
      testId,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : value;

    const sizeConfig = RATING_SIZE_CLASSES[size];

    const handleClick = useCallback(
      (index: number, isHalf: boolean = false) => {
        if (disabled || readOnly) return;

        const newValue = isHalf && allowHalf ? index + 0.5 : index + 1;
        const finalValue = allowClear && newValue === value ? 0 : newValue;

        setInternalValue(finalValue);
        onChange?.(finalValue);
      },
      [disabled, readOnly, allowHalf, allowClear, value, onChange]
    );

    const handleMouseMove = useCallback(
      (index: number, event: React.MouseEvent<HTMLSpanElement>) => {
        if (disabled || readOnly) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const isLeftHalf = event.clientX - rect.left < rect.width / 2;
        
        if (allowHalf && isLeftHalf) {
          setHoverValue(index + 0.5);
        } else {
          setHoverValue(index + 1);
        }
      },
      [disabled, readOnly, allowHalf]
    );

    const handleMouseLeave = useCallback(() => {
      setHoverValue(null);
    }, []);

    const getStarState = (index: number): 'filled' | 'half' | 'empty' => {
      if (displayValue >= index + 1) return 'filled';
      if (displayValue >= index + 0.5 && allowHalf) return 'half';
      return 'empty';
    };

    const formatLabel = useMemo(() => {
      if (labelFormatter) return labelFormatter(displayValue);
      const labelIndex = Math.ceil(displayValue) - 1;
      return labels[labelIndex] || '';
    }, [displayValue, labelFormatter, labels]);

    const stars = useMemo(() => {
      return Array.from({ length: max }).map((_, index) => {
        const state = getStarState(index);
        
        const starClasses = cn(
          RATING_STAR_BASE_CLASSES,
          disabled && RATING_STAR_DISABLED_CLASSES,
          readOnly && RATING_STAR_READONLY_CLASSES,
          !disabled && !readOnly && 'hover:scale-110'
        );

        const renderIcon = () => {
          if (state === 'filled' && filledIcon) return filledIcon;
          if (state === 'half' && halfIcon) return halfIcon;
          if (state === 'empty' && emptyIcon) return emptyIcon;
          
          return (
            <StarIcon
              size={sizeConfig.icon}
              filled={state === 'filled'}
              half={state === 'half'}
              color={color}
              emptyColor={emptyColor}
            />
          );
        };

        return (
          <span
            key={index}
            className={starClasses}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const isLeftHalf = e.clientX - rect.left < rect.width / 2;
              handleClick(index, isLeftHalf);
            }}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseLeave={handleMouseLeave}
            role="radio"
            aria-checked={value >= index + 1}
            aria-label={labels[index]}
          >
            {renderIcon()}
          </span>
        );
      });
    }, [max, displayValue, disabled, readOnly, filledIcon, emptyIcon, halfIcon, sizeConfig, color, emptyColor, handleClick, handleMouseMove, handleMouseLeave, value, labels, allowHalf]);

    return (
      <div
        ref={ref}
        className={cn(RATING_BASE_CLASSES, className)}
        role="radiogroup"
        aria-label="Rating"
        data-testid={testId}
        {...props}
      >
        {stars}
        {showValue && (
          <span className={cn('Bear-Rating__value ml-2 text-gray-600 dark:text-gray-400', sizeConfig.text)}>
            {displayValue.toFixed(allowHalf ? 1 : 0)}
            {formatLabel && <span className="ml-1 text-gray-400 dark:text-gray-500">({formatLabel})</span>}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;
