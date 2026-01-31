import { FC, useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@utils';
import { Button } from '../Button';
import type { SignPadProps } from './SignPad.types';
import {
  SIGN_PAD_DEFAULT_WIDTH,
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
 * @example
 * ```tsx
 * const [signature, setSignature] = useState<string | null>(null);
 * 
 * <SignPad
 *   onChange={setSignature}
 *   placeholder="Sign here"
 * />
 * ```
 */
export const SignPad: FC<SignPadProps> = (props) => {
  const {
    onChange,
    width = SIGN_PAD_DEFAULT_WIDTH,
    height = SIGN_PAD_DEFAULT_HEIGHT,
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    
    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Resolve stroke color and background based on dark mode
  const strokeColor = strokeColorProp || (isDarkMode ? SIGN_PAD_STROKE_DARK : SIGN_PAD_STROKE_LIGHT);
  const backgroundColor = backgroundColorProp || (isDarkMode ? SIGN_PAD_BG_DARK : SIGN_PAD_BG_LIGHT);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }, [width, height, backgroundColor, isDarkMode]);

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
    setIsDrawing(true);
    setLastPoint(point);
  }, [disabled, readOnly, getPointFromEvent]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled || readOnly) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !lastPoint) return;

    const point = getPointFromEvent(e);

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    setLastPoint(point);
    setHasSignature(true);
  }, [isDrawing, disabled, readOnly, lastPoint, strokeColor, strokeWidth, getPointFromEvent]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && hasSignature) {
      const canvas = canvasRef.current;
      if (canvas && onChange) {
        const data = canvas.toDataURL(outputFormat, outputQuality);
        onChange(data);
      }
    }
    
    setIsDrawing(false);
    setLastPoint(null);
  }, [isDrawing, hasSignature, onChange, outputFormat, outputQuality]);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setHasSignature(false);
    onChange?.(null);
  }, [backgroundColor, onChange]);

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
        'Bear-SignPad bear-max-w-full bear-w-full',
        SIGN_PAD_ROOT_CLASSES,
        disabled && 'Bear-SignPad--disabled bear-opacity-50',
        readOnly && 'Bear-SignPad--readonly',
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          'Bear-SignPad__canvas-wrapper bear-max-w-full bear-overflow-hidden',
          SIGN_PAD_CANVAS_WRAPPER_CLASSES,
          !disabled && !readOnly && SIGN_PAD_CANVAS_WRAPPER_HOVER,
          disabled && 'bear-cursor-not-allowed',
          !disabled && !readOnly && 'bear-cursor-crosshair'
        )}
      >
        <canvas
          ref={canvasRef}
          className="Bear-SignPad__canvas bear-block bear-rounded-lg bear-max-w-full"
          style={{ width, height }}
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
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClear}
              disabled={disabled || !hasSignature}
            >
              {clearText}
            </Button>
          )}
          {showSave && (
            <Button
              size="sm"
              variant="primary"
              onClick={handleSave}
              disabled={disabled || !hasSignature}
            >
              {saveText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignPad;
