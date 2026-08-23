import { useEffect } from 'react';
import { BOOLEAN_TRUE } from '@const';
import { RESIZE_EVENT, SCROLL_EVENT } from './useWindowLayout.const';
import type { UseWindowLayoutOptions } from './useWindowLayout.types';

/**
 * useWindowLayout — subscribe to window scroll and resize.
 */
export const useWindowLayout = (options: UseWindowLayoutOptions): void => {
  const { enabled = BOOLEAN_TRUE, onLayout } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }
    onLayout();
    window.addEventListener(RESIZE_EVENT, onLayout);
    window.addEventListener(SCROLL_EVENT, onLayout, BOOLEAN_TRUE);
    return () => {
      window.removeEventListener(RESIZE_EVENT, onLayout);
      window.removeEventListener(SCROLL_EVENT, onLayout, BOOLEAN_TRUE);
    };
  }, [enabled, onLayout]);
};
