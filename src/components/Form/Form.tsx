import { FC, useState, useCallback, useMemo, useRef, cloneElement, isValidElement } from 'react';
import { cn } from '@utils';
import type { FormProps, FormState, ValidationRule, FormItemProps } from './Form.types';
import { FormContext } from './Form.context';
import { validateFieldValue } from './Form.utils';
import { FORM_INITIAL_STATE, FORM_LAYOUT_CLASSES, FORM_ITEM_LAYOUT_CLASSES, FORM_LABEL_WIDTH_HORIZONTAL } from './Form.const';

/**
 * Form - Form management component with validation
 *
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit} initialValues={{ email: '' }}>
 *   <Form.Item name="email" label="Email" rules={{ required: true, email: true }}>
 *     <Input />
 *   </Form.Item>
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
export const Form: FC<FormProps> & { Item: FC<FormItemProps> } = ({
  children,
  initialValues = {},
  onSubmit,
  onError,
  layout = 'vertical',
  validateOnChange = true,
  validateOnBlur = true,
  className,
  testId,
  ...rest
}) => {
  const [state, setState] = useState<FormState>(() => ({
    ...FORM_INITIAL_STATE,
    fields: Object.fromEntries(
      Object.entries(initialValues).map(([key, value]) => [
        key,
        { value, error: undefined, touched: false, validating: false, dirty: false },
      ])
    ),
  }));

  const rulesRef = useRef<Record<string, ValidationRule>>({});

  const setValue = useCallback((name: string, value: unknown) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          value,
          dirty: true,
        },
      },
    }));
  }, []);

  const getValue = useCallback((name: string) => {
    return state.fields[name]?.value;
  }, [state.fields]);

  const setError = useCallback((name: string, error: string) => {
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error,
        },
      },
      errors: { ...prev.errors, [name]: error },
    }));
  }, []);

  const clearError = useCallback((name: string) => {
    setState((prev) => {
      const newErrors = { ...prev.errors };
      delete newErrors[name];
      return {
        ...prev,
        fields: {
          ...prev.fields,
          [name]: {
            ...prev.fields[name],
            error: undefined,
          },
        },
        errors: newErrors,
      };
    });
  }, []);

  const validateField = useCallback(async (name: string): Promise<boolean> => {
    const rules = rulesRef.current[name];
    if (!rules) return true;

    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          validating: true,
        },
      },
    }));

    const value = state.fields[name]?.value;
    const error = await validateFieldValue(value, rules);

    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: {
          ...prev.fields[name],
          error: error ?? undefined,
          validating: false,
        },
      },
      errors: error
        ? { ...prev.errors, [name]: error }
        : (() => {
            const newErrors = { ...prev.errors };
            delete newErrors[name];
            return newErrors;
          })(),
    }));

    return !error;
  }, [state.fields]);

  const validateForm = useCallback(async (): Promise<boolean> => {
    const fieldNames = Object.keys(rulesRef.current);
    const results = await Promise.all(fieldNames.map(validateField));
    return results.every(Boolean);
  }, [validateField]);

  const reset = useCallback((values?: Record<string, unknown>) => {
    const resetValues = values ?? initialValues;
    setState({
      ...FORM_INITIAL_STATE,
      fields: Object.fromEntries(
        Object.entries(resetValues).map(([key, value]) => [
          key,
          { value, error: undefined, touched: false, validating: false, dirty: false },
        ])
      ),
    });
  }, [initialValues]);

  const register = useCallback((name: string, rules?: ValidationRule) => {
    if (rules) {
      rulesRef.current[name] = rules;
    }

    // Initialize field if not exists
    if (!state.fields[name]) {
      setState((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [name]: {
            value: initialValues[name] ?? '',
            error: undefined,
            touched: false,
            validating: false,
            dirty: false,
          },
        },
      }));
    }

    return {
      name,
      value: state.fields[name]?.value ?? initialValues[name] ?? '',
      onChange: (value: unknown) => {
        setValue(name, value);
        if (validateOnChange && rules) {
          setTimeout(() => validateField(name), 0);
        }
      },
      onBlur: () => {
        setState((prev) => ({
          ...prev,
          fields: {
            ...prev.fields,
            [name]: {
              ...prev.fields[name],
              touched: true,
            },
          },
        }));
        if (validateOnBlur && rules) {
          validateField(name);
        }
      },
    };
  }, [state.fields, initialValues, setValue, validateField, validateOnChange, validateOnBlur]);

  const handleSubmit = useCallback(
    (submitFn: (data: Record<string, unknown>) => void | Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();

        setState((prev) => ({ ...prev, isSubmitting: true, isSubmitted: true }));

        const isValid = await validateForm();

        if (!isValid) {
          setState((prev) => ({ ...prev, isSubmitting: false }));
          onError?.(state.errors);
          return;
        }

        const data = Object.fromEntries(
          Object.entries(state.fields).map(([key, field]) => [key, field.value])
        );

        try {
          await submitFn(data);
        } finally {
          setState((prev) => ({ ...prev, isSubmitting: false }));
        }
      },
    [validateForm, state.fields, state.errors, onError]
  );

  const contextValue = useMemo(
    () => ({
      state,
      register,
      setValue,
      getValue,
      setError,
      clearError,
      validateField,
      validateForm,
      reset,
      handleSubmit,
      layout,
    }),
    [state, register, setValue, getValue, setError, clearError, validateField, validateForm, reset, handleSubmit, layout]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={cn('Bear-Form', FORM_LAYOUT_CLASSES[layout], className)}
        onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        data-testid={testId}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

/**
 * Form.Item - Wrapper for form fields with label and error display
 */
