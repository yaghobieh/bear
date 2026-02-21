import type { ReactNode } from 'react';

export interface FileTreeNode {
  id: string;
  label: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
  icon?: ReactNode;
  disabled?: boolean;
  data?: unknown;
}

export interface FileTreeProps {
  /** Tree data (files and folders) */
  items: FileTreeNode[];
  /** Selected node id */
  selectedId?: string;
  /** Initially expanded folder ids */
  defaultExpandedIds?: string[];
  /** Called when a node is selected */
  onSelect?: (node: FileTreeNode) => void;
  /** Called when a folder is expanded/collapsed */
  onExpand?: (nodeId: string, expanded: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show connecting lines */
  showLines?: boolean;
  /** Class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
