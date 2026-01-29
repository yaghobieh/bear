import { FC } from 'react';
import { cn } from '@utils';

export interface EmberLogoProps {
  /** Logo size in pixels */
  size?: number;
  /** Additional class names */
  className?: string;
  /** Whether to animate the logo */
  animated?: boolean;
}

/**
 * Ember Logo Component
 * A stylized flame representing warmth, energy, and the forge
 */
export const EmberLogo: FC<EmberLogoProps> = ({
  size = 48,
  className,
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={cn(
        'bear-logo',
        animated && 'bear-animate-bear-glow',
        className
      )}
    >
      <defs>
        <linearGradient id="emberFlameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="30%" stopColor="#f97316" />
          <stop offset="60%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
        
        <linearGradient id="emberCoreGrad" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>

        <filter id="emberGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="#1a1a2e"
        stroke="url(#emberFlameGrad)"
        strokeWidth="2"
      />

      <path
        d="M50 15
           C35 30 25 45 25 60
           C25 75 35 85 50 85
           C65 85 75 75 75 60
           C75 50 68 40 60 32
           C55 27 50 25 50 35
           C50 42 55 48 55 55
           C55 62 52 67 50 67
           C48 67 45 62 45 55
           C45 45 55 35 55 25
           C55 20 52 17 50 15
           Z"
        fill="url(#emberFlameGrad)"
        filter="url(#emberGlow)"
      />

      <path
        d="M50 45
           C45 50 42 55 42 62
           C42 72 46 78 50 78
           C54 78 58 72 58 62
           C58 55 55 50 50 45
           Z"
        fill="url(#emberCoreGrad)"
        opacity="0.9"
      />

      <circle cx="38" cy="35" r="2" fill="#fed7aa" opacity="0.8" />
      <circle cx="62" cy="38" r="1.5" fill="#fef3c7" opacity="0.7" />
      <circle cx="45" cy="28" r="1" fill="#ffffff" opacity="0.6" />
    </svg>
  );
};

