/**
 * useBearStyles - Resolve bis (Bear Inner Style) into merged CSSProperties.
 * Use with BearProvider when bis is a theme callback.
 */

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { BisProp } from '../types/bis.types';
import { useBearThemeOptional } from '../context/BearProvider';

/**
 * Resolve bis into a style object. Merge with optional existing style.
 * When bis is a function, theme from BearProvider is used.
 *
 * @example
 * const style = useBearStyles(bis, style);
 * return <div style={style} />;
 */
export function useBearStyles(
  bis?: BisProp | null,
  existingStyle?: CSSProperties | null
): CSSProperties {
  const theme = useBearThemeOptional();

  return useMemo(() => {
    const base = existingStyle ?? {};
    if (!bis) return base;
    const resolved = typeof bis === 'function' ? bis(theme) : bis;
    return { ...base, ...resolved } as CSSProperties;
  }, [bis, existingStyle, theme]);
}
