import type { ReactNode } from 'react';

export type DockPosition = 'bottom' | 'top' | 'left' | 'right';

export interface DockItem {
  /** Unique ID */
  id: string;
  /** Icon content */
  icon: ReactNode;
  /** Tooltip label */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether item is active */
  active?: boolean;
  /** Badge content */
  badge?: string | number;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Href for link items */
  href?: string;
}

export interface DockProps {
  /** Dock items */
  items: DockItem[];
  /** Position on screen */
  position?: DockPosition;
  /** Base icon size in pixels */
  iconSize?: number;
  /** Maximum magnified size in pixels */
  magnifiedSize?: number;
  /** Enable magnification on hover */
  magnification?: boolean;
  /** Distance for magnification effect (how many neighbors) */
  magnificationDistance?: number;
  /** Whether to show labels on hover */
  showLabels?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Test ID */
  testId?: string;
}
