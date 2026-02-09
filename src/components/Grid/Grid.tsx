import { forwardRef } from 'react';
import { cn } from '@utils';
import type { ResponsiveProp } from '../../types';
import type { GridCols, GridGap, GridFlow, GridProps, GridItemProps } from './Grid.types';

const colClasses: Record<GridCols | 'none', string> = {
  none: 'bear-grid-cols-none',
  1: 'bear-grid-cols-1',
  2: 'bear-grid-cols-2',
  3: 'bear-grid-cols-3',
  4: 'bear-grid-cols-4',
  5: 'bear-grid-cols-5',
  6: 'bear-grid-cols-6',
  7: 'bear-grid-cols-7',
  8: 'bear-grid-cols-8',
  9: 'bear-grid-cols-9',
  10: 'bear-grid-cols-10',
  11: 'bear-grid-cols-11',
  12: 'bear-grid-cols-12',
};

const gapClasses: Record<GridGap, string> = {
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

const flowClasses: Record<GridFlow, string> = {
  row: 'bear-grid-flow-row',
  column: 'bear-grid-flow-col',
  dense: 'bear-grid-flow-dense',
  'row-dense': 'bear-grid-flow-row-dense',
  'column-dense': 'bear-grid-flow-col-dense',
};

const getSimpleValue = <T extends string | number>(
  value: ResponsiveProp<T> | undefined
): T | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'object') return (value as { base?: T }).base;
  return value;
};

/**
 * Grid container component for grid layouts
 * 
 * @example
 * ```tsx
 * <Grid cols={3} gap={4}>
 *   <Grid.Item colSpan={2}>Wide item</Grid.Item>
 *   <Grid.Item>Normal item</Grid.Item>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = 1,
      gap = 0,
      rowGap,
      colGap,
      flow,
      className,
      children,
      testId,
      ...props
    },
    ref
  ) => {
    const colsValue = getSimpleValue(cols);
    const gapValue = getSimpleValue(gap);
    const rowGapValue = getSimpleValue(rowGap);
    const colGapValue = getSimpleValue(colGap);

    return (
      <div
        ref={ref}
        className={cn(
          'bear-grid',
          colsValue !== undefined && colClasses[colsValue as GridCols | 'none'],
          gapValue !== undefined && gapClasses[gapValue as GridGap],
          rowGapValue !== undefined && `bear-gap-y-${rowGapValue}`,
          colGapValue !== undefined && `bear-gap-x-${colGapValue}`,
          flow && flowClasses[flow],
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

Grid.displayName = 'Grid';

/**
 * Grid Item component
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ colSpan, rowSpan, colStart, colEnd, className, children, ...props }, ref) => {
    const spanValue = getSimpleValue(colSpan);
    const rowSpanValue = getSimpleValue(rowSpan);

    const spanClass = spanValue === 'full' 
      ? 'bear-col-span-full'
      : spanValue 
        ? `bear-col-span-${spanValue}`
        : '';

    return (
      <div
        ref={ref}
        className={cn(
          spanClass,
          rowSpanValue && `bear-row-span-${rowSpanValue}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

// Compound component pattern
export const GridCompound = Object.assign(Grid, {
  Item: GridItem,
});

