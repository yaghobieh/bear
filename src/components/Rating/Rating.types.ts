import type { HTMLAttributes, ReactNode } from 'react';

export type RatingSize = 'sm' | 'md' | 'lg';

export type RatingStarState = 'filled' | 'half' | 'empty';

export interface RatingStarIconProps {
  size: number;
  state: RatingStarState;
  color: string;
  emptyColor: string;
}

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: RatingSize;
  onChange?: (value: number) => void;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  filledIcon?: ReactNode;
  emptyIcon?: ReactNode;
  halfIcon?: ReactNode;
  color?: string;
  emptyColor?: string;
  showValue?: boolean;
  labelFormatter?: (value: number) => string;
  testId?: string;
  labels?: string[];
}

export interface RatingCustomIcons {
  filled?: ReactNode;
  half?: ReactNode;
  empty?: ReactNode;
}
