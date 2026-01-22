import { FC, useState } from 'react';
import { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';
import { cn } from '../../utils/cn';

const HomeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ChevronIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  separator,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className,
  size = 'md',
  showHomeIcon = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const sizeClasses = { sm: 'bear-text-xs', md: 'bear-text-sm', lg: 'bear-text-base' };
  const iconSizes = { sm: 'bear-w-3 bear-h-3', md: 'bear-w-4 bear-h-4', lg: 'bear-w-5 bear-h-5' };

  const renderSeparator = () => separator || <ChevronIcon className={cn(iconSizes[size], 'bear-text-zinc-500 bear-mx-2')} />;

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const content = (
      <span className="bear-flex bear-items-center bear-gap-1">
        {index === 0 && showHomeIcon && <HomeIcon className={iconSizes[size]} />}
        {item.icon}
        {item.label}
      </span>
    );

    if (isLast) {
      return <span className="bear-text-zinc-300 bear-font-medium">{content}</span>;
    }

    if (item.href) {
      return (
        <a href={item.href} className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors">
          {content}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button onClick={item.onClick} className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors">
          {content}
        </button>
      );
    }

    return <span className="bear-text-zinc-400">{content}</span>;
  };

  const shouldCollapse = maxItems && items.length > maxItems && !expanded;
  let displayItems: (BreadcrumbItem | 'ellipsis')[] = items;

  if (shouldCollapse) {
    const before = items.slice(0, itemsBeforeCollapse);
    const after = items.slice(-itemsAfterCollapse);
    displayItems = [...before, 'ellipsis', ...after];
  }

  return (
    <nav className={cn('bear-flex bear-items-center bear-flex-wrap', sizeClasses[size], className)} aria-label="Breadcrumb">
      {displayItems.map((item, index) => (
        <span key={index} className="bear-flex bear-items-center">
          {index > 0 && renderSeparator()}
          {item === 'ellipsis' ? (
            <button
              onClick={() => setExpanded(true)}
              className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors bear-px-1"
            >
              ...
            </button>
          ) : (
            renderItem(item, index, index === displayItems.length - 1)
          )}
        </span>
      ))}
    </nav>
  );
};

