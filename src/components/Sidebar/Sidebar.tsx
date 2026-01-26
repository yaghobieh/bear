import { FC, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '../Icon';
import type { SidebarProps, SidebarItemProps, SidebarGroupProps } from './Sidebar.types';

const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const SidebarItemComponent: FC<SidebarItemProps> = ({
  item,
  isActive,
  collapsed,
  depth = 0,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = collapsed ? 16 : 16 + depth * 12;

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
        <span className="bear-shrink-0 bear-w-5 bear-h-5 bear-flex bear-items-center bear-justify-center">
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="bear-flex-1 bear-truncate">{item.label}</span>
          {item.badge && <span className="bear-ml-auto">{item.badge}</span>}
          {hasChildren && (
            <ChevronDownIcon
              size={14}
              className={cn(
                'bear-ml-1 bear-transition-transform bear-duration-200',
                isOpen && 'bear-rotate-180'
              )}
            />
          )}
        </>
      )}
    </>
  );

  const itemClassName = cn(
    'bear-flex bear-items-center bear-gap-3 bear-py-2.5 bear-px-3 bear-rounded-lg bear-text-sm bear-transition-all bear-duration-200 bear-cursor-pointer',
    isActive
      ? 'bear-bg-bear-500 bear-text-white bear-shadow-md'
      : 'bear-text-zinc-600 hover:bear-bg-zinc-100 hover:bear-text-zinc-900',
    item.disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none',
    collapsed && 'bear-justify-center'
  );

  const Element = item.href ? 'a' : 'button';

  return (
    <div>
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
        <div className="bear-mt-1">
          {item.children!.map((child) => (
            <SidebarItemComponent
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

export const SidebarGroup: FC<SidebarGroupProps> = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={cn('bear-mb-4', className)}>
      {title && (
        <button
          type="button"
          onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
          className={cn(
            'bear-flex bear-items-center bear-gap-2 bear-px-3 bear-py-2 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider bear-text-zinc-400',
            collapsible && 'bear-cursor-pointer hover:bear-text-zinc-600'
          )}
        >
          {collapsible && (
            <ChevronDownIcon
              size={12}
              className={cn(
                'bear-transition-transform',
                isCollapsed && '-bear-rotate-90'
              )}
            />
          )}
          {title}
        </button>
      )}
      {!isCollapsed && <div className="bear-space-y-1">{children}</div>}
    </div>
  );
};

export const Sidebar: FC<SidebarProps> = ({
  items,
  collapsed = false,
  onCollapsedChange,
  width = SIDEBAR_WIDTH,
  collapsedWidth = SIDEBAR_COLLAPSED_WIDTH,
  header,
  footer,
  activeItemId,
  onItemClick,
  variant = 'default',
  position = 'left',
  className,
  style,
}) => {
  const currentWidth = collapsed ? collapsedWidth : width;

  const variantStyles = {
    default: 'bear-bg-white dark:bear-bg-gray-900 bear-border-zinc-200 dark:bear-border-zinc-700',
    bordered: 'bear-bg-white dark:bear-bg-gray-900 bear-border-2 bear-border-zinc-300 dark:bear-border-zinc-600 bear-rounded-xl bear-m-2',
    floating: 'bear-bg-white/95 dark:bear-bg-gray-900/95 bear-backdrop-blur-sm bear-shadow-2xl bear-rounded-xl bear-m-3',
  };

  const borderSide = position === 'left' ? 'bear-border-r' : 'bear-border-l';

  return (
    <aside
      className={cn(
        'bear-flex bear-flex-col bear-h-full bear-transition-all bear-duration-300',
        variant === 'default' && borderSide,
        variantStyles[variant],
        className
      )}
      style={{ width: currentWidth, ...style }}
    >
      {header && (
        <div className="bear-px-3 bear-py-4 bear-border-b bear-border-zinc-100 bear-flex bear-items-center bear-justify-between">
          {!collapsed && header}
          {onCollapsedChange && (
            <button
              type="button"
              onClick={() => onCollapsedChange(!collapsed)}
              className="bear-p-1.5 bear-rounded-lg bear-text-zinc-400 hover:bear-bg-zinc-100 hover:bear-text-zinc-600 bear-transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                position === 'left' ? <ChevronRightIcon size={18} /> : <ChevronLeftIcon size={18} />
              ) : (
                position === 'left' ? <ChevronLeftIcon size={18} /> : <ChevronRightIcon size={18} />
              )}
            </button>
          )}
        </div>
      )}

      <nav className="bear-flex-1 bear-overflow-y-auto bear-px-2 bear-py-3 bear-space-y-1">
        {items.map((item) => (
          <SidebarItemComponent
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            collapsed={collapsed}
            onClick={onItemClick}
          />
        ))}
      </nav>

      {footer && (
        <div className="bear-px-3 bear-py-3 bear-border-t bear-border-zinc-100 bear-mt-auto">
          {!collapsed ? footer : null}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

