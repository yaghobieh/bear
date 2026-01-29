import { FC } from 'react';
import { AppBarProps } from './AppBar.types';
import { cn } from '@utils';

export const AppBar: FC<AppBarProps> = ({
  children,
  position = 'sticky',
  variant = 'default',
  color = 'default',
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
    default: 'bear-bg-zinc-900 bear-text-white',
    transparent: 'bear-bg-transparent',
    blur: 'bear-bg-zinc-900/80 bear-backdrop-blur-md',
  };

  const colorClasses = {
    default: '',
    primary: 'bear-bg-bear-600 bear-text-white',
    dark: 'bear-bg-black bear-text-white',
  };

  return (
    <header
      className={cn(
        'bear-w-full bear-h-16 bear-px-4 bear-flex bear-items-center',
        positionClasses[position],
        variant !== 'transparent' && variantClasses[variant],
        colorClasses[color],
        elevation && 'bear-shadow-lg bear-border-b bear-border-zinc-800',
        className
      )}
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

