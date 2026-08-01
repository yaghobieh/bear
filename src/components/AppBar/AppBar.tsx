import { FC } from 'react';
import type { AppBarProps } from './AppBar.types';
import {
  APP_BAR_BASE_CLASS,
  APP_BAR_COLOR_CLASSES,
  APP_BAR_COLOR_ON_DARK_CLASS,
  APP_BAR_DENSE_MODIFIER_CLASS,
  APP_BAR_ELEVATION_CLASS,
  APP_BAR_GUTTER_X,
  APP_BAR_GUTTER_X_DENSE,
  APP_BAR_HEIGHT_COMFORTABLE,
  APP_BAR_HEIGHT_DENSE,
  APP_BAR_POSITION_CLASSES,
  APP_BAR_ROOT_CLASS,
  APP_BAR_SECTION_BASE_CLASS,
  APP_BAR_SECTION_CENTER_CLASS,
  APP_BAR_SECTION_CLASS,
  APP_BAR_SECTION_END_CLASS,
  APP_BAR_SECTION_GROW_CLASS,
  APP_BAR_VARIANT_CLASSES,
  DEFAULT_APP_BAR_COLOR,
  DEFAULT_APP_BAR_DISABLE_GUTTERS,
  DEFAULT_APP_BAR_ELEVATION,
  DEFAULT_APP_BAR_ENABLE_COLOR_ON_DARK,
  DEFAULT_APP_BAR_POSITION,
  DEFAULT_APP_BAR_VARIANT,
} from './AppBar.const';
import { useBearDensityOptional } from '@context';
import { cn, resolveBearId, useBearId } from '@utils';

export const AppBar: FC<AppBarProps> = (props) => {
  const {
    children,
    position = DEFAULT_APP_BAR_POSITION,
    variant = DEFAULT_APP_BAR_VARIANT,
    color = DEFAULT_APP_BAR_COLOR,
    className,
    leftContent,
    rightContent,
    centerContent,
    elevation = DEFAULT_APP_BAR_ELEVATION,
    dense,
    disableGutters = DEFAULT_APP_BAR_DISABLE_GUTTERS,
    enableColorOnDark = DEFAULT_APP_BAR_ENABLE_COLOR_ON_DARK,
    id,
    testId,
  } = props;

  const { density } = useBearDensityOptional();
  const isDense = dense ?? density === 'compact';
  const generatedId = useBearId('AppBar');
  const resolvedId = resolveBearId(id, generatedId);

  return (
    <header
      id={resolvedId}
      data-testid={testId}
      className={cn(
        APP_BAR_ROOT_CLASS,
        APP_BAR_BASE_CLASS,
        isDense ? APP_BAR_HEIGHT_DENSE : APP_BAR_HEIGHT_COMFORTABLE,
        !disableGutters && (isDense ? APP_BAR_GUTTER_X_DENSE : APP_BAR_GUTTER_X),
        APP_BAR_POSITION_CLASSES[position],
        APP_BAR_VARIANT_CLASSES[variant],
        APP_BAR_COLOR_CLASSES[color],
        enableColorOnDark && color === 'default' && APP_BAR_COLOR_ON_DARK_CLASS,
        elevation && APP_BAR_ELEVATION_CLASS,
        isDense && APP_BAR_DENSE_MODIFIER_CLASS,
        className
      )}
      style={{
        backgroundColor: color === 'primary' ? 'var(--bear-primary-600)' : undefined,
      }}
    >
      {children ?? (
        <>
          <div className={cn(APP_BAR_SECTION_CLASS, APP_BAR_SECTION_BASE_CLASS)}>
            {leftContent}
          </div>
          <div
            className={cn(
              APP_BAR_SECTION_CLASS,
              APP_BAR_SECTION_CENTER_CLASS,
              APP_BAR_SECTION_BASE_CLASS,
              APP_BAR_SECTION_GROW_CLASS
            )}
          >
            {centerContent}
          </div>
          <div
            className={cn(
              APP_BAR_SECTION_CLASS,
              APP_BAR_SECTION_END_CLASS,
              APP_BAR_SECTION_BASE_CLASS
            )}
          >
            {rightContent}
          </div>
        </>
      )}
    </header>
  );
};
