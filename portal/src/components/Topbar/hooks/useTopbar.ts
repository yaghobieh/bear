import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useBear } from '@forgedevstack/bear';
import type { BearColorScale } from '@forgedevstack/bear';
import { useNavigate } from 'react-router-dom';
import type { ThemePreset } from '@/constants/navigation.const';
import { THEME_PRESETS } from '@/constants/navigation.const';
import { useSearch } from '@/hooks/useSearch';
import { useNpmDownloads } from '@/hooks/useNpmDownloads';
import {
  THEME_TOAST_DURATION_MS,
  VERSION_POPUP_KEY,
  COOKIE_CONSENT_KEY,
  SEARCH_FOCUS_DELAY_MS,
  BANNER_SESSION_PREFIX,
  BANNER_SESSION_SUFFIX,
} from '../Topbar.const';

export interface UseTopbarOptions {
  bannerId?: string;
  hasBanner: boolean;
  onBannerVisibilityChange?: (visible: boolean) => void;
}

export interface UseTopbarReturn {
  mode: string;
  isDark: boolean;
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  searchExpanded: boolean;
  settingsOpen: boolean;
  alertsOpen: boolean;
  activeTheme: ThemePreset;
  themeToast: { visible: boolean; code: string };
  codeModalOpen: boolean;
  versionPopup: boolean;
  showCookieBanner: boolean;
  bannerVisible: boolean;
  shortcutLabel: string;
  searchRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  settingsRef: React.RefObject<HTMLDivElement>;
  alertsRef: React.RefObject<HTMLDivElement>;
  query: string;
  results: ReturnType<typeof useSearch>['results'];
  grouped: ReturnType<typeof useSearch>['grouped'];
  history: ReturnType<typeof useSearch>['history'];
  isOpen: boolean;
  setQuery: (q: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  clearHistory: () => void;
  setSearchExpanded: (v: boolean) => void;
  setSettingsOpen: (v: boolean) => void;
  setAlertsOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  setCodeModalOpen: (v: boolean) => void;
  setThemeToast: React.Dispatch<React.SetStateAction<{ visible: boolean; code: string }>>;
  handleDismissBanner: () => void;
  handleSearchToggle: () => void;
  handleThemeApply: (preset: ThemePreset) => void;
  handleCopyThemeCode: () => Promise<void>;
  handleDismissVersion: () => void;
  handleCookieDecision: (decision: 'accepted' | 'rejected') => void;
  handleResultClick: (path: string) => void;
  handleResetCookieConsent: () => void;
  npmDownloads: { formatted: string };
}

/**
 * Encapsulates all Topbar state, refs, effects, and event handlers.
 * Keeps the Topbar component focused on rendering only.
 *
 * @param options - Banner ID, presence flag, and visibility change callback
 */
export const useTopbar = (options: UseTopbarOptions): UseTopbarReturn => {
  const { bannerId, hasBanner, onBannerVisibilityChange } = options;

  const { mode, setMode, toggleMode, updateTheme } = useBear();
  const navigate = useNavigate();
  const isDark = mode === 'dark';

  const {
    query, setQuery, results, grouped, history,
    addToHistory, clearHistory, isOpen, openSearch, closeSearch,
  } = useSearch();

  const npmDownloads = useNpmDownloads();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const [bannerVisible, setBannerVisible] = useState(() => {
    if (!bannerId) return true;
    const dismissed = sessionStorage.getItem(`${BANNER_SESSION_PREFIX}${bannerId}${BANNER_SESSION_SUFFIX}`);
    return dismissed !== 'true';
  });
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [themeToast, setThemeToast] = useState<{ visible: boolean; code: string }>({ visible: false, code: '' });
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [versionPopup, setVersionPopup] = useState(() => !localStorage.getItem(VERSION_POPUP_KEY));
  const [showCookieBanner, setShowCookieBanner] = useState(() => !localStorage.getItem(COOKIE_CONSENT_KEY));

  const shortcutLabel = useMemo(() => {
    const isMac = typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    return isMac ? '⌘K' : 'Ctrl+K';
  }, []);

  useEffect(() => {
    onBannerVisibilityChange?.(hasBanner ? bannerVisible : false);
  }, [bannerVisible, hasBanner, onBannerVisibilityChange]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchExpanded(false);
        closeSearch();
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
      if (alertsRef.current && !alertsRef.current.contains(e.target as Node)) {
        setAlertsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeSearch]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchExpanded(true);
        openSearch();
        setTimeout(() => inputRef.current?.focus(), SEARCH_FOCUS_DELAY_MS);
      }
      if (e.key === 'Escape') {
        setSearchExpanded(false);
        setSettingsOpen(false);
        setAlertsOpen(false);
        setCodeModalOpen(false);
        closeSearch();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openSearch, closeSearch]);

