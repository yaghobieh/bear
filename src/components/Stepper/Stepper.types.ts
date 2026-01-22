import { ReactNode } from 'react';

export interface StepperStep {
  label: string;
  description?: string;
  icon?: ReactNode;
  optional?: boolean;
  error?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dots' | 'progress';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  completedIcon?: ReactNode;
  showConnector?: boolean;
  allowClickOnCompleted?: boolean;
}

