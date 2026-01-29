import { HTMLAttributes, ReactNode } from 'react';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Gradient color (hex) */
  color?: string;
  /** Icon to show in the button */
  icon?: ReactNode;
  /** Click handler for View All button */
  onClick?: () => void;
}

