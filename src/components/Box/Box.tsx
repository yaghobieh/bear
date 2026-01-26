import { forwardRef } from 'react';
import { BoxProps } from './Box.types';
import { spacingToClass, roundedMap, shadowMap } from './Box.utils';

export const Box = forwardRef<HTMLDivElement, BoxProps>(({
  children,
  as: Component = 'div',
  className = '',
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  bg,
  rounded,
  shadow,
  border,
  borderColor,
  style,
  ...props
}, ref) => {
  const spacingClasses = [
    spacingToClass(p, 'p'),
    spacingToClass(px, 'px'),
    spacingToClass(py, 'py'),
    spacingToClass(pt, 'pt'),
    spacingToClass(pb, 'pb'),
    spacingToClass(pl, 'pl'),
    spacingToClass(pr, 'pr'),
    spacingToClass(m, 'm'),
    spacingToClass(mx, 'mx'),
    spacingToClass(my, 'my'),
    spacingToClass(mt, 'mt'),
    spacingToClass(mb, 'mb'),
    spacingToClass(ml, 'ml'),
    spacingToClass(mr, 'mr'),
  ].filter(Boolean).join(' ');

  const roundedClass = rounded ? roundedMap[rounded] : '';
  const shadowClass = shadow ? shadowMap[shadow] : '';
  const borderClass = border ? 'border' : '';

  const combinedStyle = {
    ...style,
    ...(bg ? { backgroundColor: bg } : {}),
    ...(borderColor ? { borderColor } : {}),
  };

  return (
    <Component
      ref={ref}
      className={`bear-box ${spacingClasses} ${roundedClass} ${shadowClass} ${borderClass} ${className}`.trim()}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

