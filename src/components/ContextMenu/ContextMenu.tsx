import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import type { ContextMenuProps, ContextMenuEntry, ContextMenuItem } from './ContextMenu.types';
import {
  MENU_CLASSES, ITEM_CLASSES, ITEM_DISABLED_CLASSES, ITEM_DANGER_CLASSES,
  DIVIDER_CLASSES, ICON_CLASSES, SHORTCUT_CLASSES, SUB_INDICATOR_CLASSES, SUB_MENU_OFFSET,
} from './ContextMenu.const';

const isDivider = (entry: ContextMenuEntry): entry is { id: string; type: 'divider' } =>
  'type' in entry && entry.type === 'divider';

const MenuList: FC<{
  items: ContextMenuEntry[];
  position: { x: number; y: number };
  onClose: () => void;
}> = ({ items, position, onClose }) => {
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [subPos, setSubPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleItemClick = useCallback((item: ContextMenuItem) => {
    if (item.disabled || item.children) return;
    item.onClick?.();
    onClose();
  }, [onClose]);

  const handleMouseEnter = useCallback((item: ContextMenuItem, e: React.MouseEvent) => {
    if (item.children) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setSubPos({ x: rect.right + SUB_MENU_OFFSET, y: rect.top });
      setSubOpen(item.id);
    } else {
      setSubOpen(null);
    }
  }, []);

  return (
    <div ref={menuRef} className={MENU_CLASSES} style={{ left: position.x, top: position.y }} role="menu">
      {items.map((entry) => {
        if (isDivider(entry)) return <div key={entry.id} className={DIVIDER_CLASSES} role="separator" />;
        const item = entry as ContextMenuItem;
        return (
          <div key={item.id}>
            <div
              className={cn(ITEM_CLASSES, item.disabled && ITEM_DISABLED_CLASSES, item.danger && ITEM_DANGER_CLASSES)}
              onClick={() => handleItemClick(item)}
              onMouseEnter={(e) => handleMouseEnter(item, e)}
              role="menuitem"
              aria-disabled={item.disabled}
            >
              <span className="bear-flex bear-items-center">
                {item.icon && <span className={ICON_CLASSES}>{item.icon}</span>}
                {item.label}
              </span>
              <span className="bear-flex bear-items-center">
                {item.shortcut && <span className={SHORTCUT_CLASSES}>{item.shortcut}</span>}
                {item.children && <span className={SUB_INDICATOR_CLASSES}>▸</span>}
              </span>
            </div>
            {item.children && subOpen === item.id && (
              <MenuList items={item.children} position={subPos} onClose={onClose} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ContextMenu: FC<ContextMenuProps> = ({ items, children, disabled = false, onOpenChange, testId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
    onOpenChange?.(true);
  }, [disabled, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = () => close();
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey); };
  }, [isOpen, close]);

  return (
    <div ref={wrapperRef} onContextMenu={handleContextMenu} data-testid={testId}>
      {children}
      {isOpen && <MenuList items={items} position={pos} onClose={close} />}
    </div>
  );
};

export default ContextMenu;
