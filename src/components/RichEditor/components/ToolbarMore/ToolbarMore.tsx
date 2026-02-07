import { FC, useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import {
  RICH_EDITOR_BUTTON_BASE_CLASSES,
  RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
  RICH_EDITOR_BUTTON_DISABLED_CLASSES,
} from '../../RichEditor.const';

export interface ToolbarMoreProps {
  children: ReactNode;
  disabled?: boolean;
  /** When true, render menu via portal for mobile (avoids clipping) */
  isMobile?: boolean;
}

const EllipsisIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const ToolbarMore: FC<ToolbarMoreProps> = ({ children, disabled, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        const target = event.target as Element;
        if (!target.closest?.('.Bear-RichEditor__more-menu')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile && triggerRef.current && typeof document !== 'undefined') {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + 4, left: Math.max(8, rect.right - 220) });
    }
  }, [isOpen, isMobile]);

  const menuContent = (
    <div
      className={cn(
        'Bear-RichEditor__more-menu p-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl min-w-[200px] max-w-[min(90vw,280px)] max-h-[70vh] overflow-y-auto',
        isMobile ? 'fixed z-[9999]' : 'absolute top-full right-0 mt-1 z-50'
      )}
      style={isMobile ? { top: menuPosition.top, left: menuPosition.left } : undefined}
    >
      <div className="flex flex-wrap items-center gap-0.5">
        {children}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="Bear-RichEditor__more relative">
      <button
        ref={triggerRef}
        type="button"
        title="More options"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'Bear-RichEditor__more-trigger',
          RICH_EDITOR_BUTTON_BASE_CLASSES,
          RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
          'flex items-center justify-center',
          isOpen && 'bg-pink-500 text-white',
          disabled && `Bear-RichEditor__more-trigger--disabled ${RICH_EDITOR_BUTTON_DISABLED_CLASSES}`
        )}
      >
        <EllipsisIcon />
      </button>

      {isOpen && (isMobile && typeof document !== 'undefined'
        ? createPortal(menuContent, document.body)
        : menuContent
      )}
    </div>
  );
};

export default ToolbarMore;

