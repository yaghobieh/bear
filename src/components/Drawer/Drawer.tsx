import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBearDirectionOptional } from '@context/BearProvider';
import { cn, resolveBearId, useBearId } from '@utils';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COMPONENT_NAME_DRAWER,
  KEY_ESCAPE,
} from '@const';
import { Backdrop } from '../Backdrop';
import type { DrawerProps, DrawerSide } from './Drawer.types';
import { DRAWER_ANIMATION_MS, DRAWER_DEFAULT_SIDE, DRAWER_DEFAULT_SIZE } from './Drawer.const';
import { lockBodyScroll } from './Drawer.utils';
import { DrawerHeader } from './components';

export const Drawer = (props: DrawerProps) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    side = DRAWER_DEFAULT_SIDE,
    anchor,
    variant: _variant = 'temporary',
    size = DRAWER_DEFAULT_SIZE,
    showCloseButton = BOOLEAN_TRUE,
    closeOnBackdrop = BOOLEAN_TRUE,
    closeOnEscape = BOOLEAN_TRUE,
    className,
    container,
    id,
    testId,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_DRAWER);
  const domId = resolveBearId(id, generatedId);
  const { direction } = useBearDirectionOptional();
  const resolvedSide: DrawerSide = anchor ?? side;

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
      }, DRAWER_ANIMATION_MS);
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
      const unlock = lockBodyScroll();
      return () => {
        document.removeEventListener('keydown', handleEscape);
        unlock();
      };
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMounted, handleEscape]);

  if (!isMounted) {
    return null;
  }

  const isPanelOpen = hasOpened && !isClosing;
  const showHeader = Boolean(title) || showCloseButton;
  const titleId = `${domId}-title`;

  const drawerContent = (
    <div id={domId} data-testid={testId} className="Bear-Drawer">
      <Backdrop
        open={isPanelOpen}
        keepMounted
        blur
        nested
        transitionDuration={DRAWER_ANIMATION_MS}
        className="Bear-Drawer__backdrop"
        onClick={closeOnBackdrop ? () => onClose() : undefined}
      />

      <div
        role="dialog"
        aria-modal={BOOLEAN_TRUE}
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'Bear-Drawer__panel',
          `Bear-Drawer__panel--${resolvedSide}`,
          `Bear-Drawer__panel--${size}`,
          isPanelOpen && 'Bear-Drawer__panel--open',
          className
        )}
      >
        {showHeader ? (
          <DrawerHeader
            side={resolvedSide}
            title={title}
            titleId={titleId}
            showCloseButton={showCloseButton}
            onClose={onClose}
            direction={direction}
          />
        ) : null}

        <div className="Bear-Drawer__body">{children}</div>
      </div>
    </div>
  );

  return createPortal(drawerContent, container ?? document.body);
};
