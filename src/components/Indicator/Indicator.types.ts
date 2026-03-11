import type { ReactNode, HTMLAttributes } from 'react';

export type IndicatorPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: ReactNode;
  color?: string;
  size?: number;
  position?: IndicatorPosition;
  radius?: 'sm' | 'md' | 'lg' | 'full';
  processing?: boolean;
  disabled?: boolean;
  offset?: number;
  withBorder?: boolean;
  inline?: boolean;
  testId?: string;
}
