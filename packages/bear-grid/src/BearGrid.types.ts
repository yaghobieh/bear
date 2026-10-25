import type { ReactNode } from 'react';

export type BearGridPin = 'left' | 'right';

export interface BearGridColumn<T> {
  key: string;
  header: ReactNode;
  accessor?: (row: T) => ReactNode;
  cell?: (row: T, index: number) => ReactNode;
  value?: (row: T) => string | number;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  pinned?: BearGridPin;
}

export interface BearGridTranslations {
  exportLabel?: string;
  empty?: string;
  proLabel?: string;
}

export interface BearGridProps<T> {
  id?: string;
  testId?: string;
  columns: BearGridColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  groupBy?: string;
  excelExport?: boolean;
  licenseKey?: string;
  stickyHeader?: boolean;
  compact?: boolean;
  className?: string;
  translations?: BearGridTranslations;
}
