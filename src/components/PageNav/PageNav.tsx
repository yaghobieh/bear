import { FC } from 'react';
import { cn } from '@utils';
import { Icon } from '../Icon/Icon';
import type { PageNavProps, PageNavItem } from './PageNav.types';
import { ROOT_CLASS, SIZE_CLASSES, LINK_SIZE, VARIANT_CLASSES, ICON_SIZE } from './PageNav.const';

const ChevronLeft: FC<{ size: number }> = ({ size }) => (
  <Icon size={size}><polyline points="15 18 9 12 15 6" /></Icon>
);

const ChevronRight: FC<{ size: number }> = ({ size }) => (
  <Icon size={size}><polyline points="9 6 15 12 9 18" /></Icon>
);

const NavLink: FC<{
  item: PageNavItem;
  direction: 'prev' | 'next';
  linkClass: string;
  labelClass: string;
  iconClass: string;
  sizeClass: string;
  iconSize: number;
}> = ({ item, direction, linkClass, labelClass, iconClass, sizeClass, iconSize }) => {
  const isPrev = direction === 'prev';
  const Tag = item.href ? 'a' : 'button';
  const tagProps = item.href
    ? { href: item.href }
    : { type: 'button' as const, onClick: item.onClick };

  return (
    <Tag
      {...tagProps}
      className={cn(
        'bear-flex bear-flex-col bear-gap-1 bear-no-underline bear-min-w-0',
        isPrev ? 'bear-items-start' : 'bear-items-end bear-ml-auto',
        linkClass,
        sizeClass
      )}
    >
      <span className={cn('bear-text-[10px] bear-font-semibold bear-uppercase bear-tracking-wider', labelClass)}>
        {isPrev ? 'Previous' : 'Next'}
      </span>
      <span className="bear-flex bear-items-center bear-gap-1.5 bear-font-medium">
        {isPrev && (
          <span className={cn('bear-flex-shrink-0', iconClass)}>
            {item.icon ?? <ChevronLeft size={iconSize} />}
          </span>
        )}
        <span className="bear-truncate">{item.label}</span>
        {!isPrev && (
          <span className={cn('bear-flex-shrink-0', iconClass)}>
            {item.icon ?? <ChevronRight size={iconSize} />}
          </span>
        )}
      </span>
    </Tag>
  );
};

export const PageNav: FC<PageNavProps> = ({
  prev,
  next,
  size = 'md',
  variant = 'default',
  className,
  testId,
  'aria-label': ariaLabel = 'Page navigation',
}) => {
  if (!prev && !next) return null;

  const v = VARIANT_CLASSES[variant];
  const iconSize = ICON_SIZE[size];

  return (
    <nav
      data-testid={testId}
      className={cn(
        ROOT_CLASS,
        'bear-flex bear-items-start bear-justify-between bear-gap-4 bear-border-t bear-border-zinc-700/50',
        SIZE_CLASSES[size],
        className
      )}
      aria-label={ariaLabel}
    >
      {prev ? (
        <NavLink
          item={prev}
          direction="prev"
          linkClass={v.link}
          labelClass={v.label}
          iconClass={v.icon}
          sizeClass={LINK_SIZE[size]}
          iconSize={iconSize}
        />
      ) : (
        <span />
      )}
      {next ? (
        <NavLink
          item={next}
          direction="next"
          linkClass={v.link}
          labelClass={v.label}
          iconClass={v.icon}
          sizeClass={LINK_SIZE[size]}
          iconSize={iconSize}
        />
      ) : (
        <span />
      )}
    </nav>
  );
};
