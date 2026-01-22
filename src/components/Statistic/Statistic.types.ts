import { ReactNode } from 'react';

export interface StatisticProps {
  title: string;
  value: string | number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  icon?: ReactNode;
  trend?: { value: number; isUpward?: boolean };
  description?: string;
  loading?: boolean;
  precision?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'minimal';
}

