import type { HTMLAttributes, ReactNode } from 'react';
import type { BearSize } from '../../types';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  /** Card variant */
  variant?: 'elevated' | 'outlined' | 'filled' | 'ghost';
  /** Padding size */
  padding?: BearSize | 'none';
  /** Whether card is interactive (adds hover effects) */
  interactive?: boolean;
  /** Border radius */
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  /** Test ID */
  testId?: string;
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title */
  title?: ReactNode;
  /** Card subtitle */
  subtitle?: ReactNode;
  /** Action element on the right side */
  action?: ReactNode;
}

export type CardBodyProps = HTMLAttributes<HTMLDivElement>;

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to add a divider above footer */
  divider?: boolean;
}

