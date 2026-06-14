import { HTMLAttributes, ReactNode } from 'react';

export interface EmProps extends HTMLAttributes<HTMLElement> {
  testId?: string;
  id?: string;
  children?: ReactNode;
  variant?: 'default' | 'strong' | 'subtle';
}

