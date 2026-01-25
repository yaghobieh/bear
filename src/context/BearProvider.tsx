import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import type { BearTheme, BearThemeOverride } from '../types';
import { defaultLightTheme, defaultDarkTheme } from './defaultTheme';

interface BearContextValue {
  theme: BearTheme;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  updateTheme: (overrides: BearThemeOverride) => void;
}

const BearContext = createContext<BearContextValue | null>(null);

interface BearProviderProps {
  children: ReactNode;
  /** Initial theme mode */
  defaultMode?: 'light' | 'dark';
  /** Theme overrides applied on top of default theme */
  theme?: BearThemeOverride;
  /** Persist theme preference to localStorage */
  persistPreference?: boolean;
  /** localStorage key for persisting preference */
  storageKey?: string;
}

const STORAGE_KEY_DEFAULT = 'bear-theme-mode';

/**
 * BearProvider - Wraps your app to provide theme context
 * 
 * @example
 * ```tsx
 * import { BearProvider } from '@forgedevstack/bear';
 * 
 * function App() {
 *   return (
 *     <BearProvider defaultMode="dark">
 *       <YourApp />
 *     </BearProvider>
 *   );
 * }
 * ```
 */
export const BearProvider = ({
  children,
  defaultMode = 'light',
  theme: themeOverrides,
  persistPreference = true,
  storageKey = STORAGE_KEY_DEFAULT,
}: BearProviderProps) => {
  // Initialize mode from localStorage or default
  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && persistPreference) {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return defaultMode;
  });

  // Store custom overrides
  const [customOverrides, setCustomOverrides] = useState<BearThemeOverride>(themeOverrides || {});

  // Build the final theme
  const theme = useMemo((): BearTheme => {
    const baseTheme = mode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    if (Object.keys(customOverrides).length === 0) {
      return baseTheme;
    }
    return {
      ...baseTheme,
      ...customOverrides,
      colors: customOverrides.colors 
        ? { ...baseTheme.colors, ...customOverrides.colors }
        : baseTheme.colors,
    } as BearTheme;
  }, [mode, customOverrides]);

  // Set mode and persist
  const setMode = useCallback((newMode: 'light' | 'dark') => {
    setModeState(newMode);
    if (typeof window !== 'undefined' && persistPreference) {
      localStorage.setItem(storageKey, newMode);
    }
  }, [persistPreference, storageKey]);

  // Toggle between light and dark
  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  // Update theme with overrides
  const updateTheme = useCallback((overrides: BearThemeOverride) => {
    setCustomOverrides((prev: BearThemeOverride) => ({ ...prev, ...overrides }));
  }, []);

  // Apply CSS variables to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Set mode class
      root.classList.remove('bear-light', 'bear-dark');
      root.classList.add(`bear-${mode}`);
      
      // Set CSS variables for primary colors
      Object.entries(theme.colors.primary).forEach(([key, value]) => {
        root.style.setProperty(`--bear-primary-${key}`, value as string);
      });
      
      // Set background colors
      root.style.setProperty('--bear-bg-primary', theme.colors.background.primary);
      root.style.setProperty('--bear-bg-secondary', theme.colors.background.secondary);
      root.style.setProperty('--bear-bg-tertiary', theme.colors.background.tertiary);
      
      // Set text colors
      root.style.setProperty('--bear-text-primary', theme.colors.text.primary);
      root.style.setProperty('--bear-text-secondary', theme.colors.text.secondary);
      root.style.setProperty('--bear-text-muted', theme.colors.text.muted);
      
      // Set border colors
      root.style.setProperty('--bear-border-default', theme.colors.border.default);
    }
  }, [theme, mode]);

  const value = useMemo(() => ({
    theme,
    mode,
    setMode,
    toggleMode,
    updateTheme,
  }), [theme, mode, setMode, toggleMode, updateTheme]);

  return (
    <BearContext.Provider value={value}>
      {children}
    </BearContext.Provider>
  );
};

/**
 * Hook to access the Bear theme context
 * 
 * @example
 * ```tsx
 * const { theme, mode, toggleMode } = useBear();
 * ```
 */
export const useBear = (): BearContextValue => {
  const context = useContext(BearContext);
  if (!context) {
    throw new Error('useBear must be used within a BearProvider');
  }
  return context;
};

/**
 * Hook to access just the theme. Throws if used outside BearProvider.
 */
export const useBearTheme = (): BearTheme => {
  const { theme } = useBear();
  return theme;
};

/**
 * Hook to access theme when optionally inside BearProvider.
 * Returns default dark theme when outside provider. Use for bis callback.
 */
export const useBearThemeOptional = (): BearTheme => {
  const context = useContext(BearContext);
  if (context) return context.theme;
  return defaultDarkTheme;
};

/**
 * Hook to access just the mode and toggle function
 */
export const useBearMode = () => {
  const { mode, setMode, toggleMode } = useBear();
  return { mode, setMode, toggleMode };
};

