import type { BackdropProps } from './Backdrop.types';
import {
  BACKDROP_DEFAULT_Z_INDEX,
  BACKDROP_NESTED_Z_INDEX,
  BACKDROP_TRANSITION_MS,
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COMPONENT_NAME_BACKDROP,
} from '@const';
import { cn, resolveBearId, useBearId } from '@utils';

export const Backdrop = (props: BackdropProps) => {
  const {
    id,
    testId,
    open = BOOLEAN_TRUE,
    invisible = BOOLEAN_FALSE,
    blur = BOOLEAN_FALSE,
    nested = BOOLEAN_FALSE,
    zIndex: zIndexProp,
    transitionDuration = BACKDROP_TRANSITION_MS,
    keepMounted = BOOLEAN_FALSE,
    onClick,
    children,
    className,
    style,
    ...rest
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_BACKDROP);
  const domId = resolveBearId(id, generatedId);
  const zIndex = zIndexProp ?? (nested ? BACKDROP_NESTED_Z_INDEX : BACKDROP_DEFAULT_Z_INDEX);

  if (!open && !keepMounted && !children) {
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
        'Bear-Backdrop',
        nested ? 'bear-absolute' : 'bear-fixed',
        'bear-inset-0 bear-flex bear-items-center bear-justify-center bear-transition-opacity',
        open ? 'bear-opacity-100 bear-pointer-events-auto' : 'bear-opacity-0 bear-pointer-events-none',
        !invisible && 'bear-bg-black/50 dark:bear-bg-black/60',
        blur && 'bear-backdrop-blur-sm',
        nested && 'Bear-Backdrop--nested',
        className
      )}
      style={{
        zIndex,
        transitionDuration: `${transitionDuration}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
