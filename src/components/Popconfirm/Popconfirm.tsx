import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { PopconfirmProps } from './Popconfirm.types';
import {
  ROOT_CLASS,
  POPUP_CLASSES,
  PLACEMENT_OFFSETS,
  ICON_AREA_CLASSES,
  ICON_WRAPPER_CLASSES,
  CONTENT_CLASSES,
  BUTTONS_WRAPPER_CLASSES,
  CONFIRM_BTN_DEFAULT_CLASSES,
  CONFIRM_BTN_DANGER_CLASSES,
  CANCEL_BTN_CLASSES,
  DEFAULT_CONFIRM_TEXT,
  DEFAULT_CANCEL_TEXT,
} from './Popconfirm.const';

const DEFAULT_ICON = (
  <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export const Popconfirm: FC<PopconfirmProps> = (props) => {
  const {
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = DEFAULT_CONFIRM_TEXT,
    cancelText = DEFAULT_CANCEL_TEXT,
    icon = DEFAULT_ICON,
    placement = 'bottom',
    disabled = false,
    children,
    variant = 'default',
    testId,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  const handleTriggerClick = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const confirmBtnClasses = variant === 'danger' ? CONFIRM_BTN_DANGER_CLASSES : CONFIRM_BTN_DEFAULT_CLASSES;

  return (
    <div ref={containerRef} className={cn(ROOT_CLASS, 'bear-relative bear-inline-block')} data-testid={testId}>
      <div
        onClick={handleTriggerClick}
        className={cn('bear-cursor-pointer', disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none')}
      >
        {children}
      </div>
      {isOpen && (
        <div className={cn(POPUP_CLASSES, PLACEMENT_OFFSETS[placement])}>
          <div className={ICON_AREA_CLASSES}>
            <div className={ICON_WRAPPER_CLASSES}>{icon}</div>
            <div className={CONTENT_CLASSES}>
              <Typography variant="body2" className="bear-text-gray-900 dark:bear-text-zinc-100">
                {title}
              </Typography>
              {description && (
                <Typography variant="caption" color="secondary" className="bear-mt-0.5">
                  {description}
                </Typography>
              )}
            </div>
          </div>
          <div className={BUTTONS_WRAPPER_CLASSES}>
            <button type="button" className={CANCEL_BTN_CLASSES} onClick={handleCancel}>
              {cancelText}
            </button>
            <button type="button" className={confirmBtnClasses} onClick={handleConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popconfirm;
