import { FC, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type { ToolbarColorPickerProps } from '../../RichEditor.types';
import {
  RICH_EDITOR_BUTTON_BASE_CLASSES,
  RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
  RICH_EDITOR_BUTTON_DISABLED_CLASSES,
  RICH_EDITOR_COLORS,
} from '../../RichEditor.const';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { FormatColorTextIcon, HighlightIcon } from '../../../Icon/icons/editor';
import { CheckIcon } from '../../../Icon/icons/status';

export const ToolbarColorPicker: FC<ToolbarColorPickerProps> = (props) => {
  const {
    value,
    onChange,
    title,
    disabled,
    type = 'text',
    recentColors = [],
    onApplyLast,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    if (isOpen && isMobile && triggerRef.current && typeof document !== 'undefined') {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow >= 240 || spaceBelow >= spaceAbove) {
        setMenuPosition({ top: rect.bottom + 4, left: Math.max(8, Math.min(rect.left, window.innerWidth - 220)) });
      } else {
        setMenuPosition({ top: rect.top - 244, left: Math.max(8, Math.min(rect.left, window.innerWidth - 220)) });
      }
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  const Icon = type === 'text' ? FormatColorTextIcon : HighlightIcon;
  const lastColor = recentColors[0] || value;

  const menuContent = (
    <div
      className={cn(
        'Bear-RichEditor__color-menu p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl min-w-[200px] max-w-[min(90vw,240px)]',
        isMobile ? 'fixed z-[9999]' : 'absolute bottom-full left-0 mb-1'
      )}
      style={isMobile ? { top: menuPosition.top, left: menuPosition.left } : undefined}
    >
      {recentColors.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Recent</p>
          <div className="flex gap-1 flex-wrap">
            {recentColors.slice(0, 6).map((color, idx) => (
              <button
                key={`recent-${idx}`}
                type="button"
                onClick={() => handleSelect(color)}
                className={cn(
                  'w-6 h-6 rounded-full border border-gray-300 dark:border-zinc-600 transition-transform hover:scale-110 touch-manipulation',
                  value === color && 'ring-2 ring-pink-500 ring-offset-1 dark:ring-offset-zinc-800'
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-8 gap-1">
        {RICH_EDITOR_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleSelect(color)}
            className={cn(
              'Bear-RichEditor__color-swatch w-5 h-5 rounded-full border border-gray-300 dark:border-zinc-600 transition-transform hover:scale-110 touch-manipulation',
              value === color && 'ring-2 ring-pink-500 ring-offset-1 dark:ring-offset-zinc-800'
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => handleSelect('')}
        className="w-full mt-2 px-2 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded transition-colors touch-manipulation"
      >
        Remove {type === 'text' ? 'color' : 'highlight'}
      </button>
    </div>
  );

  return (
    <div ref={pickerRef} className="Bear-RichEditor__color-picker relative flex items-center">
      <button
        ref={triggerRef}
        type="button"
        title={title}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'Bear-RichEditor__color-trigger',
          RICH_EDITOR_BUTTON_BASE_CLASSES,
          RICH_EDITOR_BUTTON_INACTIVE_CLASSES,
          'flex items-center gap-0.5',
          disabled && `Bear-RichEditor__color-trigger--disabled ${RICH_EDITOR_BUTTON_DISABLED_CLASSES}`
        )}
      >
        <Icon size={16} />
        <span 
          className="w-3 h-1 rounded-sm mt-0.5" 
          style={{ backgroundColor: value || (type === 'text' ? '#000000' : '#fef08a') }}
        />
      </button>

      {lastColor && onApplyLast && (
        <button
          type="button"
          title={`Apply ${type === 'text' ? 'text' : 'highlight'} color`}
          disabled={disabled}
          onClick={() => onApplyLast(lastColor)}
          className={cn(
            'Bear-RichEditor__color-apply',
            'p-0.5 rounded transition-colors',
            'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <CheckIcon size={12} />
        </button>
      )}

      {isOpen && (isMobile && typeof document !== 'undefined'
        ? createPortal(menuContent, document.body)
        : menuContent
      )}
    </div>
  );
};

export default ToolbarColorPicker;
