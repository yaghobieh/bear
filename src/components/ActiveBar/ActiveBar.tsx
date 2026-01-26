import { forwardRef, useRef, useState, useEffect } from 'react';
import { ActiveBarProps } from './ActiveBar.types';

const sizeClasses = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export const ActiveBar = forwardRef<HTMLDivElement, ActiveBarProps>(({
  items,
  activeId,
  onItemClick,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  animated = true,
  className = '',
  ...props
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!animated || variant !== 'underline') return;

    const activeIndex = items.findIndex(item => item.id === activeId);
    if (activeIndex === -1 || !containerRef.current) return;

    const buttons = containerRef.current.querySelectorAll('button');
    const activeButton = buttons[activeIndex];
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeId, items, animated, variant]);

  const getVariantClasses = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';
      case 'underline':
        return isActive
          ? 'text-pink-500 font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200';
      default:
        return isActive
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50';
    }
  };

  return (
    <div
      ref={ref}
      className={`bear-active-bar relative ${fullWidth ? 'w-full' : 'inline-flex'} ${className}`.trim()}
      {...props}
    >
      <div
        ref={containerRef}
        className={`flex ${fullWidth ? 'w-full' : ''} ${variant === 'underline' ? 'border-b border-gray-200 dark:border-gray-700' : 'gap-1'}`}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className={`
                ${fullWidth ? 'flex-1' : ''}
                ${sizeClasses[size]}
                ${getVariantClasses(isActive)}
                ${variant === 'pills' ? 'rounded-full' : variant === 'underline' ? 'relative pb-3' : 'rounded-lg'}
                flex items-center justify-center gap-2
                transition-all duration-200
              `}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {animated && variant === 'underline' && (
        <div
          className="absolute bottom-0 h-0.5 bg-pink-500 transition-all duration-300 ease-out"
          style={indicatorStyle}
        />
      )}
    </div>
  );
});

ActiveBar.displayName = 'ActiveBar';

