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
          width="130"
          height="130"
          viewBox="0 0 100 100"
          fill="none"
          className="drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="loaderFur" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="loaderSnout" x1="50" y1="36" x2="50" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff1f2" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="loaderNose" x1="50" y1="36" x2="50" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#701a75" />
              <stop offset="100%" stopColor="#4a044e" />
            </linearGradient>
          </defs>

          {/* Body */}
          <ellipse cx="50" cy="72" rx="28" ry="22" fill="url(#loaderFur)" />
          <ellipse cx="50" cy="74" rx="18" ry="14" fill="#fbcfe8" />

          {/* Arms */}
          <ellipse cx="22" cy="65" rx="10" ry="14" fill="url(#loaderFur)" transform="rotate(-20 22 65)" />
          <ellipse cx="78" cy="65" rx="10" ry="14" fill="url(#loaderFur)" transform="rotate(20 78 65)" />

          {/* Paws */}
          <ellipse cx="35" cy="90" rx="11" ry="8" fill="url(#loaderFur)" />
          <ellipse cx="35" cy="90" rx="7" ry="5" fill="#fbcfe8" />
          <ellipse cx="65" cy="90" rx="11" ry="8" fill="url(#loaderFur)" />
          <ellipse cx="65" cy="90" rx="7" ry="5" fill="#fbcfe8" />

          {/* Head */}
          <ellipse cx="50" cy="35" rx="28" ry="26" fill="url(#loaderFur)" />

          {/* Ears */}
          <ellipse cx="26" cy="14" rx="12" ry="12" fill="url(#loaderFur)" />
          <ellipse cx="26" cy="14" rx="7" ry="7" fill="#fbcfe8" />
          <ellipse cx="74" cy="14" rx="12" ry="12" fill="url(#loaderFur)" />
          <ellipse cx="74" cy="14" rx="7" ry="7" fill="#fbcfe8" />

          {/* Eyebrows */}
          <path d="M34 23 Q40 21 44 24" stroke="#831843" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M66 23 Q60 21 56 24" stroke="#831843" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <ellipse cx="38" cy="30" rx="5" ry="6" fill="#18181b">
            <animate attributeName="ry" values="6;1;6" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="36.5" cy="28.5" rx="2" ry="2.5" fill="#ffffff">
            <animate attributeName="ry" values="2.5;0;2.5" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="62" cy="30" rx="5" ry="6" fill="#18181b">
            <animate attributeName="ry" values="6;1;6" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60.5" cy="28.5" rx="2" ry="2.5" fill="#ffffff">
            <animate attributeName="ry" values="2.5;0;2.5" dur="3s" repeatCount="indefinite" />
          </ellipse>

          {/* Cheeks */}
          <ellipse cx="28" cy="38" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="72" cy="38" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />

          {/* Cream Snout */}
          <ellipse cx="50" cy="43" rx="15" ry="11" fill="url(#loaderSnout)" stroke="#fbcfe8" strokeWidth="0.8" />

          {/* Plum Nose */}
          <ellipse cx="50" cy="39" rx="6" ry="4.5" fill="url(#loaderNose)" />
          <ellipse cx="48.5" cy="37.8" rx="2" ry="1" fill="#f472b6" opacity="0.5" />

          {/* Smile */}
          <path d="M43 45 Q50 51 57 45" stroke="#701a75" strokeWidth="2" strokeLinecap="round" fill="none" />
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

