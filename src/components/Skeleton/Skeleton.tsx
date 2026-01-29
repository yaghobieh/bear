import { forwardRef, useEffect } from 'react';
import { cn } from '@utils';
import type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps } from './Skeleton.types';
import {
  SKELETON_BASE_CLASSES,
  SKELETON_VARIANT_CLASSES,
  SKELETON_ANIMATION_CLASSES,
  SKELETON_BG_CLASSES,
  SKELETON_WAVE_STYLES,
  SKELETON_TEXT_HEIGHT,
  SKELETON_AVATAR_SIZES,
} from './Skeleton.const';

// Inject wave animation styles
const injectStyles = () => {
  const styleId = 'bear-skeleton-styles';
  if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = SKELETON_WAVE_STYLES;
    document.head.appendChild(style);
  }
};

/**
 * Skeleton - Loading placeholder with animation
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      borderRadius,
      count = 1,
      gap = 8,
      className,
      style,
      testId,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (animation === 'wave') {
        injectStyles();
      }
    }, [animation]);

    const getSize = (value: number | string | undefined) => {
      if (value === undefined) return undefined;
      return typeof value === 'number' ? `${value}px` : value;
    };

    const skeletonStyle = {
      width: getSize(width),
      height: getSize(height) || (variant === 'text' ? SKELETON_TEXT_HEIGHT : undefined),
      borderRadius: borderRadius ? getSize(borderRadius) : undefined,
      ...style,
    };

    const skeletonClasses = cn(
      SKELETON_BASE_CLASSES,
      SKELETON_VARIANT_CLASSES[variant],
      SKELETON_ANIMATION_CLASSES[animation],
      SKELETON_BG_CLASSES,
      className
    );

    if (count > 1) {
      return (
        <div 
          className="Bear-Skeleton__group flex flex-col" 
          style={{ gap: getSize(gap) }}
          data-testid={testId}
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              ref={index === 0 ? ref : undefined}
              className={skeletonClasses}
              style={skeletonStyle}
              {...props}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={skeletonClasses}
        style={skeletonStyle}
        data-testid={testId}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

/**
 * SkeletonText - Text placeholder with multiple lines
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = '80%', gap = 8, animation = 'pulse', ...props }, ref) => {
    useEffect(() => {
      if (animation === 'wave') {
        injectStyles();
      }
    }, [animation]);

    const getSize = (value: number | string | undefined) => {
      if (value === undefined) return undefined;
      return typeof value === 'number' ? `${value}px` : value;
    };

    return (
      <div 
        ref={ref} 
        className="Bear-SkeletonText flex flex-col" 
        style={{ gap: getSize(gap) }}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            animation={animation}
            width={index === lines - 1 ? lastLineWidth : '100%'}
            {...props}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

/**
 * SkeletonAvatar - Circular avatar placeholder
 */
export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', animation = 'pulse', ...props }, ref) => {
    const dimension = typeof size === 'number' ? size : SKELETON_AVATAR_SIZES[size];

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        animation={animation}
        width={dimension}
        height={dimension}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

/**
 * SkeletonCard - Card placeholder
 */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ animation = 'pulse', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'Bear-SkeletonCard p-4 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 mb-4">
          <SkeletonAvatar animation={animation} />
          <div className="flex-1">
            <Skeleton animation={animation} width="60%" height={16} className="mb-2" />
            <Skeleton animation={animation} width="40%" height={12} />
          </div>
        </div>
        <SkeletonText animation={animation} lines={3} />
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

export default Skeleton;
