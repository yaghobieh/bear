import { FC, useState, useCallback } from 'react';
import { cn } from '@utils';
import { ChevronDownIcon } from '../../../Icon';
import type { SidebarItemComponentProps } from '../../Sidebar.types';
import {
  SIDEBAR_PADDING_BASE,
  SIDEBAR_DEPTH_INDENT,
  SIDEBAR_ICON_SIZE,
  SIDEBAR_ITEM_BASE_CLASSES,
  SIDEBAR_ITEM_ACTIVE_BY_VARIANT,
  SIDEBAR_ITEM_INACTIVE_CLASSES,
  SIDEBAR_ITEM_DISABLED_CLASSES,
} from '../../Sidebar.const';

export const SidebarItem: FC<SidebarItemComponentProps> = (props) => {
  const {
    item,
    isActive,
    collapsed,
    depth = 0,
    onClick,
    activeVariant = 'fill',
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = collapsed ? SIDEBAR_PADDING_BASE : SIDEBAR_PADDING_BASE + depth * SIDEBAR_DEPTH_INDENT;

  const handleClick = useCallback(() => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
    if (item.onClick) {
      item.onClick();
    }
    onClick?.(item);
  }, [hasChildren, item, onClick]);

  const content = (
    <>
      {item.icon && (
        <span className="Bear-Sidebar__item-icon bear-shrink-0 bear-w-5 bear-h-5 bear-flex bear-items-center bear-justify-center">
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="Bear-Sidebar__item-label bear-flex-1 bear-truncate">{item.label}</span>
          {item.badge && <span className="Bear-Sidebar__item-badge bear-ml-auto">{item.badge}</span>}
          {hasChildren && (
            <ChevronDownIcon
              size={SIDEBAR_ICON_SIZE}
              className={cn(
                'Bear-Sidebar__item-chevron bear-ml-1 bear-transition-transform bear-duration-200',
                isOpen && 'bear-rotate-180'
              )}
            />
          )}
        </>
      )}
    </>
  );

  const activeClasses = SIDEBAR_ITEM_ACTIVE_BY_VARIANT[activeVariant];
  const itemClassName = cn(
    'Bear-Sidebar__item',
    SIDEBAR_ITEM_BASE_CLASSES,
    isActive
      ? `Bear-Sidebar__item--active ${activeClasses}`
      : SIDEBAR_ITEM_INACTIVE_CLASSES,
    item.disabled && `Bear-Sidebar__item--disabled ${SIDEBAR_ITEM_DISABLED_CLASSES}`,
    collapsed && 'Bear-Sidebar__item--collapsed bear-justify-center'
  );

  const Element = item.href ? 'a' : 'button';

  return (
    <div className="Bear-Sidebar__item-wrapper">
      <Element
        href={item.href}
        onClick={handleClick}
        disabled={item.disabled}
        className={itemClassName}
        style={{ paddingLeft }}
        title={collapsed ? item.label : undefined}
      >
        {content}
      </Element>
      {hasChildren && isOpen && !collapsed && (
        <div className="Bear-Sidebar__children bear-mt-1">
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              isActive={false}
              collapsed={collapsed}
              depth={depth + 1}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;

