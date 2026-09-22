import { useEffect, useRef, type RefObject } from 'react';
import type { UseFocusTrapOptions } from './useFocusTrap.types';
import { handleFocusTrapKeyDown } from './useFocusTrap.utils';
import { ZERO } from '@constants';

export const useFocusTrap = <T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseFocusTrapOptions = {}
) => {
  const {
    enabled = true,
    autoFocus = true,
    restoreFocus = true,
    initialFocusRef,
    onEscape,
  } = options;

  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (restoreFocus && typeof document !== 'undefined') {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    }

    const container = containerRef.current;
    if (!container) return;

    if (autoFocus) {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        const focusableElements = container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > ZERO) {
          focusableElements[ZERO]?.focus();
        } else {
          container.focus();
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      handleFocusTrapKeyDown(event, containerRef.current, onEscape);
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      if (restoreFocus && previousActiveElementRef.current) {
        try {
          previousActiveElementRef.current.focus();
        } catch {
          // ignore focus error if element is unmounted
        }
      }
    };
  }, [enabled, autoFocus, restoreFocus, containerRef, initialFocusRef, onEscape]);
};
