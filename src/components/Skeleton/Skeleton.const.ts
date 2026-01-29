import type { SkeletonVariant, SkeletonAnimation } from './Skeleton.types';

// Base classes
export const SKELETON_BASE_CLASSES = 'Bear-Skeleton relative overflow-hidden';

// Variant classes
export const SKELETON_VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-lg',
};

// Animation classes
export const SKELETON_ANIMATION_CLASSES: Record<SkeletonAnimation, string> = {
  pulse: 'animate-pulse',
  wave: 'Bear-Skeleton--wave',
  none: '',
};

// Background classes
export const SKELETON_BG_CLASSES = 'bg-gray-200 dark:bg-zinc-700';

// Wave animation keyframes (injected via style)
export const SKELETON_WAVE_STYLES = `
  @keyframes Bear-Skeleton-wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .Bear-Skeleton--wave::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: Bear-Skeleton-wave 1.6s linear 0.5s infinite;
  }
  
  .dark .Bear-Skeleton--wave::after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
`;

// Default sizes
export const SKELETON_TEXT_HEIGHT = '1em';
export const SKELETON_AVATAR_SIZES = {
  sm: 32,
  md: 40,
  lg: 56,
};

