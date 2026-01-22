import { forwardRef, useEffect, useRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { BearSize, BearVariant } from '../../types';
import type { CheckboxProps } from './Checkbox.types';

const SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'ember-w-3.5 ember-h-3.5',
  sm: 'ember-w-4 ember-h-4',
  md: 'ember-w-5 ember-h-5',
  lg: 'ember-w-6 ember-h-6',
  xl: 'ember-w-7 ember-h-7',
};

const ICON_SIZE: Record<BearSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 22,
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

/**
 * Checkbox component for boolean selection
 * 
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
 * <Checkbox label="Subscribe" variant="success" />
 * <Checkbox indeterminate label="Select all" />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  size = 'md',
  variant = 'primary',
  color,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  error = false,
  helperText,
  className,
  testId,
  onChange,
  ...props
}, forwardedRef) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = forwardedRef || internalRef;
  const id = useId();
  
  const accentColor = color ?? VARIANT_COLORS[variant];
  const iconSize = ICON_SIZE[size];

  // Handle indeterminate state
  useEffect(() => {
    if (typeof ref === 'object' && ref?.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  const CheckIcon = () => (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      strokeWidth="3"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const IndeterminateIcon = () => (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      strokeWidth="3"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const isChecked = checked ?? defaultChecked;

  return (
    <div className={cn('ember-flex ember-flex-col', className)}>
      <label
        className={cn(
          'ember-inline-flex ember-items-center ember-gap-2 ember-cursor-pointer',
          disabled && 'ember-opacity-50 ember-cursor-not-allowed'
        )}
      >
        <div className="ember-relative ember-flex ember-items-center ember-justify-center">
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className="ember-sr-only"
            id={id}
            data-testid={testId}
            {...props}
          />
          <div
            className={cn(
              SIZE_CLASSES[size],
              'ember-rounded ember-border-2 ember-transition-all ember-flex ember-items-center ember-justify-center',
              error ? 'ember-border-red-500' : 'ember-border-gray-300 dark:ember-border-gray-600',
              (isChecked || indeterminate) && !error && 'ember-border-transparent',
              !disabled && 'hover:ember-border-gray-400'
            )}
            style={{ 
              backgroundColor: (isChecked || indeterminate) ? (error ? '#ef4444' : accentColor) : 'transparent',
              borderColor: (isChecked || indeterminate) && !error ? accentColor : undefined
            }}
          >
            {indeterminate ? (
              <IndeterminateIcon />
            ) : isChecked ? (
              <CheckIcon />
            ) : null}
          </div>
        </div>
        {label && (
          <span className={cn(
            LABEL_SIZE_CLASSES[size],
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;

