import type { ReactNode } from 'react';

export interface BentoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}
