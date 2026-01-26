import { ReactNode, CSSProperties } from 'react';

export interface ColumnsProps {
  children: ReactNode;
  count?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fill?: boolean;
  minWidth?: string | number;
  className?: string;
  style?: CSSProperties;
}

export interface ColumnProps {
  children: ReactNode;
  span?: 'avoid' | 'auto';
  className?: string;
  style?: CSSProperties;
}

export type ColumnsCountType = 1 | 2 | 3 | 4 | 5 | 6 | 'auto';

