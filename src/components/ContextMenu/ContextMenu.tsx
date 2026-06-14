import { useState, useRef, useEffect, useCallback } from 'react';
import { resolveBearId, useBearId } from '@utils';
import type { ContextMenuProps } from './ContextMenu.types';
import { CONTEXT_MENU_DATA_ATTR } from './ContextMenu.const';
import { ContextMenuMenuList } from './components/ContextMenuMenuList';

export const ContextMenu = (props: ContextMenuProps) => {
  const { id, items, children, disabled = false, onOpenChange, testId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const generatedId = useBearId('ContextMenu');
  const domId = resolveBearId(id, generatedId);

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
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current?.contains(target)) return;
      const menus = document.querySelectorAll(`[${CONTEXT_MENU_DATA_ATTR}]`);
      for (let i = 0; i < menus.length; i += 1) {
        if (menus[i].contains(target)) return;
      }
      close();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, close]);

  return (
    <div ref={wrapperRef} id={domId} onContextMenu={handleContextMenu} data-testid={testId}>
      {children}
      {isOpen && <ContextMenuMenuList items={items} position={pos} onClose={close} />}
    </div>
  );
};
