import { ReactNode } from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  description?: ReactNode;
  date?: string;
  icon?: ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  dotVariant?: 'filled' | 'outlined' | 'icon';
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  position?: 'left' | 'right' | 'alternate';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showConnector?: boolean;
}