const FormItem: FC<FormItemProps> = ({
  name,
  label,
  required,
  rules,
  helperText,
  children,
  className,
}) => {
  const { register, state, layout } = useFormContext();
  
  const mergedRules: ValidationRule = {
    ...rules,
    required: required ?? rules?.required,
  };
  
  const field = register(name, mergedRules);
  const fieldState = state.fields[name];
  const showError = fieldState?.touched && fieldState?.error;

  return (
    <div className={cn('Bear-FormItem', FORM_ITEM_LAYOUT_CLASSES[layout], className)}>
      {label && (
        <label
          className={cn(
            'Bear-FormItem__label bear-text-sm bear-font-medium bear-text-zinc-300',
            layout === 'horizontal' && FORM_LABEL_WIDTH_HORIZONTAL
          )}
        >
          {label}
          {(required || rules?.required) && (
            <span className="Bear-FormItem__required bear-text-red-500 bear-ml-0.5">*</span>
          )}
        </label>
      )}
      <div className="Bear-FormItem__content bear-flex-1">
        <div className="Bear-FormItem__control">
          {typeof children === 'function'
            ? (children as (field: { name: string; value: unknown; onChange: (v: unknown) => void; onBlur: () => void }) => React.ReactNode)(field)
            : isValidElement(children)
              ? cloneElement(children as React.ReactElement<{ value?: unknown; onChange?: (v: unknown) => void; onBlur?: () => void; name?: string }>, {
                  ...field,
                  onChange: (e: unknown) => {
                    const value = e && typeof e === 'object' && 'target' in e && e.target && typeof (e.target as HTMLInputElement).value !== 'undefined'
                      ? (e.target as HTMLInputElement).value
                      : e;
                    field.onChange(value);
                  },
                })
              : children}
        </div>
        {showError && (
          <p className="Bear-FormItem__error bear-mt-1 bear-text-xs bear-text-red-400">
            {fieldState.error}
          </p>
        )}
        {helperText && !showError && (
          <p className="Bear-FormItem__helper bear-mt-1 bear-text-xs bear-text-zinc-500">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

// Import context hook
import { useFormContext } from './Form.context';

Form.Item = FormItem;
