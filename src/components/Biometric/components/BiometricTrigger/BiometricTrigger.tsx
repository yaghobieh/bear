import {
  BORDER_STYLE_DASHED,
  BORDER_STYLE_SOLID,
  LABEL_AUTHENTICATE,
  STATUS_SCANNING,
  STATUS_SUCCESS,
  VARIANT_GHOST,
} from '@const';
import { cn } from '@utils';
import { Box } from '../../../Box';
import { Button } from '../../../Button';
import {
  BIOMETRIC_RING_COLOR_MAP,
  BIOMETRIC_RIPPLE_SIZE_MAP,
  BIOMETRIC_SCAN_SPIN_DURATION,
  BIOMETRIC_SIZE_MAP,
  BIOMETRIC_STATUS_COLOR_CLASSES,
} from '../../Biometric.const';
import { BiometricIcon } from '../BiometricIcon';
import { BiometricScanRipple } from '../BiometricScanRipple';
import type { BiometricTriggerProps } from './BiometricTrigger.types';

export const BiometricTrigger = (props: BiometricTriggerProps) => {
  const { type, size, status, disabled, animated, statusLabel, onClick } = props;
  const rippleSize = BIOMETRIC_RIPPLE_SIZE_MAP[size];
  const iconSize = BIOMETRIC_SIZE_MAP[size];
  const ringColor = BIOMETRIC_RING_COLOR_MAP[status];
  const isScanning = status === STATUS_SCANNING;

  return (
    <Button
      type="button"
      variant={VARIANT_GHOST}
      disabled={disabled || isScanning}
      onClick={onClick}
      className={cn(
        'Bear-Biometric__trigger bear-relative bear-flex bear-items-center bear-justify-center bear-rounded-full',
        BIOMETRIC_STATUS_COLOR_CLASSES[status]
      )}
      style={{
        width: rippleSize,
        height: rippleSize,
        backgroundColor: 'var(--bear-bg-secondary)',
      }}
      aria-label={statusLabel ?? LABEL_AUTHENTICATE}
    >
      {animated && isScanning && <BiometricScanRipple color={ringColor} />}
      <Box
        as="span"
        className={cn(
          'Bear-Biometric__ring bear-absolute bear-inset-0 bear-rounded-full bear-border-2 bear-transition-colors bear-duration-300',
          isScanning && animated && 'bear-animate-spin'
        )}
        style={{
          borderColor: ringColor,
          borderStyle: isScanning ? BORDER_STYLE_DASHED : BORDER_STYLE_SOLID,
          animationDuration: isScanning ? BIOMETRIC_SCAN_SPIN_DURATION : undefined,
        }}
      />
      {animated && status === STATUS_SUCCESS && (
        <Box
          as="span"
          className="Bear-Biometric__success bear-absolute bear-inset-0 bear-rounded-full bear-opacity-10"
          style={{ backgroundColor: BIOMETRIC_RING_COLOR_MAP.success }}
        />
      )}
      <BiometricIcon type={type} size={iconSize} status={status} animated={animated} />
    </Button>
  );
};
