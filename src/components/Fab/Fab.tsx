import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BearVariant } from '../../types';
import type { FabProps } from './Fab.types';

const SIZE_CLASSES = {
  sm: 'bear-w-10 bear-h-10',
  md: 'bear-w-14 bear-h-14',
  lg: 'bear-w-16 bear-h-16',
};

const POSITION_CLASSES = {
  'bottom-right': 'bear-fixed bear-bottom-6 bear-right-6',
  'bottom-left': 'bear-fixed bear-bottom-6 bear-left-6',
  'top-right': 'bear-fixed bear-top-6 bear-right-6',
  'top-left': 'bear-fixed bear-top-6 bear-left-6',
  'bottom-center': 'bear-fixed bear-bottom-6 bear-left-1/2 bear--translate-x-1/2',
  'relative': '',
};

const VARIANT_CLASSES: Record<BearVariant, string> = {
  primary: 'bear-bg-pink-500 hover:bear-bg-pink-600 bear-text-white',
  secondary: 'bear-bg-gray-600 hover:bear-bg-gray-700 bear-text-white',
  success: 'bear-bg-green-500 hover:bear-bg-green-600 bear-text-white',
  danger: 'bear-bg-red-500 hover:bear-bg-red-600 bear-text-white',
  warning: 'bear-bg-amber-500 hover:bear-bg-amber-600 bear-text-white',
  info: 'bear-bg-blue-500 hover:bear-bg-blue-600 bear-text-white',
  ghost: 'bear-bg-gray-500 hover:bear-bg-gray-600 bear-text-white',
  outline: 'bear-bg-white dark:bear-bg-gray-900 bear-border-2 bear-border-pink-500 hover:bear-bg-pink-50 dark:hover:bear-bg-pink-900/20 bear-text-pink-500',
  error: 'bear-bg-red-500 hover:bear-bg-red-600 bear-text-white',
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
        'bear-inline-flex bear-items-center bear-justify-center bear-rounded-full',
        'bear-border-none bear-cursor-pointer bear-transition-all bear-duration-200',
        'focus:bear-outline-none focus:bear-ring-2 focus:bear-ring-offset-2 focus:bear-ring-pink-500',
        SIZE_CLASSES[size],
        POSITION_CLASSES[position],
        VARIANT_CLASSES[variant],
        shadow && 'bear-shadow-lg hover:bear-shadow-xl',
        animated && 'hover:bear-scale-110 active:bear-scale-95',
        extended && 'bear-w-auto bear-px-6 bear-gap-2',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed hover:bear-scale-100',
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

