import { FC } from 'react';
import { cn } from '@utils';
import type { CascaderPanelProps, CascaderOption } from '../../Cascader.types';

export const CascaderPanel: FC<CascaderPanelProps> = ({
  options,
  selectedPath,
  expandedPath,
  onSelect,
  onExpand,
  expandTrigger,
  level,
}) => {
  const handleClick = (option: CascaderOption) => {
    onSelect(option, level);
    if (option.children?.length) {
      onExpand(option, level);
    }
  };

  const handleMouseEnter = (option: CascaderOption) => {
    if (expandTrigger === 'hover' && option.children?.length) {
      onExpand(option, level);
    }
  };

  return (
    <div className="Bear-Cascader__panel bear-min-w-[180px] bear-max-h-[280px] bear-overflow-y-auto bear-border-r bear-border-zinc-200 dark:bear-border-zinc-700 last:bear-border-r-0">
      {options.map((option) => {
        const isSelected = selectedPath[level] === option.value;
        const isExpanded = expandedPath[level] === option.value;
        const hasChildren = option.children && option.children.length > 0;

        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => handleClick(option)}
            onMouseEnter={() => handleMouseEnter(option)}
            className={cn(
              'Bear-Cascader__option bear-w-full bear-flex bear-items-center bear-justify-between bear-px-3 bear-py-2 bear-text-sm bear-text-left bear-transition-colors',
              isSelected && 'Bear-Cascader__option--selected bear-bg-pink-500/20 bear-text-pink-600 dark:bear-text-pink-400',
              isExpanded && !isSelected && 'Bear-Cascader__option--expanded bear-bg-gray-100 dark:bear-bg-zinc-700',
              !isSelected && !isExpanded && 'bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700',
              option.disabled && 'Bear-Cascader__option--disabled bear-opacity-50 bear-cursor-not-allowed'
            )}
          >
            <span className="bear-flex bear-items-center bear-gap-2">
              {option.icon && <span className="Bear-Cascader__option-icon">{option.icon}</span>}
              <span className="Bear-Cascader__option-label">{option.label}</span>
            </span>
            {hasChildren && (
              <svg className="Bear-Cascader__arrow bear-w-4 bear-h-4 bear-text-gray-500 dark:bear-text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};
