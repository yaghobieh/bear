import { HTMLAttributes, ReactNode } from 'react';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'pending' | 'active' | 'completed' | 'error';
export type StepperSize = 'sm' | 'md' | 'lg';

export interface Step {
  /** Step label/title */
  label: string;
  /** Step description */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Step status (auto-calculated if not provided) */
  status?: StepStatus;
  /** Whether step is disabled */
  disabled?: boolean;
  /** Optional content for this step */
  content?: ReactNode;
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of steps */
  steps: Step[];
  /** Current active step (0-indexed) */
  activeStep: number;
  /** Called when step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Orientation */
  orientation?: StepperOrientation;
  /** Size */
  size?: StepperSize;
  /** Show step numbers */
  showNumbers?: boolean;
  /** Allow clicking on any step */
  clickable?: boolean;
  /** Show connector lines */
  showConnectors?: boolean;
  /** Connector line style */
  connectorStyle?: 'solid' | 'dashed';
  /** Alternative label position (below for horizontal) */
  alternativeLabel?: boolean;
  /** Custom completed icon */
  completedIcon?: ReactNode;
  /** Custom error icon */
  errorIcon?: ReactNode;
  /** Test ID */
  testId?: string;
}

export interface StepperControlsProps {
  /** Current step */
  activeStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Go to previous step */
  onPrev: () => void;
  /** Go to next step */
  onNext: () => void;
  /** On complete all steps */
  onComplete?: () => void;
  /** Disable previous button */
  disablePrev?: boolean;
  /** Disable next button */
  disableNext?: boolean;
  /** Previous button text */
  prevLabel?: string;
  /** Next button text */
  nextLabel?: string;
  /** Complete button text */
  completeLabel?: string;
  /** Show step indicator */
  showIndicator?: boolean;
}
