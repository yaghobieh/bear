import { FC } from 'react';
import { KbdProps } from './Kbd.types';
import { cn } from '@utils';

const KEY_MAP: Record<string, string> = {
  cmd: '⌘',
  command: '⌘',
  ctrl: '⌃',
  control: '⌃',
  alt: '⌥',
  option: '⌥',
  shift: '⇧',
  enter: '↵',
  return: '↵',
  tab: '⇥',
  backspace: '⌫',
  delete: '⌦',
  escape: '⎋',
  esc: '⎋',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  space: '␣',
};

export const Kbd: FC<KbdProps> = ({
  children,
  keys,
  size = 'md',
  variant = 'default',
  className,
}) => {
  const sizeClasses = {
    sm: 'bear-text-xs bear-px-1.5 bear-py-0.5 bear-min-w-[18px]',
    md: 'bear-text-sm bear-px-2 bear-py-1 bear-min-w-[24px]',
    lg: 'bear-text-base bear-px-2.5 bear-py-1.5 bear-min-w-[30px]',
  };

  const variantClasses = {
    default: 'bear-bg-zinc-700 bear-border-zinc-600 bear-shadow-[0_1px_0_1px_rgba(0,0,0,0.3)]',
    outline: 'bear-bg-transparent bear-border-zinc-500',
    ghost: 'bear-bg-zinc-800/50 bear-border-transparent',
  };

  const renderKey = (key: string, index: number, isLast: boolean) => {
    const displayKey = KEY_MAP[key.toLowerCase()] || key.toUpperCase();
    return (
      <span key={index} className="bear-inline-flex bear-items-center">
        <kbd className={cn(
          'bear-inline-flex bear-items-center bear-justify-center bear-rounded bear-border bear-font-mono bear-font-medium bear-text-zinc-300',
          sizeClasses[size],
          variantClasses[variant]
        )}>
          {displayKey}
        </kbd>
        {!isLast && <span className="bear-mx-1 bear-text-zinc-500">+</span>}
      </span>
    );
  };

  if (keys && keys.length > 0) {
    return (
      <span className={cn('bear-inline-flex bear-items-center', className)}>
        {keys.map((key, i) => renderKey(key, i, i === keys.length - 1))}
      </span>
    );
  }

  return (
    <kbd className={cn(
      'bear-inline-flex bear-items-center bear-justify-center bear-rounded bear-border bear-font-mono bear-font-medium bear-text-zinc-300',
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      {children}
    </kbd>
  );
};

