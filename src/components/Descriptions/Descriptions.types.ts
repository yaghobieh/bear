import type { ReactNode, HTMLAttributes } from 'react';

export interface DescriptionItem {
  label: string;
  value: ReactNode;
  span?: number;
}

export interface DescriptionsProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  items: DescriptionItem[];
  columns?: number;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  labelWidth?: number;
  testId?: string;
}
