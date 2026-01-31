import { ReactNode } from 'react';

/**
 * Notification types
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * Notification priority levels
 */
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Single notification item
 */
export interface NotificationItem {
  /** Unique identifier */
  id: string;
  /** Notification type */
  type: NotificationType;
  /** Title text */
  title: string;
  /** Description/message */
  description?: string;
  /** Timestamp */
  timestamp: Date;
  /** Whether the notification has been read */
  read: boolean;
  /** Priority level */
  priority?: NotificationPriority;
  /** Custom icon */
  icon?: ReactNode;
  /** Link URL (if notification is clickable) */
  href?: string;
  /** Action buttons */
  actions?: NotificationAction[];
  /** Avatar/image URL */
  avatar?: string;
  /** Category/group */
  category?: string;
  /** Custom metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Notification action button
 */
export interface NotificationAction {
  /** Action label */
  label: string;
  /** Action handler */
  onClick: () => void;
  /** Action variant */
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Notification center position
 */
export type NotificationCenterPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * Notification center translations
 */
export interface NotificationCenterTranslations {
  title: string;
  noNotifications: string;
  markAllRead: string;
  clearAll: string;
  showMore: string;
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
  new: string;
}

/**
 * NotificationCenter component props
 */
export interface NotificationCenterProps {
  /** List of notifications */
  notifications: NotificationItem[];
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: NotificationItem) => void;
  /** Callback when notification is marked as read */
  onMarkAsRead?: (id: string) => void;
  /** Callback when all notifications are marked as read */
  onMarkAllAsRead?: () => void;
  /** Callback when notification is dismissed */
  onDismiss?: (id: string) => void;
  /** Callback when all notifications are cleared */
  onClearAll?: () => void;
  /** Maximum notifications to show */
  maxVisible?: number;
  /** Whether to group notifications by category */
  groupByCategory?: boolean;
  /** Position of the notification panel */
  position?: NotificationCenterPosition;
  /** Custom trigger element */
  trigger?: ReactNode;
  /** Whether panel is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Translation strings */
  translations?: Partial<NotificationCenterTranslations>;
  /** Custom bell icon */
  icon?: ReactNode;
}

/**
 * NotificationItem component props
 */
export interface NotificationItemProps {
  notification: NotificationItem;
  onRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onClick?: (notification: NotificationItem) => void;
  translations: NotificationCenterTranslations;
}
