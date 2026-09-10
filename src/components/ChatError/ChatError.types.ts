import type { ReactNode } from 'react';

export interface ChatErrorTranslations {
  title: string;
  retryLabel: string;
}

export interface ChatErrorProps {
  id?: string;
  testId?: string;
  title?: string;
  children?: ReactNode;
  onRetry?: () => void;
  translations?: Partial<ChatErrorTranslations>;
  className?: string;
}
