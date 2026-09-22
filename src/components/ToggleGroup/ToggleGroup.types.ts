import type { ReactNode, HTMLAttributes } from 'react';

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupOrientation = 'horizontal' | 'vertical';
export type ToggleGroupSize = 'sm' | 'md' | 'lg';
export type ToggleGroupVariant = 'subtle' | 'outline' | 'filled';

export interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string | string[];
  onItemToggle: (itemValue: string) => void;
  size: ToggleGroupSize;
  variant: ToggleGroupVariant;
  disabled?: boolean;
}

export interface ToggleGroupSingleProps {
  type?: 'single';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export interface ToggleGroupMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupBaseProps = {
  orientation?: ToggleGroupOrientation;
  size?: ToggleGroupSize;
  variant?: ToggleGroupVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  testId?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>;

export type ToggleGroupProps = ToggleGroupBaseProps &
  (ToggleGroupSingleProps | ToggleGroupMultipleProps);

export interface ToggleGroupItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}
