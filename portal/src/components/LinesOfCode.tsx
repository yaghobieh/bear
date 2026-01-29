import { FC } from 'react';

interface LinesOfCodeProps {
  lines: number;
  className?: string;
}

/**
 * Lines of code indicator with VSCode-style cubes
 */
export const LinesOfCode: FC<LinesOfCodeProps> = ({ lines, className = '' }) => {
  // Determine color based on lines
  const getColor = () => {
    if (lines >= 500) return 'red';
    if (lines >= 200) return 'orange';
    if (lines >= 100) return 'yellow';
    return 'green';
  };

  const color = getColor();
  
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-emerald-500',
  };

  const textClasses = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    yellow: 'text-yellow-500',
    green: 'text-emerald-500',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 ${className}`}>
      <div className="flex gap-0.5">
        <div className={`w-1 h-3 ${colorClasses[color]} rounded-sm opacity-80`} />
        <div className={`w-1 h-2 ${colorClasses[color]} rounded-sm opacity-60`} />
        <div className={`w-1 h-2.5 ${colorClasses[color]} rounded-sm opacity-70`} />
      </div>
      <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
        <span className={`font-semibold ${textClasses[color]}`}>+{lines}</span>
      </span>
    </div>
  );
};

export default LinesOfCode;

