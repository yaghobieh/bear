import { HTMLAttributes, ReactNode } from 'react';

export interface MarkProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  color?: 'default' | 'pink' | 'blue' | 'green' | 'red';
}

