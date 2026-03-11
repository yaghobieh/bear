import { FC, createContext, useContext, useCallback, useState } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { RadioCardProps, RadioCardGroupProps } from './RadioCard.types';
import {
  SIZE_PADDING_MAP,
  VARIANT_CLASSES,
  CHECKED_CLASSES,
  ROOT_CLASS,
  RADIO_INDICATOR_SIZE_MAP,
  DEFAULT_COLUMNS,
  DEFAULT_GAP,
} from './RadioCard.const';

interface RadioCardGroupContextValue {
  value?: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

const RadioCardGroupContext = createContext<RadioCardGroupContextValue | null>(null);

export const RadioCard: FC<RadioCardProps> = ({
  value,
  checked,
  onChange,
  label,
  description,
  icon,
  disabled = false,
  variant = 'default',
  size = 'md',
  testId,
  className,
  onClick,
  ...rest
}) => {
  const groupContext = useContext(RadioCardGroupContext);
  const isInGroup = !!groupContext;

  const isChecked = isInGroup ? groupContext?.value === value : !!checked;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || (groupContext?.disabled ?? false)) return;
      onClick?.(e);
      if (isInGroup && groupContext) {
        groupContext.onChange(value);
      } else {
        onChange?.(value);
      }
    },
    [disabled, groupContext, isInGroup, value, onChange, onClick]
  );

  const effectiveDisabled = disabled || (groupContext?.disabled ?? false);

  return (
    <div
      role="radio"
      aria-checked={isChecked}
      aria-disabled={effectiveDisabled}
      tabIndex={effectiveDisabled ? undefined : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      className={cn(
        ROOT_CLASS,
        SIZE_PADDING_MAP[size],
        VARIANT_CLASSES[variant],
        isChecked && CHECKED_CLASSES,
        effectiveDisabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none',
        !effectiveDisabled && 'hover:bear-border-gray-300 dark:hover:bear-border-gray-600',
        className
      )}
      onClick={handleClick}
      data-testid={testId}
      {...rest}
    >
      <div
        className={cn(
          'bear-absolute bear-top-3 bear-right-3 bear-flex bear-items-center bear-justify-center bear-rounded-full bear-border-2',
          isChecked
            ? 'bear-border-pink-500 dark:bear-border-pink-400'
            : 'bear-border-gray-300 dark:bear-border-gray-600',
          RADIO_INDICATOR_SIZE_MAP[size]
        )}
      >
        {isChecked && (
          <div className="bear-w-2 bear-h-2 bear-rounded-full bear-bg-pink-500 dark:bear-bg-pink-400" />
        )}
      </div>
      {icon && (
        <div className="bear-mb-3 bear-flex bear-items-center bear-justify-center bear-text-gray-500 dark:bear-text-gray-400">
          {icon}
        </div>
      )}
      <Typography variant="body2" weight="medium" className="bear-block">
        {label}
      </Typography>
      {description && (
        <Typography variant="caption" color="secondary" className="bear-mt-1 bear-block">
          {description}
        </Typography>
      )}
    </div>
  );
};

RadioCard.displayName = 'RadioCard';

export const RadioCardGroup: FC<RadioCardGroupProps> = ({
  value: controlledValue,
  onChange,
  children,
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
  name,
  testId,
  className,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string>('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return (
    <RadioCardGroupContext.Provider
      value={{ value, onChange: handleChange, name }}
    >
      <div
        role="radiogroup"
        className={cn('Bear-RadioCardGroup bear-grid', className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap * 0.25}rem`,
        }}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    </RadioCardGroupContext.Provider>
  );
};

RadioCardGroup.displayName = 'RadioCardGroup';

export default RadioCard;
