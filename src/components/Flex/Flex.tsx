import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ResponsiveProp } from '../../types';
import type { FlexDirection, FlexWrap, FlexAlign, FlexJustify, FlexGap, FlexProps } from './Flex.types';

const directionClasses: Record<FlexDirection, string> = {
  row: 'ember-flex-row',
  'row-reverse': 'ember-flex-row-reverse',
  column: 'ember-flex-col',
  'column-reverse': 'ember-flex-col-reverse',
};

const wrapClasses: Record<FlexWrap, string> = {
  nowrap: 'ember-flex-nowrap',
  wrap: 'ember-flex-wrap',
  'wrap-reverse': 'ember-flex-wrap-reverse',
};

const alignClasses: Record<FlexAlign, string> = {
  start: 'ember-items-start',
  center: 'ember-items-center',
  end: 'ember-items-end',
  stretch: 'ember-items-stretch',
  baseline: 'ember-items-baseline',
};

const justifyClasses: Record<FlexJustify, string> = {
  start: 'ember-justify-start',
  center: 'ember-justify-center',
  end: 'ember-justify-end',
  between: 'ember-justify-between',
  around: 'ember-justify-around',
  evenly: 'ember-justify-evenly',
};

const gapClasses: Record<FlexGap, string> = {
  0: 'ember-gap-0',
  1: 'ember-gap-1',
  2: 'ember-gap-2',
  3: 'ember-gap-3',
  4: 'ember-gap-4',
  5: 'ember-gap-5',
  6: 'ember-gap-6',
  8: 'ember-gap-8',
  10: 'ember-gap-10',
  12: 'ember-gap-12',
  16: 'ember-gap-16',
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
          inline ? 'ember-inline-flex' : 'ember-flex',
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

