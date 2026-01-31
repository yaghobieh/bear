import { NotificationCenterTranslations } from './NotificationCenter.types';
import { TIME_THRESHOLDS } from './NotificationCenter.const';

/**
 * Format relative time
 */
export const formatRelativeTime = (
  date: Date,
  translations: NotificationCenterTranslations
): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < TIME_THRESHOLDS.MINUTE) {
    return translations.justNow;
  }

  if (diff < TIME_THRESHOLDS.HOUR) {
    const minutes = Math.floor(diff / TIME_THRESHOLDS.MINUTE);
    return translations.minutesAgo.replace('{count}', String(minutes));
  }

  if (diff < TIME_THRESHOLDS.DAY) {
    const hours = Math.floor(diff / TIME_THRESHOLDS.HOUR);
    return translations.hoursAgo.replace('{count}', String(hours));
  }

  const days = Math.floor(diff / TIME_THRESHOLDS.DAY);
  return translations.daysAgo.replace('{count}', String(days));
};

/**
 * Group notifications by category
 */
export const groupNotificationsByCategory = <T extends { category?: string }>(
  notifications: T[]
): Record<string, T[]> => {
  return notifications.reduce((acc, notification) => {
    const category = notification.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(notification);
    return acc;
  }, {} as Record<string, T[]>);
};
