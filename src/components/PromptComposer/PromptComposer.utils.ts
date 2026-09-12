import { BOOLEAN_FALSE, KEY_ENTER } from '@const';
import type { PromptComposerKeyParams, UsePromptComposerValueParams } from './PromptComposer.types';

export const submitPromptDraft = (params: PromptComposerKeyParams) => {
  const { event, disabled, isStreaming, onSubmit, draft, clearDraft } = params;
  if (event.key !== KEY_ENTER || event.shiftKey || disabled || isStreaming) {
    return;
  }
  event.preventDefault();
  const next = draft.trim();
  if (!next) {
    return;
  }
  onSubmit?.(next);
  clearDraft();
};

export const resolvePromptDraft = (
  params: UsePromptComposerValueParams,
  internalValue: string
) => {
  return params.value ?? internalValue;
};

export const shouldUseInternalDraft = (value: string | undefined) => value === undefined;

export const canSubmitPrompt = (draft: string, disabled: boolean, isStreaming: boolean) => {
  if (disabled || isStreaming) {
    return BOOLEAN_FALSE;
  }
  return draft.trim().length > 0;
};
