import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';
import { useBearStyles } from '../../hooks/useBearStyles';
import type { ButtonProps } from './Button.types';
import { sizeClasses, variantClasses } from './Button.constants';

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
      bis,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const mergedStyle = useBearStyles(bis, style);

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={Object.keys(mergedStyle).length ? mergedStyle : undefined}
        className={cn(
          // Base styles
          'bear-inline-flex bear-items-center bear-justify-center bear-font-medium bear-rounded-lg bear-transition-all bear-duration-200 bear-outline-none',
          // Size
          sizeClasses[size],
          // Variant
          variantClasses[variant],
          // Full width
          fullWidth && 'bear-w-full',
          // Loading
          loading && 'bear-cursor-wait',
          // Custom className
          className
        )}
        data-testid={testId}
        {...props}
      >
        {loading && (
          <Spinner size={size === 'xs' ? 'xs' : 'sm'} className="bear-absolute" />
        )}
        <span className={cn('bear-inline-flex bear-items-center bear-gap-inherit', loading && 'bear-invisible')}>
          {leftIcon && <span className="bear-inline-flex bear-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="bear-inline-flex bear-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

