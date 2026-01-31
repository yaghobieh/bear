import { ReactNode, FormHTMLAttributes } from 'react';

/**
 * Validation rule types
 */
export type ValidationRule = {
  /** Required field validation */
  required?: boolean | string;
  /** Minimum length validation */
  minLength?: { value: number; message: string };
  /** Maximum length validation */
  maxLength?: { value: number; message: string };
  /** Minimum value validation (for numbers) */
  min?: { value: number; message: string };
  /** Maximum value validation (for numbers) */
  max?: { value: number; message: string };
  /** Pattern validation (regex) */
  pattern?: { value: RegExp; message: string };
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
  /** Email validation */
  email?: boolean | string;
};

/**
 * Form field state
 */
export interface FormFieldState {
  /** Current value */
  value: unknown;
  /** Error message if validation failed */
  error?: string;
  /** Whether field has been touched */
  touched: boolean;
  /** Whether field is currently being validated */
  validating: boolean;
  /** Whether field is dirty (value changed) */
  dirty: boolean;
}

/**
 * Form state
 */
export interface FormState {
  /** Field states by name */
  fields: Record<string, FormFieldState>;
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  /** Whether form is valid */
  isValid: boolean;
  /** Whether form has been submitted */
  isSubmitted: boolean;
  /** Form-level errors */
  errors: Record<string, string>;
}

/**
 * Form context value
 */
export interface FormContextValue {
  /** Current form state */
  state: FormState;
  /** Register a field */
  register: (name: string, rules?: ValidationRule) => {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  };
  /** Set field value */
  setValue: (name: string, value: unknown) => void;
  /** Get field value */
  getValue: (name: string) => unknown;
  /** Set field error */
  setError: (name: string, error: string) => void;
  /** Clear field error */
  clearError: (name: string) => void;
  /** Validate a field */
  validateField: (name: string) => Promise<boolean>;
  /** Validate all fields */
  validateForm: () => Promise<boolean>;
  /** Reset form */
  reset: (values?: Record<string, unknown>) => void;
  /** Handle form submission */
  handleSubmit: (onSubmit: (data: Record<string, unknown>) => void | Promise<void>) => (e: React.FormEvent) => void;
  /** Form layout */
  layout: FormLayout;
}

/**
 * Form layout options
 */
export type FormLayout = 'vertical' | 'horizontal' | 'inline';

/**
 * Form component props
 */
export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
  /** Child elements */
  children: ReactNode;
  /** Initial form values */
  initialValues?: Record<string, unknown>;
  /** Form submission handler */
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
  /** Form validation error handler */
  onError?: (errors: Record<string, string>) => void;
  /** Form layout */
  layout?: FormLayout;
  /** Whether to validate on change */
  validateOnChange?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Field props from register
 */
export interface FormFieldProps {
  name: string;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
}

/**
 * Form.Item props
 */
export interface FormItemProps {
  /** Field name */
  name: string;
  /** Field label */
  label?: string;
  /** Required indicator */
  required?: boolean;
  /** Validation rules */
  rules?: ValidationRule;
  /** Helper text */
  helperText?: string;
  /** Children (form control or render prop) */
  children: ReactNode | ((field: FormFieldProps) => ReactNode);
  /** Custom class name */
  className?: string;
}

/**
 * Form translations
 */
export interface FormTranslations {
  required: string;
  email: string;
  minLength: string;
  maxLength: string;
  min: string;
  max: string;
  pattern: string;
}
