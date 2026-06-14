export type BearDirection = 'ltr' | 'rtl';

export type BearDensity = 'comfortable' | 'compact';

export const DENSITY_SCALE_COMFORTABLE = 1;

export const DENSITY_SCALE_COMPACT = 0.875;

export const DENSITY_CSS_VAR = '--bear-density-scale';

export const DEFAULT_DIRECTION: BearDirection = 'ltr';

export const DEFAULT_DENSITY: BearDensity = 'comfortable';
