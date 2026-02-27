import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBear } from '@forgedevstack/bear';
import { useSearch } from '@/hooks/useSearch';
import { GITHUB_URL, NPM_URL, BEAR_VERSION, THEME_PRESETS, ThemePreset } from '@/constants/navigation.const';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { TopbarProps } from './Topbar.types';
import { BearIcons } from '@forgedevstack/bear';
import { BearIcon, NpmIcon } from './Topbar.icons';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';

const THEME_TOAST_DURATION = 10000;
const VERSION_POPUP_KEY = `bear-version-seen-${BEAR_VERSION}`;
const COOKIE_CONSENT_KEY = 'bear-cookie-consent';

const NEW_COMPONENT_ALERTS = [
  { label: 'FormField', path: '/components/form-field', info: 'Floating label field' },
  { label: 'AspectRatio', path: '/components/aspect-ratio', info: 'Keep media aspect ratio' },
  { label: 'PasswordInput', path: '/components/password-input', info: 'Toggle + custom icons' },
  { label: 'AlertDialog', path: '/components/alert-dialog', info: 'Confirmation dialog' },
  { label: 'InputGroup', path: '/components/input-group', info: 'Field wrapper + helper states' },
];

export const Topbar: FC<TopbarProps> = ({ onMenuClick, banner, onBannerVisibilityChange }) => {
  const { mode, setMode, toggleMode, updateTheme } = useBear();
  const { language, setLanguage } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const isDark = mode === 'dark';
  const { query, setQuery, results, isOpen, openSearch, closeSearch } = useSearch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [bannerVisible, setBannerVisible] = useState(() => {
    if (!banner?.id) return true;
    const dismissed = sessionStorage.getItem(`bear-banner-${banner.id}-dismissed`);
    return dismissed !== 'true';
  });

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [themeToast, setThemeToast] = useState<{ visible: boolean; code: string }>({ visible: false, code: '' });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [versionPopup, setVersionPopup] = useState(() => !localStorage.getItem(VERSION_POPUP_KEY));
  const settingsRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(() => !localStorage.getItem(COOKIE_CONSENT_KEY));
  const isMac = typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K';

  useEffect(() => {
    onBannerVisibilityChange?.(banner ? bannerVisible : false);
  }, [bannerVisible, banner, onBannerVisibilityChange]);

  const handleDismissBanner = () => {
    if (banner?.id) sessionStorage.setItem(`bear-banner-${banner.id}-dismissed`, 'true');
    setBannerVisible(false);
  };

  // Click outside close
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

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchExpanded(true);
        openSearch();
        setTimeout(() => inputRef.current?.focus(), 100);
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

  const handleResultClick = (path: string) => {
    navigate(path);
    setSearchExpanded(false);
    closeSearch();
  };

  const handleSearchToggle = useCallback(() => {
    if (searchExpanded) {
      setSearchExpanded(false);
      closeSearch();
    } else {
      setSearchExpanded(true);
      openSearch();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchExpanded, openSearch, closeSearch]);

  const handleThemeApply = useCallback((preset: ThemePreset) => {
    setActiveTheme(preset);
    setMode(preset.dark ? 'dark' : 'light');
    updateTheme({ colors: { primary: preset.primary as unknown as import('@forgedevstack/bear').BearColorScale } });

    const code = `<BearProvider
  defaultMode="${preset.dark ? 'dark' : 'light'}"
  theme={{
    colors: {
      primary: '${preset.primary}',
    },
  }}
>`;
    setThemeToast({ visible: true, code });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setThemeToast(p => ({ ...p, visible: false })), THEME_TOAST_DURATION);
  }, [setMode, updateTheme]);

  const handleCopyThemeCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(themeToast.code); } catch { /* fallback */ }
  }, [themeToast.code]);

  const handleDismissVersion = useCallback(() => {
    setVersionPopup(false);
    localStorage.setItem(VERSION_POPUP_KEY, 'true');
  }, []);

  const handleCookieDecision = useCallback((decision: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, decision);
    setShowCookieBanner(false);
  }, []);

  const showBanner = banner && bannerVisible;

  return (
    <>
      <header className="Bear-Topbar fixed top-0 left-0 right-0 z-50">
        {/* Banner */}
        {showBanner && (
          <div className="Bear-Topbar__banner bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 text-white text-center py-2 px-4 text-sm flex items-center justify-center gap-3">
            <span className="flex-1">{banner.message}</span>
            <button onClick={handleDismissBanner} className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0" aria-label="Dismiss">
              <BearIcons.CloseIcon size={16} />
            </button>
          </div>
        )}

        {/* Main bar */}
        <div className="Bear-Topbar__main h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="h-full px-4 flex items-center justify-between mx-auto">
            {/* Left: Logo + Search */}
            <div className="Bear-Topbar__left flex items-center gap-3">
              <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors" aria-label="Toggle menu">
                <BearIcons.MenuIcon size={20} />
              </button>
              <Link to="/" className="flex items-center gap-2.5">
                <BearIcon size={32} />
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900 dark:text-white">Bear UI</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">v{BEAR_VERSION}</span>
                </div>
              </Link>

              {/* Search trigger */}
              <button
                onClick={handleSearchToggle}
                className="hidden md:flex items-center gap-2 ml-4 px-2.5 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label={t.searchPlaceholder}
                title={t.searchPlaceholder}
              >
                <BearIcons.SearchIcon size={14} className="flex-shrink-0" />
                <kbd className="text-[10px] font-mono text-gray-400 bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600">
                  {shortcutLabel}
                </kbd>
              </button>
            </div>

            {/* Right: GitHub, Alerts, Settings, Theme */}
            <div className="Bear-Topbar__right flex items-center gap-0.5">
              {/* GitHub */}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors" aria-label="GitHub" title="GitHub">
                <BearIcons.GithubIcon size={18} />
              </a>

              {/* NPM */}
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors" aria-label="NPM" title="npm">
                <NpmIcon />
              </a>

              {/* Alerts (bell + dropdown) */}
              <div ref={alertsRef} className="relative">
                <button
                  onClick={() => {
                    setAlertsOpen((prev) => !prev);
                    setSettingsOpen(false);
                  }}
                  className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
                  aria-label={t.notifications}
                  title={t.notifications}
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
                </button>
                {alertsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {t.newComponents}
                      </p>
                    </div>
                    <ul className="max-h-80 overflow-y-auto">
                      {NEW_COMPONENT_ALERTS.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={() => setAlertsOpen(false)}
                            className="flex items-start justify-between gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.info}</p>
                            </div>
                            <span className="text-[11px] text-bear-600 dark:text-bear-400">{t.viewDocs}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Settings dropdown */}
              <div ref={settingsRef} className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={`p-2 rounded-md transition-colors ${
                    settingsOpen
                      ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  aria-label="Settings"
                  title={t.settings}
                >
                  <BearIcons.SettingsIcon size={18} />
                </button>

                {settingsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50">
                    {/* Theme section */}
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t.appearance}</p>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setMode('light')}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            !isDark ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <BearIcons.SunIcon size={14} /> {t.light}
                        </button>
                        <button
                          onClick={() => setMode('dark')}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            isDark ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <BearIcons.MoonIcon size={14} /> {t.dark}
                        </button>
                      </div>
                    </div>

                    {/* Theme presets */}
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t.themePresets}</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {THEME_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => handleThemeApply(preset)}
                            className={`p-2 rounded-lg border text-left transition-all ${
                              activeTheme.id === preset.id
                                ? 'border-pink-500 ring-1 ring-pink-500/30'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <div className="h-4 rounded mb-1" style={{ background: preset.colors.bg }} />
                            <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 truncate">{preset.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t.language}</p>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setLanguage('en')}
                          className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium ${
                            language === 'en'
                              ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
                              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => setLanguage('es')}
                          className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium ${
                            language === 'es'
                              ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
                              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          Español
                        </button>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="p-2">
                      <Link
                        to="/customization/palette"
                        onClick={() => setSettingsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="13.5" r="2.5" /><circle cx="8.5" cy="8.5" r="2.5" /><circle cx="6.5" cy="15.5" r="2.5" /><circle cx="12" cy="19" r="2.5" /></svg>
                        {t.editColorsFonts}
                      </Link>
                      <Link
                        to="/customization/css-variables"
                        onClick={() => setSettingsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                        {t.cssVariables}
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem(COOKIE_CONSENT_KEY);
                          setShowCookieBanner(true);
                          setSettingsOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        {t.cookiePreferences}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <button onClick={toggleMode} aria-label="Toggle theme" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">
                {isDark ? <BearIcons.SunIcon size={18} /> : <BearIcons.MoonIcon size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search expanded panel */}
        {searchExpanded && (
          <div
            ref={searchRef}
            className="Bear-Topbar__search-panel bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-in slide-in-from-top-2 duration-200"
          >
            <div className="max-w-2xl mx-auto px-4 py-3">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20 transition-all">
                <BearIcons.SearchIcon size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPanelPlaceholder}
                  className="flex-1 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                  onFocus={openSearch}
                />
                <button onClick={() => { setSearchExpanded(false); closeSearch(); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <BearIcons.CloseIcon size={16} />
                </button>
              </div>
              {isOpen && results.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  <ul className="py-1 max-h-72 overflow-y-auto">
                    {results.map((r) => (
                      <li key={r.path}>
                        <button
                          onClick={() => handleResultClick(r.path)}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm text-gray-900 dark:text-gray-100">{r.label}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{r.category}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Theme applied toast */}
      {themeToast.visible && !codeModalOpen && (
        <button
          onClick={() => setCodeModalOpen(true)}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-xl shadow-2xl border border-gray-700 hover:border-gray-500 transition-all cursor-pointer animate-in slide-in-from-bottom-4 duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium">{t.themeApplied}: {activeTheme.name}</span>
          <span className="text-[10px] text-gray-400">{t.clickForCode}</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); setThemeToast(p => ({ ...p, visible: false })); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setThemeToast(p => ({ ...p, visible: false })); }}}
            className="ml-1 p-0.5 text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <BearIcons.CloseIcon size={12} />
          </span>
        </button>
      )}

      {/* Theme code modal */}
      {codeModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setCodeModalOpen(false)}>
          <div className="w-full max-w-lg mx-4 bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
              <span className="text-sm font-semibold text-white">Theme: {activeTheme.name}</span>
              <div className="flex items-center gap-2">
                <button onClick={handleCopyThemeCode} className="px-3 py-1 text-xs bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium">{t.copy}</button>
                <button onClick={() => setCodeModalOpen(false)} className="p-1 text-gray-400 hover:text-white transition-colors"><BearIcons.CloseIcon size={16} /></button>
              </div>
            </div>
            <pre className="p-5 text-sm font-mono text-green-400 overflow-x-auto max-h-72">{themeToast.code}</pre>
          </div>
        </div>
      )}

      {/* Version Popup */}
      {versionPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 text-center">
              <BearIcon size={56} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Bear UI v{BEAR_VERSION}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                1.1.2: New FormField (floating label), AspectRatio, PasswordInput enhancements (shift indicator + custom icons), AlertDialog, InputGroup, Store redesign, Component API docs, alerts dropdown, cookie preferences, and ES translations.
                Also includes the 1.1.1 set: ResizablePanel, FileTree, ResizableTextarea, Typography gradient & typewriter + Map, CodeEditor, Cropper, Masonry, Watermark, Marquee, Spotlight, Dock, GradientText and more.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                {['FormField', 'AspectRatio', 'PasswordInput+', 'AlertDialog', 'InputGroup', 'Store v2', 'Component API', 'ES i18n'].map((c) => (
                  <span key={c} className="px-2 py-0.5 text-[10px] font-medium bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full">{c}</span>
                ))}
              </div>
              <button onClick={handleDismissVersion} className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors">
                {t.getStarted}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCookieBanner && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.cookieBannerTitle}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t.cookieBannerBody}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCookieDecision('rejected')}
                className="px-3 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t.rejectCookies}
              </button>
              <button
                onClick={() => handleCookieDecision('accepted')}
                className="px-3 py-1.5 text-xs rounded-md bg-pink-600 hover:bg-pink-700 text-white"
              >
                {t.acceptCookies}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
