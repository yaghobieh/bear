import { FC } from 'react';
import type { BackdropProps } from './Backdrop.types';
import {
  BACKDROP_ROOT_CLASS,
  BACKDROP_DEFAULT_Z_INDEX,
  BACKDROP_BASE_CLASSES,
  BACKDROP_VISIBLE_CLASSES,
  BACKDROP_HIDDEN_CLASSES,
  BACKDROP_TINT_CLASSES,
  BACKDROP_BLUR_CLASSES,
} from './Backdrop.const';
import { cn, resolveBearId, useBearId } from '@utils';

export const Backdrop: FC<BackdropProps> = (props) => {
  const {
    id,
    testId,
    open = true,
    invisible = false,
    blur = false,
    zIndex = BACKDROP_DEFAULT_Z_INDEX,
    onClick,
    children,
    className,
    ...rest
  } = props;

  const generatedId = useBearId('Backdrop');
  const domId = resolveBearId(id, generatedId);

  if (!open && !children) {
    return null;
  }

  return (
    <div
      {...rest}
      id={domId}
      data-testid={testId}
      aria-hidden={!open}
      onClick={onClick}
      className={cn(
        BACKDROP_ROOT_CLASS,
        BACKDROP_BASE_CLASSES,
        open ? BACKDROP_VISIBLE_CLASSES : BACKDROP_HIDDEN_CLASSES,
        !invisible && BACKDROP_TINT_CLASSES,
        blur && BACKDROP_BLUR_CLASSES,
        className
      )}
      style={{ zIndex, ...rest.style }}
    >
      {children}
    </div>
  );
};
