import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ResponsiveProp } from '../../types';
import type { FlexDirection, FlexWrap, FlexAlign, FlexJustify, FlexGap, FlexProps } from './Flex.types';

const directionClasses: Record<FlexDirection, string> = {
  row: 'bear-flex-row',
  'row-reverse': 'bear-flex-row-reverse',
  column: 'bear-flex-col',
  'column-reverse': 'bear-flex-col-reverse',
};

const wrapClasses: Record<FlexWrap, string> = {
  nowrap: 'bear-flex-nowrap',
  wrap: 'bear-flex-wrap',
  'wrap-reverse': 'bear-flex-wrap-reverse',
};

const alignClasses: Record<FlexAlign, string> = {
  start: 'bear-items-start',
  center: 'bear-items-center',
  end: 'bear-items-end',
  stretch: 'bear-items-stretch',
  baseline: 'bear-items-baseline',
};

const justifyClasses: Record<FlexJustify, string> = {
  start: 'bear-justify-start',
  center: 'bear-justify-center',
  end: 'bear-justify-end',
  between: 'bear-justify-between',
  around: 'bear-justify-around',
  evenly: 'bear-justify-evenly',
};

const gapClasses: Record<FlexGap, string> = {
  0: 'bear-gap-0',
  1: 'bear-gap-1',
  2: 'bear-gap-2',
  3: 'bear-gap-3',
  4: 'bear-gap-4',
  5: 'bear-gap-5',
  6: 'bear-gap-6',
  8: 'bear-gap-8',
  10: 'bear-gap-10',
  12: 'bear-gap-12',
  16: 'bear-gap-16',
};

const getResponsiveClass = <T extends string | number>(
  value: ResponsiveProp<T> | undefined,
  classes: Record<string, string>
): string => {
  if (value === undefined) return '';
  
  if (typeof value === 'object') {
    const result: string[] = [];
    if (value.base !== undefined) result.push(classes[value.base as unknown as string]);
    // Note: For full responsive support, you'd add breakpoint prefixes here
    return result.join(' ');
  }
  
  return classes[value as unknown as string] || '';
};

/**
 * Flex container component for flexible layouts
 * 
 * @example
 * ```tsx
 * <Flex direction="row" align="center" justify="between" gap={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
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
          getResponsiveClass(direction, directionClasses),
          getResponsiveClass(wrap, wrapClasses),
          getResponsiveClass(align, alignClasses),
          getResponsiveClass(justify, justifyClasses),
          getResponsiveClass(gap, gapClasses),
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

