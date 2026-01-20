import type { HTMLAttributes } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the container */
  size?: ContainerSize;
  /** Whether to center the container */
  centered?: boolean;
  /** Horizontal padding */
  padding?: boolean;
  /** Test ID */
  testId?: string;
}

