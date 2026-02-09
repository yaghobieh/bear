import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@utils';
import { Button } from '../Button';
import { Typography } from '../Typography';
import type { TourProps } from './Tour.types';
import { TOUR_DEFAULTS, TOUR_Z_INDEX, TOUR_TOOLTIP_OFFSET, TOUR_PLACEMENT_STYLES } from './Tour.const';

/**
 * Tour - Feature tour/onboarding walkthrough
 * 
 * @example
 * ```tsx
 * const steps = [
 *   { target: '#welcome-btn', title: 'Welcome!', description: 'Click here to start' },
 *   { target: '#settings', title: 'Settings', description: 'Configure your preferences' },
 * ];
 * 
 * <Tour steps={steps} open={showTour} onClose={() => setShowTour(false)} />
 * ```
 */
export const Tour: FC<TourProps> = ({
  steps,
  open = false,
  current: controlledCurrent,
  onClose,
  onStepChange,
  onFinish,
  showIndicators = TOUR_DEFAULTS.SHOW_INDICATORS,
  showCloseButton = TOUR_DEFAULTS.SHOW_CLOSE_BUTTON,
  showSkipButton = TOUR_DEFAULTS.SHOW_SKIP_BUTTON,
  showPrevButton = TOUR_DEFAULTS.SHOW_PREV_BUTTON,
  finishText = TOUR_DEFAULTS.FINISH_TEXT,
  skipText = TOUR_DEFAULTS.SKIP_TEXT,
  maskOpacity = TOUR_DEFAULTS.MASK_OPACITY,
  maskColor = TOUR_DEFAULTS.MASK_COLOR,
  animated = TOUR_DEFAULTS.ANIMATED,
  className,
  testId,
}) => {
  const [internalCurrent, setInternalCurrent] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = controlledCurrent ?? internalCurrent;
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Get target element
  const getTargetElement = useCallback(() => {
    if (!step) return null;
    if (typeof step.target === 'function') {
      return step.target();
    }
    return document.querySelector(step.target) as HTMLElement;
  }, [step]);

  // Update target rect
  const updateTargetRect = useCallback(() => {
    const target = getTargetElement();
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetRect(rect);
    }
  }, [getTargetElement]);

  // Calculate tooltip position
  useEffect(() => {
    if (!targetRect || !step) return;

    const placement = step.placement || TOUR_DEFAULTS.PLACEMENT;
    const padding = step.spotlightPadding ?? TOUR_DEFAULTS.SPOTLIGHT_PADDING;
    
    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = targetRect.top - TOUR_TOOLTIP_OFFSET - padding;
        left = placement === 'top' ? targetRect.left + targetRect.width / 2 :
               placement === 'top-start' ? targetRect.left :
               targetRect.right;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = targetRect.bottom + TOUR_TOOLTIP_OFFSET + padding;
        left = placement === 'bottom' ? targetRect.left + targetRect.width / 2 :
               placement === 'bottom-start' ? targetRect.left :
               targetRect.right;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        left = targetRect.left - TOUR_TOOLTIP_OFFSET - padding;
        top = placement === 'left' ? targetRect.top + targetRect.height / 2 :
              placement === 'left-start' ? targetRect.top :
              targetRect.bottom;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        left = targetRect.right + TOUR_TOOLTIP_OFFSET + padding;
        top = placement === 'right' ? targetRect.top + targetRect.height / 2 :
              placement === 'right-start' ? targetRect.top :
              targetRect.bottom;
        break;
    }

    setTooltipPosition({ top, left });
  }, [targetRect, step]);

  // Update on resize/scroll
  useEffect(() => {
    if (!open) return;

    updateTargetRect();
    
    const handleUpdate = () => updateTargetRect();
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [open, currentStep, updateTargetRect]);

  // Scroll target into view
  useEffect(() => {
    if (!open) return;
    const target = getTargetElement();
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [open, currentStep, getTargetElement]);

  const handleNext = useCallback(async () => {
    if (step?.onAfterStep) await step.onAfterStep();
    
    if (isLastStep) {
      onFinish?.();
      onClose?.();
    } else {
      const nextStep = currentStep + 1;
      setInternalCurrent(nextStep);
      onStepChange?.(nextStep);
      if (steps[nextStep]?.onBeforeStep) {
        await steps[nextStep].onBeforeStep?.();
      }
    }
  }, [currentStep, isLastStep, step, steps, onFinish, onClose, onStepChange]);

  const handlePrev = useCallback(async () => {
    if (step?.onAfterStep) await step.onAfterStep();
    
    const prevStep = currentStep - 1;
    setInternalCurrent(prevStep);
    onStepChange?.(prevStep);
    if (steps[prevStep]?.onBeforeStep) {
      await steps[prevStep].onBeforeStep?.();
    }
  }, [currentStep, step, steps, onStepChange]);

  const handleSkip = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const placement = step?.placement || TOUR_DEFAULTS.PLACEMENT;
  const spotlightPadding = step?.spotlightPadding ?? TOUR_DEFAULTS.SPOTLIGHT_PADDING;

  if (!open || !step) return null;

  return (
    <div
      className={cn('Bear-Tour', className)}
      data-testid={testId}
    >
      {/* Overlay mask */}
      <div
        className="Bear-Tour__overlay bear-fixed bear-inset-0"
        style={{
          zIndex: TOUR_Z_INDEX.OVERLAY,
          backgroundColor: maskColor,
          opacity: maskOpacity,
          transition: animated ? 'opacity 0.3s' : 'none',
        }}
        onClick={handleSkip}
      />

      {/* Spotlight */}
      {targetRect && (
        <div
          className="Bear-Tour__spotlight bear-fixed bear-pointer-events-none"
          style={{
            zIndex: TOUR_Z_INDEX.SPOTLIGHT,
            top: targetRect.top - spotlightPadding,
            left: targetRect.left - spotlightPadding,
            width: targetRect.width + spotlightPadding * 2,
            height: targetRect.height + spotlightPadding * 2,
            borderRadius: 8,
            boxShadow: `0 0 0 9999px ${maskColor}`,
            opacity: maskOpacity,
            transition: animated ? 'all 0.3s ease' : 'none',
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="Bear-Tour__tooltip bear-fixed bear-bg-white dark:bear-bg-neutral-800 bear-rounded-lg bear-shadow-xl bear-p-4"
        style={{
          zIndex: TOUR_Z_INDEX.TOOLTIP,
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          minWidth: 280,
          maxWidth: 360,
          ...TOUR_PLACEMENT_STYLES[placement],
          transition: animated ? 'all 0.3s ease' : 'none',
        }}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            className="Bear-Tour__close bear-absolute bear-top-2 bear-right-2 bear-p-1 bear-text-neutral-400 hover:bear-text-neutral-600 dark:hover:bear-text-neutral-300 bear-cursor-pointer bear-bg-transparent bear-border-none"
            onClick={handleSkip}
            aria-label="Close tour"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="Bear-Tour__content bear-pr-6">
          {step.title && (
            <Typography variant="h6" className="bear-mb-2">
              {step.title}
            </Typography>
          )}
          {step.description && (
            <Typography variant="body2" color="secondary" className="bear-mb-4">
              {step.description}
            </Typography>
          )}
          {step.content}
        </div>

        {/* Footer */}
        <div className="Bear-Tour__footer bear-flex bear-items-center bear-justify-between bear-mt-4 bear-pt-3 bear-border-t bear-border-neutral-200 dark:bear-border-neutral-700">
          {/* Indicators */}
          {showIndicators && (
            <div className="bear-flex bear-gap-1.5">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'bear-w-2 bear-h-2 bear-rounded-full bear-transition-colors',
                    idx === currentStep
                      ? 'bear-bg-[var(--bear-primary-500)]'
                      : 'bear-bg-neutral-300 dark:bear-bg-neutral-600'
                  )}
                />
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="bear-flex bear-gap-2 bear-ml-auto">
            {showSkipButton && !isLastStep && (
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                {skipText}
              </Button>
            )}
            {showPrevButton && !isFirstStep && (
              <Button variant="outline" size="sm" onClick={handlePrev}>
                {step.prevText || TOUR_DEFAULTS.PREV_TEXT}
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={handleNext}>
              {isLastStep ? finishText : (step.nextText || TOUR_DEFAULTS.NEXT_TEXT)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
