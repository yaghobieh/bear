import { NotificationCenterTranslations, NotificationType } from './NotificationCenter.types';

/**
 * Default translations
 */
export const NOTIFICATION_CENTER_DEFAULT_TRANSLATIONS: NotificationCenterTranslations = {
  title: 'Notifications',
  noNotifications: 'No notifications',
  markAllRead: 'Mark all as read',
  clearAll: 'Clear all',
  showMore: 'Show more',
  justNow: 'Just now',
  minutesAgo: '{count}m ago',
  hoursAgo: '{count}h ago',
  daysAgo: '{count}d ago',
  new: 'New',
};

/**
 * Maximum visible notifications default
 */
export const NOTIFICATION_CENTER_MAX_VISIBLE = 5;

/**
 * Dropdown z-index
 */
export const NOTIFICATION_CENTER_Z_INDEX = 9999;

/**
 * Type icon colors
 */
export const NOTIFICATION_TYPE_COLORS: Record<NotificationType, string> = {
  info: 'bear-text-blue-400 bear-bg-blue-500/20',
  success: 'bear-text-green-400 bear-bg-green-500/20',
  warning: 'bear-text-amber-400 bear-bg-amber-500/20',
  error: 'bear-text-red-400 bear-bg-red-500/20',
};

/**
 * Time thresholds for relative time formatting (in ms)
 */
export const TIME_THRESHOLDS = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;
