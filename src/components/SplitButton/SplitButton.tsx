import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import type { SplitButtonProps } from './SplitButton.types';
import {
  VARIANT_CLASSES, SIZE_CLASSES, ARROW_SIZE_CLASSES,
  ROOT_CLASSES, MAIN_BTN_CLASSES, ARROW_BTN_CLASSES,
  DROPDOWN_CLASSES, OPTION_CLASSES, OPTION_DANGER_CLASSES,
  OPTION_DISABLED_CLASSES, SPINNER_CLASSES,
} from './SplitButton.const';

export const SplitButton: FC<SplitButtonProps> = (props) => {
  const {
    label, icon, options, variant = 'primary', size = 'md',
    disabled = false, loading = false, onClick,
    dropdownAlign = 'left', className, testId, ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleOptionClick = useCallback((opt: typeof options[number]) => {
    if (opt.disabled) return;
    opt.onClick();
    setIsOpen(false);
  }, []);

  const variantCls = VARIANT_CLASSES[variant];
  const sizeCls = SIZE_CLASSES[size];
  const arrowSizeCls = ARROW_SIZE_CLASSES[size];
  const isDisabled = disabled || loading;

  return (
    <div ref={containerRef} className={cn(ROOT_CLASSES, className)} data-testid={testId}>
      <button
        type="button"
        className={cn(MAIN_BTN_CLASSES, variantCls, sizeCls, isDisabled && 'bear-opacity-50 bear-cursor-not-allowed')}
        onClick={onClick}
        disabled={isDisabled}
        {...rest}
      >
        {loading ? <span className={SPINNER_CLASSES} /> : icon}
        {label}
      </button>
      <button
        type="button"
        className={cn(ARROW_BTN_CLASSES, variantCls, arrowSizeCls, isDisabled && 'bear-opacity-50 bear-cursor-not-allowed')}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        disabled={isDisabled}
        aria-label="More options"
        aria-expanded={isOpen}
      >
        <svg className={cn('bear-w-4 bear-h-4 bear-transition-transform', isOpen && 'bear-rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={cn(DROPDOWN_CLASSES, dropdownAlign === 'right' ? 'bear-right-0' : 'bear-left-0', 'bear-top-full')}>
          {options.map((opt) => (
            <div
              key={opt.id}
              className={cn(OPTION_CLASSES, opt.danger && OPTION_DANGER_CLASSES, opt.disabled && OPTION_DISABLED_CLASSES)}
              onClick={() => handleOptionClick(opt)}
              role="menuitem"
            >
              {opt.icon && <span className="bear-w-4 bear-h-4 bear-flex-shrink-0">{opt.icon}</span>}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SplitButton;
