import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import type { BearTheme, BearThemeOverride, BearColorScale, CustomVariant, CustomVariantsMap } from '../types';
import type { BearComponentOverrides, ButtonVariantsConfig } from '../types/component.types';
import type { CustomTypography, CustomTypographyMap } from '../components/Typography/Typography.types';
import { defaultLightTheme, defaultDarkTheme } from './defaultTheme';

interface BearContextValue {
  theme: BearTheme;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  updateTheme: (overrides: BearThemeOverride) => void;
  /** Component style overrides */
  components: BearComponentOverrides;
  /** Variant configurations */
  variants: { Button?: ButtonVariantsConfig };
  /** Custom variants map */
  customVariants: CustomVariantsMap;
  /** Check if a variant exists (built-in or custom) */
  hasVariant: (name: string) => boolean;
  /** Get variant colors */
  getVariant: (name: string) => CustomVariant | undefined;
  /** Register a new custom variant at runtime */
  addVariant: (name: string, config: CustomVariant) => void;
  /** Custom typography variants */
  customTypography: CustomTypographyMap;
  /** Check if typography variant exists */
  hasTypography: (name: string) => boolean;
  /** Get typography config */
  getTypography: (name: string) => CustomTypography | undefined;
  /** Add custom typography at runtime */
  addTypography: (name: string, config: CustomTypography) => void;
  /** Register component overrides */
  registerComponent: <K extends keyof BearComponentOverrides>(
    componentKey: K,
    styles: BearComponentOverrides[K]
  ) => void;
  /** Register variant overrides */
  registerVariant: <K extends 'Button'>(
    componentKey: K,
    variantConfig: ButtonVariantsConfig
  ) => void;
}

/** Bear context - use useBear() hook instead of consuming directly */
export const BearContext = createContext<BearContextValue | null>(null);

interface BearProviderProps {
  children: ReactNode;
  /** Initial theme mode */
  defaultMode?: 'light' | 'dark';
  /** Theme overrides applied on top of default theme */
  theme?: BearThemeOverride;
  /** Global component style overrides */
  components?: BearComponentOverrides;
  /** Variant color configurations for built-in variants */
  variants?: { Button?: ButtonVariantsConfig };
  /**
   * Custom variants - add your own color variants!
   * @example
   * ```tsx
   * <BearProvider customVariants={{
   *   redBrand: { bg: '#dc2626', bgHover: '#b91c1c', text: '#ffffff' },
   *   oceanBlue: { bg: '#0ea5e9', bgHover: '#0284c7', text: '#ffffff' },
   * }}>
   * ```
   * Then use: `<Button variant="redBrand">Click me</Button>`
   */
  customVariants?: CustomVariantsMap;
  /**
   * Custom typography variants - add your own text styles!
   * @example
   * ```tsx
   * <BearProvider customTypography={{
   *   b250: { fontSize: '25px', fontWeight: 'bold', lineHeight: '1.2' },
   *   display1: { fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.025em' },
   *   label: { fontSize: '12px', fontWeight: 'medium', textTransform: 'uppercase' },
   * }}>
   * ```
   * Then use: `<Typography variant="b250">Custom text</Typography>`
   */
  customTypography?: CustomTypographyMap;
  /** Persist theme preference to localStorage */
  persistPreference?: boolean;
  /** localStorage key for persisting preference */
  storageKey?: string;
}

const STORAGE_KEY_DEFAULT = 'bear-theme-mode';

/** Built-in variant names */
const BUILT_IN_VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline', 'error'];

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

/**
 * Convert RGB to hex
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Lighten a color by a percentage
 */
const lighten = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = percent / 100;
  return rgbToHex(
    rgb.r + (255 - rgb.r) * factor,
    rgb.g + (255 - rgb.g) * factor,
    rgb.b + (255 - rgb.b) * factor
  );
};

/**
 * Darken a color by a percentage
 */
const darken = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = 1 - percent / 100;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
};

/**
 * Generate a full color scale from a single color
 * The input color becomes the 500 shade
 */
