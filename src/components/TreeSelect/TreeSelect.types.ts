import type { HTMLAttributes } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TreeNodeRowProps {
  node: TreeNode;
  depth: number;
  selected: Set<string>;
  expanded: Set<string>;
  multiple: boolean;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
}

export interface TreeSelectExpandControlProps {
  hasChildren: boolean;
  isExpanded: boolean;
  nodeId: string;
  onToggleExpand: (id: string) => void;
}

export interface TreeSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
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
