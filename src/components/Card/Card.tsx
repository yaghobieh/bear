import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { EmberSize } from '../../types';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types';

const paddingClasses: Record<EmberSize | 'none', string> = {
  none: '',
  xs: 'bear-p-2',
  sm: 'bear-p-3',
  md: 'bear-p-4',
  lg: 'bear-p-6',
  xl: 'bear-p-8',
};

const radiusClasses: Record<string, string> = {
  none: '',
  sm: 'bear-rounded-sm',
  md: 'bear-rounded-md',
  lg: 'bear-rounded-lg',
  xl: 'bear-rounded-xl',
  '2xl': 'bear-rounded-2xl',
};

const variantClasses = {
  elevated: 'bear-bg-white dark:bear-bg-gray-900 bear-shadow-md',
  outlined: 'bear-bg-white dark:bear-bg-gray-900 bear-border bear-border-gray-200 dark:bear-border-gray-700',
  filled: 'bear-bg-gray-100 dark:bear-bg-gray-800',
  ghost: 'bear-bg-transparent',
};

/**
 * Card component for containing content
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md">
 *   <Card.Header title="Card Title" subtitle="Subtitle" />
 *   <Card.Body>Content goes here</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'none',
      interactive = false,
      radius = 'lg',
      className,
      children,
      testId,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bear-overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          radiusClasses[radius],
          interactive && 'bear-transition-all bear-duration-200 bear-cursor-pointer hover:bear-shadow-lg hover:bear-scale-[1.02]',
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bear-flex bear-items-start bear-justify-between bear-p-4 bear-border-b bear-border-gray-200 dark:bear-border-gray-700',
          className
        )}
        {...props}
      >
        <div className="bear-flex-1 bear-min-w-0">
          {title && (
            <h3 className="bear-text-lg bear-font-semibold bear-text-gray-900 dark:bear-text-white bear-truncate">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="bear-text-sm bear-text-gray-500 dark:bear-text-gray-400 bear-mt-1">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="bear-ml-4 bear-shrink-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Body
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bear-p-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card Footer
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ divider = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bear-p-4',
          divider && 'bear-border-t bear-border-gray-200 dark:bear-border-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Compound component pattern
export const CardCompound = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

