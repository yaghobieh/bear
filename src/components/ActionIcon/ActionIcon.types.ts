import type { ReactNode, ButtonHTMLAttributes } from 'react';
import type { ActionIconColor, ActionIconRadius, ActionIconVariant, BearSize } from '@types';

export type { ActionIconColor, ActionIconRadius, ActionIconVariant };

export interface ActionIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  children: ReactNode;
  variant?: ActionIconVariant;
  color?: ActionIconColor;
  size?: BearSize;
  radius?: ActionIconRadius;
  loading?: boolean;
  disabled?: boolean;
  testId?: string;
}
