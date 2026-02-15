import type { CropArea, AspectRatioPreset } from './Cropper.types';

/** Default crop area */
export const DEFAULT_CROP: CropArea = {
  x: 50,
  y: 50,
  width: 200,
  height: 200,
};

/** Min crop dimensions */
export const MIN_CROP_SIZE = 20;

/** Default zoom */
export const DEFAULT_ZOOM = 1;

/** Zoom range */
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 5;

/** Zoom step for slider */
export const ZOOM_STEP = 0.1;

/** Rotation range */
export const MIN_ROTATION = -180;
export const MAX_ROTATION = 180;

/** Rotation step for slider */
export const ROTATION_STEP = 1;

/** Default overlay color */
export const OVERLAY_COLOR = 'rgba(0, 0, 0, 0.6)';

/** Default border color */
export const BORDER_COLOR = '#ffffff';

/** Default border width */
export const BORDER_WIDTH = 2;

/** Grid line count per axis */
export const GRID_LINES = 3;

/** Default grid opacity */
export const DEFAULT_GRID_OPACITY = 0.4;

/** Handle size in px */
export const HANDLE_SIZE = 12;

/** Aspect ratio numeric values */
export const ASPECT_RATIO_VALUES: Record<AspectRatioPreset, number | null> = {
  free: null,
  '1:1': 1,
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '16:9': 16 / 9,
  '2:3': 2 / 3,
  '3:4': 3 / 4,
  '9:16': 9 / 16,
};
