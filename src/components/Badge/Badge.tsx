import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { EmberSize, EmberVariant } from '../../types';
import type { BadgeProps } from './Badge.types';

const sizeClasses: Record<Exclude<EmberSize, 'xl'>, string> = {
  xs: 'ember-px-1.5 ember-py-0.5 ember-text-[10px]',
  sm: 'ember-px-2 ember-py-0.5 ember-text-xs',
  md: 'ember-px-2.5 ember-py-1 ember-text-xs',
  lg: 'ember-px-3 ember-py-1.5 ember-text-sm',
};

const variantClasses: Record<EmberVariant | 'neutral', string> = {
  primary: 'ember-bg-ember-100 ember-text-ember-700 dark:ember-bg-ember-900/30 dark:ember-text-ember-400',
  secondary: 'ember-bg-forge-100 ember-text-forge-700 dark:ember-bg-forge-900/30 dark:ember-text-forge-400',
  success: 'ember-bg-green-100 ember-text-green-700 dark:ember-bg-green-900/30 dark:ember-text-green-400',
  warning: 'ember-bg-yellow-100 ember-text-yellow-700 dark:ember-bg-yellow-900/30 dark:ember-text-yellow-400',
  danger: 'ember-bg-red-100 ember-text-red-700 dark:ember-bg-red-900/30 dark:ember-text-red-400',
  info: 'ember-bg-blue-100 ember-text-blue-700 dark:ember-bg-blue-900/30 dark:ember-text-blue-400',
  ghost: 'ember-bg-gray-100 ember-text-gray-700 dark:ember-bg-gray-800 dark:ember-text-gray-300',
  outline: 'ember-bg-transparent ember-text-gray-700 ember-border ember-border-gray-300 dark:ember-text-gray-300 dark:ember-border-gray-600',
  neutral: 'ember-bg-gray-100 ember-text-gray-600 dark:ember-bg-gray-800 dark:ember-text-gray-400',
};

const dotVariantColors: Record<EmberVariant | 'neutral', string> = {
  primary: 'ember-bg-ember-500',
  secondary: 'ember-bg-forge-500',
  success: 'ember-bg-green-500',
  warning: 'ember-bg-yellow-500',
  danger: 'ember-bg-red-500',
  info: 'ember-bg-blue-500',
  ghost: 'ember-bg-gray-500',
  outline: 'ember-bg-gray-500',
  neutral: 'ember-bg-gray-500',
};

/**
 * Badge component for labels and status indicators
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" size="sm" pill>Beta</Badge>
 * <Badge variant="danger" dot>Error</Badge>
 * ```
 */
export const Badge: FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'sm',
  pill = false,
  dot = false,
  className,
  children,
  testId,
  ...props
}) => {
  return (
    <span
      className={cn(
        'ember-inline-flex ember-items-center ember-gap-1.5 ember-font-medium',
        sizeClasses[size],
        variantClasses[variant],
        pill ? 'ember-rounded-full' : 'ember-rounded-md',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'ember-w-1.5 ember-h-1.5 ember-rounded-full',
            dotVariantColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
};

