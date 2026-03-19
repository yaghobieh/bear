import { FC, useState, createContext, useContext } from 'react';
import { cn } from '@utils';
import type { TabsContextValue, TabsProps, TabProps } from './Tabs.types';

export const TabsContext = createContext<TabsContextValue | null>(null);

export const Tabs: FC<TabsProps> = ({
  children,
  value,
  defaultTab,
  variant = 'line',
  onChange,
  className,
  testId,
}) => {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalTab;

  const setActiveTab = (id: string) => {
    if (!isControlled) setInternalTab(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={cn('Bear-Tabs', className)} data-testid={testId}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const Tab: FC<TabProps> = ({ id, children, disabled = false, icon }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab, variant } = context;
  const isActive = activeTab === id;

  const baseClasses = 'bear-flex bear-items-center bear-gap-2 bear-px-4 bear-py-2 bear-text-sm bear-font-medium bear-transition-colors';

  const variantClasses = {
    line: cn(
      'bear-border-b-2 bear--mb-px',
      isActive
        ? 'bear-border-pink-500 bear-text-pink-600 dark:bear-text-pink-400'
        : 'bear-border-transparent hover:bear-border-[var(--bear-border-default)]'
    ),
    pills: cn(
      'bear-rounded-md',
      isActive && 'bear-shadow-sm'
    ),
    enclosed: cn(
      'bear-rounded-t-lg bear-border bear-border-transparent',
      isActive && 'bear--mb-px'
    ),
  };

  const tabStyle =
    disabled
      ? undefined
      : isActive
        ? variant === 'pills'
          ? { backgroundColor: 'var(--bear-bg-primary)', color: 'var(--bear-text-primary)' }
          : variant === 'enclosed'
            ? {
                backgroundColor: 'var(--bear-bg-primary)',
                borderColor: 'var(--bear-border-default)',
                borderBottomColor: 'var(--bear-bg-primary)',
                color: 'var(--bear-text-primary)',
              }
            : undefined
        : { color: 'var(--bear-text-muted)' };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(id)}
      className={cn(
        'Bear-Tabs__tab',
        isActive && 'Bear-Tabs__tab--active',
        baseClasses,
        variantClasses[variant],
        !isActive && 'hover:bear-bg-[var(--bear-bg-tertiary)] hover:bear-text-[var(--bear-text-primary)]',
        disabled && 'Bear-Tabs__tab--disabled bear-opacity-50 bear-cursor-not-allowed'
      )}
      style={tabStyle}
    >
      {icon && <span className="Bear-Tabs__tab-icon">{icon}</span>}
      <span className="Bear-Tabs__tab-label">{children}</span>
    </button>
  );
};
