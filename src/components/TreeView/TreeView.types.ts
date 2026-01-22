import { ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: unknown;
}

export interface TreeViewProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  onExpand?: (nodeId: string, expanded: boolean) => void;
  selectedId?: string;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  multiSelect?: boolean;
  selectedIds?: string[];
  showCheckboxes?: boolean;
  onCheck?: (nodeId: string, checked: boolean) => void;
  checkedIds?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLines?: boolean;
}

