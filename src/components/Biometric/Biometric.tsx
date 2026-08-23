import { useCallback } from 'react';
import {
  BIOMETRIC_TYPE_FINGERPRINT,
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  LABEL_SCANNING,
  LABEL_TRY_AGAIN,
  LABEL_VERIFIED,
  SIZE_MD,
  STATUS_SCANNING,
} from '@const';
import { cn } from '@utils';
import { Typography } from '../Typography';
import { BIOMETRIC_STATUS_COLOR_CLASSES } from './Biometric.const';
import type { BiometricProps } from './Biometric.types';
import { resolveBiometricStatusLabel } from './Biometric.utils';
import { BiometricTrigger } from './components';
import { useBiometric } from './useBiometric';

export const Biometric = (props: BiometricProps) => {
  const {
    type = BIOMETRIC_TYPE_FINGERPRINT,
    size = SIZE_MD,
    status: controlledStatus,
    label,
    successLabel = LABEL_VERIFIED,
    errorLabel = LABEL_TRY_AGAIN,
    scanningLabel = LABEL_SCANNING,
    onScan,
    onSuccess,
    onError,
    disabled = BOOLEAN_FALSE,
    animated = BOOLEAN_TRUE,
    className,
    testId,
  } = props;

  const { status: internalStatus, scan } = useBiometric({
    onSuccess,
    onError,
  });

  const status = controlledStatus ?? internalStatus;
  const statusLabel = resolveBiometricStatusLabel(status, {
    label,
    scanningLabel,
    successLabel,
    errorLabel,
  });

  const handleClick = useCallback(() => {
    if (disabled || status === STATUS_SCANNING) {
      return;
    }
    onScan?.();
    if (controlledStatus === undefined) {
      scan();
    }
  }, [disabled, status, onScan, controlledStatus, scan]);

  return (
    <div
      className={cn('Bear-Biometric bear-flex bear-flex-col bear-items-center bear-gap-3', className)}
      data-testid={testId}
      data-status={status}
      data-type={type}
    >
      <BiometricTrigger
        type={type}
        size={size}
        status={status}
        disabled={disabled}
        animated={animated}
        statusLabel={statusLabel}
        onClick={handleClick}
      />
      {statusLabel && (
        <Typography
          className={cn(
            'Bear-Biometric__label bear-text-sm bear-font-medium bear-transition-colors bear-duration-300',
            BIOMETRIC_STATUS_COLOR_CLASSES[status]
          )}
        >
          {statusLabel}
        </Typography>
      )}
    </div>
  );
};
