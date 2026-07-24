import type { HTMLAttributes, ReactNode } from 'react';

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  testId?: string;
  children: ReactNode;
  max?: number;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}
