import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  /** Unique key for the column */
  key: string;
  /** Header text */
  header: ReactNode;
  /** Accessor function to get cell value */
  accessor?: (row: T) => ReactNode;
  /** Cell renderer */
  cell?: (row: T, index: number) => ReactNode;
  /** Column width */
  width?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether to hide on mobile */
  hideOnMobile?: boolean;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Table data */
  data: T[];
  /** Unique key accessor for rows */
  rowKey: (row: T, index: number) => string | number;
  /** Table variant */
  variant?: 'simple' | 'striped' | 'bordered';
  /** Whether table is loading */
  loading?: boolean;
  /** Empty state content */
  emptyContent?: ReactNode;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Whether rows are clickable */
  clickable?: boolean;
  /** Current sort column key */
  sortColumn?: string;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Sort change handler */
  onSort?: (column: string) => void;
  /** Whether to use compact spacing */
  compact?: boolean;
  /** Whether header is sticky */
  stickyHeader?: boolean;
  /** Max height for scrollable body */
  maxHeight?: string | number;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

