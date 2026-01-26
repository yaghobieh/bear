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
        className={`bear-editable inline-block ${className}`.trim()}
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
      className={`bear-editable-preview cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors ${className}`.trim()}
      onClick={startEditing}
      {...props}
    >
      {children || value || <span className="text-gray-400 italic">Click to edit...</span>}
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

  const baseClasses = 'bear-editable-input w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500';

  if (asTextarea) {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={submit}
        className={`${baseClasses} min-h-[80px] resize-y ${className}`.trim()}
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
      className={`bear-editable-control flex items-center gap-1 mt-1 ${className}`.trim()}
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

