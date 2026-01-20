import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { EmberSize, EmberVariant } from '../../types';
import { Spinner } from '../Spinner';
import type { ButtonProps } from './Button.types';

const sizeClasses: Record<EmberSize, string> = {
  xs: 'ember-px-2 ember-py-1 ember-text-xs ember-gap-1',
  sm: 'ember-px-3 ember-py-1.5 ember-text-sm ember-gap-1.5',
  md: 'ember-px-4 ember-py-2 ember-text-sm ember-gap-2',
  lg: 'ember-px-5 ember-py-2.5 ember-text-base ember-gap-2',
  xl: 'ember-px-6 ember-py-3 ember-text-lg ember-gap-2.5',
};

const variantClasses: Record<EmberVariant, string> = {
  primary: `
    ember-bg-ember-500 ember-text-white
    hover:ember-bg-ember-600
    focus:ember-ring-2 focus:ember-ring-ember-500/50 focus:ember-ring-offset-2
    active:ember-bg-ember-700
    disabled:ember-bg-ember-300 disabled:ember-cursor-not-allowed
  `,
  secondary: `
    ember-bg-forge-500 ember-text-white
    hover:ember-bg-forge-600
    focus:ember-ring-2 focus:ember-ring-forge-500/50 focus:ember-ring-offset-2
    active:ember-bg-forge-700
    disabled:ember-bg-forge-300 disabled:ember-cursor-not-allowed
  `,
  success: `
    ember-bg-green-500 ember-text-white
    hover:ember-bg-green-600
    focus:ember-ring-2 focus:ember-ring-green-500/50 focus:ember-ring-offset-2
    active:ember-bg-green-700
    disabled:ember-bg-green-300 disabled:ember-cursor-not-allowed
  `,
  warning: `
    ember-bg-yellow-500 ember-text-white
    hover:ember-bg-yellow-600
    focus:ember-ring-2 focus:ember-ring-yellow-500/50 focus:ember-ring-offset-2
    active:ember-bg-yellow-700
    disabled:ember-bg-yellow-300 disabled:ember-cursor-not-allowed
  `,
  danger: `
    ember-bg-red-500 ember-text-white
    hover:ember-bg-red-600
    focus:ember-ring-2 focus:ember-ring-red-500/50 focus:ember-ring-offset-2
    active:ember-bg-red-700
    disabled:ember-bg-red-300 disabled:ember-cursor-not-allowed
  `,
  info: `
    ember-bg-blue-500 ember-text-white
    hover:ember-bg-blue-600
    focus:ember-ring-2 focus:ember-ring-blue-500/50 focus:ember-ring-offset-2
    active:ember-bg-blue-700
    disabled:ember-bg-blue-300 disabled:ember-cursor-not-allowed
  `,
  ghost: `
    ember-bg-transparent ember-text-gray-700
    hover:ember-bg-gray-100
    focus:ember-ring-2 focus:ember-ring-gray-500/50
    active:ember-bg-gray-200
    disabled:ember-text-gray-400 disabled:ember-cursor-not-allowed
    dark:ember-text-gray-300 dark:hover:ember-bg-gray-800 dark:active:ember-bg-gray-700
  `,
  outline: `
    ember-bg-transparent ember-text-ember-500 ember-border ember-border-ember-500
    hover:ember-bg-ember-50
    focus:ember-ring-2 focus:ember-ring-ember-500/50
    active:ember-bg-ember-100
    disabled:ember-text-ember-300 disabled:ember-border-ember-300 disabled:ember-cursor-not-allowed
    dark:hover:ember-bg-ember-950 dark:active:ember-bg-ember-900
  `,
};

/**
 * Button component with multiple variants, sizes, and states
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * <Button variant="outline" loading>
 *   Loading...
 * </Button>
 * 
 * <Button leftIcon={<IconPlus />}>
 *   Add Item
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      testId,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'ember-inline-flex ember-items-center ember-justify-center ember-font-medium ember-rounded-lg ember-transition-all ember-duration-200 ember-outline-none',
          // Size
          sizeClasses[size],
          // Variant
          variantClasses[variant],
          // Full width
          fullWidth && 'ember-w-full',
          // Loading
          loading && 'ember-cursor-wait',
          // Custom className
          className
        )}
        data-testid={testId}
        {...props}
      >
        {loading && (
          <Spinner size={size === 'xs' ? 'xs' : 'sm'} className="ember-absolute" />
        )}
        <span className={cn('ember-inline-flex ember-items-center ember-gap-inherit', loading && 'ember-invisible')}>
          {leftIcon && <span className="ember-inline-flex ember-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ember-inline-flex ember-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

