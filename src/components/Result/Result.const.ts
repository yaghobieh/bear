import { STATUS_FORBIDDEN, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from '@const';
import type { ResultStatus } from './Result.types';

export const STATUS_ICON_COLORS: Record<ResultStatus, string> = {
  success: 'bear-text-green-500 dark:bear-text-green-400',
  error: 'bear-text-red-500 dark:bear-text-red-400',
  info: 'bear-text-blue-500 dark:bear-text-blue-400',
  warning: 'bear-text-amber-500 dark:bear-text-amber-400',
  [STATUS_NOT_FOUND]: 'bear-text-gray-500 dark:bear-text-zinc-400',
  [STATUS_FORBIDDEN]: 'bear-text-orange-500 dark:bear-text-orange-400',
  [STATUS_SERVER_ERROR]: 'bear-text-red-600 dark:bear-text-red-500',
};
