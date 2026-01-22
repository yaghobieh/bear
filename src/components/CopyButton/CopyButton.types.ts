import { ReactNode } from 'react';

export interface CopyButtonProps {
  value: string;
  children?: ReactNode;
  onCopy?: (value: string) => void;
  timeout?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
  copiedText?: string;
  copyText?: string;
  showText?: boolean;
}

