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
    xs: 'bear-text-xs',
    sm: 'bear-text-sm',
    md: 'bear-text-base',
    lg: 'bear-text-lg',
    xl: 'bear-text-xl',
  };

  const variantClasses = {
    default: '',
    bordered: 'bear-border bear-border-gray-200 dark:bear-border-gray-700 bear-rounded-lg',
    divided: '[&>li:not(:last-child)]:bear-border-b [&>li:not(:last-child)]:bear-border-gray-200 dark:[&>li:not(:last-child)]:bear-border-gray-700',
  };

  return (
    <ListContext.Provider value={{ dense, hoverable }}>
      <ul
        ref={ref}
        role="list"
        className={cn(
          'bear-list-none bear-m-0',
          !disablePadding && 'bear-py-2',
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
        'bear-flex bear-items-center bear-gap-3',
        dense ? 'bear-py-1 bear-px-3' : 'bear-py-2 bear-px-4',
        isClickable && !disabled && 'bear-cursor-pointer',
        (hoverable || isClickable) && !disabled && 'hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800',
        selected && 'bear-bg-primary-50 dark:bear-bg-primary-900/20',
        disabled && 'bear-opacity-50 bear-cursor-not-allowed',
        divider && 'bear-border-b bear-border-gray-200 dark:bear-border-gray-700',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {leading && (
        <div className="bear-flex-shrink-0 bear-text-gray-500 dark:bear-text-gray-400">
          {leading}
        </div>
      )}
      
      {(primary || secondary) ? (
        <div className="bear-flex-1 bear-min-w-0">
          {primary && (
            <div className="bear-text-gray-900 dark:bear-text-gray-100 bear-truncate">
              {primary}
            </div>
          )}
          {secondary && (
            <div className={cn(
              'bear-text-gray-500 dark:bear-text-gray-400 bear-truncate',
              dense ? 'bear-text-xs' : 'bear-text-sm'
            )}>
              {secondary}
            </div>
          )}
        </div>
      ) : (
        <div className="bear-flex-1 bear-min-w-0">{children}</div>
      )}
      
      {trailing && (
        <div className="bear-flex-shrink-0 bear-text-gray-500 dark:bear-text-gray-400">
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
      'bear-py-2 bear-px-4 bear-text-xs bear-font-semibold bear-uppercase bear-tracking-wider',
      'bear-text-gray-500 dark:bear-text-gray-400',
      'bear-bg-gray-50 dark:bear-bg-gray-800/50',
      sticky && 'bear-sticky bear-top-0 bear-z-10',
      inset && 'bear-pl-12',
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
      'bear-flex-1 bear-min-w-0',
      inset && 'bear-pl-9',
      className
    )}
    {...props}
  >
    {primary && (
      <div className="bear-text-gray-900 dark:bear-text-gray-100">
        {primary}
      </div>
    )}
    {secondary && (
      <div className={cn(
        'bear-text-gray-500 dark:bear-text-gray-400',
        dense ? 'bear-text-xs' : 'bear-text-sm'
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
      'bear-flex-shrink-0 bear-min-w-[36px]',
      'bear-text-gray-500 dark:bear-text-gray-400',
      align === 'top' && 'bear-self-start bear-mt-1',
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
      'bear-flex bear-items-center bear-gap-3 bear-w-full bear-text-left',
      dense ? 'bear-py-1 bear-px-3' : 'bear-py-2 bear-px-4',
      'bear-cursor-pointer bear-transition-colors',
      'hover:bear-bg-gray-100 dark:hover:bear-bg-gray-800',
      selected && 'bear-bg-primary-50 dark:bear-bg-primary-900/20',
      disabled && 'bear-opacity-50 bear-cursor-not-allowed bear-pointer-events-none',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default List;

