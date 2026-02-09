import { createContext, useContext, useState, useCallback, useMemo, ReactNode, CSSProperties } from 'react';
import type { BearComponentOverrides, ButtonVariantsConfig } from '../../types/component.types';
import type { UseBearComponentReturn, BearComponentContextValue } from './useBearComponent.types';

// Create context
const BearComponentContext = createContext<BearComponentContextValue | null>(null);

interface BearComponentProviderProps {
  children: ReactNode;
  /** Initial component overrides */
  components?: BearComponentOverrides;
  /** Initial variant configurations */
  variants?: {
    Button?: ButtonVariantsConfig;
  };
}

/**
 * Provider for global component customization
 * 
 * @example
 * ```tsx
 * <BearComponentProvider
 *   components={{
 *     Button: {
 *       root: { borderRadius: '9999px' }
 *     }
 *   }}
 *   variants={{
 *     Button: {
 *       primary: {
 *         bg: '#ec4899',
 *         bgHover: '#db2777',
 *         text: '#ffffff'
 *       }
 *     }
 *   }}
 * >
 *   <App />
 * </BearComponentProvider>
 * ```
 */
export const BearComponentProvider = ({
  children,
  components: initialComponents = {},
  variants: initialVariants = {},
}: BearComponentProviderProps) => {
  const [components, setComponents] = useState<BearComponentOverrides>(initialComponents);
  const [variants, setVariants] = useState<{ Button?: ButtonVariantsConfig }>(initialVariants);

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

  const getComponentStyles = useCallback(<K extends keyof BearComponentOverrides>(
    componentKey: K
  ): BearComponentOverrides[K] | undefined => {
    return components[componentKey];
  }, [components]);

  const getVariantConfig = useCallback(<K extends 'Button'>(
    componentKey: K
  ): ButtonVariantsConfig | undefined => {
    return variants[componentKey];
  }, [variants]);

  const clearOverrides = useCallback(() => {
    setComponents({});
    setVariants({});
  }, []);

  const value = useMemo<BearComponentContextValue>(() => ({
    components,
    variants,
    registerComponent,
    registerVariant,
    getComponentStyles,
    getVariantConfig,
    clearOverrides,
  }), [components, variants, registerComponent, registerVariant, getComponentStyles, getVariantConfig, clearOverrides]);

  return (
    <BearComponentContext.Provider value={value}>
      {children}
    </BearComponentContext.Provider>
  );
};

/**
 * Access the component customization context
 */
export const useBearComponentContext = (): BearComponentContextValue | null => {
  return useContext(BearComponentContext);
};

/**
 * Hook to get and apply component style overrides
 * 
 * @param componentKey - The component key (e.g., 'Button', 'Input')
 * @param defaultStyles - Optional default styles to merge with
 * 
 * @example
 * ```tsx
 * // Inside a component
 * const { getStyles, mergeStyles, hasOverrides } = useBearComponent('Button');
 * 
 * return (
 *   <button style={mergeStyles('root', { padding: '8px' })}>
 *     <span style={getStyles('text')}>Click me</span>
 *   </button>
 * );
 * ```
 */
export const useBearComponent = <K extends keyof BearComponentOverrides>(
  componentKey: K,
  defaultStyles?: BearComponentOverrides[K]
): UseBearComponentReturn => {
  const context = useContext(BearComponentContext);
  const componentOverrides = context?.components[componentKey];

  const getStyles = useCallback((part: string = 'root'): CSSProperties => {
    const overrides = componentOverrides as Record<string, CSSProperties | undefined> | undefined;
    const defaults = defaultStyles as Record<string, CSSProperties | undefined> | undefined;
    
    const overrideStyles = overrides?.[part];
    const defaultPartStyles = defaults?.[part];
    
    return {
      ...(defaultPartStyles || {}),
      ...(overrideStyles || {}),
    };
  }, [componentOverrides, defaultStyles]);

  const mergeStyles = useCallback((
    part: string = 'root',
    additionalStyles?: CSSProperties
  ): CSSProperties => {
    const baseStyles = getStyles(part);
    return {
      ...baseStyles,
      ...(additionalStyles || {}),
    };
  }, [getStyles]);

  const hasOverrides = useMemo(() => {
    return componentOverrides !== undefined && Object.keys(componentOverrides).length > 0;
  }, [componentOverrides]);

  return { getStyles, mergeStyles, hasOverrides };
};

/**
 * Shorthand alias for useBearComponent
 * 
 * @example
 * ```tsx
 * const { getStyles } = useBC('Button');
 * ```
 */
export const useBC = useBearComponent;
