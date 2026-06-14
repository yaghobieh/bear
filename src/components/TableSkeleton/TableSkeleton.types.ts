import type { SkeletonAnimation } from '../Skeleton/Skeleton.types';

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  animation?: SkeletonAnimation;
  id?: string;
  testId?: string;
  className?: string;
}
