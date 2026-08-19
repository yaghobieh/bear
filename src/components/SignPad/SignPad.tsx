import { FC, useRef, useState, useEffect, useCallback } from 'react';
import {cn } from '@utils';
import { Button } from '../Button';
import type { SignPadProps, SignPadDrawEvent } from './SignPad.types';
import {
  SIGN_PAD_DEFAULT_HEIGHT,
  SIGN_PAD_DEFAULT_STROKE_WIDTH,
  SIGN_PAD_DEFAULT_PLACEHOLDER,
  SIGN_PAD_DEFAULT_OUTPUT_FORMAT,
  SIGN_PAD_DEFAULT_OUTPUT_QUALITY,
  SIGN_PAD_ROOT_CLASSES,
  SIGN_PAD_CANVAS_WRAPPER_CLASSES,
  SIGN_PAD_CANVAS_WRAPPER_HOVER,
  SIGN_PAD_PLACEHOLDER_CLASSES,
  SIGN_PAD_LINE_CLASSES,
  SIGN_PAD_X_MARK_CLASSES,
  SIGN_PAD_ACTIONS_CLASSES,
  SIGN_PAD_STROKE_LIGHT,
  SIGN_PAD_STROKE_DARK,
  SIGN_PAD_BG_LIGHT,
  SIGN_PAD_BG_DARK,
  SIGN_PAD_OVERLAY_POINTER_CLASS,
  SIGN_PAD_EMPTY_SIZE,
  SIGN_PAD_OVERLAY_STYLE,
} from './SignPad.const';
import {
  fillCanvasBackground,
  getCanvasPoint,
  isDocumentDarkMode,
  resolveDrawClientPoint,
  strokeCanvasDot,
  strokeCanvasSegment,
  syncCanvasSize,
} from './SignPad.utils';

/**
 * SignPad - Digital signature capture component
 *
 * Canvas fills 100% of its container width. Height is configurable.
 * Uses ResizeObserver so drawing works correctly at any size.
 *
 * @example
 * ```tsx
 * <SignPad onChange={setSignature} placeholder="Sign here" />
 * ```
 */
