import { Box } from '../../../Box';
import { BIOMETRIC_SCAN_DELAY } from '../../Biometric.const';
import type { BiometricScanRippleProps } from './BiometricScanRipple.types';

export const BiometricScanRipple = (props: BiometricScanRippleProps) => {
  const { color } = props;

  return (
    <Box className="Bear-Biometric__ripples">
      <Box
        as="span"
        className="Bear-Biometric__ripple bear-absolute bear-inset-0 bear-rounded-full bear-animate-ping bear-opacity-20"
        style={{ backgroundColor: color }}
      />
      <Box
        as="span"
        className="Bear-Biometric__ripple bear-absolute bear-inset-2 bear-rounded-full bear-animate-ping bear-opacity-10"
        style={{ backgroundColor: color, animationDelay: BIOMETRIC_SCAN_DELAY }}
      />
    </Box>
  );
};
