import { FC, useContext, Children, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '@utils';
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

  const { activeTab, setActiveTab, variant } = context;
  const tabElements = Children.toArray(children).filter(isTabElement) as ReactElement<TabProps>[];
  const tabMeta = tabElements.map((el) => ({ id: el.props.id, label: el.props.children, disabled: el.props.disabled }));

  const reorderedIds = activeTab
    ? [activeTab, ...tabMeta.map((t) => t.id).filter((id) => id !== activeTab)]
    : tabMeta.map((t) => t.id);
  const visibleCount = maxVisibleTabs ?? reorderedIds.length;
  const visibleIds = reorderedIds.slice(0, visibleCount);
  const overflowIds = reorderedIds.slice(visibleCount);
  const overflowActive = overflowIds.includes(activeTab);

  const listClasses = cn(
    'Bear-Tabs__list',
    `Bear-Tabs__list--${variant}`,
    'bear-flex bear-gap-1',
    wrap && 'bear-flex-wrap',
    variant === 'line' && 'bear-border-b',
    variant === 'pills' && 'bear-p-1 bear-rounded-lg',
    variant === 'enclosed' && 'bear-border-b',
    className
  );

  const listStyle = {
    ...(variant === 'line' || variant === 'enclosed' ? { borderColor: 'var(--bear-border-default)' } : {}),
    ...(variant === 'pills' ? { backgroundColor: 'var(--bear-bg-tertiary)' } : {}),
  };

  return (
    <div role="tablist" className={listClasses} style={listStyle}>
      {maxVisibleTabs != null
        ? visibleIds.map((id) => {
            const el = tabElements.find((e) => e.props.id === id);
            return el ? cloneElement(el, { key: el.props.id }) : null;
          })
        : children}
      {maxVisibleTabs != null && overflowIds.length > 0 && (
        <Dropdown
          placement="bottom-start"
          closeOnSelect
          trigger={
            <button
              type="button"
              role="tab"
              aria-haspopup="listbox"
              aria-label="More tabs"
              className={cn(
                'bear-flex bear-items-center bear-gap-2 bear-px-4 bear-py-2 bear-text-sm bear-font-medium bear-transition-colors bear-border-0 bear-cursor-pointer',
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
      )}
    </div>
  );
};
