import type { ReactNode, HTMLAttributes } from 'react';

export type AffixPosition = 'top' | 'bottom';

export interface AffixProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  position?: AffixPosition;
  offset?: number;
  zIndex?: number;
  withinPortal?: boolean;
  testId?: string;
}
