import type { ContextMenuEntry } from './ContextMenu.types';

export const isDivider = (entry: ContextMenuEntry): entry is { id: string; type: 'divider' } =>
  'type' in entry && entry.type === 'divider';
