import { FC } from 'react';
import { StepperProps } from './Stepper.types';
import { cn } from '../../utils/cn';

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export const Stepper: FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className,
  completedIcon,
  showConnector = true,
  allowClickOnCompleted = true,
}) => {
  const sizeClasses = {
    sm: { circle: 'bear-w-6 bear-h-6 bear-text-xs', text: 'bear-text-xs', icon: 'bear-w-3 bear-h-3' },
    md: { circle: 'bear-w-8 bear-h-8 bear-text-sm', text: 'bear-text-sm', icon: 'bear-w-4 bear-h-4' },
    lg: { circle: 'bear-w-10 bear-h-10 bear-text-base', text: 'bear-text-base', icon: 'bear-w-5 bear-h-5' },
  };

  const isHorizontal = orientation === 'horizontal';

  const renderStep = (step: typeof steps[0], index: number) => {
    const isCompleted = index < activeStep;
    const isActive = index === activeStep;
    const isClickable = onStepClick && (isCompleted ? allowClickOnCompleted : isActive);

    const handleClick = () => {
      if (isClickable) onStepClick?.(index);
    };

    const circleContent = () => {
      if (isCompleted) {
        return completedIcon || <CheckIcon className={sizeClasses[size].icon} />;
      }
      if (step.icon) return step.icon;
      return index + 1;
    };

    const circleClass = cn(
      'bear-rounded-full bear-flex bear-items-center bear-justify-center bear-font-medium bear-transition-all bear-shrink-0',
      sizeClasses[size].circle,
      isCompleted && 'bear-bg-pink-500 bear-text-white',
      isActive && 'bear-bg-pink-500 bear-text-white bear-ring-4 bear-ring-pink-500/30',
      !isCompleted && !isActive && 'bear-bg-zinc-700 bear-text-zinc-400',
      step.error && 'bear-bg-red-500 bear-text-white',
      isClickable && 'bear-cursor-pointer hover:bear-scale-110'
    );

    if (variant === 'dots') {
      return (
        <div
          key={index}
          onClick={handleClick}
          className={cn(
            'bear-w-3 bear-h-3 bear-rounded-full bear-transition-all',
            isCompleted && 'bear-bg-pink-500',
            isActive && 'bear-bg-pink-500 bear-w-6',
            !isCompleted && !isActive && 'bear-bg-zinc-600',
            isClickable && 'bear-cursor-pointer'
          )}
        />
      );
    }

    return (
      <div
        key={index}
        className={cn(
          'bear-flex bear-items-center',
          isHorizontal ? 'bear-flex-col' : 'bear-flex-row bear-gap-3'
        )}
      >
        <div onClick={handleClick} className={circleClass}>
          {circleContent()}
        </div>
        <div className={cn('bear-text-center', isHorizontal ? 'bear-mt-2' : '')}>
          <div className={cn(
            sizeClasses[size].text,
            isActive ? 'bear-text-white bear-font-medium' : 'bear-text-zinc-400'
          )}>
            {step.label}
            {step.optional && <span className="bear-text-zinc-500 bear-ml-1">(Optional)</span>}
          </div>
          {step.description && (
            <div className="bear-text-xs bear-text-zinc-500 bear-mt-0.5">{step.description}</div>
          )}
        </div>
      </div>
    );
  };

  const renderConnector = (index: number) => {
    if (!showConnector || index === steps.length - 1) return null;
    const isCompleted = index < activeStep;

    if (variant === 'progress') {
      const progress = isCompleted ? 100 : index === activeStep ? 50 : 0;
      return (
        <div className={cn(
          'bear-bg-zinc-700 bear-rounded-full bear-overflow-hidden',
          isHorizontal ? 'bear-flex-1 bear-h-1 bear-mx-2' : 'bear-w-1 bear-h-8 bear-my-2 bear-ml-4'
        )}>
          <div
            className="bear-bg-pink-500 bear-h-full bear-transition-all bear-duration-300"
            style={{ [isHorizontal ? 'width' : 'height']: `${progress}%` }}
          />
        </div>
      );
    }

    return (
      <div className={cn(
        'bear-transition-colors',
        isHorizontal ? 'bear-flex-1 bear-h-0.5 bear-mx-2' : 'bear-w-0.5 bear-h-8 bear-my-2 bear-ml-4',
        isCompleted ? 'bear-bg-pink-500' : 'bear-bg-zinc-700'
      )} />
    );
  };

  return (
    <div className={cn(
      'bear-flex',
      isHorizontal ? 'bear-flex-row bear-items-start' : 'bear-flex-col',
      className
    )}>
      {steps.map((step, index) => (
        <div key={index} className={cn('bear-flex', isHorizontal ? 'bear-flex-1 bear-items-center' : '')}>
          {renderStep(step, index)}
          {renderConnector(index)}
        </div>
      ))}
    </div>
  );
};

