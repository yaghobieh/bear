/**
 * Navigation Icons - Arrows, menus, chevrons
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

// Arrows
export const ArrowUpIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></Icon>
);

export const ArrowDownIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></Icon>
);

export const ArrowLeftIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>
);

export const ArrowRightIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
);

export const ArrowUpwardIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></Icon>
);

export const ArrowDownwardIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></Icon>
);

export const ArrowBackIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>
);

export const ArrowForwardIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
);

// Arrow Circle
export const ArrowCircleUpIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><polyline points="16 12 12 8 8 12" /><line x1="12" y1="16" x2="12" y2="8" /></Icon>
);

export const ArrowCircleDownIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><polyline points="8 12 12 16 16 12" /><line x1="12" y1="8" x2="12" y2="16" /></Icon>
);

export const ArrowCircleLeftIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 8 8 12 12 16" /><line x1="16" y1="12" x2="8" y2="12" /></Icon>
);

export const ArrowCircleRightIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 16 16 12 12 8" /><line x1="8" y1="12" x2="16" y2="12" /></Icon>
);

// Chevrons
export const ChevronUpIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="18 15 12 9 6 15" /></Icon>
);

export const ChevronDownIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="6 9 12 15 18 9" /></Icon>
);

export const ChevronLeftIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="15 18 9 12 15 6" /></Icon>
);

export const ChevronRightIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="9 18 15 12 9 6" /></Icon>
);

export const ChevronsUpIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="17 11 12 6 7 11" /><polyline points="17 18 12 13 7 18" /></Icon>
);

export const ChevronsDownIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="7 13 12 18 17 13" /><polyline points="7 6 12 11 17 6" /></Icon>
);

export const ChevronsLeftIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></Icon>
);

export const ChevronsRightIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></Icon>
);

// Expand/Collapse
export const ExpandMoreIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="6 9 12 15 18 9" /></Icon>
);

export const ExpandLessIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="18 15 12 9 6 15" /></Icon>
);

export const UnfoldMoreIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="7 10 12 5 17 10" /><polyline points="7 14 12 19 17 14" /></Icon>
);

export const UnfoldLessIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="7 8 12 13 17 8" /><polyline points="7 16 12 11 17 16" /></Icon>
);

// Menu
export const MenuIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></Icon>
);

export const MenuOpenIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="12" x2="17" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="14" y2="18" /><polyline points="17 15 20 12 17 9" /></Icon>
);

export const CloseIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>
);

// Navigation specific
export const HomeIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>
);

export const DashboardIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></Icon>
);

export const AppsIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="5" height="5" rx="1" /><rect x="10" y="3" width="5" height="5" rx="1" /><rect x="17" y="3" width="5" height="5" rx="1" /><rect x="3" y="10" width="5" height="5" rx="1" /><rect x="10" y="10" width="5" height="5" rx="1" /><rect x="17" y="10" width="5" height="5" rx="1" /><rect x="3" y="17" width="5" height="5" rx="1" /><rect x="10" y="17" width="5" height="5" rx="1" /><rect x="17" y="17" width="5" height="5" rx="1" /></Icon>
);

// First/Last/Page
export const FirstPageIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="17 18 11 12 17 6" /><line x1="7" y1="6" x2="7" y2="18" /></Icon>
);

export const LastPageIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="7 6 13 12 7 18" /><line x1="17" y1="6" x2="17" y2="18" /></Icon>
);

export const NavigateBeforeIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="15 18 9 12 15 6" /></Icon>
);

export const NavigateNextIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="9 18 15 12 9 6" /></Icon>
);

// Subdirectory
export const SubdirectoryArrowLeftIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="11 9 6 14 11 19" /><path d="M18 5v9a1 1 0 0 1-1 1H6" /></Icon>
);

export const SubdirectoryArrowRightIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="13 9 18 14 13 19" /><path d="M6 5v9a1 1 0 0 0 1 1h11" /></Icon>
);

// Swap
export const SwapHorizIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="17 1 21 5 17 9" /><path d="M3 5h18" /><polyline points="7 23 3 19 7 15" /><path d="M21 19H3" /></Icon>
);

export const SwapVertIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="1 7 5 3 9 7" /><path d="M5 3v18" /><polyline points="23 17 19 21 15 17" /><path d="M19 21V3" /></Icon>
);

// Trending
export const TrendingUpIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>
);

export const TrendingDownIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></Icon>
);

export const TrendingFlatIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="3" y1="12" x2="21" y2="12" /><polyline points="17 8 21 12 17 16" /></Icon>
);

// Corner
export const CornerDownLeftIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></Icon>
);

export const CornerDownRightIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></Icon>
);

export const CornerUpLeftIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></Icon>
);

export const CornerUpRightIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="15 14 20 9 15 4" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" /></Icon>
);

// Maximize/Minimize
export const MaximizeIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></Icon>
);

export const MinimizeIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" /></Icon>
);

// Move
export const MoveIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /></Icon>
);

// Layers
export const LayersIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></Icon>
);

// Grid/List View
export const GridViewIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></Icon>
);

export const ListViewIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></Icon>
);

// External
export const ExternalLinkIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></Icon>
);

