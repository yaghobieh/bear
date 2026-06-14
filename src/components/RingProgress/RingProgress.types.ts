import type { ReactNode, HTMLAttributes } from 'react';

export interface RingProgressSection {
  value: number;
  color: string;
  tooltip?: string;
}

export interface RingProgressProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  sections: RingProgressSection[];
  size?: number;
  thickness?: number;
  roundCaps?: boolean;
  label?: ReactNode;
  rootColor?: string;
  testId?: string;
}
