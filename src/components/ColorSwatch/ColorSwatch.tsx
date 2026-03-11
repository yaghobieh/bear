import { FC, useCallback, useMemo } from 'react';
import { cn } from '@utils';
import type { ColorSwatchProps, ColorSwatchGroupProps } from './ColorSwatch.types';
import {
  SIZE_MAP, SWATCH_CLASSES, SWATCH_SELECTED_CLASSES,
  SWATCH_DEFAULT_BORDER, SWATCH_LIGHT_BORDER,
  CHECK_CLASSES, LIGHT_CHECK_CLASSES,
  GROUP_CLASSES, LABEL_CLASSES, DEFAULT_GAP,
} from './ColorSwatch.const';
import { isLightColor } from './ColorSwatch.utils';

export const ColorSwatch: FC<ColorSwatchProps> = ({
  color, selected = false, size = 'md', rounded = true,
  label, onClick, className, testId, ...rest
}) => {
  const dim = SIZE_MAP[size];
  const light = isLightColor(color);
  const checkSize = Math.max(12, dim * 0.4);

  return (
    <div className="bear-inline-flex bear-flex-col bear-items-center">
      <div
        className={cn(
          SWATCH_CLASSES,
          selected && SWATCH_SELECTED_CLASSES,
          light ? SWATCH_LIGHT_BORDER : SWATCH_DEFAULT_BORDER,
          rounded ? 'bear-rounded-full' : 'bear-rounded-md',
          className,
        )}
        style={{ width: dim, height: dim, backgroundColor: color }}
        onClick={onClick}
        role="option"
        aria-selected={selected}
        aria-label={label ?? color}
        data-testid={testId}
        {...rest}
      >
        {selected && (
          <svg className={cn(light ? LIGHT_CHECK_CLASSES : CHECK_CLASSES)} width={checkSize} height={checkSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {label && <span className={LABEL_CLASSES} style={{ maxWidth: dim + 8 }}>{label}</span>}
    </div>
  );
};

export const ColorSwatchGroup: FC<ColorSwatchGroupProps> = ({
  colors, value, onChange, multiple = false,
  size = 'md', rounded = true, gap = DEFAULT_GAP,
  columns, showLabel = false, className, testId, ...rest
}) => {
  const selected = useMemo(() => {
    if (!value) return new Set<string>();
    return new Set(Array.isArray(value) ? value : [value]);
  }, [value]);

  const handleClick = useCallback((color: string) => {
    if (multiple) {
      const next = new Set(selected);
      next.has(color) ? next.delete(color) : next.add(color);
      onChange?.(Array.from(next));
    } else {
      onChange?.(color);
    }
  }, [multiple, selected, onChange]);

  return (
    <div
      className={cn(GROUP_CLASSES, className)}
      style={{
        gap,
        ...(columns ? { display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}),
      }}
      role="listbox"
      aria-multiselectable={multiple}
      data-testid={testId}
      {...rest}
    >
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          selected={selected.has(color)}
          size={size}
          rounded={rounded}
          label={showLabel ? color : undefined}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorSwatch;
