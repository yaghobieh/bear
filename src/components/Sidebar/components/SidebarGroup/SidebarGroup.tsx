import { FC, useState } from 'react';
import { cn } from '@utils';
import { ChevronDownIcon } from '../../../Icon';
import type { SidebarGroupProps } from '../../Sidebar.types';
import { SIDEBAR_GROUP_TITLE_CLASSES, SIDEBAR_ICON_SIZE } from '../../Sidebar.const';

export const SidebarGroup: FC<SidebarGroupProps> = (props) => {
  const {
    title,
    children,
    collapsible = false,
    defaultCollapsed = false,
    className,
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={cn('Bear-Sidebar__group bear-mb-4', className)}>
      {title && (
        <button
          type="button"
          onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
          className={cn(
            'Bear-Sidebar__group-title',
            SIDEBAR_GROUP_TITLE_CLASSES,
            collapsible && 'bear-cursor-pointer hover:bear-text-zinc-600 dark:hover:bear-text-zinc-300'
          )}
        >
          {collapsible && (
            <ChevronDownIcon
              size={SIDEBAR_ICON_SIZE - 2}
              className={cn(
                'bear-transition-transform',
                isCollapsed && '-bear-rotate-90'
              )}
            />
          )}
          {title}
        </button>
      )}
      {!isCollapsed && <div className="Bear-Sidebar__group-content bear-space-y-1">{children}</div>}
    </div>
  );
};

export default SidebarGroup;

