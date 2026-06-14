import type { ReactNode } from 'react';

export interface DocPageProps {
  title: string;
  description: string;
  badge?: string;
  icon?: ReactNode;
  componentName?: string;
  children: ReactNode;
}
