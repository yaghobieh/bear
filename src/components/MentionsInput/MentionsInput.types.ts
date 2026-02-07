import type { ReactNode } from 'react';

export interface MentionOption {
  value: string;
  label: ReactNode;
  avatar?: ReactNode;
}

export interface MentionsInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, mentions: string[]) => void;
  onMentionSelect?: (option: MentionOption) => void;
  options: MentionOption[];
  trigger?: string;
  placeholder?: string;
  disabled?: boolean;
  maxSuggestions?: number;
  filterOptions?: (options: MentionOption[], query: string) => MentionOption[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}
