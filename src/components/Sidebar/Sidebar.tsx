import { FC } from 'react';
import { cn } from '@utils';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icon';
import { SidebarItem } from './components/SidebarItem';
import type { SidebarProps } from './Sidebar.types';
import {
  SIDEBAR_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_TOGGLE_ICON_SIZE,
  SIDEBAR_VARIANT_STYLES,
  SIDEBAR_HEADER_CLASSES,
  SIDEBAR_FOOTER_CLASSES,
  SIDEBAR_TOGGLE_CLASSES,
} from './Sidebar.const';

/**
 * Sidebar - Collapsible navigation sidebar with nested items
 * 
 * @example
 * ```tsx
 * <Sidebar
 *   items={items}
 *   activeItemId={active}
 *   onItemClick={(item) => setActive(item.id)}
 *   header={<span>My App</span>}
 * />
 * ```
 */
export const Sidebar: FC<SidebarProps> = (props) => {
  const {
    items,
    collapsed = false,
    onCollapsedChange,
    width = SIDEBAR_WIDTH,
    collapsedWidth = SIDEBAR_COLLAPSED_WIDTH,
    header,
    footer,
    showHeader = true,
    activeItemId,
    onItemClick,
    activeVariant = 'fill',
    fullHeight = false,
    variant = 'default',
    position = 'left',
    className,
    style,
    testId,
    id,
  } = props;

  const currentWidth = collapsed ? collapsedWidth : width;
  const borderSide = position === 'left' ? 'bear-border-r' : 'bear-border-l';
  const showHeaderArea = showHeader && header;

  return (
    <aside
      id={id}
      data-testid={testId}
      className={cn(
        'Bear-Sidebar',
        `Bear-Sidebar--${variant}`,
        collapsed && 'Bear-Sidebar--collapsed',
        'bear-flex bear-flex-col bear-h-full bear-transition-all bear-duration-300',
        fullHeight && 'bear-min-h-full',
        variant === 'default' && borderSide,
        SIDEBAR_VARIANT_STYLES[variant],
        className
      )}
      style={{ width: currentWidth, ...style }}
    >
      {showHeaderArea && (
        <div className={cn('Bear-Sidebar__header', SIDEBAR_HEADER_CLASSES)}>
          {!collapsed && header}
          {onCollapsedChange && (
            <button
              type="button"
              onClick={() => onCollapsedChange(!collapsed)}
              className={cn('Bear-Sidebar__toggle', SIDEBAR_TOGGLE_CLASSES)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                position === 'left' ? <ChevronRightIcon size={SIDEBAR_TOGGLE_ICON_SIZE} /> : <ChevronLeftIcon size={SIDEBAR_TOGGLE_ICON_SIZE} />
              ) : (
                position === 'left' ? <ChevronLeftIcon size={SIDEBAR_TOGGLE_ICON_SIZE} /> : <ChevronRightIcon size={SIDEBAR_TOGGLE_ICON_SIZE} />
              )}
            </button>
          )}
        </div>
      )}

      <nav className="Bear-Sidebar__nav bear-flex-1 bear-overflow-y-auto bear-px-2 bear-py-3 bear-space-y-1 bear-min-h-0">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            collapsed={collapsed}
            onClick={onItemClick}
            activeVariant={activeVariant}
          />
        ))}
      </nav>

      {footer && (
        <div className={cn('Bear-Sidebar__footer', SIDEBAR_FOOTER_CLASSES)}>
          {!collapsed ? footer : null}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
