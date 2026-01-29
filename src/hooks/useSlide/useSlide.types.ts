import { RefObject, CSSProperties } from 'react';

export type SlideDirection = 'left' | 'right' | 'up' | 'down';

export interface UseSlideOptions {
  /** Direction of the slide */
  direction?: SlideDirection;
  /** Distance to slide (in pixels) */
  distance?: number;
  /** Duration of animation (in ms) */
  duration?: number;
  /** Delay before animation starts (in ms) */
  delay?: number;
  /** Easing function */
  easing?: string;
  /** Trigger on mount */
  triggerOnMount?: boolean;
  /** Trigger when element is in viewport */
  triggerOnView?: boolean;
  /** Viewport threshold (0-1) */
  threshold?: number;
  /** Loop animation */
  loop?: boolean;
  /** Loop interval (in ms) */
  loopInterval?: number;
}

export interface UseSlideReturn<T extends HTMLElement> {
  /** Ref to attach to the element */
  ref: RefObject<T>;
  /** Style object to apply */
  style: CSSProperties;
  /** Whether the animation is active */
  isActive: boolean;
  /** Trigger the animation manually */
  trigger: () => void;
  /** Reset to initial state */
  reset: () => void;
}

