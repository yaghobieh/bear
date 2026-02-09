/**
 * Bear Component Customization Types
 * Allows global component style overrides across your entire app
 */

import type { CSSProperties } from 'react';

/**
 * Base component style override structure
 */
export interface ComponentStyleOverride {
  root?: CSSProperties;
  [key: string]: CSSProperties | undefined;
}

/**
 * Button component parts that can be styled
 */
export interface ButtonStyleOverrides extends ComponentStyleOverride {
  text?: CSSProperties;
  icon?: CSSProperties;
  spinner?: CSSProperties;
  spotlight?: CSSProperties;
}

/**
 * Input component parts that can be styled
 */
export interface InputStyleOverrides extends ComponentStyleOverride {
  input?: CSSProperties;
  label?: CSSProperties;
  helper?: CSSProperties;
  prefix?: CSSProperties;
  suffix?: CSSProperties;
}

/**
 * Card component parts that can be styled
 */
export interface CardStyleOverrides extends ComponentStyleOverride {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
}

/**
 * Modal component parts that can be styled
 */
export interface ModalStyleOverrides extends ComponentStyleOverride {
  overlay?: CSSProperties;
  content?: CSSProperties;
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  closeButton?: CSSProperties;
}

/**
 * All component style overrides
 */
export interface BearComponentOverrides {
  Button?: ButtonStyleOverrides;
  Input?: InputStyleOverrides;
  Card?: CardStyleOverrides;
  Modal?: ModalStyleOverrides;
  Typography?: ComponentStyleOverride;
  Badge?: ComponentStyleOverride;
  Avatar?: ComponentStyleOverride;
  Alert?: ComponentStyleOverride;
  Tooltip?: ComponentStyleOverride;
  Select?: ComponentStyleOverride;
  Checkbox?: ComponentStyleOverride;
  Radio?: ComponentStyleOverride;
  Switch?: ComponentStyleOverride;
  Tabs?: ComponentStyleOverride;
  Table?: ComponentStyleOverride;
  Sidebar?: ComponentStyleOverride;
  AppBar?: ComponentStyleOverride;
  Drawer?: ComponentStyleOverride;
  Menu?: ComponentStyleOverride;
  Dropdown?: ComponentStyleOverride;
  Spinner?: ComponentStyleOverride;
  Progress?: ComponentStyleOverride;
  Skeleton?: ComponentStyleOverride;
  Toast?: ComponentStyleOverride;
}

/**
 * Variant color configuration - allows overriding colors per variant
 */
export interface VariantColorConfig {
  /** Background color */
  bg?: string;
  /** Background color on hover */
  bgHover?: string;
  /** Background color on active/press */
  bgActive?: string;
  /** Background color when disabled */
  bgDisabled?: string;
  /** Text/foreground color */
  text?: string;
  /** Text color when disabled */
  textDisabled?: string;
  /** Border color */
  border?: string;
  /** Border color on hover */
  borderHover?: string;
  /** Border color when disabled */
  borderDisabled?: string;
  /** Focus ring color */
  ring?: string;
}

/**
 * Button variants color configuration
 */
export interface ButtonVariantsConfig {
  primary?: VariantColorConfig;
  secondary?: VariantColorConfig;
  success?: VariantColorConfig;
  warning?: VariantColorConfig;
  danger?: VariantColorConfig;
  info?: VariantColorConfig;
  ghost?: VariantColorConfig;
  outline?: VariantColorConfig;
  error?: VariantColorConfig;
}

/**
 * Extended theme with component overrides
 */
export interface BearComponentsConfig {
  /** Global component style overrides */
  components?: BearComponentOverrides;
  /** Variant color configurations */
  variants?: {
    Button?: ButtonVariantsConfig;
  };
}
