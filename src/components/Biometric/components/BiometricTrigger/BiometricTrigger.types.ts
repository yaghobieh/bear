import type { BiometricSize, BiometricStatus, BiometricType } from '../../Biometric.types';

export interface BiometricTriggerProps {
  type: BiometricType;
  size: BiometricSize;
  status: BiometricStatus;
  disabled: boolean;
  animated: boolean;
  statusLabel?: string;
  onClick: () => void;
}