const generateColorScale = (baseColor: string): BearColorScale => {
  return {
    50: lighten(baseColor, 95),
    100: lighten(baseColor, 85),
    200: lighten(baseColor, 70),
    300: lighten(baseColor, 50),
    400: lighten(baseColor, 25),
    500: baseColor,
    600: darken(baseColor, 10),
    700: darken(baseColor, 25),
    800: darken(baseColor, 40),
    900: darken(baseColor, 55),
    950: darken(baseColor, 70),
  };
};

/**
 * Check if a value is a simple color string (hex, rgb, named color)
 */
const isColorString = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  return value.startsWith('#') || value.startsWith('rgb') || /^[a-z]+$/i.test(value);
};

/**
 * Named colors mapping to hex
 */
const namedColors: Record<string, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  rose: '#f43f5e',
  amber: '#f59e0b',
  lime: '#84cc16',
  emerald: '#10b981',
  sky: '#0ea5e9',
  slate: '#64748b',
  gray: '#6b7280',
  zinc: '#71717a',
  neutral: '#737373',
  stone: '#78716c',
  white: '#ffffff',
  black: '#000000',
};

/**
 * Normalize color input to hex
 */
const normalizeColor = (color: string): string => {
  const lower = color.toLowerCase();
  if (namedColors[lower]) return namedColors[lower];
  if (color.startsWith('#')) return color;
  return color;
};

/**
 * Deep merge utility for nested objects
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!source) return target;
  
  const output = { ...target } as T;
  const targetObj = target as Record<string, unknown>;
  const sourceObj = source as Record<string, unknown>;
  const outputObj = output as Record<string, unknown>;
  
  for (const key in sourceObj) {
    if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
      const sourceVal = sourceObj[key];
      const targetVal = targetObj[key];
      
      if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal) &&
          targetVal && typeof targetVal === 'object' && !Array.isArray(targetVal)) {
        outputObj[key] = deepMerge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>
        );
      } else if (sourceVal !== undefined) {
        outputObj[key] = sourceVal;
      }
    }
  }
  
  return output;
}

/**
 * Set CSS variables for a color scale
 */
const setColorScaleVariables = (
  root: HTMLElement,
  prefix: string,
  scale: BearColorScale
) => {
  Object.entries(scale).forEach(([shade, value]) => {
    root.style.setProperty(`--bear-${prefix}-${shade}`, value);
  });
};

/**
 * Set CSS variables for a custom variant
 */
const setCustomVariantVariables = (
  root: HTMLElement,
  name: string,
  config: CustomVariant
) => {
  root.style.setProperty(`--bear-${name}-bg`, config.bg);
  if (config.bgHover) root.style.setProperty(`--bear-${name}-bg-hover`, config.bgHover);
  if (config.bgActive) root.style.setProperty(`--bear-${name}-bg-active`, config.bgActive);
  if (config.text) root.style.setProperty(`--bear-${name}-text`, config.text);
  if (config.border) root.style.setProperty(`--bear-${name}-border`, config.border);
  if (config.ring) root.style.setProperty(`--bear-${name}-ring`, config.ring);
};

/**
 * BearProvider - Wraps your app to provide theme context
 * 
 * @example
 * ```tsx
 * import { BearProvider } from '@forgedevstack/bear';
 * 
 * function App() {
 *   return (
 *     <BearProvider 
 *       defaultMode="dark"
 *       // Simple: just pass a color string!
 *       theme={{
 *         colors: {
 *           primary: '#3b82f6', // or 'blue', 'red', '#hex'
 *         }
 *       }}
 *       // Or full control with color scales:
 *       // theme={{
 *       //   colors: {
 *       //     primary: { 500: '#ec4899', 600: '#db2777', ... }
 *       //   }
 *       // }}
 *       customVariants={{
 *         redBrand: { bg: '#dc2626', bgHover: '#b91c1c', text: '#fff' },
 *         oceanBlue: { bg: '#0ea5e9', bgHover: '#0284c7', text: '#fff' },
 *       }}
 *     >
 *       <Button variant="redBrand">Red Brand Button</Button>
 *       <Button variant="primary">Uses theme primary</Button>
 *     </BearProvider>
 *   );
 * }
 * ```
 */
