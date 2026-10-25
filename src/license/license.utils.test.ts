import { describe, expect, it } from 'vitest';
import { hasBearPro, isBearProLicenseKey } from './license.utils';

describe('isBearProLicenseKey', () => {
  it('accepts a bear_pro key', () => {
    expect(isBearProLicenseKey('bear_pro_AB12_CD34_EF56_GH78')).toBe(true);
  });

  it('rejects an empty or invented string', () => {
    expect(isBearProLicenseKey('')).toBe(false);
    expect(isBearProLicenseKey('not-a-key')).toBe(false);
  });
});

describe('hasBearPro', () => {
  it('opens when the key matches or enabled is set', () => {
    expect(hasBearPro({ licenseKey: 'bear_pro_AB12_CD34_EF56_GH78' })).toBe(true);
    expect(hasBearPro({ enabled: true })).toBe(true);
    expect(hasBearPro()).toBe(false);
  });
});
