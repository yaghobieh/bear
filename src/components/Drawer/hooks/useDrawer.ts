import { useCallback, useEffect, useState } from 'react';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, KEY_ESCAPE, ZERO } from '@const';
import { OVERLAY_OPEN_EFFECT_NONE } from '@hooks/useFixedAnchorPosition';
import { DRAWER_ANIMATION_MS } from '../Drawer.const';
import { lockBodyScroll } from '../Drawer.utils';
import type { UseDrawerParams, UseDrawerResult } from '../Drawer.types';

export const useDrawer = (params: UseDrawerParams): UseDrawerResult => {
  const { isOpen, onClose, closeOnEscape, openEffect, closeEffect } = params;
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(BOOLEAN_FALSE);
  const [hasOpened, setHasOpened] = useState(BOOLEAN_FALSE);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(BOOLEAN_TRUE);
      setIsClosing(BOOLEAN_FALSE);
      if (openEffect === OVERLAY_OPEN_EFFECT_NONE) {
        setHasOpened(BOOLEAN_TRUE);
        return;
      }
      const frame = requestAnimationFrame(() => setHasOpened(BOOLEAN_TRUE));
      return () => cancelAnimationFrame(frame);
    }
    if (isMounted) {
      setHasOpened(BOOLEAN_FALSE);
      setIsClosing(BOOLEAN_TRUE);
      const closeMs = closeEffect === OVERLAY_OPEN_EFFECT_NONE ? ZERO : DRAWER_ANIMATION_MS;
      const timer = setTimeout(() => {
        setIsMounted(BOOLEAN_FALSE);
        setIsClosing(BOOLEAN_FALSE);
      }, closeMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted, openEffect, closeEffect]);

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

  return {
    isMounted,
    isPanelOpen: hasOpened && !isClosing,
  };
};
