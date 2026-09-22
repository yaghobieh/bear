import type { ComponentType } from 'react';
import {
  EMPTY_STATE_PRESET_EMPTY,
  EMPTY_STATE_PRESET_ERROR,
  EMPTY_STATE_PRESET_INBOX,
  EMPTY_STATE_PRESET_SEARCH,
  SIZE_MD,
  VARIANT_DEFAULT,
} from '@const';
import { EmptyStateErrorSvg, EmptyStateInboxSvg, EmptyStateSearchSvg } from './helpers';
import type { EmptyStatePreset } from './EmptyState.types';

export const EMPTY_STATE_DEFAULT_SIZE = SIZE_MD;
export const EMPTY_STATE_DEFAULT_VARIANT = VARIANT_DEFAULT;
export const EMPTY_STATE_DEFAULT_PRESET: EmptyStatePreset = EMPTY_STATE_PRESET_EMPTY;
export const COMPONENT_NAME_EMPTY_STATE = 'EmptyState';

export const EMPTY_STATE_PRESET_ICON: Record<EmptyStatePreset, ComponentType<{ className?: string }>> = {
  [EMPTY_STATE_PRESET_EMPTY]: EmptyStateInboxSvg,
  [EMPTY_STATE_PRESET_INBOX]: EmptyStateInboxSvg,
  [EMPTY_STATE_PRESET_SEARCH]: EmptyStateSearchSvg,
  [EMPTY_STATE_PRESET_ERROR]: EmptyStateErrorSvg,
  'no-data': EmptyStateInboxSvg,
  '404': EmptyStateSearchSvg,
  'offline': EmptyStateErrorSvg,
  'filter-empty': EmptyStateSearchSvg,
};

export const EMPTY_STATE_PRESET_DEFAULTS: Record<EmptyStatePreset, { title: string; description: string }> = {
  empty: { title: 'No items yet', description: 'Get started by creating your first item.' },
  inbox: { title: 'Your inbox is empty', description: 'All caught up! Check back later for new messages.' },
  search: { title: 'No results found', description: 'Try adjusting your search or filter keywords.' },
  error: { title: 'Something went wrong', description: 'We encountered an error loading this content.' },
  'no-data': { title: 'No data available', description: 'There is no data to display right now.' },
  '404': { title: 'Page not found', description: 'The requested page or resource could not be located.' },
  offline: { title: 'Connection lost', description: 'Please check your internet connection and try again.' },
  'filter-empty': { title: 'No matching filters', description: 'No records match the selected filter criteria.' },
};

export const EMPTY_STATE_SIZE_CLASSES = {
  sm: {
    icon: 'bear-w-12 bear-h-12',
    title: 'bear-text-lg',
    desc: 'bear-text-sm',
    padding: 'bear-py-6 bear-px-4',
  },
  md: {
    icon: 'bear-w-16 bear-h-16',
    title: 'bear-text-xl',
    desc: 'bear-text-base',
    padding: 'bear-py-10 bear-px-6',
  },
  lg: {
    icon: 'bear-w-20 bear-h-20',
    title: 'bear-text-2xl',
    desc: 'bear-text-lg',
    padding: 'bear-py-14 bear-px-8',
  },
} as const;
