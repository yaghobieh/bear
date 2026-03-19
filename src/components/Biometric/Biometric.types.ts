export type BiometricType = 'fingerprint' | 'face' | 'iris';

export type BiometricStatus = 'idle' | 'scanning' | 'success' | 'error';

export interface BiometricProps {
  type?: BiometricType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: BiometricStatus;
  label?: string;
  successLabel?: string;
  errorLabel?: string;
  scanningLabel?: string;
  onScan?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  disabled?: boolean;
  animated?: boolean;
  className?: string;
  testId?: string;
}

export interface BiometricIconProps {
  type: BiometricType;
  size: number;
  status: BiometricStatus;
  animated: boolean;
}

export interface UseBiometricOptions {
  scanDuration?: number;
  successDuration?: number;
  onSuccess?: () => void;
  onError?: () => void;
}

export interface UseBiometricReturn {
  status: BiometricStatus;
  scan: () => void;
  reset: () => void;
}
