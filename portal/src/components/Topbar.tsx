import { FC, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useSearch } from '@/hooks/useSearch';
import { GITHUB_URL, NPM_URL, BEAR_VERSION } from '@/constants/navigation.const';

interface TopbarProps {
  onMenuClick?: () => void;
  banner?: {
    id?: string;
    message: string;
    link?: string;
    linkText?: string;
  };
  onBannerVisibilityChange?: (visible: boolean) => void;
}

// Icons
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const NpmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Bear Logo - Full body Lotso-style pink teddy bear
const BearIcon: FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="72" rx="26" ry="20" fill="#db2777" />
    <ellipse cx="50" cy="73" rx="16" ry="12" fill="#fde68a" />
    
    <ellipse cx="32" cy="88" rx="12" ry="9" fill="#db2777" />
    <ellipse cx="32" cy="89" rx="8" ry="6" fill="#fde68a" />
    <ellipse cx="68" cy="88" rx="12" ry="9" fill="#db2777" />
    <ellipse cx="68" cy="89" rx="8" ry="6" fill="#fde68a" />
    
    <ellipse cx="24" cy="68" rx="8" ry="12" fill="#db2777" transform="rotate(-15 24 68)" />
    <ellipse cx="76" cy="68" rx="8" ry="12" fill="#db2777" transform="rotate(15 76 68)" />
    
    <ellipse cx="50" cy="36" rx="26" ry="24" fill="#db2777" />
    
    <ellipse cx="28" cy="16" rx="10" ry="10" fill="#db2777" />
    <ellipse cx="28" cy="16" rx="6" ry="6" fill="#fcd34d" />
    <ellipse cx="72" cy="16" rx="10" ry="10" fill="#db2777" />
    <ellipse cx="72" cy="16" rx="6" ry="6" fill="#fcd34d" />
    
    <ellipse cx="50" cy="44" rx="14" ry="10" fill="#fde68a" />
    
    <ellipse cx="50" cy="40" rx="6" ry="4" fill="#7c3aed" />
    
    <path d="M32 24 Q38 21 44 25" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M68 24 Q62 21 56 25" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    <ellipse cx="38" cy="32" rx="6" ry="7" fill="#ffffff" />
    <ellipse cx="39" cy="33" rx="4" ry="5" fill="#78350f" />
    <ellipse cx="40" cy="33" rx="2" ry="2.5" fill="#1c1917" />
    <ellipse cx="37" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />
    
    <ellipse cx="62" cy="32" rx="6" ry="7" fill="#ffffff" />
    <ellipse cx="61" cy="33" rx="4" ry="5" fill="#78350f" />
    <ellipse cx="60" cy="33" rx="2" ry="2.5" fill="#1c1917" />
    <ellipse cx="63" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />
    
    <path d="M44 48 Q50 46 56 48" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const Topbar: FC<TopbarProps> = ({ onMenuClick, banner, onBannerVisibilityChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const { query, setQuery, results, isOpen, openSearch, closeSearch } = useSearch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Banner dismiss state
  const [bannerVisible, setBannerVisible] = useState(() => {
    if (!banner?.id) return true;
    const dismissed = sessionStorage.getItem(`bear-banner-${banner.id}-dismissed`);
    return dismissed !== 'true';
  });

  // Notify parent of banner visibility changes
  useEffect(() => {
    onBannerVisibilityChange?.(banner ? bannerVisible : false);
  }, [bannerVisible, banner, onBannerVisibilityChange]);

  const handleDismissBanner = () => {
    if (banner?.id) {
      sessionStorage.setItem(`bear-banner-${banner.id}-dismissed`, 'true');
    }
    setBannerVisible(false);
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSearch]);

  // Keyboard shortcut (Cmd/Ctrl + K)
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
        <div className="h-full px-4 flex items-center justify-between">
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

          <div ref={searchRef} className="hidden md:block relative flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={openSearch}
                placeholder="Search components..."
                className="w-full pl-10 pr-12 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-bear-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hidden lg:block">
                ⌘K
              </div>
            </div>

            {isOpen && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <ul className="py-2">
                  {results.map((result) => (
                    <li key={result.path}>
                      <button
                        onClick={() => handleResultClick(result.path)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-900 dark:text-gray-100">{result.label}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{result.category}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
