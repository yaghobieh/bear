import { useState, useRef } from 'react';
import type { RefObject } from 'react';
import { cn } from '@utils';
import {
  ANCHOR_DEFAULT_Z_INDEX,
  useClickOutsideMultiple,
  useFixedAnchorPosition,
} from '@hooks';
import {
  COLOR_BLACK,
  COLOR_HIGHLIGHT_YELLOW,
  COLOR_TYPE_TEXT,
  FOUR_HUNDRED,
  TWO_HUNDRED_FORTY,
  SIXTEEN,
  TWELVE,
  ZERO,
} from '@const';
import { CheckIcon, FormatColorTextIcon, HighlightIcon } from '../../../Icon';
import { OverlayPortal } from '../../../OverlayPortal';
import { Tooltip } from '../../../Tooltip';
import type { ToolbarColorPickerProps } from '../../RichEditor.types';
import { RICH_EDITOR_COLORS } from '../../RichEditor.const';
import { COLOR_RECENT_MAX } from './ToolbarColorPicker.const';

export const ToolbarColorPicker = (props: ToolbarColorPickerProps) => {
  const {
    value,
    onChange,
    title,
    disabled,
    type = COLOR_TYPE_TEXT,
    recentColors = [],
    onApplyLast,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { style, ready } = useFixedAnchorPosition({
    anchorRef: triggerRef,
    open: isOpen,
    minWidthPx: TWO_HUNDRED_FORTY,
  });

  useClickOutsideMultiple(
    [triggerRef as RefObject<HTMLElement>, menuRef as RefObject<HTMLElement>],
    () => setIsOpen(false),
    { enabled: isOpen }
  );

  const handleSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  const Icon = type === COLOR_TYPE_TEXT ? FormatColorTextIcon : HighlightIcon;
  const lastColor = recentColors[ZERO] || value;
  const fallbackSwatch = type === COLOR_TYPE_TEXT ? COLOR_BLACK : COLOR_HIGHLIGHT_YELLOW;
  const applyTitle = type === COLOR_TYPE_TEXT ? 'Apply last text color' : 'Apply last highlight color';

  return (
    <div className="Bear-RichEditor__color-picker relative flex items-center">
      <Tooltip content={title} delay={FOUR_HUNDRED} position="top">
        <button
          ref={triggerRef}
          type="button"
          aria-label={title}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'Bear-RichEditor__color-trigger p-1.5 rounded transition-colors',
            'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700',
            'flex items-center gap-0.5',
            disabled && 'Bear-RichEditor__color-trigger--disabled opacity-50 cursor-not-allowed'
          )}
        >
          <Icon size={SIXTEEN} />
          <span className="w-3 h-1 rounded-sm mt-0.5" style={{ backgroundColor: value || fallbackSwatch }} />
        </button>
      </Tooltip>

      {lastColor && onApplyLast && (
        <Tooltip content={applyTitle} delay={FOUR_HUNDRED} position="top">
          <button
            type="button"
            aria-label={applyTitle}
            disabled={disabled}
            onClick={() => onApplyLast(lastColor)}
            className={cn(
              'Bear-RichEditor__color-apply p-0.5 rounded transition-colors',
              'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <CheckIcon size={TWELVE} />
          </button>
        </Tooltip>
      )}

      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={style}
        zIndex={ANCHOR_DEFAULT_Z_INDEX}
        panelRef={menuRef}
        className="Bear-RichEditor__color-menu p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl min-w-[200px] max-w-[min(90vw,240px)]"
      >
        {recentColors.length > ZERO && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Recent</p>
            <div className="flex gap-1 flex-wrap">
              {recentColors.slice(ZERO, COLOR_RECENT_MAX).map((color, index) => (
                <button
                  key={`recent-${index}`}
                  type="button"
                  onClick={() => handleSelect(color)}
                  className={cn(
                    'w-6 h-6 rounded-full border border-gray-300 dark:border-zinc-600 transition-transform hover:scale-110 touch-manipulation',
                    value === color && 'ring-2 ring-primary-500 ring-offset-1 dark:ring-offset-zinc-800'
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
                value === color && 'ring-2 ring-primary-500 ring-offset-1 dark:ring-offset-zinc-800'
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
          Remove {type === COLOR_TYPE_TEXT ? 'color' : 'highlight'}
        </button>
      </OverlayPortal>
    </div>
  );
};
