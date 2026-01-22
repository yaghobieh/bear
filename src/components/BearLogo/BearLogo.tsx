import { FC, SVGAttributes } from 'react';

export interface BearLogoProps extends SVGAttributes<SVGElement> {
  /** Logo size in pixels */
  size?: number;
  /** Whether to show animated sparkle */
  animated?: boolean;
}

/**
 * BearLogo - Lotso-inspired pink teddy bear logo from Toy Story
 * Full body sitting teddy bear with characteristic angry eyebrows
 * 
 * @example
 * ```tsx
 * <BearLogo size={48} />
 * <BearLogo size={32} animated />
 * ```
 */
export const BearLogo: FC<BearLogoProps> = ({ 
  size = 32, 
  animated = false,
  className,
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="lotsoFur" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="40%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#9d174d" />
        </radialGradient>
        <radialGradient id="lotsoCream" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
        <radialGradient id="lotsoEarInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fcd34d" />
        </radialGradient>
        <linearGradient id="lotsoNose" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#581c87" />
        </linearGradient>
      </defs>
      
      <ellipse cx="50" cy="72" rx="26" ry="20" fill="url(#lotsoFur)" />
      <ellipse cx="50" cy="73" rx="16" ry="12" fill="url(#lotsoCream)" />
      
      <ellipse cx="32" cy="88" rx="12" ry="9" fill="url(#lotsoFur)" />
      <ellipse cx="32" cy="89" rx="8" ry="6" fill="url(#lotsoCream)" />
      <ellipse cx="68" cy="88" rx="12" ry="9" fill="url(#lotsoFur)" />
      <ellipse cx="68" cy="89" rx="8" ry="6" fill="url(#lotsoCream)" />
      
      <ellipse cx="24" cy="68" rx="8" ry="12" fill="url(#lotsoFur)" transform="rotate(-15 24 68)" />
      <ellipse cx="76" cy="68" rx="8" ry="12" fill="url(#lotsoFur)" transform="rotate(15 76 68)" />
      
      <ellipse cx="50" cy="36" rx="26" ry="24" fill="url(#lotsoFur)" />
      
      <ellipse cx="28" cy="16" rx="10" ry="10" fill="url(#lotsoFur)" />
      <ellipse cx="28" cy="16" rx="6" ry="6" fill="url(#lotsoEarInner)" />
      <ellipse cx="72" cy="16" rx="10" ry="10" fill="url(#lotsoFur)" />
      <ellipse cx="72" cy="16" rx="6" ry="6" fill="url(#lotsoEarInner)" />
      
      <ellipse cx="50" cy="44" rx="14" ry="10" fill="url(#lotsoCream)" />
      
      <ellipse cx="50" cy="40" rx="6" ry="4" fill="url(#lotsoNose)" />
      
      <path 
        d="M32 24 Q38 21 44 25" 
        stroke="#581c87" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none"
      />
      <path 
        d="M68 24 Q62 21 56 25" 
        stroke="#581c87" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none"
      />
      
      <ellipse cx="38" cy="32" rx="6" ry="7" fill="#ffffff" />
      <ellipse cx="39" cy="33" rx="4" ry="5" fill="#78350f" />
      <ellipse cx="40" cy="33" rx="2" ry="2.5" fill="#1c1917" />
      <ellipse cx="37" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />
      
      <ellipse cx="62" cy="32" rx="6" ry="7" fill="#ffffff" />
      <ellipse cx="61" cy="33" rx="4" ry="5" fill="#78350f" />
      <ellipse cx="60" cy="33" rx="2" ry="2.5" fill="#1c1917" />
      <ellipse cx="63" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />
      
      <path 
        d="M44 48 Q50 46 56 48" 
        stroke="#9d174d" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {animated && (
        <g>
          <circle cx="88" cy="8" r="3" fill="#fbbf24">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2;4;2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <path
            d="M86 8 L90 8 M88 6 L88 10"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      )}
    </svg>
  );
};
