import { forwardRef } from 'react';
import { cn } from '@utils';
import type { PaperProps } from './Paper.types';

const ELEVATION_CLASSES = {
  0: '',
  1: 'bear-shadow-sm',
  2: 'bear-shadow',
  3: 'bear-shadow-md',
  4: 'bear-shadow-lg',
  5: 'bear-shadow-xl',
};

const ROUNDED_CLASSES = {
  none: 'bear-rounded-none',
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
  xl: 'bear-rounded-xl',
  full: 'bear-rounded-full',
};

const PADDING_CLASSES = {
  none: '',
  sm: 'bear-p-2',
  md: 'bear-p-4',
  lg: 'bear-p-6',
};

const BACKGROUND_CLASSES = {
  default: 'bear-bg-white dark:bear-bg-gray-900',
  paper: 'bear-bg-gray-50 dark:bear-bg-gray-800',
  transparent: 'bear-bg-transparent',
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
        variant === 'outlined' && 'bear-border bear-border-gray-200 dark:bear-border-gray-700',
        fullWidth && 'bear-w-full',
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

