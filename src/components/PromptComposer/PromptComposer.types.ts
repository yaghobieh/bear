import type { KeyboardEvent, ReactNode } from 'react';

export interface PromptComposerTranslations {
  placeholder: string;
  sendLabel: string;
  stopLabel: string;
  attachLabel: string;
}

export interface PromptComposerProps {
  id?: string;
  testId?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  onAttach?: (files: File[]) => void;
  files?: File[];
  onFileRemove?: (file: File) => void;
  isStreaming?: boolean;
  disabled?: boolean;
  allowAttach?: boolean;
  accept?: string;
  placeholder?: string;
  translations?: Partial<PromptComposerTranslations>;
  footer?: ReactNode;
  className?: string;
}

export interface PromptComposerFileChipProps {
  file: File;
  disabled: boolean;
  onRemove?: (file: File) => void;
}

export interface UsePromptComposerValueParams {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface PromptComposerKeyParams {
  event: KeyboardEvent<HTMLTextAreaElement>;
  disabled: boolean;
  isStreaming: boolean;
  onSubmit?: (value: string) => void;
  draft: string;
  clearDraft: () => void;
}