export const BearProvider = ({
  children,
  defaultMode = 'light',
  theme: themeOverrides,
  components: initialComponents = {},
  variants: initialVariants = {},
  customVariants: initialCustomVariants = {},
  customTypography: initialCustomTypography = {},
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
  
  // Store component overrides
  const [components, setComponents] = useState<BearComponentOverrides>(initialComponents);
  
  // Store variant configurations
  const [variants, setVariants] = useState<{ Button?: ButtonVariantsConfig }>(initialVariants);
  
  // Store custom variants
  const [customVariants, setCustomVariants] = useState<CustomVariantsMap>(initialCustomVariants);
  
  // Store custom typography
  const [customTypography, setCustomTypography] = useState<CustomTypographyMap>(initialCustomTypography);

  // Process color overrides - convert string colors to full scales
  const processedOverrides = useMemo((): BearThemeOverride => {
    if (!customOverrides || Object.keys(customOverrides).length === 0) {
      return {};
    }
    
    const processed = { ...customOverrides };
    
    // Process colors if present
    if (processed.colors) {
      const colorKeys = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
      
      for (const key of colorKeys) {
        const colorValue = (processed.colors as Record<string, unknown>)[key];
        
        // If it's a simple color string, generate the full scale
        if (isColorString(colorValue)) {
          const normalizedColor = normalizeColor(colorValue);
          (processed.colors as Record<string, BearColorScale>)[key] = generateColorScale(normalizedColor);
        }
      }
    }
    
    return processed;
  }, [customOverrides]);

  // Build the final theme with deep merge
  const theme = useMemo((): BearTheme => {
    const baseTheme = mode === 'dark' ? defaultDarkTheme : defaultLightTheme;
    if (Object.keys(processedOverrides).length === 0) {
      return baseTheme;
    }
    return deepMerge(baseTheme, processedOverrides as Partial<BearTheme>) as BearTheme;
  }, [mode, processedOverrides]);

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
    setCustomOverrides((prev: BearThemeOverride) => deepMerge(prev as Record<string, unknown>, overrides as Record<string, unknown>) as BearThemeOverride);
  }, []);

  // Register component overrides
  const registerComponent = useCallback(<K extends keyof BearComponentOverrides>(
    componentKey: K,
    styles: BearComponentOverrides[K]
  ) => {
    setComponents(prev => ({
      ...prev,
      [componentKey]: {
        ...(prev[componentKey] || {}),
        ...styles,
      },
    }));
  }, []);

  // Register variant overrides
  const registerVariant = useCallback(<K extends 'Button'>(
    componentKey: K,
    variantConfig: ButtonVariantsConfig
  ) => {
    setVariants(prev => ({
      ...prev,
      [componentKey]: {
        ...(prev[componentKey] || {}),
        ...variantConfig,
      },
    }));
  }, []);

  // Check if variant exists
  const hasVariant = useCallback((name: string): boolean => {
    return BUILT_IN_VARIANTS.includes(name) || name in customVariants;
  }, [customVariants]);

  // Get variant config
  const getVariant = useCallback((name: string): CustomVariant | undefined => {
    return customVariants[name];
  }, [customVariants]);

  // Add custom variant at runtime
  const addVariant = useCallback((name: string, config: CustomVariant) => {
    setCustomVariants(prev => ({
      ...prev,
      [name]: config,
    }));
  }, []);

  // Check if typography variant exists
  const hasTypography = useCallback((name: string) => {
    return name in customTypography;
  }, [customTypography]);

  // Get typography config
  const getTypography = useCallback((name: string) => {
    return customTypography[name];
  }, [customTypography]);

  // Add custom typography at runtime
  const addTypography = useCallback((name: string, config: CustomTypography) => {
    setCustomTypography(prev => ({
      ...prev,
      [name]: config,
    }));
  }, []);

  // Apply mode to document: Tailwind dark: variants + Bear classes + CSS variables
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;

      // Tailwind dark mode (class strategy) – so dark: variants work everywhere
      if (mode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Bear-specific classes (for any bear-* scoped styles)
      root.classList.remove('bear-light', 'bear-dark');
      root.classList.add(`bear-${mode}`);
      
      // Set ALL color scale CSS variables
      setColorScaleVariables(root, 'primary', theme.colors.primary);
      setColorScaleVariables(root, 'secondary', theme.colors.secondary);
      setColorScaleVariables(root, 'success', theme.colors.success);
      setColorScaleVariables(root, 'warning', theme.colors.warning);
      setColorScaleVariables(root, 'danger', theme.colors.danger);
      setColorScaleVariables(root, 'info', theme.colors.info);
      setColorScaleVariables(root, 'neutral', theme.colors.neutral);
      
      // Set background colors
      root.style.setProperty('--bear-bg-primary', theme.colors.background.primary);
      root.style.setProperty('--bear-bg-secondary', theme.colors.background.secondary);
      root.style.setProperty('--bear-bg-tertiary', theme.colors.background.tertiary);
      
      // Set text colors
      root.style.setProperty('--bear-text-primary', theme.colors.text.primary);
      root.style.setProperty('--bear-text-secondary', theme.colors.text.secondary);
      root.style.setProperty('--bear-text-muted', theme.colors.text.muted);
      root.style.setProperty('--bear-text-inverted', theme.colors.text.inverted);
      
      // Set border colors
      root.style.setProperty('--bear-border-default', theme.colors.border.default);
      root.style.setProperty('--bear-border-subtle', theme.colors.border.subtle);
      root.style.setProperty('--bear-border-strong', theme.colors.border.strong);
      
      // Set variant colors from configuration
      if (variants.Button) {
        Object.entries(variants.Button).forEach(([variant, config]) => {
          if (config) {
            if (config.bg) root.style.setProperty(`--bear-btn-${variant}-bg`, config.bg);
            if (config.bgHover) root.style.setProperty(`--bear-btn-${variant}-bg-hover`, config.bgHover);
            if (config.bgActive) root.style.setProperty(`--bear-btn-${variant}-bg-active`, config.bgActive);
            if (config.bgDisabled) root.style.setProperty(`--bear-btn-${variant}-bg-disabled`, config.bgDisabled);
            if (config.text) root.style.setProperty(`--bear-btn-${variant}-text`, config.text);
            if (config.textDisabled) root.style.setProperty(`--bear-btn-${variant}-text-disabled`, config.textDisabled);
            if (config.border) root.style.setProperty(`--bear-btn-${variant}-border`, config.border);
            if (config.borderHover) root.style.setProperty(`--bear-btn-${variant}-border-hover`, config.borderHover);
            if (config.ring) root.style.setProperty(`--bear-btn-${variant}-ring`, config.ring);
          }
        });
      }
      
      // Set custom variants CSS variables
      Object.entries(customVariants).forEach(([name, config]) => {
        setCustomVariantVariables(root, name, config);
      });
      
      // Set typography
      root.style.setProperty('--bear-font-sans', theme.typography.fontFamily.sans);
      root.style.setProperty('--bear-font-mono', theme.typography.fontFamily.mono);
      
      // Set shadows
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--bear-shadow-${key}`, value);
      });
      
      // Set border radius
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--bear-radius-${key}`, value);
      });
      
      // Set spacing
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--bear-spacing-${key}`, value);
      });
    }
  }, [theme, mode, variants, customVariants]);

  const value = useMemo(() => ({
    theme,
    mode,
    setMode,
    toggleMode,
    updateTheme,
    components,
    variants,
    customVariants,
    hasVariant,
    getVariant,
    addVariant,
    customTypography,
    hasTypography,
    getTypography,
    addTypography,
    registerComponent,
    registerVariant,
  }), [theme, mode, setMode, toggleMode, updateTheme, components, variants, customVariants, hasVariant, getVariant, addVariant, customTypography, hasTypography, getTypography, addTypography, registerComponent, registerVariant]);

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
 * const { theme, mode, toggleMode, addVariant } = useBear();
 * 
 * // Add a variant at runtime
 * addVariant('myBrand', { bg: '#ff6b6b', bgHover: '#ee5a5a', text: '#fff' });
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

/**
 * Hook to work with custom variants
 * 
 * @example
 * ```tsx
 * const { addVariant, hasVariant, getVariant } = useBearVariants();
 * 
 * // Add a new variant dynamically
 * addVariant('hotPink', { bg: '#ec4899', bgHover: '#db2777', text: '#fff' });
 * 
 * // Check if variant exists
 * if (hasVariant('hotPink')) {
 *   // use it!
 * }
 * ```
 */
export const useBearVariants = () => {
  const { customVariants, hasVariant, getVariant, addVariant } = useBear();
  return { customVariants, hasVariant, getVariant, addVariant };
};
