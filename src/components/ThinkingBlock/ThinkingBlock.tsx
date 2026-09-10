import { useState } from 'react';
import { COMPONENT_NAME_THINKING_BLOCK } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Typography } from '../Typography';
import {
  THINKING_BLOCK_DEFAULT_OPEN,
  THINKING_BLOCK_DEFAULT_STREAMING,
  THINKING_BLOCK_DEFAULT_TRANSLATIONS,
} from './ThinkingBlock.const';
import type { ThinkingBlockProps } from './ThinkingBlock.types';

export const ThinkingBlock = (props: ThinkingBlockProps) => {
  const {
    id,
    testId,
    title,
    children,
    defaultOpen = THINKING_BLOCK_DEFAULT_OPEN,
    open,
    onOpenChange,
    isStreaming = THINKING_BLOCK_DEFAULT_STREAMING,
    translations,
    className,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_THINKING_BLOCK);
  const domId = resolveBearId(id, generatedId);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const labels = { ...THINKING_BLOCK_DEFAULT_TRANSLATIONS, ...translations };
  const heading = title ?? labels.thinkingLabel;
  const bodyId = `${domId}-body`;

  const handleToggle = () => {
    const next = !isOpen;
    if (open === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <Box id={domId} data-testid={testId} className={cn('Bear-ThinkingBlock', isStreaming && 'Bear-ThinkingBlock--streaming', className)}>
      <Button
        type="button"
        variant="ghost"
        className="Bear-ThinkingBlock__trigger"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={handleToggle}
      >
        {heading}
      </Button>
      {isOpen && (
        <Box id={bodyId} className="Bear-ThinkingBlock__body">
          {typeof children === 'string' ? (
            <Typography variant="body2" color="muted">
              {children}
            </Typography>
          ) : (
            children
          )}
        </Box>
      )}
    </Box>
  );
};
