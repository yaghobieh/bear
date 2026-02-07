import type { HTMLAttributes } from 'react';
import type { BearSize, BearVariant } from '../../types';

export type SliderRangeValue = [number, number];

export interface SliderRangeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: SliderRangeValue;
  defaultValue?: SliderRangeValue;
  min?: number;
  max?: number;
  step?: number;
  size?: BearSize;
  color?: BearVariant;
  disabled?: boolean;
  onChange?: (value: SliderRangeValue) => void;
  onChangeCommitted?: (value: SliderRangeValue) => void;
  valueFormatter?: (value: number) => string;
  className?: string;
}
