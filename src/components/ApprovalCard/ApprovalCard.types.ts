import type { ReactNode } from 'react';

export interface ApprovalCardTranslations {
  approveLabel: string;
  rejectLabel: string;
}

export interface ApprovalCardProps {
  id?: string;
  testId?: string;
  title: string;
  children?: ReactNode;
  onApprove?: () => void;
  onReject?: () => void;
  translations?: Partial<ApprovalCardTranslations>;
  className?: string;
}
