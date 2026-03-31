/**
 * Device Icons - Hardware and device icons
 */
import { FC } from 'react';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon.types';

type IconComponent = FC<Omit<IconProps, 'children'>>;

export const MonitorIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></Icon>
);

export const LaptopIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M20 16V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12" /><rect x="1" y="16" width="22" height="4" rx="1" /></Icon>
);

export const TabletIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></Icon>
);

export const SmartphoneIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></Icon>
);

export const WatchIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="7" /><polyline points="12 9 12 12 13.5 13.5" /><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" /></Icon>
);

export const TvIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></Icon>
);

export const SpeakerIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><circle cx="12" cy="14" r="4" /><line x1="12" y1="6" x2="12.01" y2="6" /></Icon>
);

export const HeadphonesIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></Icon>
);

export const CameraIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>
);

export const PrinterIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></Icon>
);

export const ServerIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></Icon>
);

export const DatabaseIcon: IconComponent = (props) => (
  <Icon {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></Icon>
);

export const CloudIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></Icon>
);

export const CloudUploadIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="20" /></Icon>
);

export const CloudDownloadIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /><polyline points="8 16 12 20 16 16" /><line x1="12" y1="12" x2="12" y2="20" /></Icon>
);

export const WifiIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></Icon>
);

export const WifiOffIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.56 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></Icon>
);

export const BluetoothIcon: IconComponent = (props) => (
  <Icon {...props}><polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" /></Icon>
);

export const BatteryIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="1" y="6" width="18" height="12" rx="2" ry="2" /><line x1="23" y1="13" x2="23" y2="11" /></Icon>
);

export const BatteryChargingIcon: IconComponent = (props) => (
  <Icon {...props}><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" /><line x1="23" y1="13" x2="23" y2="11" /><polyline points="11 6 7 12 13 12 9 18" /></Icon>
);

export const UsbIcon: IconComponent = (props) => (
  <Icon {...props}><circle cx="10" cy="14" r="1" /><circle cx="14" cy="10" r="1" /><path d="M12 2v16" /><path d="M8 8l4-4 4 4" /><path d="M8 18H6a2 2 0 0 1-2-2V8" /><path d="M16 18h2a2 2 0 0 0 2-2v-4" /></Icon>
);

export const CpuIcon: IconComponent = (props) => (
  <Icon {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></Icon>
);

export const HardDriveIcon: IconComponent = (props) => (
  <Icon {...props}><line x1="22" y1="12" x2="2" y2="12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /><line x1="6" y1="16" x2="6.01" y2="16" /><line x1="10" y1="16" x2="10.01" y2="16" /></Icon>
);
