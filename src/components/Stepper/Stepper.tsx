import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { useBearThemeOptional } from '../../context/BearProvider';
import { resolveMaxVisible } from '../../utils/maxVisible.utils';
import { cn } from '@utils';
import { Typography } from '../Typography';
import { Dropdown } from '../Dropdown';
import { BearIcons } from '../Icon';
import type { StepperProps, Step, StepStatus } from './Stepper.types';
import {
  DEFAULT_ORIENTATION,
  DEFAULT_SIZE,
  DEFAULT_SHOW_NUMBERS,
  DEFAULT_SHOW_CONNECTORS,
  DEFAULT_CONNECTOR_STYLE,
  DEFAULT_CLICKABLE,
  DEFAULT_ALTERNATIVE_LABEL,
  CHECK_ICON_SIZE,
  CHECK_ICON_VIEWBOX,
  CHECK_ICON_POINTS,
  ERROR_ICON_SIZE,
  ERROR_ICON_VIEWBOX,
  OVERFLOW_LEFT_LABEL,
  OVERFLOW_RIGHT_LABEL,
  STEPPER_BASE_CLASSES,
  STEPPER_HORIZONTAL_CLASSES,
  STEPPER_VERTICAL_CLASSES,
  STEP_WRAPPER_VERTICAL,
  STEP_INDICATOR_BASE,
  STEP_INDICATOR_SIZES,
  STEP_STATUS_CLASSES,
  CONNECTOR_BASE,
  CONNECTOR_VERTICAL,
  CONNECTOR_STATUS,
  STEP_LABEL_BASE,
  STEP_LABEL_SIZES,
  STEP_DESCRIPTION_CLASSES,
} from './Stepper.const';
import { resolveStepStatus, resolveIndicatorContent } from './Stepper.utils';

const DEFAULT_VIEWPORT_WIDTH = 1200;
const OVERFLOW_ICON_SIZE = 16;
const MOBILE_BREAKPOINT = 640;
const AUTO_MOBILE_MAX = 3;

const CheckIcon = () => (
  <svg width={CHECK_ICON_SIZE} height={CHECK_ICON_SIZE} viewBox={CHECK_ICON_VIEWBOX} fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points={CHECK_ICON_POINTS} />
  </svg>
);

