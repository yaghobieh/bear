import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBear } from '@forgedevstack/bear';
import { useSearch } from '@/hooks/useSearch';
import { GITHUB_URL, NPM_URL, CLI_NPM_URL, FORGESTACK_URL, BEAR_VERSION, THEME_PRESETS, ThemePreset } from '@/constants/navigation.const';
import { TopbarProps } from './Topbar.types';
import { BearIcons } from '@forgedevstack/bear';
import { BearIcon, NpmIcon } from './Topbar.icons';

const THEME_TOAST_DURATION = 10000;
const THEME_SHORTCUT = { key: 's', meta: true, shift: true };
const VERSION_POPUP_KEY = `bear-version-seen-${BEAR_VERSION}`;

export const Topbar: FC<TopbarProps> = ({ onMenuClick, banner, onBannerVisibilityChange }) => {
  const { mode, setMode, toggleMode, updateTheme } = useBear();
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

  // Search panel expanded under navbar
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Theming panel
  const [themingOpen, setThemingOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEME_PRESETS[0]);

  // Theme code toast
  const [themeToast, setThemeToast] = useState<{ visible: boolean; code: string }>({ visible: false, code: '' });
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  // CLI spotlight
  const [cliSpotlight, setCliSpotlight] = useState(false);

  // Version popup
  const [versionPopup, setVersionPopup] = useState(() => {
    return !localStorage.getItem(VERSION_POPUP_KEY);
  });

  useEffect(() => {
    onBannerVisibilityChange?.(banner ? bannerVisible : false);
  }, [bannerVisible, banner, onBannerVisibilityChange]);

  const handleDismissBanner = () => {
    if (banner?.id) {
      sessionStorage.setItem(`bear-banner-${banner.id}-dismissed`, 'true');
    }
    setBannerVisible(false);
  };

  // Click outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchExpanded(false);
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeSearch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd+K = search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchExpanded(true);
        openSearch();
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      // Escape
      if (e.key === 'Escape') {
        setSearchExpanded(false);
        setThemingOpen(false);
        setCliSpotlight(false);
        setCodeModalOpen(false);
        closeSearch();
      }
      // Cmd+Shift+S = reopen theme code modal
      if (e.metaKey && e.shiftKey && e.key === THEME_SHORTCUT.key) {
        e.preventDefault();
        if (themeToast.code) {
          setCodeModalOpen(true);
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openSearch, closeSearch, themeToast.code]);

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

  // Theme code modal
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  const handleThemeApply = useCallback((preset: ThemePreset) => {
    setActiveTheme(preset);

    // 1) Switch site dark/light mode
    if (preset.dark) {
      setMode('dark');
    } else {
      setMode('light');
    }

    // 2) Apply primary color to the whole site via updateTheme
    updateTheme({ colors: { primary: preset.primary as unknown as import('@forgedevstack/bear').BearColorScale } });

    // 3) Build code snippet
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
    try {
      await navigator.clipboard.writeText(themeToast.code);
    } catch { /* fallback */ }
  }, [themeToast.code]);

  const handleDismissVersion = useCallback(() => {
    setVersionPopup(false);
    localStorage.setItem(VERSION_POPUP_KEY, 'true');
  }, []);

  const showBanner = banner && bannerVisible;

  return (
    <>
      <header className="Bear-Topbar fixed top-0 left-0 right-0 z-50">
        {/* CLI Banner */}
        {showBanner && (
          <div className="Bear-Topbar__banner bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 text-white text-center py-2 px-4 text-sm flex items-center justify-center gap-3">
            <span className="flex-1">
              {banner.message}
              <button
                onClick={() => setCliSpotlight(true)}
                className="ml-2 underline hover:no-underline font-medium"
              >
                {banner.linkText || 'Learn more'}
              </button>
            </span>
            <button onClick={handleDismissBanner} className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0" aria-label="Dismiss">
              <BearIcons.CloseIcon size={16} />
            </button>
          </div>
        )}

        {/* Main bar */}
        <div className="Bear-Topbar__main h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="h-full px-4 flex items-center justify-between mx-auto">
            {/* Left: Logo */}
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
            </div>

            {/* Center: 4 icon buttons */}
            <div className="Bear-Topbar__center hidden md:flex items-center gap-1">
              {/* Search — starts as icon, expands on hover/click */}
              <button
                onClick={handleSearchToggle}
                className={`group flex items-center rounded-lg text-sm transition-all duration-300 ease-out overflow-hidden ${
                  searchExpanded
                    ? 'gap-2 px-3 py-1.5 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 w-auto'
                    : 'gap-0 px-2 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:gap-2 hover:px-3'
                }`}
                aria-label="Search"
              >
                <BearIcons.SearchIcon size={16} className="flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-300 ease-out ${
                  searchExpanded
                    ? 'max-w-[120px] opacity-100'
                    : 'max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100'
                }`}>
                  Search
                </span>
                <kbd className={`inline-flex items-center px-1 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 rounded whitespace-nowrap transition-all duration-300 ease-out ${
                  searchExpanded
                    ? 'max-w-[40px] opacity-100'
                    : 'max-w-0 opacity-0 group-hover:max-w-[40px] group-hover:opacity-100'
                }`}>⌘K</kbd>
              </button>

              {/* Hooks */}
              <Link
                to="/hooks"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                <span className="hidden lg:inline">Hooks</span>
              </Link>

              {/* Icons */}
              <Link
                to="/icons"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
                <span className="hidden lg:inline">Icons</span>
              </Link>

              {/* Theming */}
              <button
                onClick={() => setThemingOpen(!themingOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  themingOpen
                    ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Theming"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                <span className="hidden lg:inline">Theming</span>
              </button>
            </div>

            {/* Right: Theme toggle + Links */}
            <div className="Bear-Topbar__right flex items-center gap-0.5">
              <button onClick={toggleMode} aria-label="Toggle theme" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">
                {isDark ? <BearIcons.SunIcon size={18} /> : <BearIcons.MoonIcon size={18} />}
              </button>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors" aria-label="GitHub">
                <BearIcons.GithubIcon size={18} />
              </a>
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors" aria-label="NPM">
                <NpmIcon />
              </a>
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
                  placeholder="Search components, hooks, guides..."
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

        {/* Theming panel */}
        {themingOpen && (
          <div className="Bear-Topbar__theming-panel bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Site Theme</h3>
                <button onClick={() => setThemingOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <BearIcons.CloseIcon size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {THEME_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleThemeApply(preset)}
                    className={`group relative p-3 rounded-lg border transition-all text-left ${
                      activeTheme.id === preset.id
                        ? 'border-pink-500 ring-2 ring-pink-500/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {/* Preview swatch */}
                    <div className="h-8 rounded-md mb-2 flex items-center justify-center gap-0.5 overflow-hidden" style={{ background: preset.colors.bg }}>
                      <span className="text-[8px] font-mono" style={{ color: preset.colors.keyword }}>const</span>
                      <span className="text-[8px] font-mono" style={{ color: preset.colors.text }}>=</span>
                      <span className="text-[8px] font-mono" style={{ color: preset.colors.string }}>"hi"</span>
                    </div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{preset.name}</p>
                    {activeTheme.id === preset.id && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                Click to apply across the entire site. A small alert will appear at the bottom-right — click it for the code.
              </p>
            </div>
          </div>
        )}
      </header>

      {/* CLI Spotlight Overlay */}
      {cliSpotlight && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm" onClick={() => setCliSpotlight(false)}>
          <div className="w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-medium mb-4">
                ForgeStack CLI
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Create projects in seconds</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Scaffold React apps with Bear, Compass, Synapse, Forge Query, and more — all pre-configured.
              </p>
              <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <code className="text-sm text-green-400 font-mono">npx @forgedevstack/cli</code>
              </div>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={CLI_NPM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View on npm
                </a>
                <a
                  href={FORGESTACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                >
                  forgedevstack.com
                </a>
              </div>
            </div>
            <button onClick={() => setCliSpotlight(false)} className="w-full py-2.5 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> to close
            </button>
          </div>
        </div>
      )}

      {/* Theme applied alert (small bar at bottom-right) */}
      {themeToast.visible && !codeModalOpen && (
        <button
          onClick={() => setCodeModalOpen(true)}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-xl shadow-2xl border border-gray-700 hover:border-gray-500 transition-all cursor-pointer animate-in slide-in-from-bottom-4 duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium">Theme: {activeTheme.name} applied</span>
          <span className="text-[10px] text-gray-400">Click for code</span>
          <button
            onClick={(e) => { e.stopPropagation(); setThemeToast(p => ({ ...p, visible: false })); }}
            className="ml-1 p-0.5 text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <BearIcons.CloseIcon size={12} />
          </button>
        </button>
      )}

      {/* Theme code modal */}
      {codeModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setCodeModalOpen(false)}>
          <div className="w-full max-w-lg mx-4 bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
              <span className="text-sm font-semibold text-white">Theme: {activeTheme.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyThemeCode}
                  className="px-3 py-1 text-xs bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
                >
                  Copy
                </button>
                <button onClick={() => setCodeModalOpen(false)} className="p-1 text-gray-400 hover:text-white transition-colors">
                  <BearIcons.CloseIcon size={16} />
                </button>
              </div>
            </div>
            <pre className="p-5 text-sm font-mono text-green-400 overflow-x-auto max-h-72">
              {themeToast.code}
            </pre>
            <div className="px-5 py-2.5 border-t border-gray-700 text-xs text-gray-500">
              Press <kbd className="px-1 py-0.5 bg-gray-700 rounded text-[10px]">⌘+⇧+S</kbd> to reopen after closing
            </div>
          </div>
        </div>
      )}

      {/* Version Popup */}
      {versionPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 text-center">
              <BearIcon size={56} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
                Bear UI v{BEAR_VERSION}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                1.1.0: ResizablePanel, FileTree, ResizableTextarea, Typography gradient & typewriter, Button textVariant, custom variants via BearProvider. Plus Map, CodeEditor, Cropper, Masonry, Watermark, Marquee, CountdownTimer, Spotlight, Typewriter, Dock, GradientText, NavigableSelect, and more.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                {['ResizablePanel', 'FileTree', 'ResizableTextarea', 'Typography gradient', 'GradientText', 'Map', 'CodeEditor', 'Spotlight'].map((c) => (
                  <span key={c} className="px-2 py-0.5 text-[10px] font-medium bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
              <button
                onClick={handleDismissVersion}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
