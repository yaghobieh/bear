import { forwardRef } from 'react';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import type { StepperControlsProps } from '../Stepper.types';
import {
  FIRST_STEP_INDEX,
  LAST_STEP_OFFSET,
  DEFAULT_PREV_LABEL,
  DEFAULT_NEXT_LABEL,
  DEFAULT_COMPLETE_LABEL,
  DEFAULT_INDICATOR_FORMAT,
} from '../Stepper.const';

export const StepperControls = forwardRef<HTMLDivElement, StepperControlsProps>(
  (
    {
      activeStep,
      totalSteps,
      onPrev,
      onNext,
      onComplete,
      disablePrev = false,
      disableNext = false,
      prevLabel = DEFAULT_PREV_LABEL,
      nextLabel = DEFAULT_NEXT_LABEL,
      completeLabel = DEFAULT_COMPLETE_LABEL,
      showIndicator = true,
      indicatorFormat = DEFAULT_INDICATOR_FORMAT,
    },
    ref
  ) => {
    const isFirstStep = activeStep === FIRST_STEP_INDEX;
    const isLastStep = activeStep === totalSteps - LAST_STEP_OFFSET;

    return (
      <div ref={ref} className="Bear-StepperControls flex items-center justify-between mt-6">
        <Button variant="outline" onClick={onPrev} disabled={isFirstStep || disablePrev}>
          {prevLabel}
        </Button>

        {showIndicator && (
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
            {indicatorFormat(activeStep + LAST_STEP_OFFSET, totalSteps)}
          </Typography>
        )}

        {isLastStep ? (
          <Button variant="primary" onClick={onComplete}>
            {completeLabel}
          </Button>
        ) : (
          <Button variant="primary" onClick={onNext} disabled={disableNext}>
            {nextLabel}
          </Button>
        )}
      </div>
    );
  }
);

StepperControls.displayName = 'StepperControls';
