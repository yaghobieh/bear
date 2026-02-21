import { FC, useMemo } from 'react';
import { TreeView } from '../TreeView';
import type { TreeNode } from '../TreeView/TreeView.types';
import type { FileTreeProps, FileTreeNode } from './FileTree.types';
import { BearIcons } from '../Icon';

const FileIcon = () => (
  <BearIcons.ArticleIcon size="xs" className="bear-text-gray-400" />
);

function fileNodeToTreeNode(node: FileTreeNode, depth = 0): TreeNode {
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === 'folder' || hasChildren;
  return {
    id: node.id,
    label: node.label,
    disabled: node.disabled,
    data: node.data,
    icon: node.icon ?? (isFolder ? undefined : <FileIcon />),
    children: node.children?.map((c) => fileNodeToTreeNode(c, depth + 1)),
  };
}

export const FileTree: FC<FileTreeProps> = ({
  items,
  selectedId,
  defaultExpandedIds = [],
  onSelect,
  onExpand,
  size = 'md',
  showLines = false,
  className,
  testId,
}) => {
  const treeData = useMemo(() => items.map(fileNodeToTreeNode), [items]);

  return (
    <div data-testid={testId}>
      <TreeView
        data={treeData}
        selectedId={selectedId}
        defaultExpandedIds={defaultExpandedIds}
        onSelect={onSelect ? (n) => onSelect(n.data as FileTreeNode) : undefined}
        onExpand={onExpand}
        size={size}
        showLines={showLines}
        className={className}
      />
    </div>
  );
};
