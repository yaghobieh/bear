import { forwardRef } from 'react';
import { ASPECT_RATIO_WIDE, ONE, PERCENT_ONE_HUNDRED, UNIT_PX } from '@const';
import { cn } from '@utils';
import type { AspectRatioProps } from './AspectRatio.types';

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>((props, ref) => {
  const {
    ratio = ASPECT_RATIO_WIDE,
    maxWidth,
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn('Bear-AspectRatio bear-relative bear-w-full bear-overflow-hidden', className)}
      style={{
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}${UNIT_PX}` : maxWidth,
        ...style,
      }}
      {...rest}
    >
      <div
        className="Bear-AspectRatio__inner bear-w-full bear-relative"
        style={{ paddingBottom: `${(ONE / ratio) * PERCENT_ONE_HUNDRED}%` }}
      >
        <div className="Bear-AspectRatio__content bear-absolute bear-inset-0 bear-flex bear-items-center bear-justify-center">
          {children}
        </div>
      </div>
    </div>
  );
});

AspectRatio.displayName = 'AspectRatio';
