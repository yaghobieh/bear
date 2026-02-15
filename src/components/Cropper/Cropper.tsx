import { FC, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { cn } from '@utils';
import type { CropperProps, CropArea } from './Cropper.types';
import {
  DEFAULT_CROP,
  MIN_CROP_SIZE,
  DEFAULT_ZOOM,
  MIN_ZOOM as CONST_MIN_ZOOM,
  MAX_ZOOM as CONST_MAX_ZOOM,
  ZOOM_STEP,
  MIN_ROTATION,
  MAX_ROTATION,
  ROTATION_STEP,
  OVERLAY_COLOR,
  BORDER_COLOR,
  BORDER_WIDTH,
  GRID_LINES,
  DEFAULT_GRID_OPACITY,
  HANDLE_SIZE,
  ASPECT_RATIO_VALUES,
} from './Cropper.const';

type DragMode = 'none' | 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';

/**
 * Cropper - Image cropping component with zoom, rotate, and aspect ratio
 *
 * @description
 * Interactive image cropper with handles, zoom, rotation, grid overlay,
 * and aspect ratio presets. Outputs cropped image as data URL.
 *
 * @example
 * ```tsx
 * <Cropper
 *   src="/photo.jpg"
 *   aspectRatio="16:9"
 *   showZoomSlider
 *   showGrid
 *   onCropComplete={(crop, url) => console.log(url)}
 * />
 * ```
 */
export const Cropper: FC<CropperProps> = ({
  src,
  crop: controlledCrop,
  onCropChange,
  onCropComplete,
  aspectRatio: aspectRatioProp = 'free',
  shape = 'rectangle',
  zoom: controlledZoom,
  onZoomChange,
  minZoom = CONST_MIN_ZOOM,
  maxZoom = CONST_MAX_ZOOM,
  rotation: controlledRotation,
  onRotationChange,
  showZoomSlider = false,
  showRotationSlider = false,
  showGrid = false,
  gridOpacity = DEFAULT_GRID_OPACITY,
  overlayColor = OVERLAY_COLOR,
  borderColor = BORDER_COLOR,
  borderWidth = BORDER_WIDTH,
  width = '100%',
  height = 400,
  className,
  style,
  testId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [internalCrop, setInternalCrop] = useState<CropArea>(DEFAULT_CROP);
  const [internalZoom, setInternalZoom] = useState(DEFAULT_ZOOM);
  const [internalRotation, setInternalRotation] = useState(0);
  const [dragMode, setDragMode] = useState<DragMode>('none');
  const [dragStart, setDragStart] = useState<{ x: number; y: number; crop: CropArea } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [, setImageDims] = useState({ w: 0, h: 0 });

  const crop = controlledCrop ?? internalCrop;
  const zoom = controlledZoom ?? internalZoom;
  const rotation = controlledRotation ?? internalRotation;

  const aspectRatioNum = useMemo(() => {
    if (typeof aspectRatioProp === 'number') return aspectRatioProp;
    return ASPECT_RATIO_VALUES[aspectRatioProp] ?? null;
  }, [aspectRatioProp]);

  const updateCrop = useCallback(
    (newCrop: CropArea) => {
      if (!controlledCrop) setInternalCrop(newCrop);
      onCropChange?.(newCrop);
    },
    [controlledCrop, onCropChange]
  );

  const updateZoom = useCallback(
    (z: number) => {
      const clamped = Math.max(minZoom, Math.min(maxZoom, z));
      if (!controlledZoom) setInternalZoom(clamped);
      onZoomChange?.(clamped);
    },
    [controlledZoom, onZoomChange, minZoom, maxZoom]
  );

  const updateRotation = useCallback(
    (r: number) => {
      const clamped = Math.max(MIN_ROTATION, Math.min(MAX_ROTATION, r));
      if (!controlledRotation) setInternalRotation(clamped);
      onRotationChange?.(clamped);
    },
    [controlledRotation, onRotationChange]
  );

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageDims({ w: img.naturalWidth, h: img.naturalHeight });
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  // Constrain crop to container
  const constrainCrop = useCallback(
    (c: CropArea): CropArea => {
      const el = containerRef.current;
      if (!el) return c;
      const containerW = el.clientWidth;
      const containerH = el.clientHeight - (showZoomSlider || showRotationSlider ? 60 : 0);
      let { x, y, width: w, height: h } = c;
      w = Math.max(MIN_CROP_SIZE, w);
      h = Math.max(MIN_CROP_SIZE, h);
      if (aspectRatioNum) h = w / aspectRatioNum;
      x = Math.max(0, Math.min(containerW - w, x));
      y = Math.max(0, Math.min(containerH - h, y));
      return { x, y, width: w, height: h };
    },
    [aspectRatioNum, showZoomSlider, showRotationSlider]
  );

  // Generate cropped image
  const generateCroppedImage = useCallback((): string => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    const el = containerRef.current;
    if (!canvas || !img || !el) return '';

    const containerW = el.clientWidth;
    const containerH = el.clientHeight - (showZoomSlider || showRotationSlider ? 60 : 0);
    const scaleX = img.naturalWidth / (containerW * zoom);
    const scaleY = img.naturalHeight / (containerH * zoom);

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return canvas.toDataURL('image/png');
  }, [crop, zoom, shape, showZoomSlider, showRotationSlider]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (mode: DragMode) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragMode(mode);
      setDragStart({ x: e.clientX, y: e.clientY, crop: { ...crop } });
    },
    [crop]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragMode === 'none' || !dragStart) return;

      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const { crop: startCrop } = dragStart;

      let newCrop: CropArea;

      switch (dragMode) {
        case 'move':
          newCrop = constrainCrop({
            ...startCrop,
            x: startCrop.x + dx,
            y: startCrop.y + dy,
          });
          break;
        case 'se':
          newCrop = constrainCrop({
            ...startCrop,
            width: startCrop.width + dx,
            height: aspectRatioNum ? (startCrop.width + dx) / aspectRatioNum : startCrop.height + dy,
          });
          break;
        case 'sw':
          newCrop = constrainCrop({
            ...startCrop,
            x: startCrop.x + dx,
            width: startCrop.width - dx,
            height: aspectRatioNum ? (startCrop.width - dx) / aspectRatioNum : startCrop.height + dy,
          });
          break;
        case 'ne':
          newCrop = constrainCrop({
            ...startCrop,
            y: aspectRatioNum ? startCrop.y : startCrop.y + dy,
            width: startCrop.width + dx,
            height: aspectRatioNum ? (startCrop.width + dx) / aspectRatioNum : startCrop.height - dy,
          });
          break;
        case 'nw':
          newCrop = constrainCrop({
            x: startCrop.x + dx,
            y: aspectRatioNum ? startCrop.y + dy : startCrop.y + dy,
            width: startCrop.width - dx,
            height: aspectRatioNum ? (startCrop.width - dx) / aspectRatioNum : startCrop.height - dy,
          });
          break;
        case 'n':
          newCrop = constrainCrop({ ...startCrop, y: startCrop.y + dy, height: startCrop.height - dy });
          break;
        case 's':
          newCrop = constrainCrop({ ...startCrop, height: startCrop.height + dy });
          break;
        case 'e':
          newCrop = constrainCrop({ ...startCrop, width: startCrop.width + dx });
          break;
        case 'w':
          newCrop = constrainCrop({ ...startCrop, x: startCrop.x + dx, width: startCrop.width - dx });
          break;
        default:
          return;
      }

      updateCrop(newCrop);
    },
    [dragMode, dragStart, constrainCrop, updateCrop, aspectRatioNum]
  );

  const handleMouseUp = useCallback(() => {
    if (dragMode !== 'none') {
      const url = generateCroppedImage();
      onCropComplete?.(crop, url);
    }
    setDragMode('none');
    setDragStart(null);
  }, [dragMode, crop, generateCroppedImage, onCropComplete]);

  // Scroll zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      updateZoom(zoom + delta);
    },
    [zoom, updateZoom]
  );

  const controlsHeight = showZoomSlider || showRotationSlider ? 60 : 0;

  return (
    <div
      className={cn(
        'bear-relative bear-overflow-hidden bear-rounded-lg',
        'bear-bg-gray-900 bear-select-none',
        className
      )}
      style={{ width, height, ...style }}
      data-testid={testId}
    >
      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} className="bear-hidden" />

      {/* Image + crop area */}
      <div
        ref={containerRef}
        className="bear-relative bear-overflow-hidden bear-cursor-crosshair"
        style={{ height: `calc(100% - ${controlsHeight}px)` }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Image */}
        {imageLoaded && (
          <img
            src={src}
            alt=""
            className="bear-absolute bear-inset-0 bear-w-full bear-h-full bear-object-contain bear-pointer-events-none"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transition: dragMode !== 'none' ? 'none' : 'transform 0.2s ease',
            }}
            draggable={false}
          />
        )}

        {/* Overlay (dark area outside crop) */}
        <svg className="bear-absolute bear-inset-0 bear-w-full bear-h-full bear-pointer-events-none">
          <defs>
            <mask id="crop-mask">
              <rect width="100%" height="100%" fill="white" />
              {shape === 'circle' ? (
                <ellipse
                  cx={crop.x + crop.width / 2}
                  cy={crop.y + crop.height / 2}
                  rx={crop.width / 2}
                  ry={crop.height / 2}
                  fill="black"
                />
              ) : (
                <rect x={crop.x} y={crop.y} width={crop.width} height={crop.height} fill="black" />
              )}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill={overlayColor} mask="url(#crop-mask)" />
        </svg>

        {/* Crop border */}
        <div
          className="bear-absolute bear-pointer-events-none"
          style={{
            left: crop.x,
            top: crop.y,
            width: crop.width,
            height: crop.height,
            border: `${borderWidth}px solid ${borderColor}`,
            borderRadius: shape === 'circle' ? '50%' : 0,
            boxShadow: '0 0 0 9999px transparent',
          }}
        >
          {/* Grid lines */}
          {showGrid && (
            <svg className="bear-absolute bear-inset-0 bear-w-full bear-h-full" style={{ opacity: gridOpacity }}>
              {Array.from({ length: GRID_LINES - 1 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${((i + 1) / GRID_LINES) * 100}%`}
                  y1="0"
                  x2={`${((i + 1) / GRID_LINES) * 100}%`}
                  y2="100%"
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: GRID_LINES - 1 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${((i + 1) / GRID_LINES) * 100}%`}
                  x2="100%"
                  y2={`${((i + 1) / GRID_LINES) * 100}%`}
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          )}
        </div>

        {/* Drag handles */}
        {/* Move handle (entire crop area) */}
        <div
          className="bear-absolute bear-cursor-move"
          style={{ left: crop.x, top: crop.y, width: crop.width, height: crop.height }}
          onMouseDown={handleMouseDown('move')}
        />

        {/* Corner handles */}
        {(['nw', 'ne', 'sw', 'se'] as const).map((pos) => {
          const isLeft = pos.includes('w');
          const isTop = pos.includes('n');
          return (
            <div
              key={pos}
              className={cn(
                'bear-absolute bear-bg-white bear-border-2 bear-rounded-sm',
                'bear-shadow-md bear-z-10'
              )}
              style={{
                width: HANDLE_SIZE,
                height: HANDLE_SIZE,
                left: (isLeft ? crop.x : crop.x + crop.width) - HANDLE_SIZE / 2,
                top: (isTop ? crop.y : crop.y + crop.height) - HANDLE_SIZE / 2,
                borderColor: 'var(--bear-primary-500)',
                cursor: `${pos}-resize`,
              }}
              onMouseDown={handleMouseDown(pos)}
            />
          );
        })}

        {/* Edge handles */}
        {(['n', 's', 'e', 'w'] as const).map((pos) => {
          const isHoriz = pos === 'n' || pos === 's';
          return (
            <div
              key={pos}
              className="bear-absolute bear-z-10"
              style={{
                left: pos === 'w' ? crop.x - 4 : pos === 'e' ? crop.x + crop.width - 4 : crop.x + crop.width / 2 - 12,
                top: pos === 'n' ? crop.y - 4 : pos === 's' ? crop.y + crop.height - 4 : crop.y + crop.height / 2 - 12,
                width: isHoriz ? 24 : 8,
                height: isHoriz ? 8 : 24,
                cursor: isHoriz ? `${pos}-resize` : `${pos}-resize`,
              }}
              onMouseDown={handleMouseDown(pos)}
            />
          );
        })}
      </div>

      {/* Controls */}
      {(showZoomSlider || showRotationSlider) && (
        <div
          className={cn(
            'bear-flex bear-items-center bear-gap-4 bear-px-4',
            'bear-bg-gray-800/90 bear-backdrop-blur-sm'
          )}
          style={{ height: controlsHeight }}
        >
          {showZoomSlider && (
            <div className="bear-flex bear-items-center bear-gap-2 bear-flex-1">
              <svg className="bear-w-4 bear-h-4 bear-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <input
                type="range"
                min={minZoom}
                max={maxZoom}
                step={ZOOM_STEP}
                value={zoom}
                onChange={(e) => updateZoom(parseFloat(e.target.value))}
                className="bear-flex-1 bear-h-1 bear-accent-pink-500"
              />
              <span className="bear-text-xs bear-text-gray-400 bear-w-10 bear-text-right">
                {(zoom * 100).toFixed(0)}%
              </span>
            </div>
          )}
          {showRotationSlider && (
            <div className="bear-flex bear-items-center bear-gap-2 bear-flex-1">
              <svg className="bear-w-4 bear-h-4 bear-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <input
                type="range"
                min={MIN_ROTATION}
                max={MAX_ROTATION}
                step={ROTATION_STEP}
                value={rotation}
                onChange={(e) => updateRotation(parseFloat(e.target.value))}
                className="bear-flex-1 bear-h-1 bear-accent-pink-500"
              />
              <span className="bear-text-xs bear-text-gray-400 bear-w-10 bear-text-right">
                {rotation}°
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
