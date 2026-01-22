/**
 * Status Icons - Success, error, warning, info
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

// Check/Success
export const CheckIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="20 6 9 17 4 12" /></Icon>
);

export const CheckCircleIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Icon>
);

export const CheckCircleFilledIcon: IconComponent = (props) => (
  <Icon {...props} fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></Icon>
);

export const VerifiedIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 2L3.5 6.5v5c0 4.7 3.6 9.1 8.5 10.5 4.9-1.4 8.5-5.8 8.5-10.5v-5L12 2z" /><polyline points="9 12 11 14 15 10" /></Icon>
);

export const DoneIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="20 6 9 17 4 12" /></Icon>
);

export const DoneAllIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="18 7 11 14 6 9" /><polyline points="22 7 15 14 13 12" /></Icon>
);

export const TaskAltIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></Icon>
);

// Close/Error
export const CloseIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>
);

export const CancelIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></Icon>
);

export const ErrorIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></Icon>
);

export const ErrorOutlineIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>
);

export const HighlightOffIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></Icon>
);

export const BlockIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></Icon>
);

export const DoNotDisturbIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></Icon>
);

// Warning
export const WarningIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

export const WarningAmberIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

export const ReportIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>
);

export const ReportProblemIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

export const AlertTriangleIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

export const AlertCircleIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>
);

export const AlertOctagonIcon: IconComponent = (props) => (
  <Icon {...props}><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>
);

// Info
export const InfoIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></Icon>
);

export const InfoOutlinedIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></Icon>
);

// Help
export const HelpIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

export const HelpOutlineIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>
);

// Pending/Loading
export const PendingIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="8.01" y2="12" /><line x1="12" y1="12" x2="12.01" y2="12" /><line x1="16" y1="12" x2="16.01" y2="12" /></Icon>
);

export const PendingActionsIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="17" cy="17" r="4" /><line x1="17" y1="15" x2="17" y2="17" /><line x1="17" y1="17" x2="19" y2="17" /><line x1="8" y1="9" x2="12" y2="9" /><line x1="8" y1="13" x2="10" y2="13" /></Icon>
);

export const HourglassIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" /></Icon>
);

export const HourglassEmptyIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" /></Icon>
);

export const LoaderIcon: IconComponent = (props) => (
  <Icon {...props} spin><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></Icon>
);

export const AutorenewIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 6V2l-4 4 4 4V6c3.31 0 6 2.69 6 6 0 .79-.15 1.55-.42 2.25l1.52 1.52C19.7 14.57 20 13.33 20 12c0-4.42-3.58-8-8-8z" /><path d="M12 18c-3.31 0-6-2.69-6-6 0-.79.15-1.55.42-2.25L4.9 8.23C4.3 9.43 4 10.67 4 12c0 4.42 3.58 8 8 8v4l4-4-4-4v4z" /></Icon>
);

// Priority
export const PriorityHighIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="19" r="2" /><path d="M12 3v10" /></Icon>
);

export const LowPriorityIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 5h8" /><path d="M14 10h8" /><path d="M14 15h8" /><path d="M2 5h8" /><path d="M6 5v10l-4 4 4-4" /></Icon>
);

// New/Badge
export const NewReleasesIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="15" x2="12.01" y2="15" /></Icon>
);

export const FiberNewIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M7 9v6" /><path d="M7 9h3v3H7" /><path d="M13 15v-6h3l-3 3 3 3" /><path d="M17 9h1v3.5M18 15h-1v-2.5" /></Icon>
);

// Online/Offline
export const OnlineIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" fill="currentColor" /><circle cx="12" cy="12" r="3" fill="white" /></Icon>
);

export const OfflineIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></Icon>
);

export const CloudOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3" /><line x1="1" y1="1" x2="23" y2="23" /></Icon>
);

export const CloudDoneIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><polyline points="10 14 12 16 16 12" /></Icon>
);

// Shield
export const SecurityIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>
);

export const ShieldIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>
);

export const ShieldCheckIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></Icon>
);

export const ShieldAlertIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>
);

export const ShieldOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M19.7 14a6.9 6.9 0 0 0 .3-2V5l-8-3-3.2 1.2" /><path d="m2 2 20 20" /><path d="M4.7 4.7 4 5v7c0 6 8 10 8 10a20.3 20.3 0 0 0 5.62-4.38" /></Icon>
);

// Thumb
export const ThumbUpIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></Icon>
);

export const ThumbDownIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></Icon>
);

// Flag
export const FlagIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></Icon>
);

export const FlagFilledIcon: IconComponent = (props) => (
  <Icon {...props} fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" stroke="currentColor" /></Icon>
);

// Timer
export const TimerIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M5 3L2 6" /><path d="M22 6l-3-3" /><path d="M12 2v2" /></Icon>
);

export const TimerOffIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M10 2h4" /><path d="M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" /><path d="M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" /><path d="m2 2 20 20" /><path d="M12 12v-2" /></Icon>
);

// Wifi status
export const WifiIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></Icon>
);

export const WifiOffIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.58 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></Icon>
);

// Signal
export const SignalIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 4v16" /></Icon>
);

export const SignalLowIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M2 20h.01" /><path d="M7 20v-4" /></Icon>
);

// Battery
export const BatteryFullIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /><rect x="4" y="9" width="12" height="6" fill="currentColor" /></Icon>
);

export const BatteryLowIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /><rect x="4" y="9" width="3" height="6" fill="currentColor" /></Icon>
);

export const BatteryChargingIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /><path d="M10 7l-3 5h4l-3 5" /></Icon>
);

