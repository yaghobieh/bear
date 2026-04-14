import type { ReactNode } from 'react';
import type { Step, StepStatus } from './Stepper.types';
import { STEP_NUMBER_OFFSET } from './Stepper.const';

/**
 * Derives the visual status for a step based on its explicit status or its
 * position relative to the active step.
 */
export function resolveStepStatus(step: Step, index: number, activeStep: number): StepStatus {
  if (step.status) return step.status;
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
}

/**
 * Determines the indicator content for a step circle based on status, custom
 * icons, and the showNumbers flag.
 */
export function resolveIndicatorContent(
  step: Step,
  index: number,
  status: StepStatus,
  showNumbers: boolean,
  completedIcon: ReactNode | undefined,
  errorIcon: ReactNode | undefined,
  defaultCompletedIcon: ReactNode,
  defaultErrorIcon: ReactNode,
): ReactNode {
  if (step.icon) return step.icon;

  switch (status) {
    case 'completed':
      return completedIcon ?? defaultCompletedIcon;
    case 'error':
      return errorIcon ?? defaultErrorIcon;
    default:
      return showNumbers ? index + STEP_NUMBER_OFFSET : null;
  }
}
