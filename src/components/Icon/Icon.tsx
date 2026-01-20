import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { BearSize } from '../../types';
import type { IconProps } from './Icon.types';

const sizeMap: Record<BearSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Icon wrapper component for SVG icons
 * Allows customizing size, color, and animation
 * 
 * @example
 * ```tsx
 * <Icon size="md" color="#f97316">
 *   <path d="M12 2L2 7l10 5 10-5-10-5z" />
 * </Icon>
 * 
 * // Or use the pre-made icons
 * <EmberIcon.Check size="sm" color="green" />
 * ```
 */
export const Icon: FC<IconProps> = ({
  size = 'md',
  color = 'currentColor',
  strokeWidth = 2,
  spin = false,
  className,
  children,
  testId,
  ...props
}) => {
  const sizeValue = typeof size === 'number' ? size : sizeMap[size];

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'bear-inline-block bear-shrink-0',
        spin && 'bear-animate-spin',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {children}
    </svg>
  );
};

// Pre-made common icons
export const CheckIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

export const XIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const ChevronDownIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <polyline points="6 9 12 15 18 9" />
  </Icon>
);

export const ChevronRightIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);

export const PlusIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const MinusIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const SearchIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

export const MenuIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

export const SettingsIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Icon>
);

export const BearPawIcon: FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon fill="currentColor" stroke="none" {...props}>
    <path d="M12 2c-1.66 0-3 1.34-3 3 0 .73.27 1.4.7 1.92C8.53 7.57 7 9.58 7 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.42-1.53-4.43-3.7-5.08.43-.52.7-1.19.7-1.92 0-1.66-1.34-3-3-3zm-5 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </Icon>
);

// Icon collection
export const BearIcons = {
  Check: CheckIcon,
  X: XIcon,
  ChevronDown: ChevronDownIcon,
  ChevronRight: ChevronRightIcon,
  Plus: PlusIcon,
  Minus: MinusIcon,
  Search: SearchIcon,
  Menu: MenuIcon,
  Settings: SettingsIcon,
  BearPaw: BearPawIcon,
};

