import {
  EIGHTY,
  FORTY_EIGHT,
  NINETY_SIX,
  ONE_HUNDRED_TWENTY,
  ONE_HUNDRED_TWENTY_EIGHT,
  ONE_HUNDRED_SIXTY,
  SEVENTY_TWO,
  SIZE_LG,
  SIZE_MD,
  SIZE_SM,
  SIZE_XL,
  TWO_HUNDRED,
} from '@const';
import type { BiometricSize, BiometricStatus } from './Biometric.types';

export const BIOMETRIC_SIZE_MAP: Record<BiometricSize, number> = {
  [SIZE_SM]: FORTY_EIGHT,
  [SIZE_MD]: SEVENTY_TWO,
  [SIZE_LG]: NINETY_SIX,
  [SIZE_XL]: ONE_HUNDRED_TWENTY_EIGHT,
};

export const BIOMETRIC_RIPPLE_SIZE_MAP: Record<BiometricSize, number> = {
  [SIZE_SM]: EIGHTY,
  [SIZE_MD]: ONE_HUNDRED_TWENTY,
  [SIZE_LG]: ONE_HUNDRED_SIXTY,
  [SIZE_XL]: TWO_HUNDRED,
};

export const BIOMETRIC_STATUS_COLOR_CLASSES: Record<BiometricStatus, string> = {
  idle: 'bear-text-gray-500 dark:bear-text-gray-400',
  scanning: 'bear-text-bear-500 dark:bear-text-bear-400',
  success: 'bear-text-green-500 dark:bear-text-green-400',
  error: 'bear-text-red-500 dark:bear-text-red-400',
};

export const BIOMETRIC_RING_COLOR_MAP: Record<BiometricStatus, string> = {
  idle: 'var(--bear-border-default)',
  scanning: 'var(--bear-primary-500, #ec4899)',
  success: 'var(--bear-success-500, #22c55e)',
  error: 'var(--bear-danger-500, #ef4444)',
};

export const BIOMETRIC_SCAN_DELAY = '0.3s';
export const BIOMETRIC_SCAN_SPIN_DURATION = '3s';
