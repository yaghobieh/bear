import type { ImgHTMLAttributes, ReactNode } from 'react';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  /** Image source URL */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Fallback initials when no image */
  initials?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Shape variant */
  variant?: 'circle' | 'rounded' | 'square';
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Border color (for groups) */
  bordered?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

export interface AvatarGroupProps {
  /** Avatar components */
  children: ReactNode;
  /** Max avatars to show */
  max?: number;
  /** Size of avatars */
  size?: AvatarProps['size'];
  /** Custom class name */
  className?: string;
}

