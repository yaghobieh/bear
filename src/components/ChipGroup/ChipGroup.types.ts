import type { HTMLAttributes, ReactNode } from 'react';

export type ChipGroupSize = 'sm' | 'md' | 'lg';

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  testId?: string;
  children: ReactNode;
  max?: number;
  size?: ChipGroupSize;
  spacing?: 'sm' | 'md' | 'lg';
  overflowMenu?: boolean;
  onDeleteAll?: () => void;
  deleteAllLabel?: string;
  className?: string;
}
