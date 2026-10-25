import { useCallback, useState } from 'react';
import { isBearProLicenseKey } from '@forgedevstack/bear';

const STORAGE_KEY = 'bear-pro-license';

const readKey = (): string => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(STORAGE_KEY) ?? '';
};

export const useBearProLicense = () => {
  const [licenseKey, setLicenseKey] = useState(readKey);

  const activate = useCallback((next: string) => {
    const trimmed = next.trim();
    if (!isBearProLicenseKey(trimmed)) return false;
    window.localStorage.setItem(STORAGE_KEY, trimmed);
    setLicenseKey(trimmed);
    return true;
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setLicenseKey('');
  }, []);

  return { licenseKey, active: isBearProLicenseKey(licenseKey), activate, clear };
};
