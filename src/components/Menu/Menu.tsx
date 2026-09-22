import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@utils';
import { resolveOverlayEffects } from '@hooks/useFixedAnchorPosition';
import { Portal } from '../Portal';
import { MENU_Z_INDEX, MENU_EFFECT_CLASS_MAP } from './Menu.const';
import type { MenuProps } from './Menu.types';

export { MenuItem } from './MenuItem';
export { MenuDivider } from './MenuDivider';

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

  useLayoutEffect(() => {
    if (!open || !anchorEl) return;

    const update = () => {
      const rect = anchorEl.getBoundingClientRect();
      const menuEl = menuRef.current;
      const menuH = menuEl ? menuEl.offsetHeight : Math.min(maxHeight, 200);
      let top = 0;
      let left = 0;

      switch (position) {
        case 'bottom-start':
          top = rect.bottom + 4;
          left = rect.left;
          break;
        case 'bottom-end':
          top = rect.bottom + 4;
          left = rect.right - (menuEl?.offsetWidth ?? minWidth);
          break;
        case 'top-start':
          top = rect.top - menuH - 4;
          left = rect.left;
          break;
        case 'top-end':
          top = rect.top - menuH - 4;
          left = rect.right - (menuEl?.offsetWidth ?? minWidth);
          break;
        case 'right-start':
          top = rect.top;
          left = rect.right + 4;
          break;
        case 'left-start':
          top = rect.top;
          left = rect.left - (menuEl?.offsetWidth ?? minWidth) - 4;
          break;
      }

      setCoords({ top, left });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, anchorEl, position, minWidth, maxHeight]);

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

  const { openEffect } = resolveOverlayEffects(props, 'fade');
  const effectClass = MENU_EFFECT_CLASS_MAP[openEffect] ?? MENU_EFFECT_CLASS_MAP.fade;

  if (!open) return null;

  return (
    <Portal>
      <div
        ref={menuRef}
        role="menu"
        className={cn(
          'bear-fixed bear-bg-white dark:bear-bg-gray-800',
          'bear-border bear-border-gray-200 dark:bear-border-gray-700',
          'bear-rounded-lg bear-shadow-lg bear-py-1',
          'bear-overflow-y-auto',
          effectClass,
          className
        )}
        style={{
          top: coords.top,
          left: coords.left,
          minWidth,
          maxHeight,
          zIndex: MENU_Z_INDEX,
        }}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Menu;
