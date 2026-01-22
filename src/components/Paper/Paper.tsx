import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { PaperProps } from './Paper.types';

const ELEVATION_CLASSES = {
  0: '',
  1: 'ember-shadow-sm',
  2: 'ember-shadow',
  3: 'ember-shadow-md',
  4: 'ember-shadow-lg',
  5: 'ember-shadow-xl',
};

const ROUNDED_CLASSES = {
  none: 'ember-rounded-none',
  sm: 'ember-rounded-sm',
  md: 'ember-rounded-md',
  lg: 'ember-rounded-lg',
  xl: 'ember-rounded-xl',
  full: 'ember-rounded-full',
};

const PADDING_CLASSES = {
  none: '',
  sm: 'ember-p-2',
  md: 'ember-p-4',
  lg: 'ember-p-6',
};

const BACKGROUND_CLASSES = {
  default: 'ember-bg-white dark:ember-bg-gray-900',
  paper: 'ember-bg-gray-50 dark:ember-bg-gray-800',
  transparent: 'ember-bg-transparent',
};

/**
 * Paper component as a surface container
 * 
 * @example
 * ```tsx
 * <Paper elevation={2} padding="md">
 *   Content goes here
 * </Paper>
 * 
 * <Paper variant="outlined" rounded="lg">
 *   Outlined paper
 * </Paper>
 * ```
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(({
  elevation = 1,
  rounded = 'md',
  variant = 'elevation',
  fullWidth = false,
  padding = 'none',
  background = 'default',
  children,
  className,
  style,
  testId,
  ...props
}, ref) => {
  const isCustomBackground = background && !BACKGROUND_CLASSES[background as keyof typeof BACKGROUND_CLASSES];

  return (
    <div
      ref={ref}
      className={cn(
        ROUNDED_CLASSES[rounded],
        PADDING_CLASSES[padding],
        !isCustomBackground && BACKGROUND_CLASSES[background as keyof typeof BACKGROUND_CLASSES],
        variant === 'elevation' && ELEVATION_CLASSES[elevation],
        variant === 'outlined' && 'ember-border ember-border-gray-200 dark:ember-border-gray-700',
        fullWidth && 'ember-w-full',
        className
      )}
      style={{
        ...style,
        ...(isCustomBackground && { backgroundColor: background }),
      }}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

export default Paper;