export const SignPad: FC<SignPadProps> = (props) => {
  const {
    onChange,
    width: widthProp,
    height: heightProp = SIGN_PAD_DEFAULT_HEIGHT,
    strokeColor: strokeColorProp,
    strokeWidth = SIGN_PAD_DEFAULT_STROKE_WIDTH,
    backgroundColor: backgroundColorProp,
    placeholder = SIGN_PAD_DEFAULT_PLACEHOLDER,
    disabled = false,
    readOnly = false,
    showClear = true,
    showSave = false,
    clearText = 'Clear',
    saveText = 'Save',
    outputFormat = SIGN_PAD_DEFAULT_OUTPUT_FORMAT,
    outputQuality = SIGN_PAD_DEFAULT_OUTPUT_QUALITY,
    className,
    testId,
    ...rest
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const isDrawingRef = useRef(false);
  const hasSignatureRef = useRef(false);

  const [hasSignature, setHasSignature] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(isDocumentDarkMode());
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const strokeColor = strokeColorProp || (isDarkMode ? SIGN_PAD_STROKE_DARK : SIGN_PAD_STROKE_LIGHT);
  const backgroundColor = backgroundColorProp || (isDarkMode ? SIGN_PAD_BG_DARK : SIGN_PAD_BG_LIGHT);

  const fillCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    fillCanvasBackground(canvas, backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const syncSize = () => {
      const rect = wrapper.getBoundingClientRect();
      const w = widthProp ?? Math.round(rect.width);
      const h = heightProp;
      if (w <= SIGN_PAD_EMPTY_SIZE || h <= SIGN_PAD_EMPTY_SIZE) return;
      syncCanvasSize(canvas, w, h, backgroundColor, hasSignatureRef.current);
    };

    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [widthProp, heightProp, backgroundColor]);

  useEffect(() => {
    if (hasSignatureRef.current) return;
    fillCanvas();
  }, [fillCanvas, isDarkMode]);

  const getPointFromEvent = useCallback((e: SignPadDrawEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: SIGN_PAD_EMPTY_SIZE, y: SIGN_PAD_EMPTY_SIZE };
    const client = resolveDrawClientPoint(e);
    if (!client) return { x: SIGN_PAD_EMPTY_SIZE, y: SIGN_PAD_EMPTY_SIZE };
    return getCanvasPoint(canvas, client.x, client.y);
  }, []);

  const startDrawing = useCallback((e: SignPadDrawEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const point = getPointFromEvent(e);
    isDrawingRef.current = true;
    lastPointRef.current = point;
    if (canvas) {
      strokeCanvasDot(canvas, point, strokeColor, strokeWidth);
      hasSignatureRef.current = true;
      setHasSignature(true);
    }
  }, [disabled, readOnly, getPointFromEvent, strokeColor, strokeWidth]);

  const draw = useCallback((e: SignPadDrawEvent) => {
    if (!isDrawingRef.current || disabled || readOnly) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const lp = lastPointRef.current;
    if (!canvas || !lp) return;

    const point = getPointFromEvent(e);
    strokeCanvasSegment(canvas, lp, point, strokeColor, strokeWidth);
    lastPointRef.current = point;
    hasSignatureRef.current = true;
    setHasSignature(true);
  }, [disabled, readOnly, strokeColor, strokeWidth, getPointFromEvent]);

  const stopDrawing = useCallback(() => {
    if (isDrawingRef.current) {
      const canvas = canvasRef.current;
      if (canvas && onChange) {
        const data = canvas.toDataURL(outputFormat, outputQuality);
        onChange(data);
      }
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, [onChange, outputFormat, outputQuality]);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(SIGN_PAD_EMPTY_SIZE, SIGN_PAD_EMPTY_SIZE, canvas.width, canvas.height);
    fillCanvas();
    hasSignatureRef.current = false;
    setHasSignature(false);
    onChange?.(null);
  }, [fillCanvas, onChange]);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;
    const data = canvas.toDataURL(outputFormat, outputQuality);
    onChange?.(data);
  }, [hasSignature, onChange, outputFormat, outputQuality]);

  return (
    <div data-testid={testId}
      className={cn(
        'Bear-SignPad bear-w-full',
        SIGN_PAD_ROOT_CLASSES,
        disabled && 'Bear-SignPad--disabled bear-opacity-50',
        readOnly && 'Bear-SignPad--readonly',
        className
      )}
      {...rest}
    >
      <div
        ref={wrapperRef}
        className={cn(
          'Bear-SignPad__canvas-wrapper bear-w-full bear-overflow-hidden',
          'bear-touch-none',
          SIGN_PAD_CANVAS_WRAPPER_CLASSES,
          !disabled && !readOnly && SIGN_PAD_CANVAS_WRAPPER_HOVER,
          disabled && 'bear-cursor-not-allowed',
          !disabled && !readOnly && 'bear-cursor-crosshair'
        )}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      >
        <canvas
          ref={canvasRef}
          className="Bear-SignPad__canvas bear-block bear-rounded-lg bear-w-full bear-touch-none"
          style={{ height: heightProp }}
        />

        {!hasSignature && (
          <div
            className={cn('Bear-SignPad__placeholder', SIGN_PAD_PLACEHOLDER_CLASSES, SIGN_PAD_OVERLAY_POINTER_CLASS)}
            style={SIGN_PAD_OVERLAY_STYLE}
          >
            {placeholder}
          </div>
        )}

        <div
          className={cn('Bear-SignPad__line', SIGN_PAD_LINE_CLASSES, SIGN_PAD_OVERLAY_POINTER_CLASS)}
          style={SIGN_PAD_OVERLAY_STYLE}
        />
        <span
          className={cn('Bear-SignPad__x-mark', SIGN_PAD_X_MARK_CLASSES, SIGN_PAD_OVERLAY_POINTER_CLASS)}
          style={SIGN_PAD_OVERLAY_STYLE}
        >×</span>
      </div>

      {(showClear || showSave) && (
        <div className={cn('Bear-SignPad__actions', SIGN_PAD_ACTIONS_CLASSES)}>
          {showClear && (
            <Button size="sm" variant="ghost" onClick={handleClear} disabled={disabled || !hasSignature}>
              {clearText}
            </Button>
          )}
          {showSave && (
            <Button size="sm" variant="primary" onClick={handleSave} disabled={disabled || !hasSignature}>
              {saveText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignPad;
