import { FC, createContext, useContext, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type {
  ListProps,
  ListItemProps,
  ListSubheaderProps,
  ListItemTextProps,
  ListItemIconProps,
  ListItemButtonProps,
} from './List.types';

/** Context for list-wide settings */
interface ListContextValue {
  dense?: boolean;
  hoverable?: boolean;
}

const ListContext = createContext<ListContextValue>({});
const useListContext = () => useContext(ListContext);

/**
 * List - Displays a list of items
 * 
 * @example
 * ```tsx
 * <List>
 *   <ListItem primary="Inbox" leading={<MailIcon />} />
 *   <ListItem primary="Drafts" leading={<FileIcon />} />
 * </List>
 * ```
 */
export const List = forwardRef<HTMLUListElement, ListProps>(({
  variant = 'default',
  size = 'md',
  hoverable = false,
  dense = false,
  disablePadding = false,
  className,
  children,
  testId,
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'ember-text-xs',
    sm: 'ember-text-sm',
    md: 'ember-text-base',
    lg: 'ember-text-lg',
    xl: 'ember-text-xl',
  };

  const variantClasses = {
    default: '',
    bordered: 'ember-border ember-border-gray-200 dark:ember-border-gray-700 ember-rounded-lg',
    divided: '[&>li:not(:last-child)]:ember-border-b [&>li:not(:last-child)]:ember-border-gray-200 dark:[&>li:not(:last-child)]:ember-border-gray-700',
  };

  return (
    <ListContext.Provider value={{ dense, hoverable }}>
      <ul
        ref={ref}
        role="list"
        className={cn(
          'ember-list-none ember-m-0',
          !disablePadding && 'ember-py-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
});

List.displayName = 'List';

/**
 * ListItem - Individual item in a list
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({
  primary,
  secondary,
  leading,
  trailing,
  selected = false,
  disabled = false,
  clickable = false,
  divider = false,
  dense: denseProp,
  onClick,
  className,
  children,
  testId,
  ...props
}, ref) => {
  const { dense: contextDense, hoverable } = useListContext();
  const dense = denseProp ?? contextDense;
  const isClickable = clickable || !!onClick;

  return (
    <li
      ref={ref}
      role={isClickable ? 'button' : 'listitem'}
      tabIndex={isClickable && !disabled ? 0 : undefined}
      aria-selected={selected}
      aria-disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'ember-flex ember-items-center ember-gap-3',
        dense ? 'ember-py-1 ember-px-3' : 'ember-py-2 ember-px-4',
        isClickable && !disabled && 'ember-cursor-pointer',
        (hoverable || isClickable) && !disabled && 'hover:ember-bg-gray-100 dark:hover:ember-bg-gray-800',
        selected && 'ember-bg-primary-50 dark:ember-bg-primary-900/20',
        disabled && 'ember-opacity-50 ember-cursor-not-allowed',
        divider && 'ember-border-b ember-border-gray-200 dark:ember-border-gray-700',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {leading && (
        <div className="ember-flex-shrink-0 ember-text-gray-500 dark:ember-text-gray-400">
          {leading}
        </div>
      )}
      
      {(primary || secondary) ? (
        <div className="ember-flex-1 ember-min-w-0">
          {primary && (
            <div className="ember-text-gray-900 dark:ember-text-gray-100 ember-truncate">
              {primary}
            </div>
          )}
          {secondary && (
            <div className={cn(
              'ember-text-gray-500 dark:ember-text-gray-400 ember-truncate',
              dense ? 'ember-text-xs' : 'ember-text-sm'
            )}>
              {secondary}
            </div>
          )}
        </div>
      ) : (
        <div className="ember-flex-1 ember-min-w-0">{children}</div>
      )}
      
      {trailing && (
        <div className="ember-flex-shrink-0 ember-text-gray-500 dark:ember-text-gray-400">
          {trailing}
        </div>
      )}
    </li>
  );
});

ListItem.displayName = 'ListItem';

/**
 * ListSubheader - Section header for grouped lists
 */
export const ListSubheader: FC<ListSubheaderProps> = ({
  sticky = false,
  inset = false,
  className,
  children,
  testId,
  ...props
}) => (
  <li
    role="presentation"
    className={cn(
      'ember-py-2 ember-px-4 ember-text-xs ember-font-semibold ember-uppercase ember-tracking-wider',
      'ember-text-gray-500 dark:ember-text-gray-400',
      'ember-bg-gray-50 dark:ember-bg-gray-800/50',
      sticky && 'ember-sticky ember-top-0 ember-z-10',
      inset && 'ember-pl-12',
      className
    )}
    data-testid={testId}
    {...props}
  >
    {children}
  </li>
);

/**
 * ListItemText - Text content for list items
 */
export const ListItemText: FC<ListItemTextProps> = ({
  primary,
  secondary,
  inset = false,
  dense = false,
  className,
  ...props
}) => (
  <div
    className={cn(
      'ember-flex-1 ember-min-w-0',
      inset && 'ember-pl-9',
      className
    )}
    {...props}
  >
    {primary && (
      <div className="ember-text-gray-900 dark:ember-text-gray-100">
        {primary}
      </div>
    )}
    {secondary && (
      <div className={cn(
        'ember-text-gray-500 dark:ember-text-gray-400',
        dense ? 'ember-text-xs' : 'ember-text-sm'
      )}>
        {secondary}
      </div>
    )}
  </div>
);

/**
 * ListItemIcon - Icon container for list items
 */
export const ListItemIcon: FC<ListItemIconProps> = ({
  align = 'center',
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'ember-flex-shrink-0 ember-min-w-[36px]',
      'ember-text-gray-500 dark:ember-text-gray-400',
      align === 'top' && 'ember-self-start ember-mt-1',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/**
 * ListItemButton - Clickable list item
 */
export const ListItemButton: FC<ListItemButtonProps> = ({
  selected = false,
  disabled = false,
  dense = false,
  onClick,
  className,
  children,
  ...props
}) => (
  <div
    role="button"
    tabIndex={disabled ? -1 : 0}
    aria-selected={selected}
    aria-disabled={disabled}
    onClick={!disabled ? onClick : undefined}
    onKeyDown={(e) => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    }}
    className={cn(
      'ember-flex ember-items-center ember-gap-3 ember-w-full ember-text-left',
      dense ? 'ember-py-1 ember-px-3' : 'ember-py-2 ember-px-4',
      'ember-cursor-pointer ember-transition-colors',
      'hover:ember-bg-gray-100 dark:hover:ember-bg-gray-800',
      selected && 'ember-bg-primary-50 dark:ember-bg-primary-900/20',
      disabled && 'ember-opacity-50 ember-cursor-not-allowed ember-pointer-events-none',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default List;

