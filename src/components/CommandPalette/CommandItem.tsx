import { FC } from 'react';
import { cn } from '@utils';
import type { CommandItemComponentProps } from './CommandPalette.types';
import { formatShortcut } from './CommandPalette.utils';

/**
 * CommandItem - Single command item within CommandPalette
 */
export const CommandItem: FC<CommandItemComponentProps> = ({
  command,
  isHighlighted,
  onSelect,
}) => (
  <button
    type="button"
    onClick={onSelect}
    disabled={command.disabled}
    className={cn(
      'Bear-CommandPalette__item bear-w-full bear-flex bear-items-center bear-gap-3 bear-px-4 bear-py-2.5 bear-text-left bear-transition-colors',
      isHighlighted
        ? 'bear-bg-primary-500/20 bear-text-primary-400'
        : 'bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700',
      command.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
    )}
  >
    {command.icon && (
      <span className="Bear-CommandPalette__item-icon bear-text-gray-500 dark:bear-text-zinc-400 bear-shrink-0">
        {command.icon}
      </span>
    )}
    <div className="Bear-CommandPalette__item-content bear-flex-1 bear-min-w-0">
      <div className="Bear-CommandPalette__item-label bear-text-sm bear-font-medium bear-truncate">
        {command.label}
      </div>
      {command.description && (
        <div className="Bear-CommandPalette__item-description bear-text-xs bear-text-gray-500 dark:bear-text-zinc-500 bear-truncate">
          {command.description}
        </div>
      )}
    </div>
    {command.shortcut && (
      <div className="Bear-CommandPalette__item-shortcut bear-flex bear-gap-1 bear-shrink-0">
        {formatShortcut(command.shortcut).map((key, idx) => (
          <kbd
            key={idx}
            className="bear-px-1.5 bear-py-0.5 bear-text-xs bear-font-mono bear-bg-gray-200 bear-text-gray-600 dark:bear-bg-zinc-700 dark:bear-text-zinc-400 bear-rounded"
          >
            {key}
          </kbd>
        ))}
      </div>
    )}
  </button>
);
