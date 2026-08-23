import { ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: unknown;
}

export interface TreeViewExpandControlProps {
  hasChildren: boolean;
  isExpanded: boolean;
  nodeId: string;
  iconClassName: string;
  onToggle: (nodeId: string) => void;
}

export interface TreeViewNodeIconProps {
  icon?: ReactNode;
  hasChildren: boolean;
  isExpanded: boolean;
  iconClassName: string;
}

export interface TreeViewNodeProps {
  node: TreeNode;
  depth: number;
  size: NonNullable<TreeViewProps['size']>;
  selectedId?: string;
  checkedIds: string[];
  expandedIds: Set<string>;
  showCheckboxes: boolean;
  showLines: boolean;
  onSelect?: (node: TreeNode) => void;
  onCheck?: (nodeId: string, checked: boolean) => void;
  onToggle: (nodeId: string) => void;
}

export interface TreeViewProps {
  testId?: string;
  id?: string;
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

