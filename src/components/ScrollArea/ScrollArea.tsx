import { FC } from 'react';
import { ScrollAreaProps } from './ScrollArea.types';
import { cn } from '@utils';

export const ScrollArea: FC<ScrollAreaProps> = ({
  children,
  className,
  orientation = 'vertical',
  scrollbarSize = 'md',
  scrollbarVariant = 'default',
  maxHeight,
  maxWidth,
}) => {
  const scrollbarSizeClasses = {
    sm: '[&::-webkit-scrollbar]:bear-w-1 [&::-webkit-scrollbar]:bear-h-1',
    md: '[&::-webkit-scrollbar]:bear-w-2 [&::-webkit-scrollbar]:bear-h-2',
    lg: '[&::-webkit-scrollbar]:bear-w-3 [&::-webkit-scrollbar]:bear-h-3',
  };

  const scrollbarVariantClasses = {
    default: '[&::-webkit-scrollbar-track]:bear-bg-zinc-800 [&::-webkit-scrollbar-thumb]:bear-bg-zinc-600 [&::-webkit-scrollbar-thumb]:bear-rounded-full [&::-webkit-scrollbar-thumb]:hover:bear-bg-zinc-500',
    minimal: '[&::-webkit-scrollbar-track]:bear-bg-transparent [&::-webkit-scrollbar-thumb]:bear-bg-zinc-700 [&::-webkit-scrollbar-thumb]:bear-rounded-full',
    hidden: '[&::-webkit-scrollbar]:bear-hidden bear-scrollbar-none',
  };

  const overflowClasses = {
    vertical: 'bear-overflow-y-auto bear-overflow-x-hidden',
    horizontal: 'bear-overflow-x-auto bear-overflow-y-hidden',
    both: 'bear-overflow-auto',
  };

  return (
    <div
      className={cn(
        overflowClasses[orientation],
        scrollbarSizeClasses[scrollbarSize],
        scrollbarVariantClasses[scrollbarVariant],
        className
      )}
      style={{
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      }}
    >
      {children}
    </div>
  );
};

