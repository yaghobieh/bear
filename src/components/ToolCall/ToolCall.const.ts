import type { ToolCallKind, ToolCallStatus, ToolCallTranslations } from './ToolCall.types';

export const TOOL_CALL_DEFAULT_TRANSLATIONS: ToolCallTranslations = {
  pendingLabel: 'Waiting',
  runningLabel: 'Running',
  successLabel: 'Done',
  errorLabel: 'Failed',
};

export const TOOL_CALL_DEFAULT_STATUS: ToolCallStatus = 'pending';
export const TOOL_CALL_DEFAULT_KIND: ToolCallKind = 'generic';

export const TOOL_CALL_STATUS_LABEL_KEY: Record<ToolCallStatus, keyof ToolCallTranslations> = {
  pending: 'pendingLabel',
  running: 'runningLabel',
  success: 'successLabel',
  error: 'errorLabel',
};
