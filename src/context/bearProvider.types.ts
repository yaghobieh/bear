import type { BearDirection, BearDensity } from './bearProvider.const';

export type { BearDirection, BearDensity };

export interface BearProviderConfig {
  direction?: BearDirection;
  density?: BearDensity;
}
