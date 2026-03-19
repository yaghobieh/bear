import type { ReactNode } from 'react';

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: 'line' | 'pills' | 'enclosed';
}

export interface TabsProps {
  /** Tab panels */
  children: ReactNode;
  /** Controlled active tab (when set, defaultTab is ignored) */
  value?: string;
  /** Default active tab (uncontrolled) */
  defaultTab: string;
  /** Visual variant */
  variant?: 'line' | 'pills' | 'enclosed';
  /** Called when tab changes */
  onChange?: (tabId: string) => void;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

export interface TabListProps {
  /** Tab buttons */
  children: ReactNode;
  /** Max number of visible tabs before overflow (e.g. 5); rest go in "..." dropdown. Selected tab is always shown first. */
  maxVisibleTabs?: number;
  /** Allow tabs to wrap to next line (flex-wrap), no breakpoints */
  wrap?: boolean;
  /** Custom class name */
  className?: string;
}

export interface TabProps {
  /** Unique identifier */
  id: string;
  /** Tab label */
  children: ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Icon before label */
  icon?: ReactNode;
}

export interface TabPanelProps {
  /** Tab ID this panel belongs to */
  tabId: string;
  /** Panel content */
  children: ReactNode;
  /** Custom class name */
  className?: string;
}

