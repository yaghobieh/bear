import { FC, useState, useCallback, useEffect, ReactNode } from 'react';
import { cn } from '@utils';
import { Input } from '../Input';
import { VisibilityIcon, VisibilityOffIcon } from '../Icon/icons/action';
import type { PasswordInputProps } from './PasswordInput.types';

const SHIFT_INDICATOR_CLASSES = cn(
  'Bear-PasswordInput__shift bear-text-xs bear-font-medium bear-px-1.5 bear-py-0.5',
  'bear-rounded bear-bg-amber-100 bear-text-amber-700',
  'dark:bear-bg-amber-900/40 dark:bear-text-amber-400',
  'bear-select-none bear-whitespace-nowrap'
);

export const PasswordInput: FC<PasswordInputProps> = ({
  visible: controlledVisible,
  onVisibilityChange,
  hideToggle = false,
  toggleAriaLabel = 'Toggle password visibility',
  showShiftIndicator = false,
  visibleIcon,
  hiddenIcon,
  ...inputProps
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const isControlled = controlledVisible !== undefined;
  const isVisible = isControlled ? controlledVisible : internalVisible;

  const handleToggle = useCallback(() => {
    if (isControlled) {
      onVisibilityChange?.(!controlledVisible);
    } else {
      setInternalVisible((prev) => !prev);
    }
  }, [isControlled, controlledVisible, onVisibilityChange]);

  useEffect(() => {
    if (!showShiftIndicator) return;
    const handler = (e: KeyboardEvent) => setCapsLockOn(e.getModifierState('CapsLock'));
    window.addEventListener('keydown', handler);
    window.addEventListener('keyup', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('keyup', handler);
    };
  }, [showShiftIndicator]);

  const defaultVisibleIcon: ReactNode = <VisibilityOffIcon className="bear-w-4 bear-h-4" />;
  const defaultHiddenIcon: ReactNode = <VisibilityIcon className="bear-w-4 bear-h-4" />;

  const toggleButton = !hideToggle ? (
    <span className="Bear-PasswordInput__actions bear-inline-flex bear-items-center bear-gap-1.5">
      {showShiftIndicator && capsLockOn && (
        <span className={SHIFT_INDICATOR_CLASSES}>Caps</span>
      )}
      <button
        type="button"
        tabIndex={-1}
        onClick={handleToggle}
        className={cn(
          'Bear-PasswordInput__toggle bear-inline-flex bear-items-center bear-justify-center',
          'bear-text-gray-400 hover:bear-text-gray-600 dark:hover:bear-text-gray-300',
          'bear-transition-colors bear-cursor-pointer'
        )}
        aria-label={toggleAriaLabel}
      >
        {isVisible ? (visibleIcon ?? defaultVisibleIcon) : (hiddenIcon ?? defaultHiddenIcon)}
      </button>
    </span>
  ) : undefined;

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      rightAddon={toggleButton}
      autoComplete="current-password"
      {...inputProps}
    />
  );
};
