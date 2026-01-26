import { forwardRef } from 'react';
import { MarkProps } from './Mark.types';

const colorClasses: Record<string, string> = {
  default: 'bg-yellow-300 dark:bg-yellow-600/50 text-gray-900 dark:text-white',
  pink: 'bg-pink-300 dark:bg-pink-600/50 text-gray-900 dark:text-white',
  blue: 'bg-blue-300 dark:bg-blue-600/50 text-gray-900 dark:text-white',
  green: 'bg-green-300 dark:bg-green-600/50 text-gray-900 dark:text-white',
  red: 'bg-red-300 dark:bg-red-600/50 text-gray-900 dark:text-white',
};

export const Mark = forwardRef<HTMLElement, MarkProps>(({
  children,
  color = 'default',
  className = '',
  ...props
}, ref) => {
  return (
    <mark
      ref={ref}
      className={`bear-mark px-0.5 rounded-sm ${colorClasses[color]} ${className}`.trim()}
      {...props}
    >
      {children}
    </mark>
  );
});

Mark.displayName = 'Mark';

