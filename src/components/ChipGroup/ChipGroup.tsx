import {
  Children,
  FC,
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
} from 'react';
import type { ChipGroupProps } from './ChipGroup.types';
import {
  CHIP_GROUP_ROOT_CLASS,
  CHIP_GROUP_BASE_CLASSES,
  CHIP_GROUP_SPACING_CLASSES,
  CHIP_GROUP_OVERFLOW_CLASSES,
  CHIP_GROUP_DEFAULT_DELETE_ALL_LABEL,
  CHIP_GROUP_MENU_CLASSES,
  CHIP_GROUP_MENU_ITEM_CLASSES,
  COMPONENT_NAME_CHIP_GROUP,
  CHIP_GROUP_COMPACT_CLASS,
} from './ChipGroup.const';
import { cn, resolveBearId, useBearId } from '@utils';
import { useBearDensityOptional } from '@context';
import { DENSITY_COMPACT, SIZE_SM } from '@constants';

export const ChipGroup: FC<ChipGroupProps> = (props) => {
  const {
    id,
    testId,
    children,
    max,
    size = 'md',
    spacing = 'md',
    overflowMenu = false,
    onDeleteAll,
    deleteAllLabel = CHIP_GROUP_DEFAULT_DELETE_ALL_LABEL,
    className,
    ...rest
  } = props;

  const { density } = useBearDensityOptional();
  const isCompact = density === DENSITY_COMPACT;
  const effectiveSpacing = isCompact ? SIZE_SM : spacing;
  const effectiveSize = isCompact ? SIZE_SM : size;

  const generatedId = useBearId(COMPONENT_NAME_CHIP_GROUP);
  const domId = resolveBearId(id, generatedId);
  const [menuOpen, setMenuOpen] = useState(false);
  const childArray = Children.toArray(children).filter(isValidElement);
  const sizedChildren = childArray.map((child) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<{ size?: string }>, {
          size: (child.props as { size?: string }).size ?? effectiveSize,
        })
      : child
  );
  const visible = typeof max === 'number' ? sizedChildren.slice(0, max) : sizedChildren;
  const hidden = typeof max === 'number' ? sizedChildren.slice(max) : [];
  const overflow = hidden.length;

  return (
    <div
      {...rest}
      id={domId}
      data-testid={testId}
      className={cn(
        CHIP_GROUP_ROOT_CLASS,
        CHIP_GROUP_BASE_CLASSES,
        CHIP_GROUP_SPACING_CLASSES[effectiveSpacing as keyof typeof CHIP_GROUP_SPACING_CLASSES],
        isCompact && CHIP_GROUP_COMPACT_CLASS,
        className
      )}
    >
      {visible}
      {overflow > 0 && (
        <div className={`${CHIP_GROUP_ROOT_CLASS}__overflow-wrap bear-relative`}>
          <button
            type="button"
            className={cn(`${CHIP_GROUP_ROOT_CLASS}__overflow`, CHIP_GROUP_OVERFLOW_CLASSES)}
            onClick={() => overflowMenu && setMenuOpen((open) => !open)}
            aria-expanded={overflowMenu ? menuOpen : undefined}
            aria-haspopup={overflowMenu ? 'menu' : undefined}
          >
            +{overflow}
          </button>
          {overflowMenu && menuOpen && (
            <div
              role="menu"
              className={cn(`${CHIP_GROUP_ROOT_CLASS}__menu`, CHIP_GROUP_MENU_CLASSES)}
            >
              {hidden.map((child, index) => (
                <div
                  key={`overflow-${index}`}
                  role="menuitem"
                  className={cn(`${CHIP_GROUP_ROOT_CLASS}__menu-item`, CHIP_GROUP_MENU_ITEM_CLASSES)}
                >
                  {child}
                </div>
              ))}
              {onDeleteAll && (
                <button
                  type="button"
                  role="menuitem"
                  className={cn(
                    `${CHIP_GROUP_ROOT_CLASS}__delete-all`,
                    CHIP_GROUP_MENU_ITEM_CLASSES,
                    'bear-text-red-600 dark:bear-text-red-400 bear-w-full bear-text-left'
                  )}
                  onClick={() => {
                    onDeleteAll();
                    setMenuOpen(false);
                  }}
                >
                  {deleteAllLabel}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
