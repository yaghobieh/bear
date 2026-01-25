import { forwardRef, useEffect, useRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { BearSize, BearVariant } from '../../types';
import type { CheckboxProps } from './Checkbox.types';

const SIZE_CLASSES: Record<BearSize, string> = {
  xs: 'bear-w-3.5 bear-h-3.5',
  sm: 'bear-w-4 bear-h-4',
  md: 'bear-w-5 bear-h-5',
  lg: 'bear-w-6 bear-h-6',
  xl: 'bear-w-7 bear-h-7',
};

const ICON_SIZE: Record<BearSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 22,
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
    <div className={cn('bear-flex bear-flex-col', className)}>
      <label
        className={cn(
          'bear-inline-flex bear-items-center bear-gap-2 bear-cursor-pointer',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed'
        )}
      >
        <div className="bear-relative bear-flex bear-items-center bear-justify-center">
          <input
            ref={ref as React.RefObject<HTMLInputElement>}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            className="bear-sr-only"
            id={id}
            data-testid={testId}
            {...props}
          />
          <div
            className={cn(
              SIZE_CLASSES[size],
              'bear-rounded bear-border-2 bear-transition-all bear-flex bear-items-center bear-justify-center',
              error ? 'bear-border-red-500' : 'bear-border-gray-300 dark:bear-border-gray-600',
              (isChecked || indeterminate) && !error && 'bear-border-transparent',
              !disabled && 'hover:bear-border-gray-400'
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;

