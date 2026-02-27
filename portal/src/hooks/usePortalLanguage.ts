import { useCallback, useEffect, useState } from 'react';
import {
  PORTAL_LANGUAGE_EVENT,
  PORTAL_LANGUAGE_KEY,
  type PortalLanguage,
} from '@/constants/portal-i18n.const';

const getSavedLanguage = (): PortalLanguage => {
  const saved = localStorage.getItem(PORTAL_LANGUAGE_KEY);
  return saved === 'es' ? 'es' : 'en';
};

export const usePortalLanguage = () => {
  const [language, setLanguageState] = useState<PortalLanguage>(() => getSavedLanguage());

  const setLanguage = useCallback((next: PortalLanguage) => {
    localStorage.setItem(PORTAL_LANGUAGE_KEY, next);
    setLanguageState(next);
    window.dispatchEvent(new CustomEvent(PORTAL_LANGUAGE_EVENT, { detail: { language: next } }));
  }, []);

  useEffect(() => {
    const onLanguageChange = (event: Event) => {
      const custom = event as CustomEvent<{ language?: PortalLanguage }>;
      const next = custom?.detail?.language;
      if (next === 'en' || next === 'es') setLanguageState(next);
    };
    window.addEventListener(PORTAL_LANGUAGE_EVENT, onLanguageChange);
    return () => window.removeEventListener(PORTAL_LANGUAGE_EVENT, onLanguageChange);
  }, []);

  return { language, setLanguage };
};

