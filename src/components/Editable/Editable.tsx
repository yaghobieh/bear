import { createContext, useContext, useState, useCallback, forwardRef, useEffect, useRef, KeyboardEvent } from 'react';
import {
  EditableContextValue,
  EditableRootProps,
  EditablePreviewProps,
  EditableInputProps,
  EditableControlProps,
  EditableSubmitTriggerProps,
  EditableCancelTriggerProps,
  EditableEditTriggerProps,
} from './Editable.types';
import { Button } from '../Button';
import { CheckIcon, CloseIcon, EditIcon } from '../Icon';

const EditableContext = createContext<EditableContextValue | null>(null);

const useEditableContext = () => {
  const context = useContext(EditableContext);
  if (!context) {
    throw new Error('Editable components must be used within Editable.Root');
  }
  return context;
};

const Root = forwardRef<HTMLDivElement, EditableRootProps>(({
  children,
  defaultValue = '',
  value: controlledValue,
  onChange,
  onEditSubmit,
  onCancel,
  placeholder = 'Click to edit...',
  isDisabled = false,
  startWithEditView = false,
  className = '',
  ...props
}, ref) => {
  const [isEditing, setIsEditing] = useState(startWithEditView);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [previousValue, setPreviousValue] = useState(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = useCallback((newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [controlledValue, onChange]);

  const startEditing = useCallback(() => {
    if (!isDisabled) {
      setPreviousValue(value);
      setIsEditing(true);
    }
  }, [isDisabled, value]);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const submit = useCallback(() => {
    onEditSubmit?.(value);
    setIsEditing(false);
  }, [value, onEditSubmit]);

  const cancel = useCallback(() => {
    setValue(previousValue);
    onCancel?.();
    setIsEditing(false);
  }, [previousValue, setValue, onCancel]);

  return (
    <EditableContext.Provider value={{ isEditing, value, startEditing, stopEditing, setValue, submit, cancel }}>
      <div
        ref={ref}
        className={`Bear-Editable bear-inline-block ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    </EditableContext.Provider>
  );
});

Root.displayName = 'Editable.Root';

const Preview = forwardRef<HTMLSpanElement, EditablePreviewProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { isEditing, value, startEditing } = useEditableContext();

  if (isEditing) return null;

  return (
    <span
      ref={ref}
      className={`Bear-Editable__preview bear-cursor-pointer bear-px-2 bear-py-1 bear-rounded bear-transition-all bear-border bear-border-transparent hover:bear-border-gray-300 dark:hover:bear-border-zinc-600 hover:bear-bg-gray-50 dark:hover:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-white ${className}`.trim()}
      onClick={startEditing}
      {...props}
    >
      {children || value || <span className="bear-text-gray-400 dark:bear-text-zinc-500 bear-italic">Click to edit...</span>}
    </span>
  );
});

Preview.displayName = 'Editable.Preview';

const Input = forwardRef<HTMLInputElement, EditableInputProps>(({
  asTextarea = false,
  className = '',
  ...props
}, ref) => {
  const { isEditing, value, setValue, submit, cancel } = useEditableContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !asTextarea) {
      e.preventDefault();
      submit();
    }
    if (e.key === 'Escape') {
      cancel();
    }
  };

  if (!isEditing) return null;

  const baseClasses = 'Bear-Editable__input bear-w-full bear-px-2 bear-py-1 bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-rounded bear-bg-white dark:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-white focus:bear-outline-none focus:bear-ring-2 focus:bear-ring-pink-500';

  if (asTextarea) {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={submit}
        className={`${baseClasses} bear-min-h-[80px] bear-resize-y ${className}`.trim()}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={submit}
      className={`${baseClasses} ${className}`.trim()}
      {...props}
    />
  );
});

Input.displayName = 'Editable.Input';

const Control = forwardRef<HTMLDivElement, EditableControlProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { isEditing } = useEditableContext();

  if (!isEditing) return null;

  return (
    <div
      ref={ref}
      className={`Bear-Editable__control bear-flex bear-items-center bear-gap-1 bear-mt-1 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
});

Control.displayName = 'Editable.Control';

const SubmitTrigger = forwardRef<HTMLButtonElement, EditableSubmitTriggerProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { submit } = useEditableContext();

  return (
    <Button
      ref={ref}
      type="button"
      onClick={submit}
      variant="ghost"
      size="sm"
      className={`bear-editable-submit bear-text-green-600 dark:bear-text-green-400 hover:bear-bg-green-100 dark:hover:bear-bg-green-900/30 bear-p-1 bear-min-w-0 ${className}`.trim()}
      {...props}
    >
      {children || <CheckIcon size={16} />}
    </Button>
  );
});

SubmitTrigger.displayName = 'Editable.SubmitTrigger';

const CancelTrigger = forwardRef<HTMLButtonElement, EditableCancelTriggerProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { cancel } = useEditableContext();

  return (
    <Button
      ref={ref}
      type="button"
      onClick={cancel}
      variant="ghost"
      size="sm"
      className={`bear-editable-cancel bear-text-red-600 dark:bear-text-red-400 hover:bear-bg-red-100 dark:hover:bear-bg-red-900/30 bear-p-1 bear-min-w-0 ${className}`.trim()}
      {...props}
    >
      {children || <CloseIcon size={16} />}
    </Button>
  );
});

CancelTrigger.displayName = 'Editable.CancelTrigger';

const EditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const { isEditing, startEditing } = useEditableContext();

  if (isEditing) return null;

  return (
    <Button
      ref={ref}
      type="button"
      onClick={startEditing}
      variant="ghost"
      size="sm"
      className={`bear-editable-edit bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800 bear-p-1 bear-min-w-0 ${className}`.trim()}
      {...props}
    >
      {children || <EditIcon size={16} />}
    </Button>
  );
});

EditTrigger.displayName = 'Editable.EditTrigger';

export const Editable = {
  Root,
  Preview,
  Input,
  Control,
  SubmitTrigger,
  CancelTrigger,
  EditTrigger,
};

