import { FC, createContext, useContext, useState, useCallback, forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { BearSize, BearVariant } from '../../types';
import type { RadioProps, RadioGroupProps } from './Radio.types';

const SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-w-3 bear-h-3',
  sm: 'bear-w-4 bear-h-4',
  md: 'bear-w-5 bear-h-5',
  lg: 'bear-w-6 bear-h-6',
  xl: 'bear-w-7 bear-h-7',
};

const LABEL_SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-text-xs',
  sm: 'bear-text-sm',
  md: 'bear-text-base',
  lg: 'bear-text-lg',
  xl: 'bear-text-xl',
};

const VARIANT_COLORS: Record<BearVariant, string> = {
  primary: '#ec4899',
  secondary: '#6b7280',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  ghost: '#9ca3af',
  outline: '#374151',
  error: '#ef4444',
};

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  size?: BearSize;
  variant?: BearVariant;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Radio input component for single selection from multiple options
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  size = 'md',
  variant = 'primary',
  color,
  disabled = false,
  error = false,
  helperText,
  className,
  testId,
  value,
  name,
  checked,
  onChange,
  ...props
}, ref) => {
  const groupContext = useContext(RadioGroupContext);
  const id = useId();
  
  const effectiveSize = groupContext?.size ?? size;
  const effectiveVariant = groupContext?.variant ?? variant;
  const effectiveDisabled = groupContext?.disabled ?? disabled;
  const effectiveName = groupContext?.name ?? name;
  const effectiveChecked = groupContext ? groupContext.value === value : checked;
  
  const accentColor = color ?? VARIANT_COLORS[effectiveVariant];

  const handleChange = useCallback(() => {
    if (effectiveDisabled) return;
    const stringValue = typeof value === 'string' ? value : String(value);
    if (groupContext && stringValue) {
      groupContext.onChange(stringValue);
    }
    onChange?.({ target: { value: stringValue } } as React.ChangeEvent<HTMLInputElement>);
  }, [groupContext, value, onChange, effectiveDisabled]);

  return (
    <div className={cn('bear-flex bear-flex-col', className)}>
      <label
        className={cn(
          'bear-inline-flex bear-items-center bear-gap-2 bear-cursor-pointer',
          effectiveDisabled && 'bear-opacity-50 bear-cursor-not-allowed'
        )}
      >
        <div className="bear-relative bear-flex bear-items-center bear-justify-center">
          <input
            ref={ref}
            type="radio"
            name={effectiveName}
            value={value}
            checked={effectiveChecked}
            disabled={effectiveDisabled}
            onChange={handleChange}
            className="bear-sr-only"
            id={id}
            data-testid={testId}
            {...props}
          />
          <div
            className={cn(
              SIZE_CLASSES[effectiveSize],
              'bear-rounded-full bear-border-2 bear-transition-all bear-flex bear-items-center bear-justify-center',
              error ? 'bear-border-red-500' : 'bear-border-gray-300 dark:bear-border-gray-600',
              effectiveChecked && !error && 'bear-border-current',
              !effectiveDisabled && 'hover:bear-border-gray-400'
            )}
            style={{ 
              borderColor: effectiveChecked && !error ? accentColor : undefined 
            }}
          >
            <div
              className={cn(
                'bear-rounded-full bear-transition-all bear-scale-0',
                effectiveChecked && 'bear-scale-100'
              )}
              style={{ 
                width: '50%', 
                height: '50%',
                backgroundColor: error ? '#ef4444' : accentColor 
              }}
            />
          </div>
        </div>
        {label && (
          <span className={cn(
            LABEL_SIZE_CLASSES[effectiveSize],
            'bear-text-gray-700 dark:bear-text-gray-300',
            error && 'bear-text-red-500'
          )}>
            {label}
          </span>
        )}
      </label>
      {helperText && (
        <span className={cn(
          'bear-text-xs bear-mt-1 bear-ml-7',
          error ? 'bear-text-red-500' : 'bear-text-gray-500'
        )}>
          {helperText}
        </span>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

/**
 * RadioGroup component for grouping radio inputs
 */
export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  value: controlledValue,
  defaultValue = '',
  onChange,
  children,
  direction = 'column',
  size,
  variant,
  disabled = false,
  gap = 2,
  label,
  error = false,
  helperText,
  className,
  testId,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback((newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  return (
    <div 
      className={cn('bear-flex bear-flex-col', className)}
      role="radiogroup"
      aria-label={typeof label === 'string' ? label : undefined}
      data-testid={testId}
    >
      {label && (
        <span className={cn(
          'bear-text-sm bear-font-medium bear-mb-2 bear-text-gray-700 dark:bear-text-gray-300',
          error && 'bear-text-red-500'
        )}>
          {label}
        </span>
      )}
      <RadioGroupContext.Provider value={{ name, value: currentValue, onChange: handleChange, size, variant, disabled }}>
        <div 
          className={cn(
            'bear-flex',
            direction === 'column' ? 'bear-flex-col' : 'bear-flex-row bear-flex-wrap'
          )}
          style={{ gap: `${gap * 0.25}rem` }}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
      {helperText && (
        <span className={cn(
          'bear-text-xs bear-mt-2',
          error ? 'bear-text-red-500' : 'bear-text-gray-500'
        )}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Radio;

