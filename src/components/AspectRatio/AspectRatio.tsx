import { FC, forwardRef } from 'react';
import { cn } from '@utils';
import type { AspectRatioProps } from './AspectRatio.types';

export const AspectRatio: FC<AspectRatioProps> = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, maxWidth, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('Bear-AspectRatio bear-relative bear-w-full bear-overflow-hidden', className)}
        style={{
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
          ...style,
        }}
        {...props}
      >
        <div
          className="Bear-AspectRatio__inner bear-w-full bear-relative"
          style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
        >
          <div className="Bear-AspectRatio__content bear-absolute bear-inset-0 bear-flex bear-items-center bear-justify-center">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';
