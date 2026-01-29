import { FC, useState, createContext, useContext } from 'react';
import { cn } from '@utils';
import type { TabsContextValue, TabsProps, TabListProps, TabProps, TabPanelProps } from './Tabs.types';

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Tabs - Tabbed interface for organizing content
 * 
 * @example
 * ```tsx
 * <Tabs defaultTab="tab1" variant="line">
 *   <TabList>
 *     <Tab id="tab1">Tab 1</Tab>
 *     <Tab id="tab2">Tab 2</Tab>
 *   </TabList>
 *   <TabPanel tabId="tab1">Content 1</TabPanel>
 *   <TabPanel tabId="tab2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs: FC<TabsProps> = ({
  children,
  defaultTab,
  variant = 'line',
  onChange,
  className,
  testId,
}) => {
  const [activeTab, setActiveTabState] = useState(defaultTab);
  
  const setActiveTab = (id: string) => {
    setActiveTabState(id);
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

/**
 * TabList - Container for tab buttons
 */
export const TabList: FC<TabListProps> = ({ children, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabList must be used within Tabs');
  
  const { variant } = context;
  
  return (
    <div
      role="tablist"
      className={cn(
        'Bear-Tabs__list',
        `Bear-Tabs__list--${variant}`,
        'bear-flex bear-gap-1',
        variant === 'line' && 'bear-border-b bear-border-gray-200 dark:bear-border-gray-700',
        variant === 'pills' && 'bear-bg-gray-100 dark:bear-bg-gray-800 bear-p-1 bear-rounded-lg',
        variant === 'enclosed' && 'bear-border-b bear-border-gray-200 dark:bear-border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Tab - Individual tab button
 */
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
        : 'bear-border-transparent bear-text-gray-600 dark:bear-text-gray-400 hover:bear-text-gray-900 dark:hover:bear-text-white hover:bear-border-gray-300'
    ),
    pills: cn(
      'bear-rounded-md',
      isActive
        ? 'bear-bg-white dark:bear-bg-gray-700 bear-text-gray-900 dark:bear-text-white bear-shadow-sm'
        : 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-text-gray-900 dark:hover:bear-text-white'
    ),
    enclosed: cn(
      'bear-rounded-t-lg bear-border bear-border-transparent',
      isActive
        ? 'bear-bg-white dark:bear-bg-gray-900 bear-border-gray-200 dark:bear-border-gray-700 bear-border-b-white dark:bear-border-b-gray-900 bear--mb-px bear-text-gray-900 dark:bear-text-white'
        : 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-text-gray-900 dark:hover:bear-text-white'
    ),
  };
  
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
        disabled && 'Bear-Tabs__tab--disabled bear-opacity-50 bear-cursor-not-allowed'
      )}
    >
      {icon && <span className="Bear-Tabs__tab-icon">{icon}</span>}
      <span className="Bear-Tabs__tab-label">{children}</span>
    </button>
  );
};

/**
 * TabPanel - Content panel for a tab
 */
export const TabPanel: FC<TabPanelProps> = ({ tabId, children, className }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  
  const { activeTab } = context;
  
  if (activeTab !== tabId) return null;
  
  return (
    <div role="tabpanel" className={cn('Bear-Tabs__panel bear-py-4', className)}>
      {children}
    </div>
  );
};
