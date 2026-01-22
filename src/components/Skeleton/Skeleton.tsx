import { FC } from 'react';
import { cn } from '../../utils/cn';
import type { SkeletonProps, SkeletonVariant, SkeletonAnimation } from './Skeleton.types';

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'bear-rounded',
  circular: 'bear-rounded-full',
  rectangular: 'bear-rounded-none',
  rounded: 'bear-rounded-lg',
};

const ANIMATION_CLASSES: Record<SkeletonAnimation, string> = {
  pulse: 'bear-animate-pulse',
  wave: 'bear-skeleton-wave',
  none: '',
};

/**
 * Skeleton component for loading placeholders
 * 
 * @example
 * ```tsx
 * <Skeleton variant="text" width={200} />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * <Skeleton variant="text" count={3} />
 * ```
 */
export const Skeleton: FC<SkeletonProps> = ({
  variant = 'text',
  animation = 'pulse',
  width,
  height,
  count = 1,
  gap = 8,
  className,
  testId,
  style,
  ...props
}) => {
  const getDefaultHeight = () => {
    if (height) return height;
    switch (variant) {
      case 'text':
        return '1em';
      case 'circular':
        return width || 40;
      default:
        return 'auto';
    }
  };

  const skeletonStyle = {
    width: width || (variant === 'circular' ? 40 : '100%'),
    height: getDefaultHeight(),
    ...style,
  };

  if (count > 1 && variant === 'text') {
    return (
      <div 
        className="bear-flex bear-flex-col" 
        style={{ gap }}
        data-testid={testId}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'bear-bg-gray-200 dark:bear-bg-gray-700',
              VARIANT_CLASSES[variant],
              ANIMATION_CLASSES[animation],
              className
            )}
            style={{
              ...skeletonStyle,
              width: index === count - 1 ? '80%' : skeletonStyle.width,
            }}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bear-bg-gray-200 dark:bear-bg-gray-700',
        VARIANT_CLASSES[variant],
        ANIMATION_CLASSES[animation],
        className
      )}
      style={skeletonStyle}
      data-testid={testId}
      {...props}
    />
  );
};

// Pre-built skeleton patterns
export const SkeletonAvatar: FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className 
}) => (
  <Skeleton 
    variant="circular" 
    width={size} 
    height={size} 
    className={className} 
  />
);

export const SkeletonText: FC<{ 
  lines?: number; 
  width?: number | string; 
  className?: string 
}> = ({ 
  lines = 3, 
  width = '100%', 
  className 
}) => (
  <Skeleton 
    variant="text" 
    count={lines} 
    width={width} 
    className={className} 
  />
);

export const SkeletonCard: FC<{ className?: string }> = ({ className }) => (
  <div className={cn('bear-p-4 bear-space-y-4', className)}>
    <Skeleton variant="rectangular" height={200} />
    <div className="bear-flex bear-items-center bear-gap-3">
      <SkeletonAvatar />
      <div className="bear-flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" className="bear-mt-2" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

export default Skeleton;

