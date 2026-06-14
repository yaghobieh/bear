import type { ContextMenuEntry } from './ContextMenu.types';
import { VIEWPORT_PADDING } from './ContextMenu.const';

export const isDivider = (entry: ContextMenuEntry): entry is { id: string; type: 'divider' } =>
  'type' in entry && entry.type === 'divider';

export const clampMenuPosition = (
  position: { x: number; y: number },
  menuEl: HTMLDivElement
): { x: number; y: number } => {
  const rect = menuEl.getBoundingClientRect();
  let x = position.x;
  let y = position.y;
  if (rect.right > window.innerWidth - VIEWPORT_PADDING) {
    x = window.innerWidth - rect.width - VIEWPORT_PADDING;
  }
  if (rect.bottom > window.innerHeight - VIEWPORT_PADDING) {
    y = window.innerHeight - rect.height - VIEWPORT_PADDING;
  }
  return {
    x: Math.max(VIEWPORT_PADDING, x),
    y: Math.max(VIEWPORT_PADDING, y),
  };
};
