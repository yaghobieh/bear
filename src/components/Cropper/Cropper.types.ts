import type { CSSProperties } from 'react';

/**
 * Crop area coordinates
 */
export interface CropArea {
  /** X position (px) */
  x: number;
  /** Y position (px) */
  y: number;
  /** Width (px) */
  width: number;
  /** Height (px) */
  height: number;
}

/**
 * Aspect ratio presets
 */
export type AspectRatioPreset =
  | 'free'
  | '1:1'
  | '4:3'
  | '3:2'
  | '16:9'
  | '2:3'
  | '3:4'
  | '9:16';

/**
 * Crop shape
 */
export type CropShape = 'rectangle' | 'circle';

export interface CropperProps {
  /** Image source URL or data URL */
  src: string;
  /** Controlled crop area */
  crop?: CropArea;
  /** Called when crop area changes */
  onCropChange?: (crop: CropArea) => void;
  /** Called when crop is complete (on mouse up) */
  onCropComplete?: (crop: CropArea, croppedImageUrl: string) => void;
  /** Aspect ratio (number or preset) */
  aspectRatio?: number | AspectRatioPreset;
  /** Crop shape */
  shape?: CropShape;
  /** Zoom level (1 = original) */
  zoom?: number;
  /** Called when zoom changes */
  onZoomChange?: (zoom: number) => void;
  /** Min zoom level */
  minZoom?: number;
  /** Max zoom level */
  maxZoom?: number;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Called when rotation changes */
  onRotationChange?: (rotation: number) => void;
  /** Show zoom slider */
  showZoomSlider?: boolean;
  /** Show rotation slider */
  showRotationSlider?: boolean;
  /** Show grid overlay */
  showGrid?: boolean;
  /** Grid opacity (0-1) */
  gridOpacity?: number;
  /** Overlay color (the dark area outside crop) */
  overlayColor?: string;
  /** Border color of crop area */
  borderColor?: string;
  /** Border width in px */
  borderWidth?: number;
  /** Width of the cropper */
  width?: string | number;
  /** Height of the cropper */
  height?: string | number;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID */
  testId?: string;
}
