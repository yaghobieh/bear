import { FC, useRef, useState, useCallback } from 'react';
import { cn } from '@utils';
import type { ResizableTextareaProps } from './ResizableTextarea.types';
import { DEFAULT_MIN_HEIGHT, DEFAULT_MAX_HEIGHT } from './ResizableTextarea.const';

export const ResizableTextarea: FC<ResizableTextareaProps> = ({
  label,
  helperText,
  error,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeight = DEFAULT_MAX_HEIGHT,
  resizable = true,
  showCharCount = false,
  charCountMax,
  className,
  style,
  testId,
  ...textareaProps
}) => {
  const hasError = Boolean(error);
  const charMax = charCountMax ?? textareaProps.maxLength;
  const currentLen = typeof textareaProps.value === 'string'
    ? textareaProps.value.length
    : (typeof textareaProps.defaultValue === 'string' ? textareaProps.defaultValue.length : 0);
  const isOverLimit = charMax != null && currentLen > charMax;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number>(minHeight);
  const startY = useRef(0);
  const startHeight = useRef(minHeight);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!resizable) return;
    e.preventDefault();
    startY.current = e.clientY;
    startHeight.current = height;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const onMove = (e: PointerEvent) => {
      const dy = e.clientY - startY.current;
      let next = startHeight.current + dy;
      if (minHeight > 0) next = Math.max(minHeight, next);
      if (maxHeight > 0) next = Math.min(maxHeight, next);
      setHeight(next);
    };
    const onUp = () => {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [resizable, height, minHeight, maxHeight]);

  return (
    <div className={cn('Bear-ResizableTextarea bear-flex bear-flex-col bear-gap-1.5', className)} data-testid={testId}>
      {label && (
        <label className="Bear-ResizableTextarea__label bear-text-sm bear-font-medium bear-text-gray-700 dark:bear-text-gray-300">
          {label}
        </label>
      )}

      <div className="bear-relative">
        <textarea
          ref={textareaRef}
          aria-invalid={hasError || undefined}
          className={cn(
            'bear-w-full bear-rounded-lg bear-border',
            'bear-bg-white dark:bear-bg-gray-900 bear-text-gray-900 dark:bear-text-gray-100',
            'bear-p-3 bear-resize-none focus:bear-outline-none focus:bear-ring-2',
            hasError
              ? 'bear-border-red-500 focus:bear-ring-red-500'
              : 'bear-border-gray-300 dark:bear-border-gray-600 focus:bear-ring-pink-500/50'
          )}
          style={{
            ...style,
            minHeight: resizable ? minHeight : undefined,
            height: resizable ? height : undefined,
            maxHeight: maxHeight > 0 ? maxHeight : undefined,
          }}
          {...textareaProps}
        />
        {resizable && (
          <div
            role="separator"
            onPointerDown={handlePointerDown}
            className="Bear-ResizableTextarea__handle bear-absolute bear-right-0 bear-bottom-0 bear-w-4 bear-h-4 bear-cursor-s-resize bear-opacity-50 hover:bear-opacity-100"
            style={{ background: 'linear-gradient(135deg, transparent 50%, currentColor 50%)' }}
          />
        )}
      </div>

      <div className="Bear-ResizableTextarea__footer bear-flex bear-items-center bear-justify-between bear-gap-2">
        {(helperText || error) ? (
          <p
            className={cn(
              'Bear-ResizableTextarea__helper bear-text-sm bear-flex-1',
              hasError ? 'bear-text-red-500' : 'bear-text-gray-500 dark:bear-text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        ) : showCharCount ? <span /> : null}

        {showCharCount && charMax != null && (
          <span
            className={cn(
              'Bear-ResizableTextarea__char-count bear-text-xs bear-tabular-nums bear-shrink-0',
              isOverLimit ? 'bear-text-red-500' : 'bear-text-gray-400 dark:bear-text-gray-500'
            )}
          >
            {currentLen}/{charMax}
          </span>
        )}
      </div>
    </div>
  );
};
