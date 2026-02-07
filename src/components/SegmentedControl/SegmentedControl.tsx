import { FC, useState } from 'react';
import { cn } from '@utils';
import type { SegmentedControlProps } from './SegmentedControl.types';

const sizeClasses = {
  sm: 'bear-h-8 bear-text-sm',
  md: 'bear-h-10 bear-text-base',
  lg: 'bear-h-12 bear-text-lg',
};

export const SegmentedControl: FC<SegmentedControlProps> = ({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '');
  const value = controlledValue ?? internalValue;

  const handleSelect = (v: string, itemDisabled?: boolean) => {
    if (itemDisabled || disabled) return;
    if (controlledValue === undefined) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div
      role="group"
      aria-label="Segmented control"
      className={cn(
        'Bear-SegmentedControl bear-relative bear-inline-flex bear-rounded-lg bear-bg-gray-200 dark:bear-bg-zinc-800 bear-p-1',
        fullWidth && 'bear-w-full',
        disabled && 'bear-opacity-50 bear-pointer-events-none',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          aria-disabled={item.disabled || disabled}
          disabled={item.disabled || disabled}
          onClick={() => handleSelect(item.value, item.disabled)}
          className={cn(
            'Bear-SegmentedControl__item bear-relative bear-flex-1 bear-flex bear-items-center bear-justify-center bear-rounded-md bear-font-medium bear-transition-all bear-duration-200 bear-text-gray-600 dark:bear-text-zinc-400 hover:bear-text-gray-900 dark:hover:bear-text-zinc-200',
            item.value === value &&
              'bear-bg-white dark:bear-bg-zinc-700 bear-text-gray-900 dark:bear-text-white bear-shadow-sm',
            (item.disabled || disabled) && 'bear-cursor-not-allowed bear-opacity-50',
            sizeClasses[size],
            fullWidth ? 'bear-min-w-0' : 'bear-px-4'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