  const handleDismissBanner = useCallback(() => {
    if (bannerId) {
      sessionStorage.setItem(`${BANNER_SESSION_PREFIX}${bannerId}${BANNER_SESSION_SUFFIX}`, 'true');
    }
    setBannerVisible(false);
  }, [bannerId]);

  const handleSearchToggle = useCallback(() => {
    if (searchExpanded) {
      setSearchExpanded(false);
      closeSearch();
    } else {
      setSearchExpanded(true);
      openSearch();
      setTimeout(() => inputRef.current?.focus(), SEARCH_FOCUS_DELAY_MS);
    }
  }, [searchExpanded, openSearch, closeSearch]);

  const handleThemeApply = useCallback((preset: ThemePreset) => {
    setActiveTheme(preset);
    setMode(preset.dark ? 'dark' : 'light');
    updateTheme({ colors: { primary: preset.primary as unknown as BearColorScale } });

    const code = `<BearProvider
  defaultMode="${preset.dark ? 'dark' : 'light'}"
  theme={{
    colors: {
      primary: '${preset.primary}',
    },
  }}
>`;
    setThemeToast({ visible: true, code });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setThemeToast((p) => ({ ...p, visible: false })),
      THEME_TOAST_DURATION_MS,
    );
  }, [setMode, updateTheme]);

  const handleCopyThemeCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(themeToast.code);
    } catch {
      /* clipboard not available */
    }
  }, [themeToast.code]);

  const handleDismissVersion = useCallback(() => {
    setVersionPopup(false);
    localStorage.setItem(VERSION_POPUP_KEY, 'true');
  }, []);

  const handleCookieDecision = useCallback((decision: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, decision);
    setShowCookieBanner(false);
  }, []);

  const handleResetCookieConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setShowCookieBanner(true);
  }, []);

  const handleResultClick = useCallback((path: string) => {
    const item = results.find((r) => r.path === path) ?? history.find((r) => r.path === path);
    if (item) addToHistory(item);
    navigate(path);
    setSearchExpanded(false);
    closeSearch();
  }, [results, history, addToHistory, navigate, closeSearch]);

  return {
    mode,
    isDark,
    toggleMode,
    setMode,
    searchExpanded,
    settingsOpen,
    alertsOpen,
    activeTheme,
    themeToast,
    codeModalOpen,
    versionPopup,
    showCookieBanner,
    bannerVisible,
    shortcutLabel,
    searchRef,
    inputRef,
    settingsRef,
    alertsRef,
    query,
    results,
    grouped,
    history,
    isOpen,
    setQuery,
    openSearch,
    closeSearch,
    clearHistory,
    setSearchExpanded,
    setSettingsOpen,
    setAlertsOpen,
    setCodeModalOpen,
    setThemeToast,
    handleDismissBanner,
    handleSearchToggle,
    handleThemeApply,
    handleCopyThemeCode,
    handleDismissVersion,
    handleCookieDecision,
    handleResultClick,
    handleResetCookieConsent,
    npmDownloads,
  };
};
