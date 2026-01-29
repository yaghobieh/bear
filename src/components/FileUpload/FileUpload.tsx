import { FC, useRef, useState, useCallback } from 'react';
import { FileUploadProps, UploadedFile } from './FileUpload.types';
import { cn } from '@utils';
import { formatSize } from './FileUpload.utils';

const UploadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const FileUpload: FC<FileUploadProps> = ({
  onFilesSelect,
  onFileRemove,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  label,
  helperText,
  error,
  files = [],
  showPreview = true,
  variant = 'dropzone',
  icon,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    let selectedFiles = Array.from(fileList);
    if (maxFiles) selectedFiles = selectedFiles.slice(0, maxFiles - files.length);
    if (maxSize) selectedFiles = selectedFiles.filter(f => f.size <= maxSize);
    onFilesSelect?.(selectedFiles);
  }, [onFilesSelect, maxFiles, maxSize, files.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  }, [disabled, handleFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const renderFilePreview = (uploadedFile: UploadedFile) => {
    const { file, status, progress, error: fileError } = uploadedFile;
    const isImage = file.type.startsWith('image/');

    return (
      <div key={uploadedFile.id} className="bear-flex bear-items-center bear-gap-3 bear-p-2 bear-bg-zinc-800 bear-rounded-lg">
        {isImage ? (
          <img src={URL.createObjectURL(file)} alt={file.name} className="bear-w-10 bear-h-10 bear-object-cover bear-rounded" />
        ) : (
          <FileIcon className="bear-w-10 bear-h-10 bear-text-zinc-500" />
        )}
        <div className="bear-flex-1 bear-min-w-0">
          <div className="bear-text-sm bear-text-white bear-truncate">{file.name}</div>
          <div className="bear-text-xs bear-text-zinc-500">{formatSize(file.size)}</div>
          {status === 'uploading' && progress !== undefined && (
            <div className="bear-mt-1 bear-h-1 bear-bg-zinc-700 bear-rounded-full bear-overflow-hidden">
              <div className="bear-h-full bear-bg-pink-500 bear-transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
          {fileError && <div className="bear-text-xs bear-text-red-400 bear-mt-1">{fileError}</div>}
        </div>
        {status === 'success' && (
          <svg className="bear-w-5 bear-h-5 bear-text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <button
          onClick={() => onFileRemove?.(uploadedFile)}
          className="bear-p-1 bear-rounded hover:bear-bg-zinc-700 bear-text-zinc-400 hover:bear-text-white"
        >
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  if (variant === 'button') {
    return (
      <div className={className}>
        {label && <label className="bear-block bear-text-sm bear-font-medium bear-text-zinc-300 bear-mb-1.5">{label}</label>}
        <button
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            'bear-px-4 bear-py-2 bear-rounded-lg bear-bg-pink-500 bear-text-white hover:bear-bg-pink-600 bear-transition-colors bear-flex bear-items-center bear-gap-2',
            disabled && 'bear-opacity-50 bear-cursor-not-allowed'
          )}
        >
          {icon || <UploadIcon className="bear-w-5 bear-h-5" />}
          Choose Files
        </button>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => handleFiles(e.target.files)} className="bear-hidden" />
        {helperText && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
        {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
        {showPreview && files.length > 0 && (
          <div className="bear-mt-3 bear-space-y-2">{files.map(renderFilePreview)}</div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <label className="bear-block bear-text-sm bear-font-medium bear-text-zinc-300 bear-mb-1.5">{label}</label>}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'bear-border-2 bear-border-dashed bear-rounded-lg bear-p-8 bear-text-center bear-transition-colors bear-cursor-pointer',
          isDragging ? 'bear-border-pink-500 bear-bg-pink-500/10' : 'bear-border-zinc-600 hover:bear-border-zinc-500',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          error && 'bear-border-red-500'
        )}
      >
        {icon || <UploadIcon className="bear-w-12 bear-h-12 bear-mx-auto bear-text-zinc-500 bear-mb-4" />}
        <p className="bear-text-zinc-300 bear-font-medium">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="bear-text-sm bear-text-zinc-500 bear-mt-1">or click to browse</p>
        {accept && <p className="bear-text-xs bear-text-zinc-600 bear-mt-2">Accepted: {accept}</p>}
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => handleFiles(e.target.files)} className="bear-hidden" />
      {helperText && <p className="bear-mt-1 bear-text-xs bear-text-zinc-500">{helperText}</p>}
      {error && <p className="bear-mt-1 bear-text-xs bear-text-red-400">{error}</p>}
      {showPreview && files.length > 0 && (
        <div className="bear-mt-3 bear-space-y-2">{files.map(renderFilePreview)}</div>
      )}
    </div>
  );
};

