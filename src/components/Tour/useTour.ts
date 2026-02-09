import { useState, useCallback } from 'react';
import type { UseTourReturn, TourStep } from './Tour.types';

/**
 * useTour - Hook to control tour programmatically
 * 
 * @example
 * ```tsx
 * const steps = [...];
 * const { start, stop, next, prev, isActive, currentStep } = useTour(steps);
 * 
 * <Tour steps={steps} open={isActive} current={currentStep} onClose={stop} />
 * <Button onClick={start}>Start Tour</Button>
 * ```
 */
export const useTour = (steps: TourStep[]): UseTourReturn => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const start = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      stop();
    }
  }, [currentStep, steps.length, stop]);

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goTo = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  return {
    start,
    stop,
    next,
    prev,
    goTo,
    isActive,
    currentStep,
    totalSteps: steps.length,
  };
};
