import { useState } from 'react';
import { cn } from '@utils';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  FIVE,
  HALF,
  ONE,
  SIZE_MD,
  ZERO,
} from '@const';
import { useBearTheme } from '@context/BearProvider';
import type { RatingProps } from './Rating.types';
import {
  RATING_DEFAULT_LABELS,
  RATING_SIZE_ICON,
  RATING_SIZE_TEXT,
  RATING_THEME_EMPTY_SHADE,
  RATING_THEME_FILLED_SHADE,
} from './Rating.const';
import { formatRatingLabel, getStarState, isLeftHalfClick, resolveRatingIcon } from './Rating.utils';
import { StarIcon } from './components/StarIcon';

export const Rating = (props: RatingProps) => {
  const {
    value: controlledValue,
    defaultValue = ZERO,
    max = FIVE,
    size = SIZE_MD,
    onChange,
    allowHalf = BOOLEAN_FALSE,
    allowClear = BOOLEAN_TRUE,
    disabled = BOOLEAN_FALSE,
    readOnly = BOOLEAN_FALSE,
    filledIcon,
    emptyIcon,
    halfIcon,
    color: colorProp,
    emptyColor: emptyColorProp,
    showValue = BOOLEAN_FALSE,
    labelFormatter,
    labels = RATING_DEFAULT_LABELS,
    testId,
    className,
    ...rest
  } = props;

  const theme = useBearTheme();
  const color = colorProp ?? theme.colors.warning[RATING_THEME_FILLED_SHADE];
  const emptyColor = emptyColorProp ?? theme.colors.neutral[RATING_THEME_EMPTY_SHADE];

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : value;
  const iconSize = RATING_SIZE_ICON[size];
  const formattedLabel = formatRatingLabel(displayValue, labels, labelFormatter);

  const handleClick = (index: number, isHalf: boolean) => {
    if (disabled || readOnly) {
      return;
    }
    const nextValue = isHalf && allowHalf ? index + HALF : index + ONE;
    const finalValue = allowClear && nextValue === value ? ZERO : nextValue;
    setInternalValue(finalValue);
    onChange?.(finalValue);
  };

  const handleMouseMove = (index: number, event: React.MouseEvent<HTMLSpanElement>) => {
    if (disabled || readOnly) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    if (allowHalf && isLeftHalfClick(event.clientX, rect.left, rect.width)) {
      setHoverValue(index + HALF);
      return;
    }
    setHoverValue(index + ONE);
  };

  const stars = Array.from({ length: max }).map((_, index) => {
    const state = getStarState(displayValue, index, allowHalf);
    const customIcon = resolveRatingIcon(state, { filled: filledIcon, half: halfIcon, empty: emptyIcon });

    return (
      <span
        key={index}
        className={cn(
          'Bear-Rating__star cursor-pointer transition-all duration-150',
          disabled && 'cursor-not-allowed opacity-50',
          readOnly && 'cursor-default',
          !disabled && !readOnly && 'hover:scale-110'
        )}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          handleClick(index, isLeftHalfClick(event.clientX, rect.left, rect.width));
        }}
        onMouseMove={(event) => handleMouseMove(index, event)}
        onMouseLeave={() => setHoverValue(null)}
        role="radio"
        aria-checked={value >= index + ONE}
        aria-label={labels[index]}
      >
        {customIcon ?? (
          <StarIcon
            size={iconSize}
            state={state}
            color={color}
            emptyColor={emptyColor}
          />
        )}
      </span>
    );
  });

  return (
    <div
      className={cn('Bear-Rating inline-flex items-center gap-1', className)}
      role="radiogroup"
      aria-label="Rating"
      data-testid={testId}
      {...rest}
    >
      {stars}
      {showValue && (
        <span className={cn('Bear-Rating__value ml-2 text-gray-600 dark:text-gray-400', RATING_SIZE_TEXT[size])}>
          {displayValue.toFixed(allowHalf ? ONE : ZERO)}
          {formattedLabel && (
            <span className="ml-1 text-gray-400 dark:text-gray-500">({formattedLabel})</span>
          )}
        </span>
      )}
    </div>
  );
};
