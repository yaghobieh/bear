import type { ReactNode } from 'react';

export interface TourStep {
  /** Target element selector or ref */
  target: string | (() => HTMLElement | null);
  /** Step title */
  title?: ReactNode;
  /** Step description */
  description?: ReactNode;
  /** Custom content */
  content?: ReactNode;
  /** Placement of the tooltip */
  placement?: TourPlacement;
  /** Disable interaction with target */
  disableInteraction?: boolean;
  /** Show spotlight on target */
  spotlightPadding?: number;
  /** Custom next button text */
  nextText?: string;
  /** Custom prev button text */
  prevText?: string;
  /** Before step callback */
  onBeforeStep?: () => Promise<void> | void;
  /** After step callback */
  onAfterStep?: () => Promise<void> | void;
}

export type TourPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end';

export interface TourProps {
  /** Array of tour steps */
  steps: TourStep[];
  /** Whether tour is open */
  open?: boolean;
  /** Current step index */
  current?: number;
  /** Called when tour closes */
  onClose?: () => void;
  /** Called when step changes */
  onStepChange?: (current: number) => void;
  /** Called when tour finishes */
  onFinish?: () => void;
  /** Show step indicators */
  showIndicators?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Show skip button */
  showSkipButton?: boolean;
  /** Show prev button */
  showPrevButton?: boolean;
  /** Finish button text */
  finishText?: string;
  /** Skip button text */
  skipText?: string;
  /** Custom class name */
  className?: string;
  /** Mask/overlay opacity */
  maskOpacity?: number;
  /** Mask color */
  maskColor?: string;
  /** Animation enabled */
  animated?: boolean;
  /** Test ID */
  testId?: string;
}

export interface UseTourReturn {
  /** Start the tour */
  start: () => void;
  /** Stop the tour */
  stop: () => void;
  /** Go to next step */
  next: () => void;
  /** Go to previous step */
  prev: () => void;
  /** Go to specific step */
  goTo: (step: number) => void;
  /** Whether tour is active */
  isActive: boolean;
  /** Current step index */
  currentStep: number;
  /** Total steps count */
  totalSteps: number;
}
