import type { ReactNode } from 'react';
import type { BearSize } from '../../types';

export type PropControlType = 'boolean' | 'string' | 'number' | 'select';

export interface PropControlOption {
  label: string;
  value: string | number | boolean;
}

export interface PropControlConfig {
  type: PropControlType;
  default: string | number | boolean;
  options?: PropControlOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export type PropsConfig = Record<string, PropControlConfig>;

export type PropValues = Record<string, string | number | boolean>;

export interface PropsPlaygroundProps {
  config: PropsConfig;
  render: (values: PropValues) => ReactNode;
  title?: string;
  size?: BearSize;
  defaultCollapsed?: boolean;
  showReset?: boolean;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  testId?: string;
}
