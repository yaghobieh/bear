import { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** The variant of the skeleton */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number | string;
  /** Number of skeleton lines to render (for text variant) */
  count?: number;
  /** Gap between skeleton lines */
  gap?: number | string;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

