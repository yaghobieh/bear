import type { ReactNode } from 'react';

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';

export type ToolCallKind = 'search' | 'plan' | 'edit' | 'generic';

export interface ToolCallTranslations {
  pendingLabel: string;
  runningLabel: string;
  successLabel: string;
  errorLabel: string;
}

export interface ToolCallProps {
  id?: string;
  testId?: string;
  name: string;
  status?: ToolCallStatus;
  kind?: ToolCallKind;
  input?: ReactNode;
  output?: ReactNode;
  translations?: Partial<ToolCallTranslations>;
  className?: string;
}
