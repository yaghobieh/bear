import { FC, useState, useCallback, useRef } from 'react';
import { cn } from '@utils';
import { Chip } from '../Chip';
import type { TagsInputProps } from './TagsInput.types';

const sizeClasses = {
  sm: 'bear-h-8 bear-text-sm bear-gap-1.5 bear-px-2',
  md: 'bear-h-10 bear-text-base bear-gap-2 bear-px-3',
  lg: 'bear-h-12 bear-text-lg bear-gap-2.5 bear-px-4',
};

const chipSizeMap = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const };

export const TagsInput: FC<TagsInputProps> = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  onAdd,
  onRemove,
  placeholder = 'Add tags...',
  disabled = false,
  maxTags,
  minLength = 1,
  maxLength,
  separators = [',', 'Enter'],
  size = 'md',
  fullWidth = false,
  className,
}) => {
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = controlledValue ?? internalTags;
  const canAdd = !maxTags || tags.length < maxTags;

  const addTag = useCallback(
    (raw: string) => {
      const tag = raw.trim().slice(0, maxLength ?? raw.length);
      if (!tag || tag.length < minLength) return;
      if (tags.includes(tag)) return;
      if (maxTags != null && tags.length >= maxTags) return;

      const next = [...tags, tag];
      if (controlledValue === undefined) setInternalTags(next);
      onChange?.(next);
      onAdd?.(tag);
    },
    [tags, controlledValue, minLength, maxLength, maxTags, onChange, onAdd]
  );

  const removeTag = useCallback(
    (tag: string, index: number) => {
      const next = tags.filter((_, i) => i !== index);
      if (controlledValue === undefined) setInternalTags(next);
      onChange?.(next);
      onRemove?.(tag, index);
    },
    [tags, controlledValue, onChange, onRemove]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (separators.includes(e.key)) {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length) {
      removeTag(tags[tags.length - 1], tags.length - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const sep = separators.find((s) => v.includes(s));
    if (sep) {
      const parts = v.split(sep);
      parts.slice(0, -1).forEach((p: string) => addTag(p));
      setInputValue(parts[parts.length - 1]?.trim() ?? '');
    } else {
      setInputValue(v);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue('');
    }
  };

  return (
    <div
      className={cn(
        'Bear-TagsInput bear-flex bear-flex-wrap bear-items-center bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-bg-white dark:bear-bg-zinc-900 bear-transition-colors focus-within:bear-border-bear-500 focus-within:bear-ring-2 focus-within:bear-ring-bear-500/20',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        fullWidth && 'bear-w-full',
        sizeClasses[size],
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, i) => (
        <Chip
          key={`${tag}-${i}`}
          variant="soft"
          color="primary"
          size={chipSizeMap[size]}
          onDelete={disabled ? undefined : () => removeTag(tag, i)}
          className="bear-shrink-0"
        >
          {tag}
        </Chip>
      ))}
      {canAdd && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length ? '' : placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className="bear-min-w-[80px] bear-flex-1 bear-bg-transparent bear-outline-none bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-500 dark:placeholder:bear-text-zinc-500"
        />
      )}
    </div>
  );
};
