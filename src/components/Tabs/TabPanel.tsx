import { FC, useContext } from 'react';
import { cn } from '@utils';
import { TabsContext } from './Tabs';
import type { TabPanelProps } from './Tabs.types';

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
