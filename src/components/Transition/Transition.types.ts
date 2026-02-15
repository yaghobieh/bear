import type { ReactNode, CSSProperties } from 'react';

/**
 * Built-in transition names
 */
export type TransitionName =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'scale-y'
  | 'scale-x'
  | 'rotate'
  | 'flip'
  | 'collapse';

export interface TransitionProps {
  /** Whether the child is visible */
  show: boolean;
  /** Transition name or custom styles */
  name?: TransitionName;
  /** Duration in ms */
  duration?: number;
  /** Delay in ms */
  delay?: number;
  /** Easing function */
  easing?: string;
  /** Custom enter styles */
  enterFrom?: CSSProperties;
  /** Custom enter-to styles */
  enterTo?: CSSProperties;
  /** Custom leave styles */
  leaveFrom?: CSSProperties;
  /** Custom leave-to styles */
  leaveTo?: CSSProperties;
  /** Unmount when hidden */
  unmountOnHide?: boolean;
  /** Called when enter transition starts */
  onEnter?: () => void;
  /** Called when enter transition ends */
  onEntered?: () => void;
  /** Called when leave transition starts */
  onLeave?: () => void;
  /** Called when leave transition ends */
  onLeft?: () => void;
  /** Children to animate */
  children: ReactNode;
  /** Custom class name */
  className?: string;
  /** As which HTML element */
  as?: keyof JSX.IntrinsicElements;
}

export interface MotionProps {
  /** Children to render */
  children: ReactNode;
  /** Initial styles (on mount) */
  initial?: CSSProperties;
  /** Target styles (after mount) */
  animate?: CSSProperties;
  /** Exit styles */
  exit?: CSSProperties;
  /** Transition configuration */
  transition?: {
    duration?: number;
    delay?: number;
    easing?: string;
  };
  /** Hover styles */
  whileHover?: CSSProperties;
  /** Press/active styles */
  whileTap?: CSSProperties;
  /** Whether in view (trigger animation) */
  inView?: boolean;
  /** As which HTML element */
  as?: keyof JSX.IntrinsicElements;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}
