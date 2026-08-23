import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { cn } from '@utils';
import {
  ANCHOR_DEFAULT_Z_INDEX,
  useClickOutsideMultiple,
  useFixedAnchorPosition,
} from '@hooks';
import { FOUR_HUNDRED, SIXTEEN, TWO_HUNDRED } from '@const';
import { EditIcon } from '../../../Icon';
import { OverlayPortal } from '../../../OverlayPortal';
import { SignPad } from '../../../SignPad';
import { Tooltip } from '../../../Tooltip';
import { Button } from '../../../Button';
import { TITLE_CANCEL, TITLE_INSERT } from '../../RichEditor.const';
import type { ToolbarSignatureProps } from './ToolbarSignature.types';

export const ToolbarSignature = (props: ToolbarSignatureProps) => {
  const { title, disabled, onInsert } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { style, ready } = useFixedAnchorPosition({
    anchorRef: triggerRef,
    open: isOpen,
    minWidthPx: FOUR_HUNDRED,
  });

  useClickOutsideMultiple(
    [triggerRef as RefObject<HTMLElement>, menuRef as RefObject<HTMLElement>],
    () => setIsOpen(false),
    { enabled: isOpen }
  );

  const handleInsert = () => {
    if (!signature) {
      return;
    }
    onInsert(signature);
    setSignature(null);
    setIsOpen(false);
  };

  return (
    <div className="Bear-RichEditor__signature relative">
      <Tooltip content={title} delay={FOUR_HUNDRED} position="top">
        <button
          ref={triggerRef}
          type="button"
          aria-label={title}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'Bear-RichEditor__button p-1.5 rounded transition-colors',
            'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700',
            isOpen && 'Bear-RichEditor__button--active bg-primary-500 text-white',
            disabled && 'Bear-RichEditor__button--disabled opacity-50 cursor-not-allowed'
          )}
        >
          <EditIcon size={SIXTEEN} />
        </button>
      </Tooltip>

      <OverlayPortal
        open={isOpen}
        ready={ready}
        style={style}
        zIndex={ANCHOR_DEFAULT_Z_INDEX}
        panelRef={menuRef}
        className="Bear-RichEditor__signature-menu p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl"
      >
        <SignPad
          height={TWO_HUNDRED}
          onChange={setSignature}
          placeholder="Sign here"
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
            {TITLE_CANCEL}
          </Button>
          <Button size="sm" variant="primary" onClick={handleInsert} disabled={!signature}>
            {TITLE_INSERT}
          </Button>
        </div>
      </OverlayPortal>
    </div>
  );
};
