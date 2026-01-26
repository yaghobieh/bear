import { HTMLAttributes, ReactNode } from 'react';

export interface HighlightProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  color?: 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'orange';
  animated?: boolean;
}

