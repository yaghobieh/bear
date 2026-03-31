/**
 * Commerce Icons - Shopping, payment, and business icons
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

export const ShoppingCartIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></Icon>
);

export const ShoppingBagIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></Icon>
);

export const CreditCardIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></Icon>
);

export const DollarSignIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Icon>
);

export const EuroIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 10h12" /><path d="M4 14h12" /><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2" /></Icon>
);

export const PoundIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 18h12" /><path d="M4 14h8" /><path d="M17 4a4 4 0 0 0-7.4 2.1L8 18" /></Icon>
);

export const WalletIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M16 14h2" /></Icon>
);

export const ReceiptIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" /></Icon>
);

export const TagIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Icon>
);

export const TagsIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /><path d="M22 7l-8.97 8.97" /></Icon>
);

export const PercentIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></Icon>
);

export const TrendUpIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>
);

export const TrendDownIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></Icon>
);

export const BarCodeIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 5v14" /><path d="M8 5v14" /><path d="M12 5v14" /><path d="M17 5v14" /><path d="M21 5v14" /><path d="M6 5v14" /><path d="M14 5v14" /><path d="M10 5v14" /><path d="M19 5v14" /></Icon>
);

export const GiftIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></Icon>
);

export const StoreIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 9l1-4h16l1 4" /><path d="M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" /><path d="M9 21V12h6v9" /><path d="M3 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" /><path d="M9 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" /><path d="M15 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" /></Icon>
);

export const TruckIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></Icon>
);

export const PackageIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></Icon>
);

export const InvoiceIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="12" y2="17" /><line x1="14" y1="17" x2="16" y2="17" /></Icon>
);

export const BriefcaseIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></Icon>
);

export const BankIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 22h18" /><path d="M6 18v-4" /><path d="M10 18v-4" /><path d="M14 18v-4" /><path d="M18 18v-4" /><path d="M3 10l9-7 9 7" /><path d="M3 10h18v4H3z" /></Icon>
);
