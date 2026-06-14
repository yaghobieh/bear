import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect, startTransition } from 'react';
import type { BearTheme, BearThemeOverride, BearColorScale, CustomVariant, CustomVariantsMap } from '../types';
import type { BearComponentOverrides, ButtonVariantsConfig, BearDefaultPropsMap } from '../types/component.types';
import type { CustomTypography, CustomTypographyMap } from '../components/Typography/Typography.types';
import type { BearDirection, BearDensity } from './bearProvider.types';
import {
  DEFAULT_DIRECTION,
  DEFAULT_DENSITY,
  DENSITY_CSS_VAR,
  DENSITY_SCALE_COMFORTABLE,
  DENSITY_SCALE_COMPACT,
} from './bearProvider.const';
import { defaultLightTheme, defaultDarkTheme } from './defaultTheme';

interface BearContextValue {
  theme: BearTheme;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  updateTheme: (overrides: BearThemeOverride) => void;
  direction: BearDirection;
  setDirection: (direction: BearDirection) => void;
  density: BearDensity;
  setDensity: (density: BearDensity) => void;
  defaultProps: BearDefaultPropsMap;
  components: BearComponentOverrides;
  variants: { Button?: ButtonVariantsConfig };
  customVariants: CustomVariantsMap;
  hasVariant: (name: string) => boolean;
  getVariant: (name: string) => CustomVariant | undefined;
  addVariant: (name: string, config: CustomVariant) => void;
  customTypography: CustomTypographyMap;
  hasTypography: (name: string) => boolean;
  getTypography: (name: string) => CustomTypography | undefined;
  addTypography: (name: string, config: CustomTypography) => void;
  registerComponent: <K extends keyof BearComponentOverrides>(
    componentKey: K,
    styles: BearComponentOverrides[K]
  ) => void;
  registerVariant: <K extends 'Button'>(
    componentKey: K,
    variantConfig: ButtonVariantsConfig
  ) => void;
}

/** Bear context - use useBear() hook instead of consuming directly */
export const BearContext = createContext<BearContextValue | null>(null);

