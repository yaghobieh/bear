import type { HTMLAttributes, ReactNode } from 'react';

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  /** Elevation level (shadow depth) */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Border radius variant */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Paper variant */
  variant?: 'elevation' | 'outlined';
  /** Whether paper should fill parent width */
  fullWidth?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Background color */
  background?: 'default' | 'paper' | 'transparent' | string;
  /** Content */
  children?: ReactNode;
  /** Test ID */
  testId?: string;
}

