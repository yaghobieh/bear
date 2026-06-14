import { ReactNode } from 'react';

export interface ScrollAreaProps {
  testId?: string;
  id?: string;
  children: ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  scrollbarSize?: 'sm' | 'md' | 'lg';
  scrollbarVariant?: 'default' | 'minimal' | 'hidden';
  maxHeight?: number | string;
  maxWidth?: number | string;
}

