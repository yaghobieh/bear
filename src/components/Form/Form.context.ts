import { createContext, useContext } from 'react';
import type { FormContextValue } from './Form.types';

/**
 * Form context
 */
export const FormContext = createContext<FormContextValue | null>(null);

/**
 * Hook to access form context
 */
export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
};

/**
 * Hook to safely access form context (returns null if not in Form)
 */
export const useFormContextSafe = (): FormContextValue | null => {
  return useContext(FormContext);
};
