import type { ReactNode, CSSProperties } from 'react';

/**
 * Carousel transition effect
 */
export type CarouselTransition = 'slide' | 'fade' | 'zoom' | 'flip';

/**
 * Carousel indicator style
 */
export type CarouselIndicator = 'dots' | 'numbers' | 'thumbnails' | 'bars' | 'none';

export interface CarouselProps {
  /** Carousel slides */
  children: ReactNode;
  /** Auto-play interval in ms (0 to disable) */
  autoPlay?: number;
  /** Show navigation dots/indicators */
  showDots?: boolean;
  /** Show arrow buttons */
  showArrows?: boolean;
  /** Loop continuously */
  loop?: boolean;
  /** Slides to show at once */
  slidesToShow?: number;
  /** Gap between slides in px */
  gap?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Called when slide changes */
  onSlideChange?: (index: number) => void;
  /** Transition effect */
  transition?: CarouselTransition;
  /** Transition duration in ms */
  transitionDuration?: number;
  /** Indicator style */
  indicator?: CarouselIndicator;
  /** Thumbnail images for 'thumbnails' indicator */
  thumbnails?: string[];
  /** Thumbnail size in px */
  thumbnailSize?: number;
  /** Enable keyboard navigation */
  keyboard?: boolean;
  /** Enable drag/swipe to navigate */
  draggable?: boolean;
  /** Show progress bar */
  showProgress?: boolean;
  /** Show slide counter */
  showCounter?: boolean;
  /** Active dot/indicator color */
  activeColor?: string;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID */
  testId?: string;
}
