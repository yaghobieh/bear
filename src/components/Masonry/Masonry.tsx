import { FC, Children, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import type { MasonryProps } from './Masonry.types';
import {
  DEFAULT_COLUMNS,
  DEFAULT_GAP,
  BREAKPOINT_XL,
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  BREAKPOINT_SM,
} from './Masonry.const';

/**
 * Masonry - Pinterest-style masonry grid layout.
 * Supports responsive column counts and theming via BearProvider.
 */
export const Masonry: FC<MasonryProps> = (props) => {
  const {
    children,
    columns: columnsProp = DEFAULT_COLUMNS,
    gap = DEFAULT_GAP,
    className,
    style,
    testId,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [resolvedColumns, setResolvedColumns] = useState(
    typeof columnsProp === 'number' ? columnsProp : (columnsProp.base ?? DEFAULT_COLUMNS)
  );

  const resolveColumns = useCallback(() => {
    if (typeof columnsProp === 'number') {
      setResolvedColumns(columnsProp);
      return;
    }
    const w = window.innerWidth;
    if (columnsProp.xl && w >= BREAKPOINT_XL) setResolvedColumns(columnsProp.xl);
    else if (columnsProp.lg && w >= BREAKPOINT_LG) setResolvedColumns(columnsProp.lg);
    else if (columnsProp.md && w >= BREAKPOINT_MD) setResolvedColumns(columnsProp.md);
    else if (columnsProp.sm && w >= BREAKPOINT_SM) setResolvedColumns(columnsProp.sm);
    else setResolvedColumns(columnsProp.base ?? DEFAULT_COLUMNS);
  }, [columnsProp]);

  useEffect(() => {
    resolveColumns();
    window.addEventListener('resize', resolveColumns);
    return () => window.removeEventListener('resize', resolveColumns);
  }, [resolveColumns]);

  const columnItems = useMemo(() => {
    const cols: React.ReactNode[][] = Array.from({ length: resolvedColumns }, () => []);
    Children.forEach(children, (child, index) => {
      cols[index % resolvedColumns].push(child);
    });
    return cols;
  }, [children, resolvedColumns]);

  return (
    <div
      ref={containerRef}
      className={cn('Bear-Masonry', 'bear-flex', className)}
      style={{ gap, ...style }}
      data-testid={testId}
    >
      {columnItems.map((items, colIdx) => (
        <div
          key={colIdx}
          className="Bear-Masonry__column bear-flex bear-flex-col bear-flex-1"
          style={{ gap }}
        >
          {items}
        </div>
      ))}
    </div>
  );
};
