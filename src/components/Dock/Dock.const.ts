import type { DockPosition } from './Dock.types';

/** Default icon size in pixels */
export const DEFAULT_ICON_SIZE = 48;

/** Default magnified size in pixels */
export const DEFAULT_MAGNIFIED_SIZE = 72;

/** Default magnification distance (neighbor count) */
export const DEFAULT_MAGNIFICATION_DISTANCE = 2;

/** Dock padding in pixels */
export const DOCK_PADDING = 8;

/** Animation spring duration in ms */
export const SPRING_DURATION = 150;

/** Badge min width in pixels */
export const BADGE_MIN_SIZE = 18;

/** Badge font size in pixels */
export const BADGE_FONT_SIZE = 10;

/** Active dot size in pixels */
export const ACTIVE_DOT_SIZE = 4;

/** Icon scale ratio (icon content vs container) */
export const ICON_SCALE_RATIO = 0.5;

/** Position classes */
export const DOCK_POSITION_CLASSES: Record<DockPosition, string> = {
  top: 'bear-fixed bear-top-2 bear-left-1/2 bear--translate-x-1/2 bear-flex-row',
  bottom: 'bear-fixed bear-bottom-2 bear-left-1/2 bear--translate-x-1/2 bear-flex-row',
  left: 'bear-fixed bear-left-2 bear-top-1/2 bear--translate-y-1/2 bear-flex-col',
  right: 'bear-fixed bear-right-2 bear-top-1/2 bear--translate-y-1/2 bear-flex-col',
};

/** Tooltip position classes */
export const TOOLTIP_POSITION_CLASSES: Record<DockPosition, string> = {
  bottom: 'bear-bottom-full bear-mb-2',
  top: 'bear-top-full bear-mt-2',
  left: 'bear-left-full bear-ml-2',
  right: 'bear-right-full bear-mr-2',
};

/** Z-index for dock */
export const DOCK_Z_INDEX = 9998;
