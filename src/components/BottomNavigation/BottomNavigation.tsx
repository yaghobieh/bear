import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  SHOW_LABELS_ACTIVE,
  VARIANT_DEFAULT,
  VARIANT_GHOST,
} from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { BOTTOM_NAVIGATION_VARIANT_CLASSES } from './BottomNavigation.const';
import type { BottomNavigationProps } from './BottomNavigation.types';

export const BottomNavigation = (props: BottomNavigationProps) => {
  const {
    items,
    value,
    onChange,
    showLabels = SHOW_LABELS_ACTIVE,
    variant = VARIANT_DEFAULT,
    className,
    id,
    testId,
  } = props;

  const generatedId = useBearId('BottomNavigation');
  const domId = resolveBearId(id, generatedId);

  const shouldShowLabel = (isActive: boolean) => {
    if (showLabels === BOOLEAN_TRUE || showLabels === 'always') {
      return BOOLEAN_TRUE;
    }
    if (showLabels === SHOW_LABELS_ACTIVE) {
      return isActive;
    }
    return BOOLEAN_FALSE;
  };

  return (
    <nav
      id={domId}
      data-testid={testId}
      className={cn(
        'Bear-BottomNavigation bear-fixed bear-bottom-0 bear-left-0 bear-right-0 bear-z-50 bear-h-16 bear-flex bear-items-center bear-justify-around bear-px-2',
        BOTTOM_NAVIGATION_VARIANT_CLASSES[variant],
        className
      )}
    >
      {items.map((item) => {
        const isActive = value === item.id;
        return (
          <Button
            key={item.id}
            type="button"
            variant={VARIANT_GHOST}
            onClick={() => !item.disabled && onChange?.(item.id)}
            disabled={item.disabled}
            className={cn(
              'Bear-BottomNavigation__item bear-flex bear-flex-col bear-items-center bear-justify-center bear-flex-1 bear-h-full bear-py-2',
              isActive
                ? 'bear-text-primary-600 dark:bear-text-primary-400'
                : 'bear-text-gray-500 hover:bear-text-gray-800 dark:bear-text-zinc-500 dark:hover:bear-text-zinc-300',
              item.disabled && 'bear-opacity-50 bear-cursor-not-allowed'
            )}
          >
            <Box className="bear-relative">
              <Box as="span" className={cn('bear-transition-transform', isActive && 'bear-scale-110')}>
                {item.icon}
              </Box>
              {item.badge !== undefined && (
                <Box
                  as="span"
                  className="bear-absolute -bear-top-1 -bear-right-1 bear-min-w-[16px] bear-h-4 bear-px-1 bear-flex bear-items-center bear-justify-center bear-text-xs bear-font-medium bear-bg-primary-500 bear-text-white bear-rounded-full"
                >
                  {item.badge}
                </Box>
              )}
            </Box>
            {shouldShowLabel(isActive) && (
              <Typography className={cn('bear-text-xs bear-mt-1', isActive && 'bear-font-medium')}>
                {item.label}
              </Typography>
            )}
          </Button>
        );
      })}
    </nav>
  );
};
