import type { ReactNode, HTMLAttributes } from 'react';
import type { BearVariant, CompactBearSize } from '@types';

export interface BackTopProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  id?: string;
  bottom?: number | string;
  right?: number | string;
  visibleAt?: number;
  duration?: number;
  target?: () => HTMLElement | null;
  children?: ReactNode;
  size?: CompactBearSize;
  variant?: BearVariant;
  animated?: boolean;
  className?: string;
  testId?: string;
  onClick?: () => void;
}
