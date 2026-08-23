import type { AppBarProps } from './AppBar.types';
import {
  APP_BAR_COLOR_CLASSES,
  APP_BAR_POSITION_CLASSES,
  APP_BAR_VARIANT_CLASSES,
} from './AppBar.const';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COLOR_DEFAULT,
  COLOR_PRIMARY,
  COMPONENT_NAME_APP_BAR,
  DENSITY_COMPACT,
  POSITION_STICKY,
  VARIANT_DEFAULT,
} from '@const';
import { useBearDensityOptional } from '@context';
import { cn, resolveBearId, useBearId } from '@utils';

export const AppBar = (props: AppBarProps) => {
  const {
    children,
    position = POSITION_STICKY,
    variant = VARIANT_DEFAULT,
    color = COLOR_PRIMARY,
    className,
    leftContent,
    rightContent,
    centerContent,
    elevation = BOOLEAN_TRUE,
    dense,
    disableGutters = BOOLEAN_FALSE,
    enableColorOnDark = BOOLEAN_FALSE,
    id,
    testId,
  } = props;

  const { density } = useBearDensityOptional();
  const isDense = dense ?? density === DENSITY_COMPACT;
  const generatedId = useBearId(COMPONENT_NAME_APP_BAR);
  const resolvedId = resolveBearId(id, generatedId);

  return (
    <header
      id={resolvedId}
      data-testid={testId}
      className={cn(
        'Bear-AppBar bear-w-full bear-flex bear-items-center',
        isDense ? 'bear-h-12' : 'bear-h-16',
        !disableGutters && (isDense ? 'bear-px-3' : 'bear-px-4'),
        APP_BAR_POSITION_CLASSES[position],
        APP_BAR_VARIANT_CLASSES[variant],
        APP_BAR_COLOR_CLASSES[color],
        enableColorOnDark && color === COLOR_DEFAULT && 'dark:bear-bg-primary-600 dark:bear-text-white',
        elevation && 'bear-shadow-md bear-border-b bear-border-gray-200/10 dark:bear-border-gray-800/40',
        isDense && 'Bear-AppBar--dense',
        className
      )}
      style={{
        backgroundColor: color === COLOR_PRIMARY ? 'var(--bear-primary-600)' : undefined,
      }}
    >
      {children ?? (
        <div className="Bear-AppBar__inner bear-w-full bear-flex bear-items-center">
          <div className="Bear-AppBar__section bear-flex bear-items-center bear-gap-4">
            {leftContent}
          </div>
          <div className="Bear-AppBar__section Bear-AppBar__section--center bear-flex bear-items-center bear-gap-4 bear-flex-1 bear-justify-center">
            {centerContent}
          </div>
          <div className="Bear-AppBar__section Bear-AppBar__section--end bear-flex bear-items-center bear-gap-4">
            {rightContent}
          </div>
        </div>
      )}
    </header>
  );
};
