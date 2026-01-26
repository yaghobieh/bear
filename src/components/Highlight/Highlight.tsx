import { forwardRef } from 'react';
import { HighlightProps } from './Highlight.types';

const colorClasses: Record<string, string> = {
  yellow: 'bg-yellow-200 dark:bg-yellow-500/30',
  pink: 'bg-pink-200 dark:bg-pink-500/30',
  blue: 'bg-blue-200 dark:bg-blue-500/30',
  green: 'bg-green-200 dark:bg-green-500/30',
  purple: 'bg-purple-200 dark:bg-purple-500/30',
  orange: 'bg-orange-200 dark:bg-orange-500/30',
};

export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(({
  children,
  color = 'yellow',
  animated = false,
  className = '',
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={`bear-highlight px-1 rounded ${colorClasses[color]} ${animated ? 'animate-pulse' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
});

Highlight.displayName = 'Highlight';

