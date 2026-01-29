import { FC, useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@utils';
import {
  RICH_EDITOR_BUTTON_BASE_CLASSES,
  RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
  RICH_EDITOR_BUTTON_DISABLED_CLASSES,
} from '../../RichEditor.const';

export interface ToolbarMoreProps {
  children: ReactNode;
  disabled?: boolean;
}

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ToolbarMore: FC<ToolbarMoreProps> = ({ children, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="Bear-RichEditor__more relative">
      <button
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
        <PlusIcon />
      </button>

      {isOpen && (
        <div 
          className="Bear-RichEditor__more-menu absolute top-full right-0 mt-1 p-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl z-50 min-w-[200px]"
        >
          <div className="flex flex-wrap items-center gap-0.5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolbarMore;

