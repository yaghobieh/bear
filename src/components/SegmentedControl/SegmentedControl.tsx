import { useState } from 'react';
import { cn } from '@utils';
import { BOOLEAN_FALSE, EMPTY_STRING, SIZE_MD } from '@const';
import type { SegmentedControlProps } from './SegmentedControl.types';
import { SEGMENTED_SIZE_MODIFIER } from './SegmentedControl.const';

export const SegmentedControl = (props: SegmentedControlProps) => {
  const {
    items,
    value: controlledValue,
    defaultValue,
    onChange,
    size = SIZE_MD,
    fullWidth = BOOLEAN_FALSE,
    disabled = BOOLEAN_FALSE,
    className,
    testId,
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? EMPTY_STRING);
  const value = controlledValue ?? internalValue;

  const handleSelect = (nextValue: string, itemDisabled?: boolean) => {
    if (itemDisabled || disabled) {
      return;
    }
    if (controlledValue === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return (
    <div
      role="group"
      aria-label="Segmented control"
      data-testid={testId}
      className={cn(
        'Bear-SegmentedControl',
        fullWidth && 'Bear-SegmentedControl--full',
        disabled && 'Bear-SegmentedControl--disabled',
        className
      )}
    >
      {items.map((item) => {
        const isSelected = item.value === value;
        const isDisabled = item.disabled || disabled;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => handleSelect(item.value, item.disabled)}
            className={cn(
              'Bear-SegmentedControl__item',
              SEGMENTED_SIZE_MODIFIER[size],
              isSelected && 'Bear-SegmentedControl__item--active',
              isDisabled && 'Bear-SegmentedControl__item--disabled'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
