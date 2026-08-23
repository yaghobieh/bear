import { STATUS_ERROR, STATUS_SCANNING, STATUS_SUCCESS } from '@const';
import type { BiometricStatus } from './Biometric.types';

type StatusLabels = {
  label?: string;
  scanningLabel: string;
  successLabel: string;
  errorLabel: string;
};

export const resolveBiometricStatusLabel = (
  status: BiometricStatus,
  labels: StatusLabels
): string | undefined => {
  if (status === STATUS_SCANNING) {
    return labels.scanningLabel;
  }
  if (status === STATUS_SUCCESS) {
    return labels.successLabel;
  }
  if (status === STATUS_ERROR) {
    return labels.errorLabel;
  }
  return labels.label;
};
