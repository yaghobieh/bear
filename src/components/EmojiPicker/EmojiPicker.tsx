import { FC, useState } from 'react';
import { cn } from '@utils';
import { BEAR_EMOJIS } from './EmojiPicker.const';
import type { EmojiPickerProps } from './EmojiPicker.types';

const sizeClasses = {
  sm: 'bear-w-8 bear-h-8 bear-text-lg',
  md: 'bear-w-10 bear-h-10 bear-text-xl',
  lg: 'bear-w-12 bear-h-12 bear-text-2xl',
};

const categories = Object.keys(BEAR_EMOJIS);

export const EmojiPicker: FC<EmojiPickerProps> = ({
  onSelect,
  size = 'md',
  maxHeight = 280,
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const emojis = BEAR_EMOJIS[activeCategory] ?? [];

  return (
    <div
      className={cn(
        'Bear-EmojiPicker bear-flex bear-flex-col bear-rounded-lg bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-shadow-lg bear-overflow-hidden',
        className
      )}
    >
      <div className="bear-flex bear-gap-1 bear-p-2 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700 bear-overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'bear-px-3 bear-py-1.5 bear-rounded-md bear-text-sm bear-font-medium bear-transition-colors bear-shrink-0',
              activeCategory === cat
                ? 'bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-gray-900 dark:bear-text-white'
                : 'bear-text-gray-600 dark:bear-text-zinc-400 hover:bear-text-gray-900 dark:hover:bear-text-white hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700/50'
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        className="bear-p-2 bear-overflow-y-auto bear-grid bear-grid-cols-8 bear-gap-1 bear-bg-gray-50 dark:bear-bg-zinc-900/50"
        style={{ maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }}
      >
        {emojis.map((emoji, i) => (
          <button
            key={`${emoji}-${i}`}
            type="button"
            onClick={() => onSelect?.(emoji)}
            className={cn(
              'bear-flex bear-items-center bear-justify-center bear-rounded-lg bear-transition-colors hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-700',
              sizeClasses[size]
            )}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
