import { FC } from 'react';
import { cn } from '@utils';
import type { BiometricIconProps } from './Biometric.types';

const FingerprintSVG: FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8C20.954 8 12 16.954 12 28v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    <path d="M52 28v8c0 11.046-8.954 20-20 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    <path d="M18 24c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <path d="M18 24v12c0 7.732 6.268 14 14 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <path d="M46 24v12c0 4.418-2.239 8.313-5.644 10.607" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    <path d="M24 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <path d="M24 22v14c0 4.418 3.582 8 8 8s8-3.582 8-8V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <path d="M28 22c0-2.209 1.791-4 4-4s4 1.791 4 4v14c0 2.209-1.791 4-4 4s-4-1.791-4-4V22z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 22v14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FaceSVG: FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20V12h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 20V12h-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 44v8h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 44v8h-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="28" r="2.5" fill="currentColor" />
    <circle cx="40" cy="28" r="2.5" fill="currentColor" />
    <path d="M26 40c1.5 2 3.5 3 6 3s4.5-1 6-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IrisSVG: FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="24" ry="14" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
    <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
    <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.9" />
    <circle cx="34" cy="30" r="1.5" fill="var(--bear-bg-primary, #fff)" />
    <path d="M8 32c6-12 16-18 24-18s18 6 24 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
    <path d="M8 32c6 12 16 18 24 18s18-6 24-18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const iconMap = { fingerprint: FingerprintSVG, face: FaceSVG, iris: IrisSVG };

export const BiometricIcon: FC<BiometricIconProps> = ({ type, size, status, animated }) => {
  const IconComponent = iconMap[type];
  return (
    <div
      className={cn(
        'Bear-Biometric__icon bear-relative bear-flex bear-items-center bear-justify-center',
        animated && status === 'scanning' && 'bear-animate-pulse'
      )}
    >
      <IconComponent size={size} />
    </div>
  );
};
