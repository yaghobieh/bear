import { forwardRef } from 'react';
import { cn } from '@utils';
import type { ContainerSize, ContainerProps } from './Container.types';

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'bear-max-w-screen-sm',
  md: 'bear-max-w-screen-md',
  lg: 'bear-max-w-screen-lg',
  xl: 'bear-max-w-screen-xl',
  '2xl': 'bear-max-w-screen-2xl',
  full: 'bear-max-w-full',
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
          'bear-w-full',
          sizeClasses[size],
          centered && 'bear-mx-auto',
          padding && 'bear-px-4 sm:bear-px-6 lg:bear-px-8',
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

