import type { ReactNode } from 'react';

export interface CarouselProps {
  /** Carousel slides */
  children: ReactNode;
  /** Auto-play interval in ms (0 to disable) */
  autoPlay?: number;
  /** Show navigation dots */
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
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