const ErrorIcon = () => (
  <svg width={ERROR_ICON_SIZE} height={ERROR_ICON_SIZE} viewBox={ERROR_ICON_VIEWBOX} fill="none" stroke="currentColor" strokeWidth="3">
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
      orientation = DEFAULT_ORIENTATION,
      size = DEFAULT_SIZE,
      showNumbers = DEFAULT_SHOW_NUMBERS,
      clickable = DEFAULT_CLICKABLE,
      showConnectors = DEFAULT_SHOW_CONNECTORS,
      connectorStyle = DEFAULT_CONNECTOR_STYLE,
      alternativeLabel = DEFAULT_ALTERNATIVE_LABEL,
      completedIcon,
      errorIcon,
      labelTypographyProps,
      descriptionTypographyProps,
      maxVisibleSteps,
      testId,
      className,
      ...props
    },
    ref
  ) => {
    const theme = useBearThemeOptional();
    const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : DEFAULT_VIEWPORT_WIDTH));
    useEffect(() => {
      const r = () => setVw(window.innerWidth);
      window.addEventListener('resize', r);
      return () => window.removeEventListener('resize', r);
    }, []);

    const resolvedWindow = useMemo(() => {
      if (maxVisibleSteps != null) {
        return resolveMaxVisible(maxVisibleSteps, { width: vw, theme });
      }
      if (vw < MOBILE_BREAKPOINT && steps.length > AUTO_MOBILE_MAX) {
        return AUTO_MOBILE_MAX;
      }
      return undefined;
    }, [maxVisibleSteps, vw, theme, steps.length]);

    const isHorizontal = orientation === 'horizontal';
    const sizeConfig = STEP_INDICATOR_SIZES[size];
    const labelSizeConfig = STEP_LABEL_SIZES[size];

    const useWindow = isHorizontal && resolvedWindow != null && steps.length > resolvedWindow;

    const { visibleIndices, leftHidden, rightHidden } = useMemo(() => {
      if (!useWindow || resolvedWindow == null) {
        return {
          visibleIndices: steps.map((_, i) => i),
          leftHidden: [] as number[],
          rightHidden: [] as number[],
        };
      }
      const max = resolvedWindow;
      const half = Math.floor(max / 2);
      const start = Math.max(0, Math.min(activeStep - half, steps.length - max));
      const vis = Array.from({ length: max }, (_, i) => start + i);
      const left: number[] = [];
      const right: number[] = [];
      for (let i = 0; i < start; i++) left.push(i);
      for (let i = start + max; i < steps.length; i++) right.push(i);
      return { visibleIndices: vis, leftHidden: left, rightHidden: right };
    }, [useWindow, resolvedWindow, steps, activeStep]);

    const renderIndicator = (step: Step, index: number, status: StepStatus) => {
      const statusClasses = STEP_STATUS_CLASSES[status];
      const content = resolveIndicatorContent(
        step, index, status, showNumbers,
        completedIcon, errorIcon,
        <CheckIcon />, <ErrorIcon />,
      );

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

    const renderConnector = (index: number, isLast: boolean) => {
      if (!showConnectors || isLast) return null;

      const isCompleted = index < activeStep;

      if (isHorizontal) {
        return (
          <div
            className={cn(
              'Bear-Stepper__connector flex-1 self-center mx-1',
              'h-0.5 min-w-[12px] transition-colors',
              isCompleted ? CONNECTOR_STATUS.completed : CONNECTOR_STATUS.pending,
              connectorStyle === 'dashed' && 'border-t-2 border-dashed bg-transparent'
            )}
          />
        );
      }

      return (
        <div
          className={cn(
            CONNECTOR_BASE,
            CONNECTOR_VERTICAL,
            isCompleted ? CONNECTOR_STATUS.completed : CONNECTOR_STATUS.pending,
            connectorStyle === 'dashed' && 'border-t-2 border-dashed bg-transparent'
          )}
        />
      );
    };

    const renderLabel = (step: Step, status: StepStatus) => {
      const statusClasses = STEP_STATUS_CLASSES[status];
      const mergedLabelProps = { ...labelTypographyProps, ...step.labelTypographyProps };
      const mergedDescProps = { ...descriptionTypographyProps, ...step.descriptionTypographyProps };

      return (
        <>
          <Typography
            variant="body2"
            {...mergedLabelProps}
            className={cn(STEP_LABEL_BASE, labelSizeConfig.label, statusClasses.label, mergedLabelProps?.className)}
          >
            {step.label}
          </Typography>
          {step.description && (
            <Typography
              variant="caption"
              {...mergedDescProps}
              className={cn(STEP_DESCRIPTION_CLASSES, labelSizeConfig.description, mergedDescProps?.className)}
            >
              {step.description}
            </Typography>
          )}
        </>
      );
    };

    const renderStepContent = (step: Step, index: number) => {
      const status = resolveStepStatus(step, index, activeStep);
      return (
        <div className={cn('Bear-Stepper__content flex shrink-0', alternativeLabel ? 'flex-col items-center' : 'items-center gap-2')}>
          {renderIndicator(step, index, status)}
          <div className={cn(alternativeLabel && 'text-center mt-2', 'whitespace-nowrap')}>
            {renderLabel(step, status)}
          </div>
        </div>
      );
    };

    const renderVerticalInner = (step: Step, index: number) => {
      const status = resolveStepStatus(step, index, activeStep);
      return (
        <>
          <div className="flex-shrink-0 mr-4">{renderIndicator(step, index, status)}</div>
          <div className="flex-1 pt-0.5">
            {renderLabel(step, status)}
            {step.content && status === 'active' && <div className="mt-4">{step.content}</div>}
          </div>
        </>
      );
    };

    const renderOverflowColumn = (hidden: number[], side: 'left' | 'right') => (
      <div key={`overflow-${side}`} className="Bear-Stepper__overflow shrink-0">
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
              aria-label={side === 'left' ? OVERFLOW_LEFT_LABEL : OVERFLOW_RIGHT_LABEL}
            >
              <BearIcons.MoreHorizIcon size={OVERFLOW_ICON_SIZE} />
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
            <React.Fragment key={index}>
              {renderStepContent(step, index)}
              {renderConnector(index, index === steps.length - 1)}
            </React.Fragment>
          ))}

        {isHorizontal && useWindow && (
          <>
            {leftHidden.length > 0 && (
              <>
                {renderOverflowColumn(leftHidden, 'left')}
                {renderConnector(-1, false)}
              </>
            )}
            {visibleIndices.map((index, k) => {
              const step = steps[index];
              const isLast = k === visibleIndices.length - 1 && rightHidden.length === 0;
              return (
                <React.Fragment key={index}>
                  {renderStepContent(step, index)}
                  {renderConnector(index, isLast)}
                </React.Fragment>
              );
            })}
            {rightHidden.length > 0 && renderOverflowColumn(rightHidden, 'right')}
          </>
        )}

        {!isHorizontal &&
          steps.map((step, index) => (
            <div key={index} className={cn('Bear-Stepper__step', STEP_WRAPPER_VERTICAL)}>
              {renderVerticalInner(step, index)}
              {renderConnector(index, index === steps.length - 1)}
            </div>
          ))}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
