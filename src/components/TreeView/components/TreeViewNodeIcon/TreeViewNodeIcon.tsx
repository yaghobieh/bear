import { FolderIcon, FolderOpenIcon } from '../../../Icon';
import { cn } from '@utils';
import type { TreeViewNodeIconProps } from '../../TreeView.types';

export const TreeViewNodeIcon = (props: TreeViewNodeIconProps) => {
  const { icon, hasChildren, isExpanded, iconClassName } = props;

  if (icon) {
    return icon;
  }

  if (!hasChildren) {
    return null;
  }

  if (isExpanded) {
    return <FolderOpenIcon className={cn(iconClassName, 'bear-text-yellow-500')} />;
  }

  return <FolderIcon className={cn(iconClassName, 'bear-text-yellow-500')} />;
};
