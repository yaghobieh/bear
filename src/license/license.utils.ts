import { BEAR_PRO_KEY_PATTERN, BEAR_PRO_WARNING } from './license.const';
import type { BearProConfig } from './license.types';

let warned = false;

export const isBearProLicenseKey = (licenseKey?: string): boolean =>
  BEAR_PRO_KEY_PATTERN.test((licenseKey ?? '').trim());

export const hasBearPro = (config?: BearProConfig): boolean =>
  Boolean(config?.enabled || isBearProLicenseKey(config?.licenseKey));

export const warnBearPro = (): void => {
  if (warned) return;
  warned = true;
  console.warn(BEAR_PRO_WARNING);
};
