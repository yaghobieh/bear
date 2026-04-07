import { FC, useMemo, useCallback, useEffect, useRef, useState, useContext } from 'react';
import { BearContext } from '../../context/BearProvider';
import { cn } from '@utils';
import type { WatermarkProps } from './Watermark.types';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ROTATE,
  DEFAULT_OPACITY,
  DEFAULT_GAP,
  DEFAULT_OFFSET,
  DEFAULT_Z_INDEX,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_COLOR_LIGHT,
  DEFAULT_COLOR_DARK,
  DEFAULT_FONT_FAMILY,
  LINE_HEIGHT_MULTIPLIER,
  CANVAS_EXTRA_PADDING,
  CANVAS_WIDTH_OFFSET,
  HALF,
  DEG_TO_RAD,
  PATTERN_REPEAT_MIN,
  PATTERN_REPEAT_MAX,
} from './Watermark.const';

/**
 * Watermark - Overlay watermark text or image on content.
 * Auto-adapts to dark mode and uses BearProvider theme font.
 */
export const Watermark: FC<WatermarkProps> = (props) => {
  const {
    children,
    text,
    image,
    fontSize = DEFAULT_FONT_SIZE,
    color,
    rotate = DEFAULT_ROTATE,
    opacity = DEFAULT_OPACITY,
    patternRepeat = PATTERN_REPEAT_MIN,
    gap = DEFAULT_GAP,
    offset = DEFAULT_OFFSET,
    zIndex = DEFAULT_Z_INDEX,
    fontFamily,
    fontWeight = DEFAULT_FONT_WEIGHT,
    visible = true,
    className,
    style,
    testId,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const bear = useContext(BearContext);
  const [isDarkFallback, setIsDarkFallback] = useState(false);

  useEffect(() => {
    if (bear) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const checkDark = () => {
      const root = document.documentElement;
      const dark =
        root.classList.contains('dark') ||
        root.classList.contains('bear-dark') ||
        mq.matches;
      setIsDarkFallback(dark);
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    mq.addEventListener('change', checkDark);
    return () => {
      observer.disconnect();
      mq.removeEventListener('change', checkDark);
    };
  }, [bear]);

  const isDark = bear ? bear.mode === 'dark' : isDarkFallback;

  // Resolve font from theme CSS variable
  const resolvedFont = useMemo(() => {
    if (fontFamily) return fontFamily;
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const sans = getComputedStyle(root).getPropertyValue('--bear-font-sans');
      if (sans.trim()) return sans.trim();
      const legacy = getComputedStyle(root).getPropertyValue('--bear-font-family');
      if (legacy.trim()) return legacy.trim();
    }
    return DEFAULT_FONT_FAMILY;
  }, [fontFamily]);

  // Resolve color based on dark mode
  const resolvedColor = useMemo(() => {
    if (color) return color;
    return isDark ? DEFAULT_COLOR_DARK : DEFAULT_COLOR_LIGHT;
  }, [color, isDark]);

  const generateWatermark = useCallback(() => {
    if (!visible || (!text && !image)) return '';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const lines = Array.isArray(text) ? text : text ? [text] : [];
    const lineHeight = fontSize * LINE_HEIGHT_MULTIPLIER;
    const textHeight = lines.length * lineHeight;

    const canvasWidth = gap[0] + CANVAS_WIDTH_OFFSET;
    const canvasHeight = gap[1] + textHeight + CANVAS_EXTRA_PADDING;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const grid = Math.min(PATTERN_REPEAT_MAX, Math.max(PATTERN_REPEAT_MIN, Math.floor(patternRepeat)));
    const cellW = canvasWidth / grid;
    const cellH = canvasHeight / grid;

    const drawTextAt = (cx: number, cy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotate * DEG_TO_RAD);
      ctx.font = `${fontWeight} ${fontSize}px ${resolvedFont}`;
      ctx.fillStyle = resolvedColor;
      ctx.globalAlpha = opacity;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      lines.forEach((line, i) => {
        const y = (i - (lines.length - 1) / HALF) * lineHeight;
        ctx.fillText(line, 0, y);
      });
      ctx.restore();
    };

    if (image) {
      ctx.save();
      ctx.translate(canvasWidth / HALF, canvasHeight / HALF);
      ctx.rotate(rotate * DEG_TO_RAD);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, -img.width / HALF, -img.height / HALF);
      ctx.restore();
    } else if (grid <= 1) {
      drawTextAt(canvasWidth / HALF, canvasHeight / HALF);
    } else {
      for (let gy = 0; gy < grid; gy++) {
        for (let gx = 0; gx < grid; gx++) {
          drawTextAt(gx * cellW + cellW / HALF, gy * cellH + cellH / HALF);
        }
      }
    }

    return canvas.toDataURL();
  }, [
    text,
    image,
    fontSize,
    resolvedColor,
    rotate,
    opacity,
    gap,
    resolvedFont,
    fontWeight,
    visible,
    patternRepeat,
  ]);

  const backgroundImage = useMemo(() => generateWatermark(), [generateWatermark]);

  // Mutation observer — prevent watermark removal
  useEffect(() => {
    const el = watermarkRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      if (!containerRef.current?.contains(el)) {
        containerRef.current?.appendChild(el);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('Bear-Watermark', 'bear-relative', className)}
      style={style}
      data-testid={testId}
    >
      {children}
      {visible && backgroundImage && (
        <div
          ref={watermarkRef}
          className={cn(
            'Bear-Watermark__overlay',
            'bear-absolute bear-inset-0 bear-pointer-events-none bear-bg-repeat',
          )}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: `${offset[0]}px ${offset[1]}px`,
            zIndex,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
