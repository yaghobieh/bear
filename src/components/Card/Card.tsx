import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { EmberSize } from '../../types';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types';

const paddingClasses: Record<EmberSize | 'none', string> = {
  none: '',
  xs: 'ember-p-2',
  sm: 'ember-p-3',
  md: 'ember-p-4',
  lg: 'ember-p-6',
  xl: 'ember-p-8',
};

const radiusClasses: Record<string, string> = {
  none: '',
  sm: 'ember-rounded-sm',
  md: 'ember-rounded-md',
  lg: 'ember-rounded-lg',
  xl: 'ember-rounded-xl',
  '2xl': 'ember-rounded-2xl',
};

const variantClasses = {
  elevated: 'ember-bg-white dark:ember-bg-gray-900 ember-shadow-md',
  outlined: 'ember-bg-white dark:ember-bg-gray-900 ember-border ember-border-gray-200 dark:ember-border-gray-700',
  filled: 'ember-bg-gray-100 dark:ember-bg-gray-800',
  ghost: 'ember-bg-transparent',
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
          'ember-overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          radiusClasses[radius],
          interactive && 'ember-transition-all ember-duration-200 ember-cursor-pointer hover:ember-shadow-lg hover:ember-scale-[1.02]',
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
          'ember-flex ember-items-start ember-justify-between ember-p-4 ember-border-b ember-border-gray-200 dark:ember-border-gray-700',
          className
        )}
        {...props}
      >
        <div className="ember-flex-1 ember-min-w-0">
          {title && (
            <h3 className="ember-text-lg ember-font-semibold ember-text-gray-900 dark:ember-text-white ember-truncate">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="ember-text-sm ember-text-gray-500 dark:ember-text-gray-400 ember-mt-1">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="ember-ml-4 ember-shrink-0">
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
        className={cn('ember-p-4', className)}
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
          'ember-p-4',
          divider && 'ember-border-t ember-border-gray-200 dark:ember-border-gray-700',
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

