/**
 * Bear Inner Style (bis) - MUI sx-like prop for inline styling
 * Use bis to override or extend component styles without className.
 */

import type { CSSProperties } from 'react';
import type { BearTheme } from './theme.types';

/** bis accepts a style object or a callback that receives theme */
export type BisProp = CSSProperties | ((theme: BearTheme) => CSSProperties);

/** Props that include bis (Bear Inner Style) */
export interface BisProps {
  /** Bear Inner Style - sx-like style overrides. Object or (theme) => object */
  bis?: BisProp;
}
