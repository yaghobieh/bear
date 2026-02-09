import { FC } from 'react';
import { AppBarProps } from './AppBar.types';
import { cn } from '@utils';

export const AppBar: FC<AppBarProps> = ({
  children,
  position = 'sticky',
  variant = 'default',
  color = 'primary',
  className,
  leftContent,
  rightContent,
  centerContent,
  elevation = true,
}) => {
  const positionClasses = {
    fixed: 'bear-fixed bear-top-0 bear-left-0 bear-right-0 bear-z-50',
    sticky: 'bear-sticky bear-top-0 bear-z-50',
    static: 'bear-static',
    relative: 'bear-relative',
  };

  const variantClasses = {
    default: '',
    transparent: 'bear-bg-transparent',
    blur: 'bear-backdrop-blur-md',
  };

  const colorClasses = {
    default: 'bear-bg-white bear-text-gray-900 dark:bear-bg-zinc-900 dark:bear-text-white',
    primary: 'bear-bg-pink-600 bear-text-white',
    dark: 'bear-bg-gray-900 bear-text-white dark:bear-bg-black',
  };

  const elevationClasses = elevation
    ? 'bear-shadow-md bear-border-b bear-border-gray-200/10'
    : '';

  return (
    <header
      className={cn(
        'Bear-AppBar',
        'bear-w-full bear-h-16 bear-px-4 bear-flex bear-items-center',
        positionClasses[position],
        variantClasses[variant],
        colorClasses[color],
        elevationClasses,
        className
      )}
      style={{
        backgroundColor: color === 'primary' ? 'var(--bear-primary-600)' : undefined,
      }}
    >
      {children ?? (
        <>
          <div className="bear-flex bear-items-center bear-gap-4">
            {leftContent}
          </div>
          <div className="bear-flex-1 bear-flex bear-items-center bear-justify-center">
            {centerContent}
          </div>
          <div className="bear-flex bear-items-center bear-gap-4">
            {rightContent}
          </div>
        </>
      )}
    </header>
  );
};

