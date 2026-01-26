import { HTMLAttributes, ReactNode, InputHTMLAttributes } from 'react';

export interface EditableContextValue {
  isEditing: boolean;
  value: string;
  startEditing: () => void;
  stopEditing: () => void;
  setValue: (value: string) => void;
  submit: () => void;
  cancel: () => void;
}

export interface EditableRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
  children?: ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onEditSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  isDisabled?: boolean;
  startWithEditView?: boolean;
}

export interface EditablePreviewProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface EditableInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  asTextarea?: boolean;
}

export interface EditableControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface EditableSubmitTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface EditableCancelTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface EditableEditTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

