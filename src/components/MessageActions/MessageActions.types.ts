export interface MessageActionsTranslations {
  copyLabel: string;
  retryLabel: string;
  goodLabel: string;
  badLabel: string;
}

export interface MessageActionsProps {
  id?: string;
  testId?: string;
  onCopy?: () => void;
  onRetry?: () => void;
  onGood?: () => void;
  onBad?: () => void;
  translations?: Partial<MessageActionsTranslations>;
  className?: string;
}
