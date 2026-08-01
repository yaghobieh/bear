import type { ReactNode } from 'react';

export interface PageHeaderProps {
  id?: string;
  testId?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
