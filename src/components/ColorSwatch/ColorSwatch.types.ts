import type { HTMLAttributes } from 'react';

export type SwatchSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ColorSwatchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  color: string;
  selected?: boolean;
  size?: SwatchSize;
  rounded?: boolean;
  label?: string;
  onClick?: () => void;
  testId?: string;
}

export interface ColorSwatchGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  colors: string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  size?: SwatchSize;
  rounded?: boolean;
  gap?: number;
  columns?: number;
  showLabel?: boolean;
  testId?: string;
}
