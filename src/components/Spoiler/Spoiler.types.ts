import type { ReactNode, HTMLAttributes } from 'react';

export interface SpoilerProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  maxHeight: number;
  showLabel?: string;
  hideLabel?: string;
  children: ReactNode;
  initialExpanded?: boolean;
  transitionDuration?: number;
  testId?: string;
}
