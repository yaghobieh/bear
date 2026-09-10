import type { BearDirection, BearDensity } from './bearProvider.const';

export type { BearDirection, BearDensity };

export type BearColorScheme = 'light' | 'dark' | 'system';

export type BearResolvedMode = 'light' | 'dark';

export interface BearProviderConfig {
  direction?: BearDirection;
  density?: BearDensity;
  colorScheme?: BearColorScheme;
  reducedMotion?: boolean;
}
