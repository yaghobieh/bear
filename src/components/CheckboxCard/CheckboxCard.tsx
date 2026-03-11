import { FC, createContext, useContext, useCallback, useState } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { CheckboxCardProps, CheckboxCardGroupProps } from './CheckboxCard.types';
import {
  SIZE_PADDING_MAP,
  VARIANT_CLASSES,
  CHECKED_CLASSES,
  ROOT_CLASS,
  CHECKBOX_INDICATOR_SIZE_MAP,
  DEFAULT_COLUMNS,
  DEFAULT_GAP,
} from './CheckboxCard.const';

interface CheckboxCardGroupContextValue {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

const CheckboxCardGroupContext = createContext<CheckboxCardGroupContextValue | null>(null);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CheckboxCard: FC<CheckboxCardProps> = ({
  checked,
  onChange,
  value: valueProp,
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
  const groupContext = useContext(CheckboxCardGroupContext);
  const isInGroup = !!groupContext;
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = checked !== undefined;
  const isChecked = isInGroup && valueProp
    ? groupContext.value.includes(valueProp)
    : isControlled
      ? !!checked
      : internalChecked;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || (groupContext?.disabled ?? false)) return;
      onClick?.(e);
      if (isInGroup && valueProp && groupContext) {
        const next = isChecked
          ? groupContext.value.filter((v) => v !== valueProp)
          : [...groupContext.value, valueProp];
        groupContext.onChange(next);
      } else {
        const next = !isChecked;
        if (!isControlled) setInternalChecked(next);
        onChange?.(next);
      }
    },
    [disabled, groupContext, isInGroup, isChecked, isControlled, valueProp, onChange, onClick]
  );

  const effectiveDisabled = disabled || (groupContext?.disabled ?? false);

  return (
    <div
      role="checkbox"
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
            ? 'bear-border-pink-500 dark:bear-border-pink-400 bear-bg-pink-500 dark:bear-bg-pink-400 bear-text-white'
            : 'bear-border-gray-300 dark:bear-border-gray-600',
          CHECKBOX_INDICATOR_SIZE_MAP[size]
        )}
      >
        {isChecked && <CheckIcon className="bear-w-2.5 bear-h-2.5" />}
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

CheckboxCard.displayName = 'CheckboxCard';

export const CheckboxCardGroup: FC<CheckboxCardGroupProps> = ({
  value: controlledValue,
  onChange,
  children,
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
  testId,
  className,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return (
    <CheckboxCardGroupContext.Provider
      value={{ value, onChange: handleChange }}
    >
      <div
        role="group"
        className={cn(
          'Bear-CheckboxCardGroup bear-grid',
          className
        )}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap * 0.25}rem`,
        }}
        data-testid={testId}
        {...rest}
      >
        {children}
      </div>
    </CheckboxCardGroupContext.Provider>
  );
};

CheckboxCardGroup.displayName = 'CheckboxCardGroup';

export default CheckboxCard;
