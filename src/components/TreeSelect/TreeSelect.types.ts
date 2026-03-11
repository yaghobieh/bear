import type { HTMLAttributes } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TreeSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  nodes: TreeNode[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  expandAll?: boolean;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  helperText?: string;
  maxHeight?: number;
  testId?: string;
}
