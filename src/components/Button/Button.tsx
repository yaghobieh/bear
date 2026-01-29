import { forwardRef } from 'react';
import { cn } from '@utils';
import { Spinner } from '../Spinner';
import { useBearStyles } from '@hooks';
import type { ButtonProps } from './Button.types';
import { BUTTON_SIZE, BUTTON_VARIANT } from './Button.constants';

/**
 * Button component with multiple variants, sizes, and states.
 * Light and dark mode supported; outline variant has theme-aware borders.
 * Override borders from outside via className (e.g. className="border-2 border-blue-500 dark:border-blue-400").
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
 * <Button variant="outline" className="border-2 border-pink-500">
 *   Custom border
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
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
      ...rest
    } = props;

    const isDisabled = disabled || loading;
    const mergedStyle = useBearStyles(bis, style);

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={Object.keys(mergedStyle).length ? mergedStyle : undefined}
        className={cn(
          'Bear-Button',
          'bear-inline-flex bear-items-center bear-justify-center bear-font-medium bear-rounded-lg bear-transition-all bear-duration-200 bear-outline-none',
          BUTTON_SIZE[size],
          BUTTON_VARIANT[variant],
          fullWidth && 'bear-w-full',
          loading && 'bear-cursor-wait',
          className
        )}
        data-testid={testId}
        {...rest}
      >
        {loading && (
          <Spinner size={size === 'xs' ? 'xs' : 'sm'} className="Bear-Button__spinner bear-absolute" />
        )}
        <span className={cn('Bear-Button__content bear-inline-flex bear-items-center bear-gap-inherit', loading && 'bear-invisible')}>
          {leftIcon && <span className="Bear-Button__icon Bear-Button__icon--left bear-inline-flex bear-shrink-0">{leftIcon}</span>}
          <span className="Bear-Button__text">{children}</span>
          {rightIcon && <span className="Bear-Button__icon Bear-Button__icon--right bear-inline-flex bear-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
