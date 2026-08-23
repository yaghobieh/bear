import { useState, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { cn } from '@utils';
import { OverlayPortal } from '../../../OverlayPortal';
import { Tooltip } from '../../../Tooltip';
import { ANCHOR_DEFAULT_Z_INDEX, useClickOutsideMultiple, useFixedAnchorPosition } from '@hooks';
import { FOUR_HUNDRED, SIXTEEN, TWO_HUNDRED_TWENTY } from '@const';
import { TITLE_MORE_OPTIONS } from '../../RichEditor.const';
import { MoreHorizIcon } from '../../../Icon';

export interface ToolbarMoreProps {
  children: ReactNode;
  disabled?: boolean;
  isMobile?: boolean;
}

export const ToolbarMore = (props: ToolbarMoreProps) => {
  const { children, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { style, ready } = useFixedAnchorPosition({
    anchorRef: triggerRef,
    open: isOpen,
    minWidthPx: TWO_HUNDRED_TWENTY,
    placement: 'bottom-end',
  });

  useClickOutsideMultiple(
    [triggerRef as RefObject<HTMLElement>, menuRef as RefObject<HTMLElement>],
    () => setIsOpen(false),
    { enabled: isOpen }
  );

  return (
    <div className="Bear-RichEditor__more relative">
      <Tooltip content={TITLE_MORE_OPTIONS} delay={FOUR_HUNDRED} position="top">
        <button
          ref={triggerRef}
          type="button"
          aria-label={TITLE_MORE_OPTIONS}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'Bear-RichEditor__more-trigger p-1.5 rounded transition-colors',
            'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700',
            'flex items-center justify-center',
            isOpen && 'bg-primary-500 text-white',
            disabled && 'Bear-RichEditor__more-trigger--disabled opacity-50 cursor-not-allowed'
          )}
        >
          <MoreHorizIcon size={SIXTEEN} />
        </button>
      </Tooltip>

      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={style}
        zIndex={ANCHOR_DEFAULT_Z_INDEX}
        panelRef={menuRef}
        className="Bear-RichEditor__more-menu p-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl min-w-[200px] max-w-[min(90vw,280px)] max-h-[70vh] overflow-y-auto"
      >
        <div className="flex flex-wrap items-center gap-0.5">{children}</div>
      </OverlayPortal>
    </div>
  );
};
