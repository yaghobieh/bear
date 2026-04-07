import { FC, useState, useRef, useEffect, useCallback, type CSSProperties } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import { Portal } from '../Portal';
import type { PopconfirmProps, PopconfirmPlacement } from './Popconfirm.types';
import {
  ROOT_CLASS,
  POPUP_CLASSES,
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

const POPCONFIRM_Z = 10000;

function getPopconfirmPosition(placement: PopconfirmPlacement, rect: DOMRect, offset: number): CSSProperties {
  const base: CSSProperties = { position: 'fixed', zIndex: POPCONFIRM_Z };
  if (placement === 'bottom') {
    base.top = rect.bottom + offset;
    base.left = rect.left + rect.width / 2;
    base.transform = 'translateX(-50%)';
  } else if (placement === 'top') {
    base.bottom = window.innerHeight - rect.top + offset;
    base.left = rect.left + rect.width / 2;
    base.transform = 'translateX(-50%)';
  } else if (placement === 'left') {
    base.right = window.innerWidth - rect.left + offset;
    base.top = rect.top + rect.height / 2;
    base.transform = 'translateY(-50%)';
  } else {
    base.left = rect.right + offset;
    base.top = rect.top + rect.height / 2;
    base.transform = 'translateY(-50%)';
  }
  return base;
}

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
  const [popupStyle, setPopupStyle] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const update = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPopupStyle(getPopconfirmPosition(placement, rect, 8));
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen, placement]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (popupRef.current?.contains(t)) return;
      handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
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
    <div className={cn(ROOT_CLASS, 'bear-inline-block')} data-testid={testId}>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className={cn('bear-cursor-pointer', disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none')}
      >
        {children}
      </div>
      {isOpen && (
        <Portal>
          <div ref={popupRef} className={POPUP_CLASSES} style={popupStyle}>
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
        </Portal>
      )}
    </div>
  );
};

export default Popconfirm;