interface BearProviderProps {
  children: ReactNode;
  defaultMode?: 'light' | 'dark';
  mode?: 'light' | 'dark';
  onModeChange?: (mode: 'light' | 'dark') => void;
  direction?: BearDirection;
  density?: BearDensity;
  theme?: BearThemeOverride;
  components?: BearComponentOverrides;
  defaultProps?: BearDefaultPropsMap;
  variants?: { Button?: ButtonVariantsConfig };
  customVariants?: CustomVariantsMap;
  customTypography?: CustomTypographyMap;
  persistPreference?: boolean;
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

const buildThemeCssVars = (
  activeTheme: BearTheme,
  buttonVariants: { Button?: ButtonVariantsConfig } | undefined,
  runtimeVariants: CustomVariantsMap,
  activeDensity: BearDensity
): string => {
  const vars: string[] = [];

  const pushScale = (prefix: string, scale: BearColorScale) => {
    Object.entries(scale).forEach(([shade, value]) => {
      vars.push(`--bear-${prefix}-${shade}:${value}`);
    });
  };

  pushScale('primary', activeTheme.colors.primary);
  pushScale('secondary', activeTheme.colors.secondary);
  pushScale('success', activeTheme.colors.success);
  pushScale('warning', activeTheme.colors.warning);
  pushScale('danger', activeTheme.colors.danger);
  pushScale('info', activeTheme.colors.info);
  pushScale('neutral', activeTheme.colors.neutral);

  vars.push(`--bear-bg-primary:${activeTheme.colors.background.primary}`);
  vars.push(`--bear-bg-secondary:${activeTheme.colors.background.secondary}`);
  vars.push(`--bear-bg-tertiary:${activeTheme.colors.background.tertiary}`);
  vars.push(`--bear-text-primary:${activeTheme.colors.text.primary}`);
  vars.push(`--bear-text-secondary:${activeTheme.colors.text.secondary}`);
  vars.push(`--bear-text-muted:${activeTheme.colors.text.muted}`);
  vars.push(`--bear-text-inverted:${activeTheme.colors.text.inverted}`);
  vars.push(`--bear-border-default:${activeTheme.colors.border.default}`);
  vars.push(`--bear-border-subtle:${activeTheme.colors.border.subtle}`);
  vars.push(`--bear-border-strong:${activeTheme.colors.border.strong}`);

  if (buttonVariants?.Button) {
    Object.entries(buttonVariants.Button).forEach(([variant, config]) => {
      if (!config) return;
      if (config.bg) vars.push(`--bear-btn-${variant}-bg:${config.bg}`);
      if (config.bgHover) vars.push(`--bear-btn-${variant}-bg-hover:${config.bgHover}`);
      if (config.bgActive) vars.push(`--bear-btn-${variant}-bg-active:${config.bgActive}`);
      if (config.bgDisabled) vars.push(`--bear-btn-${variant}-bg-disabled:${config.bgDisabled}`);
      if (config.text) vars.push(`--bear-btn-${variant}-text:${config.text}`);
      if (config.textDisabled) vars.push(`--bear-btn-${variant}-text-disabled:${config.textDisabled}`);
      if (config.border) vars.push(`--bear-btn-${variant}-border:${config.border}`);
      if (config.borderHover) vars.push(`--bear-btn-${variant}-border-hover:${config.borderHover}`);
      if (config.ring) vars.push(`--bear-btn-${variant}-ring:${config.ring}`);
    });
  }

  Object.entries(runtimeVariants).forEach(([name, config]) => {
    vars.push(`--bear-${name}-bg:${config.bg}`);
    if (config.bgHover) vars.push(`--bear-${name}-bg-hover:${config.bgHover}`);
    if (config.bgActive) vars.push(`--bear-${name}-bg-active:${config.bgActive}`);
    if (config.text) vars.push(`--bear-${name}-text:${config.text}`);
    if (config.border) vars.push(`--bear-${name}-border:${config.border}`);
    if (config.ring) vars.push(`--bear-${name}-ring:${config.ring}`);
  });

  vars.push(`--bear-font-sans:${activeTheme.typography.fontFamily.sans}`);
  vars.push(`--bear-font-mono:${activeTheme.typography.fontFamily.mono}`);

  Object.entries(activeTheme.shadows).forEach(([key, value]) => {
    vars.push(`--bear-shadow-${key}:${value}`);
  });
  Object.entries(activeTheme.borderRadius).forEach(([key, value]) => {
    vars.push(`--bear-radius-${key}:${value}`);
  });
  Object.entries(activeTheme.spacing).forEach(([key, value]) => {
    vars.push(`--bear-spacing-${key}:${value}`);
  });

  const densityScale = activeDensity === 'compact' ? DENSITY_SCALE_COMPACT : DENSITY_SCALE_COMFORTABLE;
  vars.push(`${DENSITY_CSS_VAR}:${densityScale}`);

  return vars.join(';');
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
  mode: controlledMode,
  onModeChange,
  direction = DEFAULT_DIRECTION,
  density = DEFAULT_DENSITY,
  theme: themeOverrides,
  components: initialComponents = {},
  defaultProps: initialDefaultProps = {},
  variants: initialVariants = {},
  customVariants: initialCustomVariants = {},
  customTypography: initialCustomTypography = {},
  persistPreference = true,
  storageKey = STORAGE_KEY_DEFAULT,
}: BearProviderProps) => {
  const [internalMode, setInternalModeState] = useState<'light' | 'dark'>(() => {
    if (controlledMode !== undefined) {
      return controlledMode;
    }
    if (typeof window !== 'undefined' && persistPreference) {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return defaultMode;
  });

  const mode = controlledMode ?? internalMode;

  const [directionState, setDirectionState] = useState<BearDirection>(direction);
  const [densityState, setDensityState] = useState<BearDensity>(density);

  const [customOverrides, setCustomOverrides] = useState<BearThemeOverride>(themeOverrides || {});
  const [components, setComponents] = useState<BearComponentOverrides>(initialComponents);
  const [defaultProps] = useState<BearDefaultPropsMap>(initialDefaultProps);
  
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
  const resolvedLightTheme = useMemo((): BearTheme => {
    if (Object.keys(processedOverrides).length === 0) {
      return defaultLightTheme;
    }
    return deepMerge(defaultLightTheme, processedOverrides as Partial<BearTheme>) as BearTheme;
  }, [processedOverrides]);

  const resolvedDarkTheme = useMemo((): BearTheme => {
    if (Object.keys(processedOverrides).length === 0) {
      return defaultDarkTheme;
    }
    return deepMerge(defaultDarkTheme, processedOverrides as Partial<BearTheme>) as BearTheme;
  }, [processedOverrides]);

  const theme = mode === 'dark' ? resolvedDarkTheme : resolvedLightTheme;

  const lightThemeCss = useMemo(
    () => buildThemeCssVars(resolvedLightTheme, variants, customVariants, densityState),
    [resolvedLightTheme, variants, customVariants, densityState]
  );

  const darkThemeCss = useMemo(
    () => buildThemeCssVars(resolvedDarkTheme, variants, customVariants, densityState),
    [resolvedDarkTheme, variants, customVariants, densityState]
  );

  const setMode = useCallback((newMode: 'light' | 'dark') => {
    if (controlledMode === undefined) {
      setInternalModeState(newMode);
    }
    onModeChange?.(newMode);
    if (typeof window !== 'undefined' && persistPreference) {
      localStorage.setItem(storageKey, newMode);
    }
  }, [controlledMode, onModeChange, persistPreference, storageKey]);

  const setDirection = useCallback((newDirection: BearDirection) => {
    setDirectionState(newDirection);
  }, []);

  const setDensity = useCallback((newDensity: BearDensity) => {
    setDensityState(newDensity);
  }, []);

  // Toggle between light and dark
  const toggleMode = useCallback(() => {
    if (controlledMode !== undefined) {
      const next = controlledMode === 'light' ? 'dark' : 'light';
      onModeChange?.(next);
      return;
    }
    startTransition(() => {
      setInternalModeState((prev) => {
        const next = prev === 'light' ? 'dark' : 'light';
        onModeChange?.(next);
        if (typeof window !== 'undefined' && persistPreference) {
          localStorage.setItem(storageKey, next);
        }
        return next;
      });
    });
  }, [controlledMode, onModeChange, persistPreference, storageKey]);

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

  useEffect(() => {
    if (controlledMode !== undefined) {
      setInternalModeState(controlledMode);
    }
  }, [controlledMode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const STYLE_ID = 'bear-theme-vars';
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = `:root.bear-light,:root:not(.dark){${lightThemeCss}}:root.bear-dark,:root.dark,.dark{${darkThemeCss}}`;
  }, [lightThemeCss, darkThemeCss]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.classList.toggle('dark', mode === 'dark');
    root.classList.remove('bear-light', 'bear-dark');
    root.classList.add(mode === 'dark' ? 'bear-dark' : 'bear-light');
    root.setAttribute('dir', directionState);
    root.classList.toggle('bear-rtl', directionState === 'rtl');
    root.classList.toggle('bear-density-compact', densityState === 'compact');
  }, [mode, directionState, densityState]);

  const value = useMemo(() => ({
    theme,
    mode,
    setMode,
    toggleMode,
    updateTheme,
    direction: directionState,
    setDirection,
    density: densityState,
    setDensity,
    defaultProps,
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
  }), [theme, mode, setMode, toggleMode, updateTheme, directionState, setDirection, densityState, setDensity, defaultProps, components, variants, customVariants, hasVariant, getVariant, addVariant, customTypography, hasTypography, getTypography, addTypography, registerComponent, registerVariant]);

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

export const useBearDirection = () => {
  const { direction, setDirection } = useBear();
  return { direction, setDirection };
};

export const useBearDensity = () => {
  const { density, setDensity } = useBear();
  return { density, setDensity };
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
