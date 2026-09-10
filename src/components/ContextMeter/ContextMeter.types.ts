export interface ContextMeterTranslations {
  label: string;
}

export interface ContextMeterProps {
  id?: string;
  testId?: string;
  used: number;
  max?: number;
  translations?: Partial<ContextMeterTranslations>;
  className?: string;
}
