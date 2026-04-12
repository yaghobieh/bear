import { FC, useContext, Children, cloneElement, isValidElement, ReactElement, useEffect, useMemo, useState } from 'react';
import { cn } from '@utils';
import { useBearThemeOptional } from '../../context/BearProvider';
import { resolveMaxVisible } from '../../utils/maxVisible.utils';
import { Dropdown } from '../Dropdown';
import { BearIcons } from '../Icon';
import { TabsContext } from './Tabs';
import type { TabListProps, TabProps } from './Tabs.types';

function isTabElement(child: unknown): child is ReactElement<TabProps> {
  return isValidElement(child) && typeof (child as ReactElement).type !== 'string' && (child as ReactElement).props?.id != null;
}

export const TabList: FC<TabListProps> = ({ children, maxVisibleTabs, wrap = false, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabList must be used within Tabs');

  const theme = useBearThemeOptional();
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const resolvedMax = useMemo(
    () => resolveMaxVisible(maxVisibleTabs, { width: vw, theme }),
    [maxVisibleTabs, vw, theme]
  );

  const { activeTab, setActiveTab, variant } = context;
  const tabElements = Children.toArray(children).filter(isTabElement) as ReactElement<TabProps>[];
  const tabMeta = tabElements.map((el) => ({ id: el.props.id, label: el.props.children, disabled: el.props.disabled }));

  const reorderedIds = activeTab
    ? [activeTab, ...tabMeta.map((t) => t.id).filter((id) => id !== activeTab)]
    : tabMeta.map((t) => t.id);
  const visibleCount = resolvedMax ?? reorderedIds.length;
  const visibleIds = reorderedIds.slice(0, visibleCount);
  const overflowIds = reorderedIds.slice(visibleCount);
  const overflowActive = overflowIds.includes(activeTab);

  const listClasses = cn(
    'Bear-Tabs__list',
    `Bear-Tabs__list--${variant}`,
    resolvedMax != null && !wrap && 'bear-flex bear-w-full bear-min-w-0 bear-items-stretch',
    (!resolvedMax || wrap) && 'bear-flex bear-gap-1',
    wrap && 'bear-flex-wrap',
    !wrap && !resolvedMax && 'bear-gap-1',
    variant === 'line' && 'bear-border-b',
    variant === 'pills' && 'bear-p-1 bear-rounded-lg',
    variant === 'enclosed' && 'bear-border-b',
    className
  );

  const listStyle = {
    ...(variant === 'line' || variant === 'enclosed' ? { borderColor: 'var(--bear-border-default)' } : {}),
    ...(variant === 'pills' ? { backgroundColor: 'var(--bear-bg-tertiary)' } : {}),
  };

  const tabsRow = (
    <>
      {resolvedMax != null
        ? visibleIds.map((id) => {
            const el = tabElements.find((e) => e.props.id === id);
            return el ? cloneElement(el, { key: el.props.id }) : null;
          })
        : children}
    </>
  );

  const overflowMenu =
    resolvedMax != null && overflowIds.length > 0 ? (
      <div className="bear-flex bear-h-full bear-flex-shrink-0 bear-items-stretch">
        <Dropdown
          placement="bottom-end"
          closeOnSelect
          trigger={
            <button
              type="button"
              role="tab"
              aria-haspopup="listbox"
              aria-label="More tabs"
              className={cn(
                'bear-flex bear-h-full bear-items-center bear-gap-2 bear-px-3 bear-py-2 bear-text-sm bear-font-medium bear-transition-colors bear-border-0 bear-cursor-pointer',
                variant === 'pills' && 'bear-rounded-md',
                overflowActive && 'bear-shadow-sm',
                !overflowActive && 'hover:bear-bg-[var(--bear-bg-tertiary)] hover:bear-text-[var(--bear-text-primary)]'
              )}
              style={
                overflowActive
                  ? { backgroundColor: 'var(--bear-bg-primary)', color: 'var(--bear-text-primary)' }
                  : { color: 'var(--bear-text-muted)' }
              }
            >
              <BearIcons.MoreHorizIcon size={18} />
            </button>
          }
          items={overflowIds.map((id) => {
            const meta = tabMeta.find((t) => t.id === id);
            return {
              key: id,
              label: meta?.label ?? id,
              disabled: meta?.disabled,
              onClick: () => setActiveTab(id),
            };
          })}
        />
      </div>
    ) : null;

  if (resolvedMax != null && !wrap) {
    return (
      <div role="tablist" className={listClasses} style={listStyle}>
        <div className="bear-flex bear-min-w-0 bear-flex-1 bear-items-center bear-gap-1 bear-overflow-x-auto bear-overflow-y-visible bear-flex-nowrap">
          {tabsRow}
        </div>
        {overflowMenu}
      </div>
    );
  }

  return (
    <div role="tablist" className={listClasses} style={listStyle}>
      {tabsRow}
      {overflowMenu}
    </div>
  );
};
