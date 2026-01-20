import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ResponsiveProp } from '../../types';
import type { GridCols, GridGap, GridFlow, GridProps, GridItemProps } from './Grid.types';

const colClasses: Record<GridCols | 'none', string> = {
  none: 'ember-grid-cols-none',
  1: 'ember-grid-cols-1',
  2: 'ember-grid-cols-2',
  3: 'ember-grid-cols-3',
  4: 'ember-grid-cols-4',
  5: 'ember-grid-cols-5',
  6: 'ember-grid-cols-6',
  7: 'ember-grid-cols-7',
  8: 'ember-grid-cols-8',
  9: 'ember-grid-cols-9',
  10: 'ember-grid-cols-10',
  11: 'ember-grid-cols-11',
  12: 'ember-grid-cols-12',
};

const gapClasses: Record<GridGap, string> = {
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

const flowClasses: Record<GridFlow, string> = {
  row: 'ember-grid-flow-row',
  column: 'ember-grid-flow-col',
  dense: 'ember-grid-flow-dense',
  'row-dense': 'ember-grid-flow-row-dense',
  'column-dense': 'ember-grid-flow-col-dense',
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
          'ember-grid',
          colsValue !== undefined && colClasses[colsValue],
          gapValue !== undefined && gapClasses[gapValue],
          rowGapValue !== undefined && `ember-gap-y-${rowGapValue}`,
          colGapValue !== undefined && `ember-gap-x-${colGapValue}`,
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
      ? 'ember-col-span-full'
      : spanValue 
        ? `ember-col-span-${spanValue}`
        : '';

    return (
      <div
        ref={ref}
        className={cn(
          spanClass,
          rowSpanValue && `ember-row-span-${rowSpanValue}`,
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

