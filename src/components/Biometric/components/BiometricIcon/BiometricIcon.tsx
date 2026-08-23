import { STATUS_SCANNING } from '@const';
import { cn } from '@utils';
import type { BiometricIconProps } from '../../Biometric.types';
import { BIOMETRIC_ICON_MAP } from './BiometricIcon.const';

export const BiometricIcon = (props: BiometricIconProps) => {
  const { type, size, status, animated } = props;
  const IconComponent = BIOMETRIC_ICON_MAP[type];

  return (
    <div
      className={cn(
        'Bear-Biometric__icon bear-relative bear-flex bear-items-center bear-justify-center',
        animated && status === STATUS_SCANNING && 'bear-animate-pulse'
      )}
    >
      <IconComponent size={size} />
    </div>
  );
};
