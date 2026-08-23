import { forwardRef, useRef, useState, useEffect } from 'react';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  EMPTY_STRING,
  NEGATIVE_ONE,
  QUERY_BUTTON,
  SIZE_MD,
  VARIANT_DEFAULT,
  VARIANT_UNDERLINE,
} from '@const';
import { cn } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Typography } from '../Typography';
import {
  ACTIVE_BAR_SHAPE_CLASSES,
  ACTIVE_BAR_SIZE_CLASSES,
  ACTIVE_BAR_VARIANT_CLASSES,
} from './ActiveBar.const';
import type { ActiveBarItem, ActiveBarProps } from './ActiveBar.types';

const renderActiveBarItem = (
  item: ActiveBarItem,
  isActive: boolean,
  fullWidth: boolean,
  size: NonNullable<ActiveBarProps['size']>,
  variant: NonNullable<ActiveBarProps['variant']>,
  onItemClick?: ActiveBarProps['onItemClick']
) => {
  const tone = isActive
    ? ACTIVE_BAR_VARIANT_CLASSES[variant].active
    : ACTIVE_BAR_VARIANT_CLASSES[variant].inactive;

  return (
    <Button
      key={item.id}
      variant="ghost"
      onClick={() => onItemClick?.(item)}
      className={cn(
        fullWidth && 'bear-flex-1',
        ACTIVE_BAR_SIZE_CLASSES[size],
        tone,
        ACTIVE_BAR_SHAPE_CLASSES[variant],
        'bear-flex bear-items-center bear-justify-center bear-gap-2 bear-transition-all bear-duration-200'
      )}
    >
      {item.icon}
      <Typography>{item.label}</Typography>
      {item.badge !== undefined && (
        <Box
          as="span"
          className="bear-px-1.5 bear-py-0.5 bear-text-xs bear-rounded-full bear-bg-primary-100 dark:bear-bg-primary-900/30 bear-text-primary-600 dark:bear-text-primary-400"
        >
          {item.badge}
        </Box>
      )}
    </Button>
  );
};

export const ActiveBar = forwardRef<HTMLDivElement, ActiveBarProps>((props, ref) => {
  const {
    items,
    activeId,
    onItemClick,
    variant = VARIANT_DEFAULT,
    size = SIZE_MD,
    fullWidth = BOOLEAN_FALSE,
    animated = BOOLEAN_TRUE,
    className = EMPTY_STRING,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!animated || variant !== VARIANT_UNDERLINE) {
      return;
    }

    const activeIndex = items.findIndex((item) => item.id === activeId);
    if (activeIndex === NEGATIVE_ONE || !containerRef.current) {
      return;
    }

    const buttons = containerRef.current.querySelectorAll(QUERY_BUTTON);
    const activeButton = buttons[activeIndex];
    if (activeButton) {
      setIndicatorStyle({
        left: (activeButton as HTMLElement).offsetLeft,
        width: (activeButton as HTMLElement).offsetWidth,
      });
    }
  }, [activeId, items, animated, variant]);

  return (
    <div
      ref={ref}
      className={cn('Bear-ActiveBar bear-relative', fullWidth ? 'bear-w-full' : 'bear-inline-flex', className)}
      {...rest}
    >
      <div
        ref={containerRef}
        className={cn(
          'Bear-ActiveBar__list bear-flex',
          fullWidth && 'bear-w-full',
          variant === VARIANT_UNDERLINE
            ? 'bear-border-b bear-border-gray-200 dark:bear-border-gray-700'
            : 'bear-gap-1'
        )}
      >
        {items.map((item) =>
          renderActiveBarItem(item, item.id === activeId, fullWidth, size, variant, onItemClick)
        )}
      </div>

      {animated && variant === VARIANT_UNDERLINE && (
        <div
          className="Bear-ActiveBar__indicator bear-absolute bear-bottom-0 bear-h-0.5 bear-bg-primary-500 bear-transition-all bear-duration-300 bear-ease-out"
          style={indicatorStyle}
        />
      )}
    </div>
  );
});

ActiveBar.displayName = 'ActiveBar';
