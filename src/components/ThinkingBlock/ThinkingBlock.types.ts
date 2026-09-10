import type { ReactNode } from 'react';

export interface ThinkingBlockTranslations {
  thinkingLabel: string;
}

export interface ThinkingBlockProps {
  id?: string;
  testId?: string;
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isStreaming?: boolean;
  translations?: Partial<ThinkingBlockTranslations>;
  className?: string;
}
