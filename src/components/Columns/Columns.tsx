import { FC } from 'react';
import { cn } from '@utils';
import type { ColumnsProps, ColumnProps } from './Columns.types';

const COLUMN_GAP_VALUES = {
  none: '0',
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const Columns: FC<ColumnsProps> = ({
  children,
  count = 'auto',
  gap = 'md',
  fill = false,
  minWidth,
  className,
  style,
}) => {

  const columnStyle: React.CSSProperties = {
    columnCount: count === 'auto' ? 'auto' : count,
    columnGap: COLUMN_GAP_VALUES[gap],
    columnFill: fill ? 'balance' : 'auto',
    ...(minWidth && { columnWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...style,
  };

  return (
    <div
      className={cn('bear-w-full', className)}
      style={columnStyle}
    >
      {children}
    </div>
  );
};

export const Column: FC<ColumnProps> = ({
  children,
  span = 'avoid',
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        'bear-inline-block bear-w-full bear-mb-4',
        span === 'avoid' && 'bear-break-inside-avoid',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default Columns;

