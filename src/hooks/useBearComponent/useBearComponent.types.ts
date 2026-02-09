import type { CSSProperties } from 'react';
import type { BearComponentOverrides, ButtonVariantsConfig } from '../../types/component.types';

/**
 * Component part style definition
 */
export interface ComponentPartStyles {
  [part: string]: CSSProperties;
}

/**
 * Return type for useBearComponent hook
 */
export interface UseBearComponentReturn {
  /** Get styles for a specific component part */
  getStyles: (part?: string) => CSSProperties;
  /** Merge with additional styles */
  mergeStyles: (part: string | undefined, additionalStyles?: CSSProperties) => CSSProperties;
  /** Check if component has overrides */
  hasOverrides: boolean;
}

/**
 * Context value for component customization
 */
export interface BearComponentContextValue {
  /** Component style overrides */
  components: BearComponentOverrides;
  /** Variant configurations */
  variants: {
    Button?: ButtonVariantsConfig;
  };
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
  /** Get component styles */
  getComponentStyles: <K extends keyof BearComponentOverrides>(
    componentKey: K
  ) => BearComponentOverrides[K] | undefined;
  /** Get variant config */
  getVariantConfig: <K extends 'Button'>(
    componentKey: K
  ) => ButtonVariantsConfig | undefined;
  /** Clear all overrides */
  clearOverrides: () => void;
}
