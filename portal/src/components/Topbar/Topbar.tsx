import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BearIcons, Typography } from '@forgedevstack/bear';
import { GITHUB_URL, NPM_URL, BEAR_VERSION, THEME_PRESETS } from '@/constants/navigation.const';
import { NEW_COMPONENT_ALERTS, VERSION_POPUP_DESCRIPTION, VERSION_POPUP_FEATURES } from '@/constants/topbar.const';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { TopbarProps } from './Topbar.types';
import { BearIcon, NpmIcon } from './Topbar.icons';
import { BellSvg } from './helpers';
import { TOP_NAV_LINKS } from './Topbar.const';
import { useTopbar } from './hooks/useTopbar';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';

export const Topbar: FC<TopbarProps> = (props) => {
  const { onMenuClick, banner, onBannerVisibilityChange } = props;
  const { language, setLanguage } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const location = useLocation();

  const {
    isDark, toggleMode, setMode,
    searchExpanded, settingsOpen, alertsOpen,
    activeTheme, themeToast, codeModalOpen, versionPopup, showCookieBanner,
    bannerVisible, shortcutLabel,
    searchRef, inputRef, settingsRef, alertsRef,
    query, setQuery, results, grouped, history, isOpen,
    openSearch, closeSearch, clearHistory,
    setSearchExpanded, setSettingsOpen, setAlertsOpen, setCodeModalOpen, setThemeToast,
    handleDismissBanner, handleSearchToggle, handleThemeApply,
    handleCopyThemeCode, handleDismissVersion, handleCookieDecision, handleResultClick,
    handleResetCookieConsent, npmDownloads,
  } = useTopbar({
    bannerId: banner?.id,
    hasBanner: !!banner,
    onBannerVisibilityChange,
  });

  const showBanner = banner && bannerVisible;

  return (
    <div>
      <header className="Bear-Topbar fixed top-0 left-0 right-0 z-50">
        {showBanner && (
          <div className="Bear-Topbar__banner bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 text-white text-center py-2 px-4 text-sm flex items-center justify-center gap-3">
            <span className="flex-1">
              {banner.message}
              {banner.link && banner.linkText && (
                <span>
                  {' '}
                  <Link to={banner.link} className="font-medium underline underline-offset-2 text-white/90 hover:text-white">
                    {banner.linkText}
                  </Link>
                </span>
              )}
            </span>
            <button onClick={handleDismissBanner} className="p-1 hover:bg-white/15 rounded transition-colors flex-shrink-0 text-white" aria-label="Dismiss">
              <BearIcons.CloseIcon size={16} />
            </button>
          </div>
        )}

        <div className="Bear-Topbar__main h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="h-full px-4 flex items-center justify-between mx-auto">
            <div className="Bear-Topbar__left flex items-center gap-3">
              <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors" aria-label="Toggle menu">
                <BearIcons.MenuIcon size={20} />
              </button>
              <Link to="/" className="flex items-center gap-2.5">
                <BearIcon size={32} />
                <div className="flex items-baseline gap-2">
                  <Typography variant="body1" className="font-bold text-gray-900 dark:text-white" component="span">Bear UI</Typography>
                  <Typography variant="caption" className="text-gray-400 dark:text-gray-500 font-mono" component="span">v{BEAR_VERSION}</Typography>
                </div>
              </Link>

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

            <nav className="Bear-Topbar__nav hidden md:flex items-center gap-1">
              {TOP_NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path.split('/').slice(0, 2).join('/') + '/');
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="Bear-Topbar__right flex items-center gap-0.5">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors" aria-label="GitHub" title="GitHub">
                <BearIcons.GithubIcon size={18} />
              </a>

              <a
                href={NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
                aria-label="npm downloads"
                title="Monthly npm downloads"
              >
                <NpmIcon />
                <span>{npmDownloads.formatted}/mo</span>
              </a>
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="sm:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors" aria-label="NPM" title="npm">
                <NpmIcon />
              </a>

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
                  <BellSvg size={18} />
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
                          {t.langEnglish}
                        </button>
                        <button
                          onClick={() => setLanguage('es')}
                          className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium ${
                            language === 'es'
                              ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
                              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {t.langSpanish}
                        </button>
                      </div>
                    </div>

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
                          handleResetCookieConsent();
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

              <button
                onClick={toggleMode}
                aria-label="Toggle theme"
                className={`p-2 rounded-md transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-zinc-700 hover:text-zinc-900'
                }`}
              >
                {isDark ? (
                  <BearIcons.SunIcon size={18} />
                ) : (
                  <BearIcons.MoonIcon size={18} className="[&_path]:fill-current [&_path]:stroke-none" />
                )}
              </button>
            </div>
          </div>
        </div>

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
              {isOpen && query.trim() === '' && history.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{t.recent}</span>
                    <button onClick={clearHistory} className="text-[11px] text-pink-500 hover:text-pink-600 font-medium">{t.clear}</button>
                  </div>
                  <ul className="py-1">
                    {history.map((r) => (
                      <li key={r.path}>
                        <button
                          onClick={() => handleResultClick(r.path)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-2 transition-colors"
                        >
                          <BearIcons.ClockIcon size={14} className="text-gray-400 shrink-0" />
                          <span className="text-sm text-gray-900 dark:text-gray-100 flex-1">{r.label}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{r.category}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {isOpen && grouped.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm max-h-80 overflow-y-auto">
                  {grouped.map((group) => (
                    <div key={group.category}>
                      <div className="px-4 py-1.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 sticky top-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{group.category}</span>
                        <span className="ml-1.5 text-[10px] text-gray-400">({group.items.length})</span>
                      </div>
                      <ul className="py-0.5">
                        {group.items.map((r) => (
                          <li key={r.path}>
                            <button
                              onClick={() => handleResultClick(r.path)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between transition-colors"
                            >
                              <span className="text-sm text-gray-900 dark:text-gray-100">{r.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

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
            onClick={(e) => { e.stopPropagation(); setThemeToast((p) => ({ ...p, visible: false })); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setThemeToast((p) => ({ ...p, visible: false })); }}}
            className="ml-1 p-0.5 text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <BearIcons.CloseIcon size={12} />
          </span>
        </button>
      )}

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

      {versionPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 text-center">
              <BearIcon size={56} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Bear UI v{BEAR_VERSION}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {VERSION_POPUP_DESCRIPTION}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                {VERSION_POPUP_FEATURES.map((c) => (
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
    </div>
  );
};

export default Topbar;
