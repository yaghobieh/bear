import { FC, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import type {
  NotificationCenterProps,
  NotificationItemProps,
} from './NotificationCenter.types';
import {
  NOTIFICATION_CENTER_DEFAULT_TRANSLATIONS,
  NOTIFICATION_CENTER_MAX_VISIBLE,
  NOTIFICATION_CENTER_Z_INDEX,
  NOTIFICATION_TYPE_COLORS,
} from './NotificationCenter.const';
import { formatRelativeTime } from './NotificationCenter.utils';

/**
 * NotificationItemComponent - Single notification item
 */
const NotificationItemComponent: FC<NotificationItemProps> = ({
  notification,
  onRead,
  onDismiss,
  onClick,
  translations,
}) => {
  const handleClick = () => {
    if (!notification.read) {
      onRead?.(notification.id);
    }
    onClick?.(notification);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'Bear-NotificationCenter__item bear-flex bear-gap-3 bear-p-3 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700 last:bear-border-b-0 bear-cursor-pointer bear-transition-colors hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700/50',
        !notification.read && 'bear-bg-gray-50 dark:bear-bg-zinc-800/50'
      )}
    >
      <div className="Bear-NotificationCenter__item-icon bear-shrink-0">
        {notification.avatar ? (
          <img
            src={notification.avatar}
            alt=""
            className="bear-w-10 bear-h-10 bear-rounded-full bear-object-cover"
          />
        ) : notification.icon ? (
          <div className={cn(
            'bear-w-10 bear-h-10 bear-rounded-full bear-flex bear-items-center bear-justify-center',
            NOTIFICATION_TYPE_COLORS[notification.type]
          )}>
            {notification.icon}
          </div>
        ) : (
          <div className={cn(
            'bear-w-10 bear-h-10 bear-rounded-full bear-flex bear-items-center bear-justify-center',
            NOTIFICATION_TYPE_COLORS[notification.type]
          )}>
            {notification.type === 'success' && (
              <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {notification.type === 'warning' && (
              <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {notification.type === 'info' && (
              <svg className="bear-w-5 bear-h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className="Bear-NotificationCenter__item-content bear-flex-1 bear-min-w-0">
        <div className="bear-flex bear-items-start bear-justify-between bear-gap-2">
          <p className={cn(
            'Bear-NotificationCenter__item-title bear-text-sm bear-font-medium bear-truncate',
            !notification.read ? 'bear-text-gray-900 dark:bear-text-white' : 'bear-text-gray-600 dark:bear-text-zinc-300'
          )}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="Bear-NotificationCenter__item-badge bear-w-2 bear-h-2 bear-rounded-full bear-bg-pink-500 bear-shrink-0 bear-mt-1.5" />
          )}
        </div>
        {notification.description && (
          <p className="Bear-NotificationCenter__item-description bear-text-xs bear-text-gray-500 dark:bear-text-zinc-400 bear-mt-0.5 bear-line-clamp-2">
            {notification.description}
          </p>
        )}
        <p className="Bear-NotificationCenter__item-time bear-text-xs bear-text-gray-400 dark:bear-text-zinc-500 bear-mt-1">
          {formatRelativeTime(notification.timestamp, translations)}
        </p>

        {notification.actions && notification.actions.length > 0 && (
          <div className="Bear-NotificationCenter__item-actions bear-flex bear-gap-2 bear-mt-2">
            {notification.actions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className={cn(
                  'bear-px-2 bear-py-1 bear-text-xs bear-rounded bear-transition-colors',
                  action.variant === 'primary' && 'bear-bg-pink-500 bear-text-white hover:bear-bg-pink-600',
                  action.variant === 'secondary' && 'bear-bg-gray-200 dark:bear-bg-zinc-600 bear-text-gray-900 dark:bear-text-white hover:bear-bg-gray-300 dark:hover:bear-bg-zinc-500',
                  action.variant === 'danger' && 'bear-bg-red-500 bear-text-white hover:bear-bg-red-600',
                  !action.variant && 'bear-bg-gray-100 dark:bear-bg-zinc-700 bear-text-gray-700 dark:bear-text-zinc-300 hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-600'
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(notification.id);
          }}
          className="Bear-NotificationCenter__item-dismiss bear-p-1 bear-rounded bear-text-gray-500 dark:bear-text-zinc-500 hover:bear-text-gray-700 dark:hover:bear-text-zinc-300 hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-700 bear-transition-colors bear-shrink-0"
        >
          <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * NotificationCenter - Notification management component
 *
 * @example
 * ```tsx
 * <NotificationCenter
 *   notifications={notifications}
 *   onMarkAsRead={handleMarkAsRead}
 *   onDismiss={handleDismiss}
 * />
 * ```
 */
export const NotificationCenter: FC<NotificationCenterProps> = ({
  notifications,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  maxVisible = NOTIFICATION_CENTER_MAX_VISIBLE,
  groupByCategory: _groupByCategory = false,
  position = 'top-right',
  trigger,
  open: controlledOpen,
  onOpenChange,
  className,
  testId,
  translations,
  icon,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const t = useMemo(() => ({
    ...NOTIFICATION_CENTER_DEFAULT_TRANSLATIONS,
    ...translations,
  }), [translations]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const visibleNotifications = useMemo(() => {
    if (showAll) return notifications;
    return notifications.slice(0, maxVisible);
  }, [notifications, maxVisible, showAll]);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      let top = rect.bottom + scrollTop + 8;
      let left = rect.left + scrollLeft;

      // Adjust based on position
      if (position.includes('left')) {
        left = rect.left + scrollLeft;
      } else {
        left = rect.right + scrollLeft - 360; // dropdown width
      }

      if (position.includes('bottom')) {
        top = rect.top + scrollTop - 8;
      }

      setDropdownPosition({ top, left: Math.max(8, left) });
    }
  }, [isOpen, position]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if ((target as Element).closest?.('[data-bear-notification-center]')) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={containerRef}
      className={cn('Bear-NotificationCenter bear-relative bear-inline-block', className)}
      data-testid={testId}
    >
      {trigger ? (
        <div onClick={handleToggle}>{trigger}</div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          className="Bear-NotificationCenter__trigger bear-relative bear-p-2 bear-rounded-lg bear-text-gray-500 dark:bear-text-zinc-400 hover:bear-text-gray-900 dark:hover:bear-text-white hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-800 bear-transition-colors"
        >
          {icon ?? (
            <svg className="bear-w-6 bear-h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          )}
          {unreadCount > 0 && (
            <span className="Bear-NotificationCenter__badge bear-absolute bear-top-0 bear-right-0 bear-w-5 bear-h-5 bear-flex bear-items-center bear-justify-center bear-text-xs bear-font-medium bear-text-white bear-bg-pink-500 bear-rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          data-bear-notification-center
          className="Bear-NotificationCenter__dropdown bear-fixed bear-w-[360px] bear-bg-white dark:bear-bg-zinc-800 bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-rounded-lg bear-shadow-xl bear-overflow-hidden"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left, zIndex: NOTIFICATION_CENTER_Z_INDEX }}
        >
          <div className="Bear-NotificationCenter__header bear-flex bear-items-center bear-justify-between bear-px-4 bear-py-3 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700">
            <h3 className="Bear-NotificationCenter__title bear-text-sm bear-font-semibold bear-text-gray-900 dark:bear-text-white">
              {t.title}
              {unreadCount > 0 && (
                <span className="bear-ml-2 bear-text-xs bear-font-normal bear-text-gray-500 dark:bear-text-zinc-400">
                  ({unreadCount} {t.new.toLowerCase()})
                </span>
              )}
            </h3>
            <div className="bear-flex bear-gap-2">
              {onMarkAllAsRead && unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllAsRead}
                  className="Bear-NotificationCenter__mark-all bear-text-xs bear-text-pink-400 hover:bear-text-pink-300 bear-transition-colors"
                >
                  {t.markAllRead}
                </button>
              )}
              {onClearAll && notifications.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="Bear-NotificationCenter__clear-all bear-text-xs bear-text-gray-500 dark:bear-text-zinc-400 hover:bear-text-gray-700 dark:hover:bear-text-zinc-300 bear-transition-colors"
                >
                  {t.clearAll}
                </button>
              )}
            </div>
          </div>

          <div className="Bear-NotificationCenter__list bear-max-h-[400px] bear-overflow-y-auto">
            {visibleNotifications.length === 0 ? (
              <div className="Bear-NotificationCenter__empty bear-py-8 bear-text-center bear-text-sm bear-text-gray-500 dark:bear-text-zinc-500">
                {t.noNotifications}
              </div>
            ) : (
              visibleNotifications.map((notification) => (
                <NotificationItemComponent
                  key={notification.id}
                  notification={notification}
                  onRead={onMarkAsRead}
                  onDismiss={onDismiss}
                  onClick={onNotificationClick}
                  translations={t}
                />
              ))
            )}
          </div>

          {!showAll && notifications.length > maxVisible && (
            <div className="Bear-NotificationCenter__footer bear-border-t bear-border-gray-200 dark:bear-border-zinc-700">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="bear-w-full bear-py-2 bear-text-sm bear-text-pink-500 dark:bear-text-pink-400 hover:bear-bg-gray-100 dark:hover:bear-bg-zinc-700/50 bear-transition-colors"
              >
                {t.showMore} ({notifications.length - maxVisible} more)
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
