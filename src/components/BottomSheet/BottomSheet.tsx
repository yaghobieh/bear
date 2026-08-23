import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BACKDROP_DEFAULT_Z_INDEX,
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  KEY_ESCAPE,
  LABEL_CLOSE,
  SIZE_MD,
  THREE_HUNDRED,
  VARIANT_GHOST,
} from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { XIcon } from '../Icon';
import { Typography } from '../Typography';
import { BOTTOM_SHEET_SIZE_CLASSES } from './BottomSheet.const';
import type { BottomSheetProps } from './BottomSheet.types';

export const BottomSheet = (props: BottomSheetProps) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    size = SIZE_MD,
    showCloseButton = BOOLEAN_TRUE,
    closeOnBackdrop = BOOLEAN_TRUE,
    closeOnEscape = BOOLEAN_TRUE,
    showHandle = BOOLEAN_TRUE,
    enableScroll = BOOLEAN_TRUE,
    isSticky = BOOLEAN_FALSE,
    className,
  } = props;

  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(BOOLEAN_FALSE);
  const [hasOpened, setHasOpened] = useState(BOOLEAN_FALSE);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(BOOLEAN_TRUE);
      setIsClosing(BOOLEAN_FALSE);
      const frame = requestAnimationFrame(() => setHasOpened(BOOLEAN_TRUE));
      return () => cancelAnimationFrame(frame);
    }
    if (isMounted) {
      setHasOpened(BOOLEAN_FALSE);
      setIsClosing(BOOLEAN_TRUE);
      const timer = setTimeout(() => {
        setIsMounted(BOOLEAN_FALSE);
        setIsClosing(BOOLEAN_FALSE);
      }, THREE_HUNDRED);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === KEY_ESCAPE) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isMounted) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMounted, handleEscape]);

  if (!isMounted) {
    return null;
  }

  const content = (
    <Flex
      className="bear-fixed bear-inset-0 bear-items-end bear-justify-center"
      style={{ zIndex: BACKDROP_DEFAULT_Z_INDEX }}
    >
      <Box
        className={cn(
          'bear-absolute bear-inset-0 bear-bg-black/60 bear-backdrop-blur-sm bear-transition-opacity',
          isClosing ? 'bear-opacity-0' : 'bear-opacity-100'
        )}
        style={{ transitionDuration: `${THREE_HUNDRED}ms` }}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      <Box
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        className={cn(
          'Bear-BottomSheet bear-relative bear-w-full bear-rounded-t-2xl bear-shadow-2xl bear-transition-transform bear-duration-300',
          'bear-flex bear-flex-col bear-min-h-0 bear-overflow-hidden',
          'bear-bg-white dark:bear-bg-neutral-900 bear-border-t bear-border-neutral-200 dark:bear-border-neutral-700',
          BOTTOM_SHEET_SIZE_CLASSES[size],
          hasOpened && !isClosing ? 'bear-translate-y-0' : 'bear-translate-y-full',
          className
        )}
      >
        {showHandle && (
          <Flex className="bear-justify-center bear-pt-2 bear-pb-1">
            <Box className="bear-w-12 bear-h-1 bear-rounded-full bear-bg-neutral-300 dark:bear-bg-neutral-600" aria-hidden />
          </Flex>
        )}

        {(title || showCloseButton) && (
          <Flex
            className={cn(
              'bear-items-center bear-justify-between bear-px-4 bear-py-3 bear-border-b bear-border-neutral-200 dark:bear-border-neutral-700 bear-shrink-0',
              isSticky && 'bear-sticky bear-top-0 bear-z-10 bear-bg-white dark:bear-bg-neutral-900',
            )}
          >
            {title && (
              <Typography
                id="bottom-sheet-title"
                weight="semibold"
                className="bear-text-lg bear-text-neutral-900 dark:bear-text-white"
              >
                {title}
              </Typography>
            )}
            {showCloseButton && (
              <Button variant={VARIANT_GHOST} onClick={onClose} aria-label={LABEL_CLOSE}>
                <XIcon className="bear-w-5 bear-h-5" />
              </Button>
            )}
          </Flex>
        )}

        <Box
          className={cn(
            'bear-flex-1 bear-min-h-0 bear-p-4 bear-text-neutral-700 dark:bear-text-neutral-300',
            enableScroll ? 'bear-overflow-y-auto' : 'bear-overflow-hidden',
          )}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );

  return createPortal(content, document.body);
};
