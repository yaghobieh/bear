import { useRef, useState } from 'react';
import {
  COMPONENT_NAME_PROMPT_COMPOSER,
  EMPTY_STRING,
} from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import {
  PROMPT_COMPOSER_DEFAULT_ATTACH,
  PROMPT_COMPOSER_DEFAULT_DISABLED,
  PROMPT_COMPOSER_DEFAULT_STREAMING,
  PROMPT_COMPOSER_DEFAULT_TRANSLATIONS,
  PROMPT_COMPOSER_DEFAULT_VALUE,
} from './PromptComposer.const';
import type { PromptComposerProps } from './PromptComposer.types';
import { canSubmitPrompt, resolvePromptDraft, shouldUseInternalDraft, submitPromptDraft } from './PromptComposer.utils';
import {
  PromptComposerAttachSvg,
  PromptComposerFileChip,
  PromptComposerSendSvg,
  PromptComposerStopSvg,
} from './helpers';

export const PromptComposer = (props: PromptComposerProps) => {
  const {
    id,
    testId,
    value,
    defaultValue = PROMPT_COMPOSER_DEFAULT_VALUE,
    onChange,
    onSubmit,
    onStop,
    onAttach,
    files,
    onFileRemove,
    isStreaming = PROMPT_COMPOSER_DEFAULT_STREAMING,
    disabled = PROMPT_COMPOSER_DEFAULT_DISABLED,
    allowAttach = PROMPT_COMPOSER_DEFAULT_ATTACH,
    accept,
    placeholder,
    translations,
    footer,
    className,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_PROMPT_COMPOSER);
  const domId = resolveBearId(id, generatedId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const draft = resolvePromptDraft({ value, defaultValue, onChange }, internalValue);
  const labels = { ...PROMPT_COMPOSER_DEFAULT_TRANSLATIONS, ...translations };
  const fieldId = `${domId}-field`;
  const canSubmit = canSubmitPrompt(draft, disabled, isStreaming);

  const setDraft = (next: string) => {
    if (shouldUseInternalDraft(value)) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleSubmit = () => {
    const next = draft.trim();
    if (!canSubmit || !next) {
      return;
    }
    onSubmit?.(next);
    setDraft(EMPTY_STRING);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return;
    }
    onAttach?.(Array.from(fileList));
  };

  const showStop = isStreaming && Boolean(onStop);
  const attachedFiles = files ?? [];

  return (
    <Box id={domId} data-testid={testId} className={cn('Bear-PromptComposer', className)}>
      {attachedFiles.length > 0 && (
        <Flex className="Bear-PromptComposer__files" wrap="wrap" gap={2}>
          {attachedFiles.map((file) => (
            <PromptComposerFileChip
              key={`${file.name}-${file.size}-${file.lastModified}`}
              file={file}
              disabled={disabled}
              onRemove={onFileRemove}
            />
          ))}
        </Flex>
      )}
      <Flex className="Bear-PromptComposer__row" align="end" gap={2}>
        {allowAttach && (
          <Button
            type="button"
            variant="ghost"
            iconOnly
            disabled={disabled || isStreaming}
            aria-label={labels.attachLabel}
            onClick={handleAttachClick}
          >
            <PromptComposerAttachSvg />
          </Button>
        )}
        <Box className="Bear-PromptComposer__field">
          <textarea
            id={fieldId}
            className="Bear-PromptComposer__textarea"
            value={draft}
            placeholder={placeholder ?? labels.placeholder}
            disabled={disabled}
            rows={2}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) =>
              submitPromptDraft({
                event,
                disabled,
                isStreaming,
                onSubmit,
                draft,
                clearDraft: () => setDraft(EMPTY_STRING),
              })
            }
          />
        </Box>
        {showStop ? (
          <Button
            type="button"
            variant="secondary"
            iconOnly
            aria-label={labels.stopLabel}
            onClick={onStop}
          >
            <PromptComposerStopSvg />
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            iconOnly
            disabled={!canSubmit}
            aria-label={labels.sendLabel}
            onClick={handleSubmit}
          >
            <PromptComposerSendSvg />
          </Button>
        )}
      </Flex>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        multiple
        accept={accept}
        disabled={disabled || isStreaming}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = EMPTY_STRING;
        }}
      />
      {footer}
    </Box>
  );
};
