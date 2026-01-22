import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BearVariant } from '../../types';
import type { FabProps } from './Fab.types';

const SIZE_CLASSES = {
  sm: 'ember-w-10 ember-h-10',
  md: 'ember-w-14 ember-h-14',
  lg: 'ember-w-16 ember-h-16',
};

const POSITION_CLASSES = {
  'bottom-right': 'ember-fixed ember-bottom-6 ember-right-6',
  'bottom-left': 'ember-fixed ember-bottom-6 ember-left-6',
  'top-right': 'ember-fixed ember-top-6 ember-right-6',
  'top-left': 'ember-fixed ember-top-6 ember-left-6',
  'bottom-center': 'ember-fixed ember-bottom-6 ember-left-1/2 ember--translate-x-1/2',
  'relative': '',
};

const VARIANT_CLASSES: Record<BearVariant, string> = {
  primary: 'ember-bg-pink-500 hover:ember-bg-pink-600 ember-text-white',
  secondary: 'ember-bg-gray-600 hover:ember-bg-gray-700 ember-text-white',
  success: 'ember-bg-green-500 hover:ember-bg-green-600 ember-text-white',
  danger: 'ember-bg-red-500 hover:ember-bg-red-600 ember-text-white',
  warning: 'ember-bg-amber-500 hover:ember-bg-amber-600 ember-text-white',
  info: 'ember-bg-blue-500 hover:ember-bg-blue-600 ember-text-white',
  ghost: 'ember-bg-gray-500 hover:ember-bg-gray-600 ember-text-white',
  outline: 'ember-bg-white ember-border-2 ember-border-pink-500 hover:ember-bg-pink-50 ember-text-pink-500',
  error: 'ember-bg-red-500 hover:ember-bg-red-600 ember-text-white',
};

/**
 * Floating Action Button (FAB) for primary actions
 * 
 * @example
 * ```tsx
 * <Fab position="bottom-right" onClick={handleAdd}>
 *   <PlusIcon />
 * </Fab>
 * 
 * <Fab extended variant="success">
 *   <CheckIcon /> Save
 * </Fab>
 * ```
 */
export const Fab = forwardRef<HTMLButtonElement, FabProps>(({
  children,
  size = 'md',
  variant = 'primary',
  color,
  extended = false,
  position = 'relative',
  disabled = false,
  shadow = true,
  animated = true,
  className,
  testId,
  style,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        'ember-inline-flex ember-items-center ember-justify-center ember-rounded-full',
        'ember-border-none ember-cursor-pointer ember-transition-all ember-duration-200',
        'focus:ember-outline-none focus:ember-ring-2 focus:ember-ring-offset-2 focus:ember-ring-pink-500',
        SIZE_CLASSES[size],
        POSITION_CLASSES[position],
        VARIANT_CLASSES[variant],
        shadow && 'ember-shadow-lg hover:ember-shadow-xl',
        animated && 'hover:ember-scale-110 active:ember-scale-95',
        extended && 'ember-w-auto ember-px-6 ember-gap-2',
        disabled && 'ember-opacity-50 ember-cursor-not-allowed hover:ember-scale-100',
        className
      )}
      style={{
        ...style,
        ...(color && { backgroundColor: color }),
      }}
      data-testid={testId}
      {...props}
    >
      {children}
    </button>
  );
});

Fab.displayName = 'Fab';

export default Fab;

