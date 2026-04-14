export const DEFAULT_ACCENT = '#ec4899';
export const PROGRESS_HEIGHT = 4;
export const ICON_SM = 18;
export const ICON_MD = 20;

export const STICKY_WIDTH = 340;
export const STICKY_OFFSET = 16;
export const CENTER_ICON_SIZE = 48;

export const SIZE_MAP = {
  sm: { maxWidth: 360, aspectRatio: '4 / 3', padding: 'p-2', gap: 'gap-2', text: 'text-[10px]', iconSm: 14, iconMd: 16 },
  md: { maxWidth: 640, aspectRatio: '16 / 9', padding: 'p-3', gap: 'gap-3', text: 'text-xs', iconSm: 18, iconMd: 20 },
  lg: { maxWidth: 960, aspectRatio: '21 / 9', padding: 'p-4', gap: 'gap-4', text: 'text-sm', iconSm: 20, iconMd: 24 },
} as const;
