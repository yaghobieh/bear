import { FC, createContext, useContext, useState, useCallback, forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { BearSize, BearVariant } from '../../types';
import type { RadioProps, RadioGroupProps } from './Radio.types';

const SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'ember-w-3 ember-h-3',
  sm: 'ember-w-4 ember-h-4',
  md: 'ember-w-5 ember-h-5',
  lg: 'ember-w-6 ember-h-6',
  xl: 'ember-w-7 ember-h-7',
};

const LABEL_SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'ember-text-xs',
  sm: 'ember-text-sm',
  md: 'ember-text-base',
  lg: 'ember-text-lg',
  xl: 'ember-text-xl',
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
    <div className={cn('ember-flex ember-flex-col', className)}>
      <label
        className={cn(
          'ember-inline-flex ember-items-center ember-gap-2 ember-cursor-pointer',
          effectiveDisabled && 'ember-opacity-50 ember-cursor-not-allowed'
        )}
      >
        <div className="ember-relative ember-flex ember-items-center ember-justify-center">
          <input
            ref={ref}
            type="radio"
            name={effectiveName}
            value={value}
            checked={effectiveChecked}
            disabled={effectiveDisabled}
            onChange={handleChange}
            className="ember-sr-only"
            id={id}
            data-testid={testId}
            {...props}
          />
          <div
            className={cn(
              SIZE_CLASSES[effectiveSize],
              'ember-rounded-full ember-border-2 ember-transition-all ember-flex ember-items-center ember-justify-center',
              error ? 'ember-border-red-500' : 'ember-border-gray-300 dark:ember-border-gray-600',
              effectiveChecked && !error && 'ember-border-current',
              !effectiveDisabled && 'hover:ember-border-gray-400'
            )}
            style={{ 
              borderColor: effectiveChecked && !error ? accentColor : undefined 
            }}
          >
            <div
              className={cn(
                'ember-rounded-full ember-transition-all ember-scale-0',
                effectiveChecked && 'ember-scale-100'
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
            'ember-text-gray-700 dark:ember-text-gray-300',
            error && 'ember-text-red-500'
          )}>
            {label}
          </span>
        )}
      </label>
      {helperText && (
        <span className={cn(
          'ember-text-xs ember-mt-1 ember-ml-7',
          error ? 'ember-text-red-500' : 'ember-text-gray-500'
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
      className={cn('ember-flex ember-flex-col', className)}
      role="radiogroup"
      aria-label={typeof label === 'string' ? label : undefined}
      data-testid={testId}
    >
      {label && (
        <span className={cn(
          'ember-text-sm ember-font-medium ember-mb-2 ember-text-gray-700 dark:ember-text-gray-300',
          error && 'ember-text-red-500'
        )}>
          {label}
        </span>
      )}
      <RadioGroupContext.Provider value={{ name, value: currentValue, onChange: handleChange, size, variant, disabled }}>
        <div 
          className={cn(
            'ember-flex',
            direction === 'column' ? 'ember-flex-col' : 'ember-flex-row ember-flex-wrap'
          )}
          style={{ gap: `${gap * 0.25}rem` }}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
      {helperText && (
        <span className={cn(
          'ember-text-xs ember-mt-2',
          error ? 'ember-text-red-500' : 'ember-text-gray-500'
        )}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Radio;

