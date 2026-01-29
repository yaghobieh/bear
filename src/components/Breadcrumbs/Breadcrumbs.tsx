import { FC, useState } from 'react';
import { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';
import { cn } from '@utils';
import { BREADCRUMBS_SIZE, BREADCRUMBS_ICON_SIZE, BREADCRUMBS_DEFAULTS } from './Breadcrumbs.const';

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

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const {
    items,
    separator,
    maxItems,
    itemsBeforeCollapse = BREADCRUMBS_DEFAULTS.ITEMS_BEFORE_COLLAPSE,
    itemsAfterCollapse = BREADCRUMBS_DEFAULTS.ITEMS_AFTER_COLLAPSE,
    className,
    size = BREADCRUMBS_DEFAULTS.SIZE,
    showHomeIcon = BREADCRUMBS_DEFAULTS.SHOW_HOME_ICON,
    testId,
    id,
    'aria-label': ariaLabel = 'Breadcrumb',
  } = props;

  const [expanded, setExpanded] = useState(false);

  const renderSeparator = () => separator || <ChevronIcon className={cn(BREADCRUMBS_ICON_SIZE[size], 'bear-text-zinc-500 bear-mx-2')} />;

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const content = (
      <span className="bear-flex bear-items-center bear-gap-1">
        {index === 0 && showHomeIcon && <HomeIcon className={BREADCRUMBS_ICON_SIZE[size]} />}
        {item.icon}
        {item.label}
      </span>
    );

    if (isLast) {
      return <span className="bear-text-zinc-300 bear-font-medium" aria-current="page">{content}</span>;
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
        <button type="button" onClick={item.onClick} className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors">
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
    <nav
      id={id}
      data-testid={testId}
      className={cn('bear-flex bear-items-center bear-flex-wrap', BREADCRUMBS_SIZE[size], className)}
      aria-label={ariaLabel}
    >
      <ol className="bear-flex bear-items-center bear-flex-wrap bear-list-none bear-p-0 bear-m-0">
        {displayItems.map((item, index) => (
          <li key={index} className="bear-flex bear-items-center">
            {index > 0 && <span aria-hidden="true">{renderSeparator()}</span>}
            {item === 'ellipsis' ? (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors bear-px-1"
                aria-label="Show more breadcrumbs"
              >
                ...
              </button>
            ) : (
              renderItem(item, index, index === displayItems.length - 1)
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
