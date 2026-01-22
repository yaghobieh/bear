import { ReactNode } from 'react';

export interface KbdProps {
  children: ReactNode;
  keys?: string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

