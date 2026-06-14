import type { SkeletonAnimation } from '../Skeleton/Skeleton.types';

export interface FormSkeletonProps {
  fields?: number;
  animation?: SkeletonAnimation;
  id?: string;
  testId?: string;
  className?: string;
}
