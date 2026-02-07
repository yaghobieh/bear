import { FC, useState, useRef, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { cn } from '@utils';
import type { MentionsInputProps, MentionOption } from './MentionsInput.types';

const sizeClasses = {
  sm: 'bear-h-8 bear-text-sm bear-px-3',
  md: 'bear-h-10 bear-text-base bear-px-4',
  lg: 'bear-h-12 bear-text-lg bear-px-5',
};

const defaultFilter = (options: MentionOption[], query: string) => {
  const lower = query.toLowerCase();
  return options.filter(
    (opt) =>
      opt.value.toLowerCase().includes(lower) || String(opt.label).toLowerCase().includes(lower)
  );
};

export const MentionsInput: FC<MentionsInputProps> = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onMentionSelect,
  options,
  trigger = '@',
  placeholder = 'Type @ to mention...',
  disabled = false,
  maxSuggestions = 5,
  filterOptions = defaultFilter,
  size = 'md',
  fullWidth = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [triggerStart, setTriggerStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;

  const filteredOptions = filterOptions(options, query).slice(0, maxSuggestions);
  const showList = isOpen && query.length >= 0;

  const extractQuery = useCallback(() => {
    const idx = value.lastIndexOf(trigger);
    if (idx === -1) return { query: '', start: null };
    const after = value.slice(idx + trigger.length);
    const spaceIdx = after.indexOf(' ');
    const q = spaceIdx === -1 ? after : after.slice(0, spaceIdx);
    return { query: q, start: idx };
  }, [value, trigger]);

  useEffect(() => {
    const { query: q, start } = extractQuery();
    setQuery(q);
    setTriggerStart(start);
    setIsOpen(start !== null && !q.includes(' '));
  }, [value, extractQuery]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMentions = (text: string): string[] => {
    const re = new RegExp(`${trigger}(\\w+)`, 'g');
    const matches: string[] = [];
    let m;
    while ((m = re.exec(text)) !== null) {
      matches.push(m[1]);
    }
    return [...new Set(matches)];
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (controlledValue === undefined) setInternalValue(v);
    onChange?.(v, getMentions(v));
  };

  const insertMention = (option: MentionOption) => {
    if (triggerStart == null) return;
    const before = value.slice(0, triggerStart);
    const after = value.slice(triggerStart + trigger.length + query.length);
    const mention = `${trigger}${option.value}`;
    const next = before + mention + ' ' + after;
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next, getMentions(next));
    onMentionSelect?.(option);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showList || filteredOptions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt) insertMention(opt);
      return;
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'Bear-MentionsInput bear-relative',
        fullWidth && 'bear-w-full',
        className
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'bear-w-full bear-rounded-lg bear-border bear-border-gray-300 dark:bear-border-zinc-600 bear-bg-white dark:bear-bg-zinc-900 bear-text-gray-900 dark:bear-text-white placeholder:bear-text-gray-500 dark:placeholder:bear-text-zinc-500 bear-outline-none bear-transition-colors focus:bear-border-bear-500 focus:bear-ring-2 focus:bear-ring-bear-500/20',
          disabled && 'bear-opacity-50 bear-cursor-not-allowed',
          sizeClasses[size]
        )}
      />

      {showList && filteredOptions.length > 0 && (
        <div
          ref={listRef}
          className="bear-absolute bear-z-50 bear-mt-1 bear-w-full bear-max-h-48 bear-overflow-auto bear-rounded-lg bear-border bear-border-gray-200 dark:bear-border-zinc-600 bear-bg-white dark:bear-bg-zinc-800 bear-py-1 bear-shadow-lg"
        >
          {filteredOptions.map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              className={cn(
                'bear-w-full bear-flex bear-items-center bear-gap-2 bear-px-3 bear-py-2 bear-text-left bear-text-gray-800 dark:bear-text-zinc-200 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700 bear-transition-colors',
                i === highlightedIndex && 'bear-bg-gray-100 dark:bear-bg-zinc-700'
              )}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => insertMention(opt)}
            >
              {opt.avatar && <span className="bear-shrink-0">{opt.avatar}</span>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
