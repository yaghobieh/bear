import { FC, useState, useRef, useEffect } from 'react';
import { ColorPickerProps } from './ColorPicker.types';
import { cn } from '../../utils/cn';

const DEFAULT_PRESETS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#64748b', '#1e293b', '#000000', '#ffffff',
];

export const ColorPicker: FC<ColorPickerProps> = ({
  value = '#ec4899',
  onChange,
  presets = DEFAULT_PRESETS,
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
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      onChange?.(val);
    }
  };

  const handlePresetClick = (color: string) => {
    setInputValue(color);
    onChange?.(color);
  };

  const sizeClasses = {
    sm: { swatch: 'bear-w-6 bear-h-6', presetSwatch: 'bear-w-5 bear-h-5' },
    md: { swatch: 'bear-w-8 bear-h-8', presetSwatch: 'bear-w-6 bear-h-6' },
    lg: { swatch: 'bear-w-10 bear-h-10', presetSwatch: 'bear-w-7 bear-h-7' },
  };

  return (
    <div ref={containerRef} className={cn('bear-relative', className)}>
      {label && <label className="bear-block bear-text-sm bear-font-medium bear-text-zinc-300 bear-mb-1.5">{label}</label>}
      <div className="bear-flex bear-items-center bear-gap-2">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'bear-rounded-lg bear-border bear-border-zinc-600 bear-transition-all hover:bear-scale-105',
            sizeClasses[size].swatch,
            disabled && 'bear-opacity-50 bear-cursor-not-allowed'
          )}
          style={{ backgroundColor: value }}
        />
        {showInput && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder="#000000"
            className={cn(
              'bear-px-3 bear-py-1.5 bear-rounded-lg bear-border bear-border-zinc-600 bear-bg-zinc-800 bear-text-white bear-text-sm bear-font-mono bear-w-24 bear-outline-none focus:bear-border-pink-500',
              disabled && 'bear-opacity-50 bear-cursor-not-allowed'
            )}
          />
        )}
      </div>
      {isOpen && (
        <div className="bear-absolute bear-z-50 bear-mt-2 bear-bg-zinc-800 bear-border bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-p-3">
          <input
            type="color"
            value={value}
            onChange={(e) => { onChange?.(e.target.value); setInputValue(e.target.value); }}
            className="bear-w-full bear-h-32 bear-rounded bear-cursor-pointer bear-mb-3"
          />
          {showPresets && (
            <div className="bear-grid bear-grid-cols-6 bear-gap-1.5">
              {presets.map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetClick(color)}
                  className={cn(
                    'bear-rounded bear-border bear-transition-transform hover:bear-scale-110',
                    sizeClasses[size].presetSwatch,
                    value === color ? 'bear-border-white bear-ring-2 bear-ring-pink-500' : 'bear-border-zinc-600'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

