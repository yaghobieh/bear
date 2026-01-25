/**
 * Bear Theme Types
 * Defines the structure for customizing Bear components
 */

export type BearColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type BearColorKey = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export interface BearColors {
  primary: BearColorScale;
  secondary: BearColorScale;
  success: BearColorScale;
  warning: BearColorScale;
  danger: BearColorScale;
  info: BearColorScale;
  neutral: BearColorScale;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverted: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
  };
}

export interface BearTypography {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface BearSpacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
}

export interface BearBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface BearShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface BearBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface BearTheme {
  colors: BearColors;
  typography: BearTypography;
  spacing: BearSpacing;
  borderRadius: BearBorderRadius;
  shadows: BearShadows;
  breakpoints: BearBreakpoints;
  mode: 'light' | 'dark';
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type BearThemeOverride = DeepPartial<BearTheme>;

/** Size variant for Bear components */
export type BearSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';


