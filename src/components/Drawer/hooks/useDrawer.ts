import { useCallback, useEffect, useState } from 'react';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, KEY_ESCAPE, ZERO } from '@const';
import { OVERLAY_OPEN_EFFECT_NONE } from '@hooks/useFixedAnchorPosition';
import { DRAWER_ANIMATION_MS } from '../Drawer.const';
import { lockBodyScroll } from '../Drawer.utils';
import type { UseDrawerParams, UseDrawerResult } from '../Drawer.types';

export const useDrawer = (params: UseDrawerParams): UseDrawerResult => {
  const { isOpen, onClose, closeOnEscape, openEffect, closeEffect, lockScroll, alwaysMounted } = params;
  const [isMounted, setIsMounted] = useState(isOpen || alwaysMounted);
  const [isClosing, setIsClosing] = useState(BOOLEAN_FALSE);
  const [hasOpened, setHasOpened] = useState(alwaysMounted ? BOOLEAN_TRUE : BOOLEAN_FALSE);

  useEffect(() => {
    if (alwaysMounted) {
      setIsMounted(BOOLEAN_TRUE);
      setHasOpened(isOpen);
      setIsClosing(BOOLEAN_FALSE);
      return;
    }
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
  }, [alwaysMounted, isOpen, isMounted, openEffect, closeEffect]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === KEY_ESCAPE) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isMounted && closeOnEscape) {
      document.addEventListener('keydown', handleEscape);
    }
    const unlock = lockScroll && isMounted ? lockBodyScroll() : undefined;
    return () => {
      document.removeEventListener('keydown', handleEscape);
      unlock?.();
    };
  }, [isMounted, handleEscape, closeOnEscape, lockScroll]);

  return {
    isMounted,
    isPanelOpen: alwaysMounted ? isOpen : hasOpened && !isClosing,
  };
};
