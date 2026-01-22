import { ReactNode } from 'react';

export interface UploadedFile {
  file: File;
  id: string;
  progress?: number;
  status?: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface FileUploadProps {
  onFilesSelect?: (files: File[]) => void;
  onFileRemove?: (file: UploadedFile) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  files?: UploadedFile[];
  showPreview?: boolean;
  variant?: 'dropzone' | 'button' | 'compact';
  icon?: ReactNode;
  className?: string;
}

