import { FC, useEffect, useState } from 'react';

interface BearLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

/**
 * BearLoader - Animated loading screen with cute bear mascot
 */
export const BearLoader: FC<BearLoaderProps> = ({ 
  onComplete, 
  duration = 1500 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center
        bg-gradient-to-br from-bear-50 via-white to-bear-100
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        transition-opacity duration-300
        ${isExiting ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="bear-bounce">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          className="drop-shadow-xl"
        >
          <ellipse cx="50" cy="72" rx="28" ry="22" fill="#f9a8d4" />
          <ellipse cx="50" cy="74" rx="18" ry="14" fill="#fce7f3" />
          
          <ellipse cx="22" cy="65" rx="10" ry="14" fill="#f9a8d4" transform="rotate(-20 22 65)" />
          <ellipse cx="78" cy="65" rx="10" ry="14" fill="#f9a8d4" transform="rotate(20 78 65)" />
          
          <ellipse cx="35" cy="90" rx="11" ry="8" fill="#f9a8d4" />
          <ellipse cx="35" cy="90" rx="7" ry="5" fill="#fce7f3" />
          <ellipse cx="65" cy="90" rx="11" ry="8" fill="#f9a8d4" />
          <ellipse cx="65" cy="90" rx="7" ry="5" fill="#fce7f3" />
          
          <ellipse cx="50" cy="35" rx="28" ry="26" fill="#f9a8d4" />
          
          <ellipse cx="26" cy="14" rx="12" ry="12" fill="#f9a8d4" />
          <ellipse cx="26" cy="14" rx="7" ry="7" fill="#fce7f3" />
          <ellipse cx="74" cy="14" rx="12" ry="12" fill="#f9a8d4" />
          <ellipse cx="74" cy="14" rx="7" ry="7" fill="#fce7f3" />
          
          <ellipse cx="50" cy="42" rx="14" ry="11" fill="#fce7f3" />
          
          <path d="M50 40 L47 37 Q45 35 47 33 Q49 31 50 33 Q51 31 53 33 Q55 35 53 37 L50 40 Z" fill="#be185d" />
          
          <ellipse cx="38" cy="30" rx="5" ry="6" fill="#1f2937">
            <animate attributeName="ry" values="6;1;6" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="36.5" cy="28.5" rx="2" ry="2.5" fill="#ffffff">
            <animate attributeName="ry" values="2.5;0;2.5" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="62" cy="30" rx="5" ry="6" fill="#1f2937">
            <animate attributeName="ry" values="6;1;6" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60.5" cy="28.5" rx="2" ry="2.5" fill="#ffffff">
            <animate attributeName="ry" values="2.5;0;2.5" dur="3s" repeatCount="indefinite" />
          </ellipse>
          
          <path d="M42 46 Q50 52 58 46" stroke="#be185d" strokeWidth="2" strokeLinecap="round" fill="none" />
          
          <ellipse cx="28" cy="38" rx="5" ry="3" fill="#f472b6" opacity="0.5" />
          <ellipse cx="72" cy="38" rx="5" ry="3" fill="#f472b6" opacity="0.5" />
        </svg>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-bear-600 dark:text-bear-400">
          Bear UI
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Loading components...
        </p>
        
        <div className="mt-4 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-bear-400"
              style={{
                animation: 'bear-bounce 1s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BearLoader;

