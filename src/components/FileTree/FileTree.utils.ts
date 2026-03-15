import type { TreeNode } from '../TreeView/TreeView.types';
import type { FileTreeNode } from './FileTree.types';
import type { ReactNode } from 'react';

export function fileNodeToTreeNode(node: FileTreeNode, depth = 0, fileIcon?: ReactNode): TreeNode {
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === 'folder' || hasChildren;
  return {
    id: node.id,
    label: node.label,
    disabled: node.disabled,
    data: node.data,
    icon: node.icon ?? (isFolder ? undefined : fileIcon),
    children: node.children?.map((c) => fileNodeToTreeNode(c, depth + 1, fileIcon)),
  };
}
