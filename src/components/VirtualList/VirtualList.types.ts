import type { ReactNode } from 'react';

export interface VirtualListProps<T = unknown> {
  items: T[];
  itemHeight: number;
  overscan?: number;
  height: number | string;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  className?: string;
}
