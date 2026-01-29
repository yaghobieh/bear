import { FC, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useSearch } from '@/hooks/useSearch';
import { GITHUB_URL, NPM_URL, BEAR_VERSION } from '@/constants/navigation.const';
import { TopbarProps } from './Topbar.types';
import { BearIcons } from '@forgedevstack/bear';
import { BearIcon, NpmIcon } from './Topbar.icons';

export const Topbar: FC<TopbarProps> = ({ onMenuClick, banner, onBannerVisibilityChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const { query, setQuery, results, isOpen, openSearch, closeSearch } = useSearch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [bannerVisible, setBannerVisible] = useState(() => {
    if (!banner?.id) return true;
    const dismissed = sessionStorage.getItem(`bear-banner-${banner.id}-dismissed`);
    return dismissed !== 'true';
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        closeSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openSearch, closeSearch]);

  const handleResultClick = (path: string) => {
    navigate(path);
    closeSearch();
  };

  const showBanner = banner && bannerVisible;

  return (
    <header className="Bear-Topbar fixed top-0 left-0 right-0 z-50">
      {showBanner && (
        <div className="Bear-Topbar__banner bg-gradient-to-r from-pink-600 via-bear-600 to-purple-600 text-white text-center py-2 px-4 text-sm flex items-center justify-center gap-3">
          <span className="flex-1">
            {banner.message}
            {banner.link && (
              <Link to={banner.link} className="ml-2 underline hover:no-underline font-medium">
                {banner.linkText || 'Learn more'}
              </Link>
            )}
          </span>
          <button
            onClick={handleDismissBanner}
            className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <BearIcons.CloseIcon size={16} />
          </button>
        </div>
      )}

      <div className="Bear-Topbar__main h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="h-full px-4 flex items-center justify-between mx-auto">
          {/* Left: Logo & Menu */}
          <div className="Bear-Topbar__left flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
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

          {/* Center: Search */}
          <div ref={searchRef} className="Bear-Topbar__center hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div
                className={`flex items-center w-full px-3 py-2 rounded-lg border transition-all ${
                  isOpen 
                    ? 'bg-white dark:bg-gray-800 border-pink-500 ring-2 ring-pink-500/20' 
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <BearIcons.SearchIcon size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search components, hooks..."
                  className="flex-1 ml-2 text-sm bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none"
                  onFocus={openSearch}
                />
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
                  ⌘K
                </kbd>
              </div>

              {isOpen && results.length > 0 && (
                <div className="Bear-Topbar__search-results absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <ul className="py-1 max-h-80 overflow-y-auto">
                    {results.map((result) => (
                      <li key={result.path}>
                        <button
                          onClick={() => handleResultClick(result.path)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm text-gray-900 dark:text-gray-100">{result.label}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{result.category}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="Bear-Topbar__right flex items-center">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 mr-4">
              <Link
                to="/hooks"
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded-md transition-colors"
              >
                Hooks
              </Link>
              <Link
                to="/icons"
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded-md transition-colors"
              >
                Icons
              </Link>
            </nav>

            <div className="hidden md:block w-px h-5 bg-gray-200 dark:bg-gray-700 mr-3" />

            {/* Icon Buttons */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
              >
                {isDark ? <BearIcons.SunIcon size={18} /> : <BearIcons.MoonIcon size={18} />}
              </button>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
                aria-label="GitHub"
              >
                <BearIcons.GithubIcon size={18} />
              </a>

              <a
                href={NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
                aria-label="NPM"
              >
                <NpmIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
