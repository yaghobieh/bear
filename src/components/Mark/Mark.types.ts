import { HTMLAttributes, ReactNode } from 'react';

export interface MarkProps extends HTMLAttributes<HTMLElement> {
  testId?: string;
  id?: string;
  children?: ReactNode;
  color?: 'default' | 'pink' | 'blue' | 'green' | 'red';
}

