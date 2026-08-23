import { useRef, useState } from 'react';
import { cn } from '@utils';
import { clamp } from '@utils';
import { usePointerDrag } from '@hooks';
import { BOOLEAN_TRUE, EIGHTY, FOUR_HUNDRED, ZERO } from '@const';
import { FormControl } from '../FormControl';
import { Typography } from '../Typography';
import type { ResizableTextareaProps } from './ResizableTextarea.types';
import { applyTextareaHeight, getTextareaLength } from './ResizableTextarea.utils';

export const ResizableTextarea = (props: ResizableTextareaProps) => {
  const {
    label,
    helperText,
    error,
    minHeight = EIGHTY,
    maxHeight = FOUR_HUNDRED,
    resizable = BOOLEAN_TRUE,
    showCharCount = false,
    charCountMax,
    className,
    testId,
    ...textareaProps
  } = props;

  const hasError = Boolean(error);
  const charMax = charCountMax ?? textareaProps.maxLength;
  const currentLen = getTextareaLength(textareaProps);
  const isOverLimit = charMax != null && currentLen > charMax;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(minHeight);
  const startHeightRef = useRef(minHeight);

  const { onPointerDown } = usePointerDrag({
    enabled: resizable,
    onMove: (event, start) => {
      const next = clamp(
        startHeightRef.current + (event.clientY - start.clientY),
        minHeight > ZERO ? minHeight : ZERO,
        maxHeight > ZERO ? maxHeight : Number.POSITIVE_INFINITY
      );
      setHeight(next);
      applyTextareaHeight(textareaRef.current, next, minHeight, maxHeight, resizable);
    },
  });

  applyTextareaHeight(textareaRef.current, height, minHeight, maxHeight, resizable);

  const handlePointerDown = (event: React.PointerEvent) => {
    startHeightRef.current = height;
    onPointerDown(event);
  };

  const renderFooterMessage = () => {
    if (helperText || error) {
      return (
        <Typography
          component="p"
          variant="body2"
          className={cn(
            'Bear-ResizableTextarea__helper bear-flex-1',
            hasError ? 'bear-text-red-500' : 'bear-text-gray-500 dark:bear-text-gray-400'
          )}
        >
          {error || helperText}
        </Typography>
      );
    }
    if (showCharCount) {
      return <span />;
    }
    return null;
  };

  return (
    <FormControl
      label={label}
      helperText={undefined}
      error={hasError}
      className={cn('Bear-ResizableTextarea', className)}
      testId={testId}
    >
      <div className="bear-relative">
        <textarea
          ref={textareaRef}
          aria-invalid={hasError || undefined}
          className={cn(
            'Bear-ResizableTextarea__field bear-w-full bear-rounded-lg bear-border',
            'bear-bg-white dark:bear-bg-gray-900 bear-text-gray-900 dark:bear-text-gray-100',
            'bear-p-3 bear-resize-none focus:bear-outline-none focus:bear-ring-2',
            hasError
              ? 'bear-border-red-500 focus:bear-ring-red-500'
              : 'bear-border-gray-300 dark:bear-border-gray-600 focus:bear-ring-primary-500/50'
          )}
          {...textareaProps}
        />
        {resizable && (
          <div
            role="separator"
            onPointerDown={handlePointerDown}
            className="Bear-ResizableTextarea__handle bear-absolute bear-right-0 bear-bottom-0 bear-w-4 bear-h-4 bear-cursor-s-resize bear-opacity-50 hover:bear-opacity-100 Bear-ResizableTextarea__handle--grip"
          />
        )}
      </div>
      <div className="Bear-ResizableTextarea__footer bear-flex bear-items-center bear-justify-between bear-gap-2">
        {renderFooterMessage()}
        {showCharCount && charMax != null && (
          <Typography
            component="span"
            variant="caption"
            className={cn(
              'Bear-ResizableTextarea__char-count bear-tabular-nums bear-shrink-0',
              isOverLimit ? 'bear-text-red-500' : 'bear-text-gray-400 dark:bear-text-gray-500'
            )}
          >
            {currentLen}/{charMax}
          </Typography>
        )}
      </div>
    </FormControl>
  );
};
