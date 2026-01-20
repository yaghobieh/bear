import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ContainerSize, ContainerProps } from './Container.types';

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'ember-max-w-screen-sm',
  md: 'ember-max-w-screen-md',
  lg: 'ember-max-w-screen-lg',
  xl: 'ember-max-w-screen-xl',
  '2xl': 'ember-max-w-screen-2xl',
  full: 'ember-max-w-full',
};

/**
 * Container component for constraining content width
 * 
 * @example
 * ```tsx
 * <Container size="lg" centered>
 *   <Content />
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'xl',
      centered = true,
      padding = true,
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
          'ember-w-full',
          sizeClasses[size],
          centered && 'ember-mx-auto',
          padding && 'ember-px-4 sm:ember-px-6 lg:ember-px-8',
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

Container.displayName = 'Container';

