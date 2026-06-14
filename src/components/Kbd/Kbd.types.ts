import { ReactNode } from 'react';

export interface KbdProps {
  testId?: string;
  id?: string;
  children: ReactNode;
  keys?: string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

