import { FC, useState, useRef, useEffect } from 'react';
import type { ColorPickerProps } from './ColorPicker.types';
import { cn } from '@utils';
import { Portal } from '../Portal';
import {
  COLOR_PICKER_DEFAULT_VALUE,
  COLOR_PICKER_HEX_PATTERN,
  COLOR_PICKER_DEFAULT_PRESETS,
  COLOR_PICKER_SWATCH_SIZE,
  COLOR_PICKER_LABEL_CLASSES,
  COLOR_PICKER_INPUT_CLASSES,
  COLOR_PICKER_SWATCH_CLASSES,
  COLOR_PICKER_POPUP_CLASSES,
  COLOR_PICKER_HUE_STRIP_CLASSES,
  COLOR_PICKER_PRESET_ACTIVE_CLASSES,
  COLOR_PICKER_PRESET_INACTIVE_CLASSES,
  COLOR_PICKER_PRESET_ITEM_CLASSES,
  COLOR_PICKER_GRID_CLASSES,
  COLOR_PICKER_POPUP_Z_INDEX,
  COLOR_PICKER_HUE_BACKGROUND,
} from './ColorPicker.const';
import { hexToRgb, rgbToHsv, hsvToHex } from './ColorPicker.utils';

export const ColorPicker: FC<ColorPickerProps> = ({
  value = COLOR_PICKER_DEFAULT_VALUE,
  onChange,
  presets = COLOR_PICKER_DEFAULT_PRESETS,
  showInput = true,
  showPresets = true,
  disabled = false,
  label,
  size = 'md',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [hsv, setHsv] = useState({ h: 330, s: 80, v: 90 });
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const svRef = useRef<HTMLDivElement>(null);
  const hsvRef = useRef(hsv);
  hsvRef.current = hsv;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!isOpen || !rootRef.current) return;
    const update = () => {
      const r = rootRef.current!.getBoundingClientRect();
      const w = 256;
      let left = r.left;
      left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
      setPopupPos({ top: r.bottom + 8, left });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const rgb = hexToRgb(value);
      if (rgb) setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b));
    }
  }, [isOpen, value]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (popupRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const applyHsv = (h: number, s: number, v: number) => {
    setHsv({ h, s, v });
    const hex = hsvToHex(h, s, v);
    onChange?.(hex);
    setInputValue(hex);
  };

  const onSvPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = svRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    applyHsv(hsvRef.current.h, x * 100, (1 - y) * 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (COLOR_PICKER_HEX_PATTERN.test(val)) {
      onChange?.(val);
      const rgb = hexToRgb(val);
      if (rgb) setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b));
    }
  };

  const handlePresetClick = (color: string) => {
    setInputValue(color);
    onChange?.(color);
    const rgb = hexToRgb(color);
    if (rgb) setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b));
  };

  const sizes = COLOR_PICKER_SWATCH_SIZE[size];

  return (
    <div ref={rootRef} className={cn('bear-relative bear-inline-block', className)}>
      {label && <label className={COLOR_PICKER_LABEL_CLASSES}>{label}</label>}
      <div className="bear-flex bear-items-center bear-gap-2">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            COLOR_PICKER_SWATCH_CLASSES,
            sizes.swatch,
            disabled && 'bear-opacity-50 bear-cursor-not-allowed'
          )}
          style={{ backgroundColor: value }}
          aria-label="Pick color"
        />
        {showInput && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder="#000000"
            className={cn(
              COLOR_PICKER_INPUT_CLASSES,
              disabled && 'bear-opacity-50 bear-cursor-not-allowed'
            )}
          />
        )}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={popupRef}
            className={COLOR_PICKER_POPUP_CLASSES}
            style={{ position: 'fixed', top: popupPos.top, left: popupPos.left, zIndex: COLOR_PICKER_POPUP_Z_INDEX }}
          >
            <div
              ref={svRef}
              role="presentation"
              className="bear-relative bear-mb-3 bear-h-28 bear-w-full bear-cursor-crosshair bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-touch-none"
              style={{
                backgroundImage: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${Math.round(hsv.h)}, 100%, 50%))`,
              }}
              onPointerDown={(e) => {
                onSvPointer(e);
                (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (e.pressure > 0 || e.buttons > 0) onSvPointer(e);
              }}
            />
            <input
              type="range"
              min={0}
              max={359}
              value={Math.round(hsv.h)}
              aria-label="Hue"
              onChange={(e) => applyHsv(Number(e.target.value), hsv.s, hsv.v)}
              className={COLOR_PICKER_HUE_STRIP_CLASSES}
              style={{ background: COLOR_PICKER_HUE_BACKGROUND }}
            />
            {showPresets && (
              <div className={COLOR_PICKER_GRID_CLASSES}>
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handlePresetClick(color)}
                    className={cn(
                      COLOR_PICKER_PRESET_ITEM_CLASSES,
                      sizes.presetSwatch,
                      value === color ? COLOR_PICKER_PRESET_ACTIVE_CLASSES : COLOR_PICKER_PRESET_INACTIVE_CLASSES
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            )}
          </div>
        </Portal>
      )}
    </div>
  );
};
