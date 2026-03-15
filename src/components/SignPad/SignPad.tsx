import { FC, useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import { Button } from '../Button';
import type { SignPadProps } from './SignPad.types';
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
} from './SignPad.const';

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
    id,
    ...rest
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const isDrawingRef = useRef(false);

  const [hasSignature, setHasSignature] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
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
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const syncSize = () => {
      const rect = wrapper.getBoundingClientRect();
      const w = widthProp ?? Math.round(rect.width);
      const h = heightProp;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        fillCanvas();
      }
    };

    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [widthProp, heightProp, fillCanvas]);

  useEffect(() => {
    fillCanvas();
  }, [fillCanvas, isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || disabled || readOnly) return;
    const preventTouch = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener('touchstart', preventTouch, { passive: false });
    canvas.addEventListener('touchmove', preventTouch, { passive: false });
    return () => {
      canvas.removeEventListener('touchstart', preventTouch);
      canvas.removeEventListener('touchmove', preventTouch);
    };
  }, [disabled, readOnly]);

  const getPointFromEvent = useCallback((e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled || readOnly) return;
    const point = getPointFromEvent(e);
    isDrawingRef.current = true;
    lastPointRef.current = point;
  }, [disabled, readOnly, getPointFromEvent]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || disabled || readOnly) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const lp = lastPointRef.current;
    if (!canvas || !ctx || !lp) return;

    const point = getPointFromEvent(e);
    ctx.beginPath();
    ctx.moveTo(lp.x, lp.y);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPointRef.current = point;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillCanvas();
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
    <div
      id={id}
      data-testid={testId}
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
      >
        <canvas
          ref={canvasRef}
          className="Bear-SignPad__canvas bear-block bear-rounded-lg bear-w-full bear-touch-none"
          style={{ height: heightProp }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {!hasSignature && (
          <div className={cn('Bear-SignPad__placeholder', SIGN_PAD_PLACEHOLDER_CLASSES)}>
            {placeholder}
          </div>
        )}

        <div className={cn('Bear-SignPad__line', SIGN_PAD_LINE_CLASSES)} />
        <span className={cn('Bear-SignPad__x-mark', SIGN_PAD_X_MARK_CLASSES)}>×</span>
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
