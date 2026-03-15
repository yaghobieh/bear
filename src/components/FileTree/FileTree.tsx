import { FC, useMemo } from 'react';
import { TreeView } from '../TreeView';
import type { FileTreeProps, FileTreeNode } from './FileTree.types';
import { BearIcons } from '../Icon';
import { fileNodeToTreeNode } from './FileTree.utils';

const FileIcon = (
  <BearIcons.ArticleIcon size="xs" className="bear-text-gray-400" />
);

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
  const treeData = useMemo(() => items.map((n) => fileNodeToTreeNode(n, 0, FileIcon)), [items]);

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
