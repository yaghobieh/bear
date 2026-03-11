import type { ReactNode, HTMLAttributes } from 'react';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  status: ResultStatus;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  extra?: ReactNode;
  testId?: string;
}
