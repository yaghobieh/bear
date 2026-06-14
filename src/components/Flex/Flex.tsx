import { forwardRef } from 'react';
import { cn, getResponsiveClass } from '@utils';
import type { FlexProps } from './Flex.types';
import {
  FLEX_ALIGN_CLASSES,
  FLEX_DIRECTION_CLASSES,
  FLEX_GAP_CLASSES,
  FLEX_JUSTIFY_CLASSES,
  FLEX_WRAP_CLASSES,
} from './Flex.const';

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      wrap = 'nowrap',
      align = 'stretch',
      justify = 'start',
      gap = 0,
      inline = false,
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
          inline ? 'bear-inline-flex' : 'bear-flex',
          getResponsiveClass(direction, FLEX_DIRECTION_CLASSES),
          getResponsiveClass(wrap, FLEX_WRAP_CLASSES),
          getResponsiveClass(align, FLEX_ALIGN_CLASSES),
          getResponsiveClass(justify, FLEX_JUSTIFY_CLASSES),
          getResponsiveClass(gap, FLEX_GAP_CLASSES),
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

Flex.displayName = 'Flex';
