import { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Variant type */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Width (number = px, string = any CSS unit) */
  width?: number | string;
  /** Height (number = px, string = any CSS unit) */
  height?: number | string;
  /** Border radius for rounded variant */
  borderRadius?: number | string;
  /** Number of skeleton lines to show */
  count?: number;
  /** Gap between lines when count > 1 */
  gap?: number | string;
  /** Test ID */
  testId?: string;
}

export interface SkeletonTextProps extends Omit<SkeletonProps, 'variant'> {
  /** Number of lines */
  lines?: number;
  /** Make last line shorter */
  lastLineWidth?: number | string;
}

export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'variant' | 'width' | 'height'> {
  /** Size of avatar */
  size?: 'sm' | 'md' | 'lg' | number;
}
