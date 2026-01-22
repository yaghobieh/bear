import { FC, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import type { BearLoaderProps } from './BearLoader.types';

const SIZE_MAP = {
  sm: 60,
  md: 100,
  lg: 150,
  xl: 200,
};

// Lotso-style Bear SVG with animations
const LotsoBeaSVG: FC<{ size: number }> = ({ size }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none"
    className="bear-loader-svg"
  >
    <ellipse cx="50" cy="72" rx="26" ry="20" fill="#db2777" className="bear-body" />
    <ellipse cx="50" cy="73" rx="16" ry="12" fill="#fde68a" />

    <ellipse cx="32" cy="88" rx="12" ry="9" fill="#db2777" />
    <ellipse cx="32" cy="89" rx="8" ry="6" fill="#fde68a" />
    <ellipse cx="68" cy="88" rx="12" ry="9" fill="#db2777" />
    <ellipse cx="68" cy="89" rx="8" ry="6" fill="#fde68a" />

    <ellipse 
      cx="24" cy="68" rx="8" ry="12" fill="#db2777" 
      transform="rotate(-15 24 68)"
      className="bear-left-arm"
    />
    <ellipse 
      cx="76" cy="68" rx="8" ry="12" fill="#db2777" 
      transform="rotate(15 76 68)"
      className="bear-right-arm"
    />

    <ellipse cx="50" cy="36" rx="26" ry="24" fill="#db2777" />

    <ellipse cx="28" cy="16" rx="10" ry="10" fill="#db2777" />
    <ellipse cx="28" cy="16" rx="6" ry="6" fill="#fcd34d" />
    <ellipse cx="72" cy="16" rx="10" ry="10" fill="#db2777" />
    <ellipse cx="72" cy="16" rx="6" ry="6" fill="#fcd34d" />

    <ellipse cx="50" cy="44" rx="14" ry="10" fill="#fde68a" />

    <ellipse cx="50" cy="40" rx="6" ry="4" fill="#7c3aed" />

    <path 
      d="M32 24 Q38 21 44 25" 
      stroke="#581c87" 
      strokeWidth="3" 
      strokeLinecap="round" 
      fill="none"
      className="bear-eyebrow-left"
    />
    <path 
      d="M68 24 Q62 21 56 25" 
      stroke="#581c87" 
      strokeWidth="3" 
      strokeLinecap="round" 
      fill="none"
      className="bear-eyebrow-right"
    />

    <ellipse cx="38" cy="32" rx="6" ry="7" fill="#ffffff" />
    <ellipse cx="39" cy="33" rx="4" ry="5" fill="#78350f" className="bear-eye-left" />
    <ellipse cx="40" cy="33" rx="2" ry="2.5" fill="#1c1917" />
    <ellipse cx="37" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />

    <ellipse cx="62" cy="32" rx="6" ry="7" fill="#ffffff" />
    <ellipse cx="61" cy="33" rx="4" ry="5" fill="#78350f" className="bear-eye-right" />
    <ellipse cx="60" cy="33" rx="2" ry="2.5" fill="#1c1917" />
    <ellipse cx="63" cy="31" rx="1.5" ry="1.5" fill="#ffffff" />

    <path 
      d="M44 48 Q50 52 56 48" 
      stroke="#9d174d" 
      strokeWidth="2" 
      strokeLinecap="round" 
      fill="none"
      className="bear-mouth"
    />

    <ellipse cx="30" cy="42" rx="4" ry="3" fill="#f472b6" opacity="0.5" />
    <ellipse cx="70" cy="42" rx="4" ry="3" fill="#f472b6" opacity="0.5" />
  </svg>
);

/**
 * BearLoader - Animated Lotso bear loading indicator
 * 
 * @example
 * ```tsx
 * <BearLoader />
 * <BearLoader size="lg" text="Loading..." />
 * <BearLoader fullscreen duration={3000} onComplete={() => console.log('done')} />
 * ```
 */
export const BearLoader: FC<BearLoaderProps> = ({
  size = 'md',
  text,
  fullscreen = false,
  duration,
  onComplete,
  className,
  testId,
}) => {
  const [progress, setProgress] = useState(0);
  const bearSize = SIZE_MAP[size];

  useEffect(() => {
    if (duration && onComplete) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            onComplete();
            return 100;
          }
          return prev + (100 / (duration / 50));
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [duration, onComplete]);

  const loader = (
    <div 
      className={cn(
        'bear-flex bear-flex-col bear-items-center bear-justify-center bear-gap-4',
        className
      )}
      data-testid={testId}
    >
      <style>{`
        @keyframes bear-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes bear-wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes bear-wave-left {
          0%, 100% { transform: rotate(-15deg) translateX(0); }
          50% { transform: rotate(-30deg) translateX(-3px); }
        }
        @keyframes bear-wave-right {
          0%, 100% { transform: rotate(15deg) translateX(0); }
          50% { transform: rotate(30deg) translateX(3px); }
        }
        @keyframes bear-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .bear-loader-svg {
          animation: bear-bounce 1s ease-in-out infinite, bear-wiggle 0.5s ease-in-out infinite;
        }
        .bear-left-arm {
          transform-origin: 24px 68px;
          animation: bear-wave-left 0.8s ease-in-out infinite;
        }
        .bear-right-arm {
          transform-origin: 76px 68px;
          animation: bear-wave-right 0.8s ease-in-out infinite 0.1s;
        }
        .bear-eye-left, .bear-eye-right {
          transform-origin: center;
          animation: bear-blink 3s ease-in-out infinite;
        }
        .bear-mouth {
          animation: bear-bounce 1s ease-in-out infinite;
        }
      `}</style>
      
      <LotsoBeaSVG size={bearSize} />
      
      {text && (
        <p className="bear-text-gray-600 dark:bear-text-gray-300 bear-text-center bear-font-medium">
          {text}
        </p>
      )}
      
      {duration && (
        <div className="bear-w-32 bear-h-1.5 bear-bg-gray-200 dark:bear-bg-gray-700 bear-rounded-full bear-overflow-hidden">
          <div 
            className="bear-h-full bear-bg-bear-500 bear-rounded-full bear-transition-all bear-duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="bear-fixed bear-inset-0 bear-z-50 bear-flex bear-items-center bear-justify-center bear-bg-white/90 dark:bear-bg-gray-900/90 bear-backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return loader;
};

export default BearLoader;

