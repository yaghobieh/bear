import { forwardRef } from 'react';
import { cn } from '@utils';
import type { StepperProps, StepperControlsProps, StepStatus, Step } from './Stepper.types';
import {
  STEPPER_BASE_CLASSES,
  STEPPER_HORIZONTAL_CLASSES,
  STEPPER_VERTICAL_CLASSES,
  STEP_WRAPPER_HORIZONTAL,
  STEP_WRAPPER_VERTICAL,
  STEP_INDICATOR_BASE,
  STEP_INDICATOR_SIZES,
  STEP_STATUS_CLASSES,
  CONNECTOR_BASE,
  CONNECTOR_HORIZONTAL,
  CONNECTOR_VERTICAL,
  CONNECTOR_STATUS,
  STEP_LABEL_BASE,
  STEP_LABEL_SIZES,
  STEP_DESCRIPTION_CLASSES,
} from './Stepper.const';
import { Button } from '../Button';

// Icons
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Stepper - Multi-step wizard component
 */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep,
      onStepClick,
      orientation = 'horizontal',
      size = 'md',
      showNumbers = true,
      clickable = false,
      showConnectors = true,
      connectorStyle = 'solid',
      alternativeLabel = false,
      completedIcon,
      errorIcon,
      testId,
      className,
      ...props
    },
    ref
  ) => {
    const getStepStatus = (index: number, step: Step): StepStatus => {
      if (step.status) return step.status;
      if (index < activeStep) return 'completed';
      if (index === activeStep) return 'active';
      return 'pending';
    };

    const isHorizontal = orientation === 'horizontal';
    const sizeConfig = STEP_INDICATOR_SIZES[size];
    const labelSizeConfig = STEP_LABEL_SIZES[size];

    const renderIndicator = (step: Step, index: number, status: StepStatus) => {
      const statusClasses = STEP_STATUS_CLASSES[status];

      let content: React.ReactNode = null;

      if (step.icon) {
        content = step.icon;
      } else if (status === 'completed') {
        content = completedIcon || <CheckIcon />;
      } else if (status === 'error') {
        content = errorIcon || <ErrorIcon />;
      } else if (showNumbers) {
        content = index + 1;
      }

      return (
        <div
          className={cn(
            STEP_INDICATOR_BASE,
            sizeConfig,
            statusClasses.indicator,
            clickable && !step.disabled && 'cursor-pointer hover:scale-105'
          )}
          onClick={() => {
            if (clickable && !step.disabled && onStepClick) {
              onStepClick(index);
            }
          }}
        >
          {content}
        </div>
      );
    };

    const renderConnector = (index: number) => {
      if (!showConnectors || index === steps.length - 1) return null;

      const isCompleted = index < activeStep;
      
      return (
        <div
          className={cn(
            CONNECTOR_BASE,
            isHorizontal ? CONNECTOR_HORIZONTAL : CONNECTOR_VERTICAL,
            isCompleted ? CONNECTOR_STATUS.completed : CONNECTOR_STATUS.pending,
            connectorStyle === 'dashed' && 'border-t-2 border-dashed bg-transparent'
          )}
        />
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          STEPPER_BASE_CLASSES,
          isHorizontal ? STEPPER_HORIZONTAL_CLASSES : STEPPER_VERTICAL_CLASSES,
          className
        )}
        data-testid={testId}
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index, step);
          const statusClasses = STEP_STATUS_CLASSES[status];

          return (
            <div
              key={index}
              className={cn(
                'Bear-Stepper__step',
                isHorizontal ? STEP_WRAPPER_HORIZONTAL : STEP_WRAPPER_VERTICAL
              )}
            >
              {isHorizontal ? (
                // Horizontal layout
                <div className={cn('flex', alternativeLabel ? 'flex-col items-center' : 'items-center gap-3')}>
                  {renderIndicator(step, index, status)}
                  <div className={cn(alternativeLabel && 'text-center mt-2')}>
                    <div className={cn(STEP_LABEL_BASE, labelSizeConfig.label, statusClasses.label)}>
                      {step.label}
                    </div>
                    {step.description && (
                      <div className={cn(STEP_DESCRIPTION_CLASSES, labelSizeConfig.description)}>
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Vertical layout
                <>
                  <div className="flex-shrink-0 mr-4">
                    {renderIndicator(step, index, status)}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className={cn(STEP_LABEL_BASE, labelSizeConfig.label, statusClasses.label)}>
                      {step.label}
                    </div>
                    {step.description && (
                      <div className={cn(STEP_DESCRIPTION_CLASSES, labelSizeConfig.description)}>
                        {step.description}
                      </div>
                    )}
                    {step.content && status === 'active' && (
                      <div className="mt-4">
                        {step.content}
                      </div>
                    )}
                  </div>
                </>
              )}
              {renderConnector(index)}
            </div>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

/**
 * StepperControls - Navigation buttons for stepper
 */
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
      prevLabel = 'Previous',
      nextLabel = 'Next',
      completeLabel = 'Complete',
      showIndicator = true,
    },
    ref
  ) => {
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === totalSteps - 1;

    return (
      <div ref={ref} className="Bear-StepperControls flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep || disablePrev}
        >
          {prevLabel}
        </Button>

        {showIndicator && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {activeStep + 1} of {totalSteps}
          </span>
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

export default Stepper;
