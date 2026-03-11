import type { ReactNode, FieldsetHTMLAttributes } from 'react';

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  description?: string;
  variant?: 'default' | 'filled' | 'unstyled';
  radius?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: ReactNode;
  testId?: string;
}
