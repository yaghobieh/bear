import { useState } from 'react';
import { cn } from '@utils';
import { BOOLEAN_FALSE, EMPTY_STRING, SIZE_MD } from '@const';
import { Button } from '../Button';
import type { SegmentedControlProps } from './SegmentedControl.types';
import { SEGMENTED_SIZE_CLASSES } from './SegmentedControl.const';

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
        'Bear-SegmentedControl bear-relative bear-inline-flex bear-rounded-lg bear-p-1',
        'bear-bg-[var(--bear-bg-tertiary)]',
        fullWidth && 'bear-w-full',
        disabled && 'bear-opacity-50 bear-pointer-events-none',
        className
      )}
    >
      {items.map((item) => {
        const isSelected = item.value === value;
        const isDisabled = item.disabled || disabled;

        return (
          <Button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            variant="ghost"
            size={size}
            onClick={() => handleSelect(item.value, item.disabled)}
            className={cn(
              'Bear-SegmentedControl__item bear-relative bear-flex-1 bear-flex bear-items-center bear-justify-center bear-rounded-md bear-font-medium bear-transition-all bear-duration-200',
              'bear-text-[var(--bear-text-secondary)] hover:bear-text-[var(--bear-text-primary)]',
              isSelected &&
                'Bear-SegmentedControl__item--active bear-bg-[var(--bear-bg-primary)] bear-text-[var(--bear-text-primary)] bear-shadow-sm',
              isDisabled && 'bear-cursor-not-allowed bear-opacity-50',
              SEGMENTED_SIZE_CLASSES[size],
              fullWidth ? 'bear-min-w-0' : 'bear-px-4'
            )}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
