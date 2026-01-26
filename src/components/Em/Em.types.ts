import { HTMLAttributes, ReactNode } from 'react';

export interface EmProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: 'default' | 'strong' | 'subtle';
}

