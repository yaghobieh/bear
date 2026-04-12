import { FC, useEffect, useMemo, useState } from 'react';
import { useBearThemeOptional } from '@context/BearProvider';
import { resolveMaxVisible } from '@utils/maxVisible.utils';
import { cn } from '@utils';
import { Dropdown } from '../Dropdown';
import { BearIcons } from '../Icon';
import { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';
import { BREADCRUMBS_SIZE, BREADCRUMBS_ICON_SIZE, BREADCRUMBS_DEFAULTS } from './Breadcrumbs.const';

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

  const theme = useBearThemeOptional();
  const [ellipsisPickIndex, setEllipsisPickIndex] = useState<number | null>(null);
  const [itemDropdownPick, setItemDropdownPick] = useState<Record<number, string>>({});
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  useEffect(() => {
    const r = () => setVw(window.innerWidth);
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  useEffect(() => {
    setEllipsisPickIndex(null);
    setItemDropdownPick({});
  }, [items]);

  const resolvedCollapseThreshold = useMemo(
    () => (maxItems == null ? undefined : resolveMaxVisible(maxItems, { width: vw, theme })),
    [maxItems, vw, theme]
  );

  const renderSeparator = () => separator || (
    <BearIcons.ChevronRightIcon className={cn(BREADCRUMBS_ICON_SIZE[size], 'bear-text-zinc-500 bear-mx-2')} />
  );

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const content = (
      <span className="bear-flex bear-items-center bear-gap-1 bear-max-w-[12rem] bear-truncate md:bear-max-w-none">
        {index === 0 && showHomeIcon && <BearIcons.HomeIcon className={BREADCRUMBS_ICON_SIZE[size]} />}
        {item.icon}
        {item.label}
      </span>
    );

    const body = (() => {
      if (isLast) {
        return <span className="bear-text-zinc-300 bear-font-medium" aria-current="page">{content}</span>;
      }
      if (item.href) {
        return (
          <a href={item.href} className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors bear-truncate">
            {content}
          </a>
        );
      }
      if (item.onClick) {
        return (
          <button type="button" onClick={item.onClick} className="bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors bear-truncate">
            {content}
          </button>
        );
      }
      return <span className="bear-text-zinc-400 bear-truncate">{content}</span>;
    })();

    if (item.dropdownItems && item.dropdownItems.length > 0 && !isLast) {
      const selectedKey = itemDropdownPick[index];
      const selectedOption = item.dropdownItems.find((opt) => opt.key === selectedKey);
      return (
        <Dropdown
          placement="bottom-start"
          closeOnSelect
          trigger={
            <button
              type="button"
              className="bear-inline-flex bear-items-center bear-gap-1 bear-text-zinc-400 hover:bear-text-pink-400 bear-transition-colors"
              aria-haspopup="true"
            >
              {content}
              {selectedOption && (
                <span className="bear-ml-1 bear-max-w-[8rem] bear-truncate bear-text-xs bear-text-zinc-300">
                  {selectedOption.label}
                </span>
              )}
              <BearIcons.ChevronDownIcon size={14} />
            </button>
          }
          items={item.dropdownItems.map((d) => ({
            key: d.key,
            label: d.label,
            disabled: d.disabled,
            selected: selectedKey === d.key,
            onClick: () => {
              setItemDropdownPick((prev) => ({ ...prev, [index]: d.key }));
              d.onClick?.();
            },
          }))}
        />
      );
    }

    return body;
  };

  const shouldCollapse =
    resolvedCollapseThreshold != null && items.length > resolvedCollapseThreshold;

  const hiddenStart = itemsBeforeCollapse;
  const hiddenEndExclusive = items.length - itemsAfterCollapse;

  type Segment = { type: 'item'; item: BreadcrumbItem; index: number } | { type: 'ellipsis'; hidden: BreadcrumbItem[] };

  let segments: Segment[] = items.map((item, index) => ({ type: 'item', item, index }));

  if (shouldCollapse) {
    const before = items.slice(0, itemsBeforeCollapse);
    const after = items.slice(-itemsAfterCollapse);
    const hidden = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);
    segments = [
      ...before.map((item, i) => ({ type: 'item' as const, item, index: i })),
      ...(hidden.length ? [{ type: 'ellipsis' as const, hidden }] : []),
      ...after.map((item, i) => ({
        type: 'item' as const,
        item,
        index: items.length - itemsAfterCollapse + i,
      })),
    ];
  }

  const ellipsisPickInRange =
    ellipsisPickIndex != null &&
    ellipsisPickIndex >= hiddenStart &&
    ellipsisPickIndex < hiddenEndExclusive;

  return (
    <nav
      id={id}
      data-testid={testId}
      className={cn('bear-flex bear-min-w-0 bear-items-center bear-flex-wrap', BREADCRUMBS_SIZE[size], className)}
      aria-label={ariaLabel}
    >
      <ol className="bear-flex bear-min-w-0 bear-items-center bear-flex-wrap bear-list-none bear-p-0 bear-m-0">
        {segments.map((seg, si) => (
          <li key={si} className="bear-flex bear-min-w-0 bear-items-center">
            {si > 0 && <span aria-hidden="true">{renderSeparator()}</span>}
            {seg.type === 'ellipsis' ? (
              <span className="bear-inline-flex bear-min-w-0 bear-max-w-full bear-items-center bear-gap-1">
                <Dropdown
                  placement="bottom-start"
                  closeOnSelect
                  trigger={
                    <button
                      type="button"
                      className="bear-inline-flex bear-items-center bear-justify-center bear-rounded bear-px-2 bear-py-1 bear-text-zinc-400 hover:bear-bg-[var(--bear-bg-tertiary)] hover:bear-text-pink-400 bear-transition-colors"
                      aria-label="Hidden breadcrumbs"
                    >
                      <BearIcons.MoreHorizIcon size={18} />
                    </button>
                  }
                  items={seg.hidden.map((it, hi) => {
                    const globalIndex = hiddenStart + hi;
                    return {
                      key: `${it.label}-${hi}`,
                      label: it.label,
                      onClick: () => {
                        setEllipsisPickIndex(globalIndex);
                        it.onClick?.();
                      },
                    };
                  })}
                />
                {ellipsisPickInRange && ellipsisPickIndex != null && (
                  <span className="bear-min-w-0 bear-max-w-[12rem] bear-truncate md:bear-max-w-none bear-inline-flex bear-items-center">
                    {renderItem(
                      items[ellipsisPickIndex],
                      ellipsisPickIndex,
                      ellipsisPickIndex === items.length - 1
                    )}
                  </span>
                )}
              </span>
            ) : (
              renderItem(seg.item, seg.index, seg.index === items.length - 1)
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
