import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { BadgeProps } from './Badge.types';
import { sizeClasses, variantClasses, dotVariantColors, BADGE_DOT_SIZE_CLASSES } from './Badge.constants';

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
        'bear-inline-flex bear-items-center bear-gap-1.5 bear-font-medium',
        sizeClasses[size],
        variantClasses[variant],
        pill ? 'bear-rounded-full' : 'bear-rounded-md',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            BADGE_DOT_SIZE_CLASSES,
            'bear-rounded-full',
            dotVariantColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
};
