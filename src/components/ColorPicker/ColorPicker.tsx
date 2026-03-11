import { FC, useState, useRef, useEffect } from 'react';
import { ColorPickerProps } from './ColorPicker.types';
import { cn } from '@utils';
import {
  COLOR_PICKER_DEFAULT_VALUE,
  COLOR_PICKER_HEX_PATTERN,
  COLOR_PICKER_DEFAULT_PRESETS,
  COLOR_PICKER_SWATCH_SIZE,
  COLOR_PICKER_LABEL_CLASSES,
  COLOR_PICKER_INPUT_CLASSES,
  COLOR_PICKER_SWATCH_CLASSES,
  COLOR_PICKER_POPUP_CLASSES,
  COLOR_PICKER_NATIVE_INPUT_CLASSES,
  COLOR_PICKER_PRESET_ACTIVE_CLASSES,
  COLOR_PICKER_PRESET_INACTIVE_CLASSES,
  COLOR_PICKER_PRESET_ITEM_CLASSES,
  COLOR_PICKER_GRID_CLASSES,
} from './ColorPicker.const';

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (COLOR_PICKER_HEX_PATTERN.test(val)) {
      onChange?.(val);
    }
  };

  const handlePresetClick = (color: string) => {
    setInputValue(color);
    onChange?.(color);
  };

  const sizes = COLOR_PICKER_SWATCH_SIZE[size];

  return (
    <div ref={containerRef} className={cn('bear-relative bear-inline-block', className)}>
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
        <div className={COLOR_PICKER_POPUP_CLASSES}>
          <input
            type="color"
            value={value}
            onChange={(e) => {
              onChange?.(e.target.value);
              setInputValue(e.target.value);
            }}
            className={COLOR_PICKER_NATIVE_INPUT_CLASSES}
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
      )}
    </div>
  );
};
