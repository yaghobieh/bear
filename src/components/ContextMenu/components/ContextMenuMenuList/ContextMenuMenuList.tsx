import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { ContextMenuEntry, ContextMenuItem } from '../../ContextMenu.types';
import {
  CONTEXT_MENU_DATA_ATTR,
  MENU_CLASSES,
  ITEM_CLASSES,
  ITEM_DISABLED_CLASSES,
  ITEM_DANGER_CLASSES,
  DIVIDER_CLASSES,
  ICON_CLASSES,
  SHORTCUT_CLASSES,
  SUB_INDICATOR_CLASSES,
  ITEM_ROW_CLASSES,
  SUB_MENU_OFFSET,
} from '../../ContextMenu.const';
import { clampMenuPosition, isDivider } from '../../ContextMenu.utils';

type ContextMenuMenuListProps = {
  items: ContextMenuEntry[];
  position: { x: number; y: number };
  onClose: () => void;
};

export const ContextMenuMenuList = (props: ContextMenuMenuListProps) => {
  const { items, position, onClose } = props;
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [subPos, setSubPos] = useState({ x: 0, y: 0 });
  const [adjustedPos, setAdjustedPos] = useState(position);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setAdjustedPos(position);
  }, [position.x, position.y]);

  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const next = clampMenuPosition(adjustedPos, el);
    if (next.x !== adjustedPos.x || next.y !== adjustedPos.y) {
      setAdjustedPos(next);
    }
  }, [adjustedPos.x, adjustedPos.y, items]);

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

  const menu = (
    <div
      ref={menuRef}
      {...{ [CONTEXT_MENU_DATA_ATTR]: true }}
      className={MENU_CLASSES}
      style={{ left: adjustedPos.x, top: adjustedPos.y }}
      role="menu"
      onMouseDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
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
              <span className={ITEM_ROW_CLASSES}>
                {item.icon && <span className={ICON_CLASSES}>{item.icon}</span>}
                {item.label}
              </span>
              <span className={ITEM_ROW_CLASSES}>
                {item.shortcut && <span className={SHORTCUT_CLASSES}>{item.shortcut}</span>}
                {item.children && <span className={SUB_INDICATOR_CLASSES}>▸</span>}
              </span>
            </div>
            {item.children && subOpen === item.id && (
              <ContextMenuMenuList items={item.children} position={subPos} onClose={onClose} />
            )}
          </div>
        );
      })}
    </div>
  );

  return createPortal(menu, document.body);
};
