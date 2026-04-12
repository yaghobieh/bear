import type { ReactNode } from 'react';
import type { MaxVisibleInput } from '../../utils/maxVisible.utils';

export { type MaxVisibleByBreakpoint, type MaxVisibleInput } from '../../utils/maxVisible.utils';

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
  /** Max visible tabs before "…" dropdown. Number, or breakpoint map using theme.breakpoints (mobile &lt; md, tablet md–lg, desktop ≥ lg). `custom` overrides all widths. */
  maxVisibleTabs?: MaxVisibleInput;
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

