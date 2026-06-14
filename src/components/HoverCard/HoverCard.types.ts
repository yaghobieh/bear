import { HTMLAttributes, ReactNode } from 'react';

export interface HoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  testId?: string;
  id?: string;
  children: ReactNode;
  cardContent: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  openDelay?: number;
  closeDelay?: number;
  arrow?: boolean;
}

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

