import type { ReactNode, HTMLAttributes } from 'react';

export type AffixPosition = 'top' | 'bottom';

export type AffixLayoutInput = {
  position: AffixPosition;
  isFixed: boolean;
  offset: number;
  rectTop: number;
  rectBottom: number;
  viewportBottom: number;
  measuredHeight: number;
};

export type AffixLayoutResult = {
  isFixed: boolean;
  placeholderHeight: number;
};

export interface AffixProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  id?: string;
  children: ReactNode;
  position?: AffixPosition;
  offset?: number;
  zIndex?: number;
  withinPortal?: boolean;
  testId?: string;
}
