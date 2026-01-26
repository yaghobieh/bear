import { FC, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useSearch } from '@/hooks/useSearch';
import { GITHUB_URL, NPM_URL, BEAR_VERSION } from '@/constants/navigation.const';
import { TopbarProps } from './Topbar.types';
import {
  MenuIcon,
  SearchIcon,
  HooksIcon,
  IconsIcon,
  SunIcon,
  MoonIcon,
  GitHubIcon,
  NpmIcon,
  CloseIcon,
  BearIcon,
} from './Topbar.icons';

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
    <header className="fixed top-0 left-0 right-0 z-50">
      {showBanner && (
        <div className="bg-gradient-to-r from-pink-600 to-bear-600 text-white text-center py-2 px-4 text-sm flex items-center justify-center gap-3">
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
            <CloseIcon />
          </button>
        </div>
      )}

      <div className="h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="h-full px-4 flex items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>

            <Link to="/" className="flex items-center gap-3">
              <BearIcon size={40} />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900 dark:text-white">Bear UI</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">v{BEAR_VERSION}</span>
              </div>
            </Link>
          </div>

          <div ref={searchRef} className="hidden md:flex items-center justify-center gap-3 flex-1 mx-8">
            <button
              onClick={() => {
                openSearch();
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className={`p-2.5 rounded-lg transition-all duration-300 ease-out ${
                isOpen 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-500'
              }`}
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>

            <div className="relative">
              <div 
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? 'w-72 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search components..."
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                    bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <ul className="py-2 max-h-80 overflow-y-auto">
                    {results.map((result) => (
                      <li key={result.path}>
                        <button
                          onClick={() => handleResultClick(result.path)}
                          className="w-full px-4 py-2.5 text-left hover:bg-pink-50 dark:hover:bg-pink-900/20 flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.label}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{result.category}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              to="/hooks"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-500 transition-colors"
            >
              <HooksIcon size={18} />
              <span className="text-sm font-medium">Hooks</span>
            </Link>

            <Link
              to="/icons"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-500 transition-colors"
            >
              <IconsIcon size={18} />
              <span className="text-sm font-medium">Icons</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>

            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="NPM"
            >
              <NpmIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

