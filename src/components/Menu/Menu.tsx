import { FC, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import type { MenuProps, MenuItemProps, MenuDividerProps } from './Menu.types';

/**
 * MenuItem component for menu items
 */
export const MenuItem: FC<MenuItemProps> = ({
  icon,
  disabled = false,
  selected = false,
  divider = false,
  children,
  onClick,
  className,
  testId,
  ...props
}) => {
  return (
    <>
      <div
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          'ember-flex ember-items-center ember-gap-3 ember-px-4 ember-py-2 ember-cursor-pointer ember-transition-colors',
          'hover:ember-bg-gray-100 dark:hover:ember-bg-gray-700',
          'focus:ember-outline-none focus:ember-bg-gray-100 dark:focus:ember-bg-gray-700',
          selected && 'ember-bg-pink-50 dark:ember-bg-pink-900/20 ember-text-pink-600',
          disabled && 'ember-opacity-50 ember-cursor-not-allowed hover:ember-bg-transparent',
          className
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            onClick?.();
          }
        }}
        data-testid={testId}
        {...props}
      >
        {icon && (
          <span className="ember-flex-shrink-0 ember-text-gray-500">
            {icon}
          </span>
        )}
        <span className="ember-flex-1 ember-text-sm">
          {children}
        </span>
      </div>
      {divider && <MenuDivider />}
    </>
  );
};

/**
 * MenuDivider component for separating menu sections
 */
export const MenuDivider: FC<MenuDividerProps> = ({ className }) => (
  <div className={cn('ember-h-px ember-bg-gray-200 dark:ember-bg-gray-700 ember-my-1', className)} />
);

/**
 * Menu component for dropdown menus
 * 
 * @example
 * ```tsx
 * const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
 * 
 * <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open Menu</Button>
 * 
 * <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
 *   <MenuItem onClick={() => {}}>Option 1</MenuItem>
 *   <MenuItem onClick={() => {}}>Option 2</MenuItem>
 *   <MenuDivider />
 *   <MenuItem onClick={() => {}} disabled>Disabled</MenuItem>
 * </Menu>
 * ```
 */
export const Menu: FC<MenuProps> = ({
  open = false,
  anchorEl,
  onClose,
  children,
  position = 'bottom-start',
  minWidth = 180,
  maxHeight = 300,
  className,
  testId,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Calculate position based on anchor element
  useEffect(() => {
    if (!open || !anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
    let top = 0;
    let left = 0;

    switch (position) {
      case 'bottom-start':
        top = rect.bottom + 4;
        left = rect.left;
        break;
      case 'bottom-end':
        top = rect.bottom + 4;
        left = rect.right - minWidth;
        break;
      case 'top-start':
        top = rect.top - 4;
        left = rect.left;
        break;
      case 'top-end':
        top = rect.top - 4;
        left = rect.right - minWidth;
        break;
    }

    setCoords({ top, left });
  }, [open, anchorEl, position, minWidth]);

  // Handle click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(e.target as Node) &&
        anchorEl &&
        !anchorEl.contains(e.target as Node)
      ) {
        onClose?.();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, anchorEl, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className={cn(
        'ember-fixed ember-z-50 ember-bg-white dark:ember-bg-gray-800',
        'ember-border ember-border-gray-200 dark:ember-border-gray-700',
        'ember-rounded-lg ember-shadow-lg ember-py-1',
        'ember-overflow-y-auto',
        className
      )}
      style={{
        top: coords.top,
        left: coords.left,
        minWidth,
        maxHeight,
      }}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
};

export default Menu;

