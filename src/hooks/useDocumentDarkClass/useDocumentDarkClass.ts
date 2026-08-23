import { useEffect, useState } from 'react';
import {
  BOOLEAN_FALSE,
  DOCUMENT_CLASS_ATTRIBUTE,
  DOCUMENT_CLASS_BEAR_DARK,
  DOCUMENT_CLASS_DARK,
  PREFERS_COLOR_SCHEME_DARK,
} from '@const';

const isDocumentDark = (media: MediaQueryList): boolean => {
  const root = document.documentElement;
  return (
    root.classList.contains(DOCUMENT_CLASS_DARK) ||
    root.classList.contains(DOCUMENT_CLASS_BEAR_DARK) ||
    media.matches
  );
};

export const useDocumentDarkClass = (enabled: boolean): boolean => {
  const [isDark, setIsDark] = useState(BOOLEAN_FALSE);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const media = window.matchMedia(PREFERS_COLOR_SCHEME_DARK);
    const checkDark = () => {
      setIsDark(isDocumentDark(media));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [DOCUMENT_CLASS_ATTRIBUTE],
    });
    media.addEventListener('change', checkDark);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', checkDark);
    };
  }, [enabled]);

  return isDark;
};
