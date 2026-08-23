import type { FC } from 'react';
import type { BiometricType } from '../../Biometric.types';
import { FaceSvg } from './helpers/FaceSvg';
import { FingerprintSvg } from './helpers/FingerprintSvg';
import { IrisSvg } from './helpers/IrisSvg';

export const BIOMETRIC_ICON_MAP: Record<BiometricType, FC<{ size: number }>> = {
  fingerprint: FingerprintSvg,
  face: FaceSvg,
  iris: IrisSvg,
};
