import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useBearThemeOptional } from '../../context/BearProvider';
import { resolveMaxVisible } from '../../utils/maxVisible.utils';
import { cn } from '@utils';
import type { StepperProps, StepperControlsProps, StepStatus, Step } from './Stepper.types';
import {
  STEPPER_BASE_CLASSES,
  STEPPER_HORIZONTAL_CLASSES,
  STEPPER_VERTICAL_CLASSES,
  STEP_WRAPPER_HORIZONTAL,
  STEP_WRAPPER_HORIZONTAL_WINDOW,
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
import { Dropdown } from '../Dropdown';
import { BearIcons } from '../Icon';

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
      maxVisibleSteps,
      testId,
      className,
      ...props
    },
    ref
  ) => {
    const theme = useBearThemeOptional();
    const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
    useEffect(() => {
      const r = () => setVw(window.innerWidth);
      window.addEventListener('resize', r);
      return () => window.removeEventListener('resize', r);
    }, []);

    const resolvedWindow = useMemo(
      () => (maxVisibleSteps == null ? undefined : resolveMaxVisible(maxVisibleSteps, { width: vw, theme })),
      [maxVisibleSteps, vw, theme]
    );

    const getStepStatus = (index: number, step: Step): StepStatus => {
      if (step.status) return step.status;
      if (index < activeStep) return 'completed';
      if (index === activeStep) return 'active';
      return 'pending';
    };

    const isHorizontal = orientation === 'horizontal';
    const sizeConfig = STEP_INDICATOR_SIZES[size];
    const labelSizeConfig = STEP_LABEL_SIZES[size];

    const useWindow =
      isHorizontal && resolvedWindow != null && steps.length > resolvedWindow;

    const { visibleIndices, leftHidden, rightHidden } = useMemo(() => {
      if (!useWindow || resolvedWindow == null) {
        return {
          visibleIndices: steps.map((_, i) => i),
          leftHidden: [] as number[],
          rightHidden: [] as number[],
        };
      }
      const max = resolvedWindow;
      const start = Math.max(0, Math.min(activeStep - Math.floor(max / 2), steps.length - max));
      const vis = Array.from({ length: max }, (_, i) => start + i);
      const left: number[] = [];
      const right: number[] = [];
      for (let i = 0; i < start; i++) left.push(i);
      for (let i = start + max; i < steps.length; i++) right.push(i);
      return { visibleIndices: vis, leftHidden: left, rightHidden: right };
    }, [useWindow, resolvedWindow, steps.length, activeStep]);

    const wrapperHorizontal = useWindow ? STEP_WRAPPER_HORIZONTAL_WINDOW : STEP_WRAPPER_HORIZONTAL;

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

    const renderHorizontalInner = (step: Step, index: number) => {
      const status = getStepStatus(index, step);
      const statusClasses = STEP_STATUS_CLASSES[status];
      return (
        <div className={cn('flex', alternativeLabel ? 'flex-col items-center' : 'items-center gap-3')}>
          {renderIndicator(step, index, status)}
          <div className={cn(alternativeLabel && 'text-center mt-2')}>
            <div className={cn(STEP_LABEL_BASE, labelSizeConfig.label, statusClasses.label)}>{step.label}</div>
            {step.description && (
              <div className={cn(STEP_DESCRIPTION_CLASSES, labelSizeConfig.description)}>{step.description}</div>
            )}
          </div>
        </div>
      );
    };

    const renderVerticalInner = (step: Step, index: number) => {
      const status = getStepStatus(index, step);
      const statusClasses = STEP_STATUS_CLASSES[status];
      return (
        <>
          <div className="flex-shrink-0 mr-4">{renderIndicator(step, index, status)}</div>
          <div className="flex-1 pt-0.5">
            <div className={cn(STEP_LABEL_BASE, labelSizeConfig.label, statusClasses.label)}>{step.label}</div>
            {step.description && (
              <div className={cn(STEP_DESCRIPTION_CLASSES, labelSizeConfig.description)}>{step.description}</div>
            )}
            {step.content && status === 'active' && <div className="mt-4">{step.content}</div>}
          </div>
        </>
      );
    };

    const renderOverflowColumn = (hidden: number[], side: 'left' | 'right') => (
      <div key={`overflow-${side}`} className={cn('Bear-Stepper__step', 'Bear-Stepper__overflow', wrapperHorizontal)}>
        <div className={cn('flex', alternativeLabel ? 'flex-col items-center' : 'items-center gap-3')}>
          <Dropdown
            placement="bottom-start"
            closeOnSelect
            trigger={
              <button
                type="button"
                className={cn(
                  STEP_INDICATOR_BASE,
                  sizeConfig,
                  STEP_STATUS_CLASSES.pending.indicator,
                  'bear-cursor-pointer bear-border-0'
                )}
                aria-label={side === 'left' ? 'Previous steps' : 'More steps'}
              >
                <BearIcons.MoreHorizIcon size={16} />
              </button>
            }
            items={hidden.map((idx) => ({
              key: `step-${idx}`,
              label: steps[idx].label,
              disabled: steps[idx].disabled,
              onClick: () => {
                if (steps[idx].disabled) return;
                onStepClick?.(idx);
              },
            }))}
          />
          {alternativeLabel && <div className="text-center mt-2 bear-text-xs bear-text-gray-400">&nbsp;</div>}
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(STEPPER_BASE_CLASSES, isHorizontal ? STEPPER_HORIZONTAL_CLASSES : STEPPER_VERTICAL_CLASSES, className)}
        data-testid={testId}
        {...props}
      >
        {isHorizontal && !useWindow &&
          steps.map((step, index) => (
            <div key={index} className={cn('Bear-Stepper__step', STEP_WRAPPER_HORIZONTAL)}>
              {renderHorizontalInner(step, index)}
              {renderConnector(index)}
            </div>
          ))}

        {isHorizontal && useWindow && (
          <>
            {leftHidden.length > 0 && renderOverflowColumn(leftHidden, 'left')}
            {visibleIndices.map((index, k) => {
              const step = steps[index];
              const nextVisible = visibleIndices[k + 1];
              const showConn = Boolean(nextVisible != null && nextVisible === index + 1);
              return (
                <div key={index} className={cn('Bear-Stepper__step', wrapperHorizontal)}>
                  {renderHorizontalInner(step, index)}
                  {showConn && renderConnector(index)}
                </div>
              );
            })}
            {rightHidden.length > 0 && renderOverflowColumn(rightHidden, 'right')}
          </>
        )}

        {!isHorizontal &&
          steps.map((step, index) => (
            <div key={index} className={cn('Bear-Stepper__step', STEP_WRAPPER_VERTICAL)}>
              {renderVerticalInner(step, index)}
              {renderConnector(index)}
            </div>
          ))}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

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
        <Button variant="outline" onClick={onPrev} disabled={isFirstStep || disablePrev}>
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
